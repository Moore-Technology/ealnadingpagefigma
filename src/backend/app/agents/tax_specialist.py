"""
Tax Specialist Agent
Expert in tax law with RAG-powered IRS publication citations
"""

from typing import Dict, Any, Optional, List
from app.agents.base_agent import BaseAgent
from app.config import settings, SYSTEM_PROMPTS
import json


class TaxSpecialistAgent(BaseAgent):
    """
    Tax law expert agent with access to IRS publications via RAG
    """
    
    def __init__(self, rag_retriever=None):
        super().__init__(
            name="tax_specialist",
            model=settings.OPENAI_MODEL_SPECIALIST,
            temperature=settings.TAX_SPECIALIST_TEMPERATURE,
            max_tokens=settings.MAX_TOKENS_SPECIALIST,
            system_prompt=SYSTEM_PROMPTS["tax_specialist"]
        )
        self.rag_retriever = rag_retriever
    
    async def process(
        self,
        user_message: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Process tax question with RAG-enhanced response
        
        Args:
            user_message: User's tax question
            context: Optional context (conversation history, user data)
            
        Returns:
            {
                "content": "Detailed tax explanation...",
                "citations": [{"source": "Pub 17", "page": 45, "text": "..."}],
                "practice_question": {...},
                "related_topics": ["Topic 1", "Topic 2"],
                "confidence": 0.0-1.0
            }
        """
        
        # Step 1: Retrieve relevant IRS publication passages (RAG)
        rag_results = []
        if self.rag_retriever:
            rag_results = await self.rag_retriever.search(
                query=user_message,
                top_k=settings.TOP_K_RESULTS
            )
        
        # Step 2: Build enhanced prompt with RAG context
        enhanced_prompt = self._build_prompt_with_rag(
            user_message=user_message,
            rag_results=rag_results,
            context=context
        )
        
        # Step 3: Generate response
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": enhanced_prompt}
        ]
        
        # Add conversation history if provided
        if context and "conversation_history" in context:
            for msg in context["conversation_history"][-3:]:  # Last 3 messages
                messages.insert(-1, msg)
        
        result = await self.call_openai(
            messages=messages,
            temperature=self.temperature
        )
        
        # Step 4: Parse and structure response
        response_content = result["content"]
        
        # Extract practice question if generated
        practice_question = self._extract_practice_question(response_content)
        
        # Format citations
        citations = [
            {
                "source": r["source"],
                "page": r.get("page"),
                "text": r["text"][:200] + "...",  # Truncate for display
                "relevance_score": r["score"]
            }
            for r in rag_results[:3]  # Top 3 citations
        ]
        
        return {
            "content": response_content,
            "citations": citations,
            "practice_question": practice_question,
            "related_topics": self._extract_related_topics(rag_results),
            "confidence": self._calculate_confidence(rag_results),
            "tokens_used": result["tokens_used"],
            "cost": result["cost"],
            "latency_ms": result["latency_ms"]
        }
    
    def _build_prompt_with_rag(
        self,
        user_message: str,
        rag_results: List[Dict],
        context: Optional[Dict[str, Any]]
    ) -> str:
        """
        Build enhanced prompt with RAG context
        """
        prompt_parts = [f"User question: {user_message}\n"]
        
        # Add RAG context
        if rag_results:
            prompt_parts.append("\n**Relevant IRS Publication Excerpts:**\n")
            for i, result in enumerate(rag_results[:3], 1):
                prompt_parts.append(
                    f"\n[{i}] {result['source']}, Page {result.get('page', 'N/A')}:\n"
                    f"{result['text']}\n"
                )
        
        # Add user context
        if context:
            if "exam_part" in context:
                prompt_parts.append(f"\nUser is studying for: EA Part {context['exam_part']}")
            if "ready_score" in context:
                prompt_parts.append(f"\nUser's ReadyScore: {context['ready_score']}")
            if "weak_areas" in context and context.get("request_focus"):
                prompt_parts.append(
                    f"\nFocus on weak areas: {', '.join(context['weak_areas'])}"
                )
        
        prompt_parts.append(
            "\n\n**Instructions:**\n"
            "1. Provide a clear, exam-focused explanation\n"
            "2. Cite specific IRS publications and sections\n"
            "3. Highlight common exam traps\n"
            "4. Optionally generate a practice question\n"
            "5. Suggest 2-3 related topics to study\n"
        )
        
        return "".join(prompt_parts)
    
    def _extract_practice_question(self, response_content: str) -> Optional[Dict]:
        """
        Extract practice question from response if present
        Format: **Practice Question:** followed by question, options, answer
        """
        # Simple regex-based extraction (can be enhanced)
        import re
        
        # Look for practice question section
        match = re.search(
            r'\*\*Practice Question:\*\*\s*(.+?)(?:\*\*|$)',
            response_content,
            re.DOTALL
        )
        
        if not match:
            return None
        
        question_text = match.group(1).strip()
        
        # TODO: Parse question, options, correct answer
        # For now, return as-is
        return {
            "question": question_text,
            "options": [],  # Parse from text
            "correct_answer": None,  # Parse from text
            "explanation": ""
        }
    
    def _extract_related_topics(self, rag_results: List[Dict]) -> List[str]:
        """Extract related topics from RAG results"""
        topics = set()
        for result in rag_results:
            if "topics" in result:
                topics.update(result["topics"])
        return list(topics)[:3]  # Top 3 related topics
    
    def _calculate_confidence(self, rag_results: List[Dict]) -> float:
        """
        Calculate confidence score based on RAG result quality
        High relevance scores = high confidence
        """
        if not rag_results:
            return 0.5  # Medium confidence without RAG
        
        # Average of top 3 relevance scores
        top_scores = [r["score"] for r in rag_results[:3]]
        avg_score = sum(top_scores) / len(top_scores)
        
        # Normalize to 0.6-1.0 range
        confidence = 0.6 + (avg_score * 0.4)
        return round(confidence, 2)
    
    async def generate_practice_question(
        self,
        topic: str,
        difficulty: str = "medium",
        user_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Generate a practice question on a specific topic
        
        Args:
            topic: Tax topic (e.g., "partnership_basis")
            difficulty: "easy", "medium", or "hard"
            user_context: User's ReadyScore, weak areas, etc.
            
        Returns:
            {
                "question": "Question text...",
                "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
                "correct_answer": 2,  # Index of correct option
                "explanation": "Detailed explanation...",
                "irs_citation": "Pub 541, page 23",
                "difficulty": "medium",
                "topic": "partnership_basis"
            }
        """
        
        # Get RAG context for this topic
        rag_results = []
        if self.rag_retriever:
            rag_results = await self.rag_retriever.search(
                query=f"{topic} example calculation",
                top_k=2
            )
        
        # Build prompt
        prompt = f"""Generate a realistic EA exam practice question on: {topic}

Difficulty: {difficulty}

Requirements:
- Question should be scenario-based (not just definition)
- Include realistic numbers and calculations
- 4 answer choices (A, B, C, D)
- One correct answer
- Detailed explanation with IRS citation
- Highlight a common misconception

"""
        
        if rag_results:
            prompt += "**Reference Material:**\n"
            for r in rag_results:
                prompt += f"{r['source']}: {r['text'][:300]}...\n\n"
        
        prompt += """
Return as JSON:
{
  "question": "...",
  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
  "correct_answer": 2,
  "explanation": "...",
  "irs_citation": "Pub XXX, page XX",
  "common_trap": "Students often confuse..."
}
"""
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": prompt}
        ]
        
        result = await self.call_openai(
            messages=messages,
            temperature=0.7,  # Higher creativity for question generation
            response_format={"type": "json_object"}
        )
        
        question_data = json.loads(result["content"])
        question_data["topic"] = topic
        question_data["difficulty"] = difficulty
        
        return question_data

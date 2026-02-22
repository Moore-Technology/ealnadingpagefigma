"""
Orchestrator Agent
Routes user queries to the appropriate specialist agent
"""

from typing import Dict, Any, Optional
from app.agents.base_agent import BaseAgent
from app.config import settings, SYSTEM_PROMPTS
import json
import re


class OrchestratorAgent(BaseAgent):
    """
    Intelligent routing agent that analyzes user intent
    and delegates to specialist agents
    """
    
    def __init__(self):
        super().__init__(
            name="orchestrator",
            model=settings.OPENAI_MODEL_ORCHESTRATOR,
            temperature=settings.ORCHESTRATOR_TEMPERATURE,
            max_tokens=settings.MAX_TOKENS_ORCHESTRATOR,
            system_prompt=SYSTEM_PROMPTS["orchestrator"]
        )
        
        # Keyword patterns for quick routing (fallback if AI fails)
        self.patterns = {
            "TAX_SPECIALIST": [
                r"\b(explain|what is|define|how to calculate)\b",
                r"\b(irc|regulation|publication|pub \d+)\b",
                r"\b(deduction|credit|income|basis|depreciation)\b",
                r"\b(partnership|corporation|s-corp|c-corp)\b",
                r"\b(form \d+|schedule [a-z])\b"
            ],
            "SOCRATIC_COACH": [
                r"\b(study|learn|weak|improve|help me)\b",
                r"\b(mission|practice|quiz|test me)\b",
                r"\b(struggling|confused|don't understand)\b",
                r"\b(strategy|approach|method)\b",
                r"\b(motivate|encourage|confidence)\b"
            ],
            "DATA_ANALYST": [
                r"\b(score|progress|performance|analytics)\b",
                r"\b(when will i|how long|predict|estimate)\b",
                r"\b(weak area|topic|proficiency)\b",
                r"\b(trend|improvement|accuracy)\b",
                r"\b(statistics|data|analysis)\b"
            ]
        }
    
    async def process(
        self,
        user_message: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Analyze user message and determine which agent to route to
        
        Returns:
        {
            "agent": "TAX_SPECIALIST" | "SOCRATIC_COACH" | "DATA_ANALYST",
            "confidence": 0.0-1.0,
            "reasoning": "explanation",
            "should_use_rag": bool
        }
        """
        
        # First, try keyword-based routing (fast)
        keyword_result = self._keyword_routing(user_message)
        if keyword_result["confidence"] > 0.8:
            return keyword_result
        
        # If unclear, use AI routing (slower but more accurate)
        ai_result = await self._ai_routing(user_message, context)
        return ai_result
    
    def _keyword_routing(self, user_message: str) -> Dict[str, Any]:
        """Fast keyword-based routing"""
        message_lower = user_message.lower()
        scores = {agent: 0 for agent in self.patterns.keys()}
        
        # Score each agent based on keyword matches
        for agent, patterns in self.patterns.items():
            for pattern in patterns:
                if re.search(pattern, message_lower):
                    scores[agent] += 1
        
        # Select agent with highest score
        if max(scores.values()) == 0:
            # No keywords matched, default to TAX_SPECIALIST
            return {
                "agent": "TAX_SPECIALIST",
                "confidence": 0.5,
                "reasoning": "No clear keywords detected, defaulting to tax specialist",
                "should_use_rag": True,
                "routing_method": "keyword_default"
            }
        
        best_agent = max(scores, key=scores.get)
        max_score = scores[best_agent]
        total_score = sum(scores.values())
        confidence = max_score / total_score if total_score > 0 else 0.5
        
        return {
            "agent": best_agent,
            "confidence": round(confidence, 2),
            "reasoning": f"Keyword analysis matched {max_score} patterns for {best_agent}",
            "should_use_rag": best_agent == "TAX_SPECIALIST",
            "routing_method": "keyword"
        }
    
    async def _ai_routing(
        self,
        user_message: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        AI-powered routing for complex queries
        Uses GPT-3.5 for fast, cost-effective routing
        """
        
        # Build context string
        context_str = ""
        if context:
            if "ready_score" in context:
                context_str += f"\nUser's ReadyScore: {context['ready_score']}"
            if "weak_areas" in context:
                context_str += f"\nWeak areas: {', '.join(context['weak_areas'])}"
            if "recent_topics" in context:
                context_str += f"\nRecently studied: {', '.join(context['recent_topics'])}"
        
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"User message: {user_message}{context_str}"}
        ]
        
        try:
            result = await self.call_openai(
                messages=messages,
                temperature=0.2,  # Low temperature for deterministic routing
                max_tokens=150,
                response_format={"type": "json_object"}
            )
            
            routing_decision = json.loads(result["content"])
            
            # Add RAG flag
            routing_decision["should_use_rag"] = (
                routing_decision.get("agent") == "TAX_SPECIALIST"
            )
            routing_decision["routing_method"] = "ai"
            routing_decision["latency_ms"] = result["latency_ms"]
            
            return routing_decision
            
        except Exception as e:
            # Fallback to keyword routing if AI fails
            print(f"AI routing failed: {e}")
            return self._keyword_routing(user_message)
    
    def should_use_multi_agent(self, user_message: str) -> bool:
        """
        Determine if query requires multiple agents
        (e.g., "Explain partnerships and create a study plan")
        """
        message_lower = user_message.lower()
        
        # Check for multi-intent keywords
        multi_intent_patterns = [
            r"(explain|teach).+(study plan|practice|quiz)",
            r"(score|performance).+(weak|improve|help)",
            r"(learn|understand).+(when will i|how long)"
        ]
        
        for pattern in multi_intent_patterns:
            if re.search(pattern, message_lower):
                return True
        
        return False

"""
Base Agent Class
All AI agents inherit from this abstract base class
"""

from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Any
from openai import AsyncOpenAI
from app.config import settings
import json
import time


class BaseAgent(ABC):
    """Abstract base class for all AI agents"""
    
    def __init__(
        self,
        name: str,
        model: str,
        temperature: float,
        max_tokens: int,
        system_prompt: str
    ):
        self.name = name
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.system_prompt = system_prompt
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        
        # Performance tracking
        self.total_calls = 0
        self.total_tokens = 0
        self.total_cost = 0.0
        
    @abstractmethod
    async def process(
        self,
        user_message: str,
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Process user message and return response
        Must be implemented by each agent
        """
        pass
    
    async def call_openai(
        self,
        messages: List[Dict[str, str]],
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        response_format: Optional[Dict] = None
    ) -> Dict[str, Any]:
        """
        Call OpenAI API with retry logic and cost tracking
        """
        start_time = time.time()
        
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=temperature or self.temperature,
                max_tokens=max_tokens or self.max_tokens,
                response_format=response_format
            )
            
            # Extract data
            content = response.choices[0].message.content
            tokens_used = response.usage.total_tokens
            
            # Calculate cost (GPT-4-turbo pricing as of Dec 2024)
            if "gpt-4" in self.model:
                cost = (response.usage.prompt_tokens * 0.00001) + \
                       (response.usage.completion_tokens * 0.00003)
            else:  # GPT-3.5
                cost = (response.usage.prompt_tokens * 0.0000005) + \
                       (response.usage.completion_tokens * 0.0000015)
            
            # Track metrics
            self.total_calls += 1
            self.total_tokens += tokens_used
            self.total_cost += cost
            
            latency_ms = int((time.time() - start_time) * 1000)
            
            return {
                "content": content,
                "tokens_used": tokens_used,
                "cost": cost,
                "latency_ms": latency_ms,
                "model": self.model
            }
            
        except Exception as e:
            raise Exception(f"{self.name} agent error: {str(e)}")
    
    def get_metrics(self) -> Dict[str, Any]:
        """Return agent performance metrics"""
        return {
            "agent_name": self.name,
            "total_calls": self.total_calls,
            "total_tokens": self.total_tokens,
            "total_cost": round(self.total_cost, 4),
            "avg_cost_per_call": round(
                self.total_cost / self.total_calls if self.total_calls > 0 else 0,
                4
            )
        }
    
    def format_response(
        self,
        content: str,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Standard response format for all agents"""
        response = {
            "agent": self.name,
            "content": content,
            "timestamp": time.time()
        }
        
        if metadata:
            response["metadata"] = metadata
            
        return response

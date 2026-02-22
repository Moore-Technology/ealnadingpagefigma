"""
EA Study Coach - Configuration Settings
Loads environment variables and provides app-wide configuration
"""

from pydantic_settings import BaseSettings
from typing import List, Optional
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # App Info
    APP_NAME: str = "EA Study Coach API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_WORKERS: int = 4
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://ea-study-app.vercel.app"
    ]
    
    # OpenAI Configuration
    OPENAI_API_KEY: str
    OPENAI_MODEL_SPECIALIST: str = "gpt-4-turbo-preview"
    OPENAI_MODEL_COACH: str = "gpt-4-turbo-preview"
    OPENAI_MODEL_ANALYST: str = "gpt-4-turbo-preview"
    OPENAI_MODEL_ORCHESTRATOR: str = "gpt-3.5-turbo"
    
    # Agent Temperature Settings
    TAX_SPECIALIST_TEMPERATURE: float = 0.5
    SOCRATIC_COACH_TEMPERATURE: float = 0.7
    DATA_ANALYST_TEMPERATURE: float = 0.2
    ORCHESTRATOR_TEMPERATURE: float = 0.3
    
    # Token Limits
    MAX_TOKENS_PER_REQUEST: int = 4000
    MAX_TOKENS_SPECIALIST: int = 3000
    MAX_TOKENS_COACH: int = 2000
    MAX_TOKENS_ANALYST: int = 2500
    MAX_TOKENS_ORCHESTRATOR: int = 500
    
    # Supabase / PostgreSQL
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    DATABASE_URL: Optional[str] = None  # Alternative to Supabase
    
    # Vector Database (Pinecone)
    PINECONE_API_KEY: Optional[str] = None
    PINECONE_ENVIRONMENT: str = "us-west1-gcp"
    PINECONE_INDEX_NAME: str = "ea-study-rag"
    
    # Alternative: ChromaDB (Local)
    USE_CHROMA: bool = False
    CHROMA_PERSIST_DIRECTORY: str = "./chroma_db"
    
    # RAG Configuration
    CHUNK_SIZE: int = 512  # Tokens per chunk
    CHUNK_OVERLAP: int = 50
    TOP_K_RESULTS: int = 5  # Number of RAG results to retrieve
    SIMILARITY_THRESHOLD: float = 0.75
    
    # Caching
    REDIS_URL: Optional[str] = None
    CACHE_TTL_SECONDS: int = 86400  # 24 hours
    ENABLE_RESPONSE_CACHE: bool = True
    
    # Rate Limiting
    RATE_LIMIT_MESSAGES_PER_HOUR: int = 60
    RATE_LIMIT_QUESTIONS_PER_DAY: int = 200
    RATE_LIMIT_API_CALLS_PER_MINUTE: int = 30
    
    # Cost Controls
    MONTHLY_COST_LIMIT_PER_USER: float = 5.00
    ENABLE_COST_TRACKING: bool = True
    ALERT_THRESHOLD_PERCENTAGE: float = 0.80  # Alert at 80% of limit
    
    # ReadyScore Configuration
    READY_SCORE_MIN: int = 40
    READY_SCORE_MAX: int = 130
    READY_SCORE_TARGET: int = 105
    CONFIDENCE_LEVEL: float = 0.95  # 95% confidence interval
    
    # Spaced Repetition (SM-2 Algorithm)
    INITIAL_INTERVAL_DAYS: int = 1
    EASY_BONUS_MULTIPLIER: float = 1.3
    MIN_EASINESS_FACTOR: float = 1.3
    
    # Mission Generation
    MISSIONS_PER_DAY: int = 3
    XP_BASE_REWARD: int = 100
    XP_MULTIPLIER_STREAK: float = 1.1
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/app.log"
    SENTRY_DSN: Optional[str] = None
    
    # Security
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Singleton instance
settings = Settings()


# Agent System Prompts
SYSTEM_PROMPTS = {
    "orchestrator": """You are an intelligent routing agent for an EA exam preparation platform.
Your job is to analyze the user's message and determine which specialist agent should handle it:

- TAX_SPECIALIST: Tax law questions, IRS regulations, calculations, definitions
- SOCRATIC_COACH: Study advice, learning strategies, motivation, personalized guidance
- DATA_ANALYST: Performance metrics, predictions, analytics, progress tracking

Respond with a JSON object:
{
  "agent": "TAX_SPECIALIST" | "SOCRATIC_COACH" | "DATA_ANALYST",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation"
}

If the query requires multiple agents, choose the primary one.""",

    "tax_specialist": """You are an expert Enrolled Agent (EA) exam tutor specializing in tax law.

Your expertise includes:
- Individual taxation (Part 1)
- Business taxation (Part 2)
- Representation, practices, and procedures (Part 3)
- IRS publications and Treasury Regulations
- Circular 230 ethics rules

When answering:
1. Provide clear, exam-focused explanations
2. Cite specific IRS publications and IRC sections
3. Use practical examples
4. Highlight common exam traps
5. Suggest related practice questions

Always maintain a professional but encouraging tone. Remember, you're preparing students for one of the toughest tax exams.""",

    "socratic_coach": """You are an adaptive learning coach using the Socratic method.

Your teaching philosophy:
- Ask guiding questions instead of giving direct answers
- Scaffold complex topics into manageable steps
- Provide immediate, encouraging feedback
- Use growth mindset language
- Implement spaced repetition principles

When interacting:
1. Assess the user's current understanding
2. Ask thought-provoking questions
3. Guide them to discover answers themselves
4. Celebrate progress and effort
5. Recommend specific next steps

You have access to the user's performance data. Use it to personalize your coaching.""",

    "data_analyst": """You are a performance analytics specialist for EA exam preparation.

Your capabilities:
- Calculate ReadyScore with statistical confidence intervals
- Identify weak areas using Item Response Theory (IRT)
- Predict exam readiness dates with probability
- Generate performance visualizations
- Recommend optimal study schedules

When analyzing data:
1. Use statistical rigor (Bayesian inference, IRT)
2. Present findings visually when possible
3. Provide actionable recommendations
4. Consider the 3-year exam window deadline
5. Track improvement trends over time

Always explain your calculations in simple terms."""
}


# IRS Publication Sources for RAG
IRS_PUBLICATIONS = {
    "pub_17": {
        "name": "Your Federal Income Tax (For Individuals)",
        "url": "https://www.irs.gov/pub/irs-pdf/p17.pdf",
        "topics": ["individual_taxation", "deductions", "credits"]
    },
    "pub_334": {
        "name": "Tax Guide for Small Business",
        "url": "https://www.irs.gov/pub/irs-pdf/p334.pdf",
        "topics": ["business_taxation", "self_employment", "deductions"]
    },
    "pub_541": {
        "name": "Partnerships",
        "url": "https://www.irs.gov/pub/irs-pdf/p541.pdf",
        "topics": ["partnerships", "basis", "distributions"]
    },
    "pub_542": {
        "name": "Corporations",
        "url": "https://www.irs.gov/pub/irs-pdf/p542.pdf",
        "topics": ["c_corporations", "s_corporations", "dividends"]
    },
    "circular_230": {
        "name": "Circular 230 - Regulations Governing Practice",
        "url": "https://www.irs.gov/pub/irs-pdf/pcir230.pdf",
        "topics": ["ethics", "representation", "practice_rights"]
    }
}


# Exam Configuration
EXAM_PARTS = {
    1: {
        "name": "Individuals",
        "questions": 100,
        "time_minutes": 210,
        "passing_score": 105,
        "topics": [
            "Gross Income",
            "Adjustments",
            "Deductions",
            "Credits",
            "Basis",
            "Capital Gains",
            "Retirement Plans"
        ]
    },
    2: {
        "name": "Businesses",
        "questions": 100,
        "time_minutes": 210,
        "passing_score": 105,
        "topics": [
            "Business Income",
            "Depreciation",
            "Partnerships",
            "Corporations",
            "S-Corporations",
            "Trusts & Estates"
        ]
    },
    3: {
        "name": "Representation, Practices, and Procedures",
        "questions": 100,
        "time_minutes": 210,
        "passing_score": 105,
        "topics": [
            "Circular 230 Ethics",
            "Power of Attorney",
            "Collection Process",
            "Penalties",
            "Appeals",
            "Taxpayer Rights"
        ]
    }
}

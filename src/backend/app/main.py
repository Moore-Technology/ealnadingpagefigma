"""
EA Study Coach - FastAPI Main Application
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import time

from app.config import settings
from app.agents.orchestrator import OrchestratorAgent
from app.agents.tax_specialist import TaxSpecialistAgent
# from app.agents.socratic_coach import SocraticCoachAgent  # To be implemented
# from app.agents.data_analyst import DataAnalystAgent  # To be implemented

# from app.api import chat, performance, missions, questions  # To be implemented
# from app.rag.retriever import RAGRetriever  # To be implemented


# Global agent instances
orchestrator: OrchestratorAgent = None
tax_specialist: TaxSpecialistAgent = None
# socratic_coach: SocraticCoachAgent = None
# data_analyst: DataAnalystAgent = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup and shutdown events
    Initialize agents and database connections
    """
    # Startup
    print("🚀 Starting EA Study Coach API...")
    
    global orchestrator, tax_specialist
    
    # Initialize RAG retriever (to be implemented)
    # rag_retriever = RAGRetriever()
    # await rag_retriever.initialize()
    
    # Initialize agents
    orchestrator = OrchestratorAgent()
    tax_specialist = TaxSpecialistAgent(rag_retriever=None)  # Add RAG later
    # socratic_coach = SocraticCoachAgent()
    # data_analyst = DataAnalystAgent()
    
    print("✅ All agents initialized")
    print(f"📍 API running at http://{settings.API_HOST}:{settings.API_PORT}")
    print(f"📚 Docs available at http://{settings.API_HOST}:{settings.API_PORT}/docs")
    
    yield
    
    # Shutdown
    print("👋 Shutting down EA Study Coach API...")
    
    # Print final metrics
    if orchestrator:
        print(f"Orchestrator: {orchestrator.get_metrics()}")
    if tax_specialist:
        print(f"Tax Specialist: {tax_specialist.get_metrics()}")


# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Multi-Agent AI System for EA Exam Preparation",
    lifespan=lifespan
)


# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """System health check"""
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "agents": {
            "orchestrator": "online" if orchestrator else "offline",
            "tax_specialist": "online" if tax_specialist else "offline",
            # "socratic_coach": "online" if socratic_coach else "offline",
            # "data_analyst": "online" if data_analyst else "offline"
        },
        "timestamp": time.time()
    }


# Simple chat endpoint (MVP)
@app.post("/api/chat")
async def chat(request: dict):
    """
    Send message to AI mentor
    
    Request body:
    {
        "user_id": "uuid",
        "message": "Explain S-Corporation taxation",
        "context": {
            "ready_score": 87,
            "exam_part": 2,
            "weak_areas": ["partnerships"]
        }
    }
    """
    try:
        user_message = request.get("message")
        context = request.get("context", {})
        
        if not user_message:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message is required"
            )
        
        # Step 1: Route to appropriate agent
        routing = await orchestrator.process(user_message, context)
        
        # Step 2: Get response from selected agent
        if routing["agent"] == "TAX_SPECIALIST":
            response = await tax_specialist.process(user_message, context)
        # elif routing["agent"] == "SOCRATIC_COACH":
        #     response = await socratic_coach.process(user_message, context)
        # elif routing["agent"] == "DATA_ANALYST":
        #     response = await data_analyst.process(user_message, context)
        else:
            # Fallback
            response = await tax_specialist.process(user_message, context)
        
        # Step 3: Return combined response
        return {
            "success": True,
            "routing": routing,
            "response": response["content"],
            "citations": response.get("citations", []),
            "follow_up_suggestions": [
                "Can you explain this with an example?",
                "What are common exam traps for this topic?",
                "Generate a practice question on this"
            ],
            "metadata": {
                "tokens_used": response.get("tokens_used", 0),
                "latency_ms": response.get("latency_ms", 0),
                "cost": response.get("cost", 0.0)
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing message: {str(e)}"
        )


# Practice question endpoint (MVP)
@app.post("/api/questions/generate")
async def generate_question(request: dict):
    """
    Generate practice question
    
    Request body:
    {
        "topic": "partnership_basis",
        "difficulty": "medium",
        "user_context": {
            "ready_score": 87,
            "weak_areas": ["partnerships"]
        }
    }
    """
    try:
        topic = request.get("topic")
        difficulty = request.get("difficulty", "medium")
        user_context = request.get("user_context", {})
        
        if not topic:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Topic is required"
            )
        
        question = await tax_specialist.generate_practice_question(
            topic=topic,
            difficulty=difficulty,
            user_context=user_context
        )
        
        return {
            "success": True,
            "question": question
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating question: {str(e)}"
        )


# Agent metrics endpoint
@app.get("/api/metrics")
async def get_metrics():
    """Get performance metrics for all agents"""
    metrics = {
        "orchestrator": orchestrator.get_metrics() if orchestrator else {},
        "tax_specialist": tax_specialist.get_metrics() if tax_specialist else {},
    }
    
    # Calculate totals
    total_calls = sum(m.get("total_calls", 0) for m in metrics.values())
    total_cost = sum(m.get("total_cost", 0) for m in metrics.values())
    
    return {
        "agents": metrics,
        "totals": {
            "total_calls": total_calls,
            "total_cost": round(total_cost, 4)
        },
        "timestamp": time.time()
    }


# Root endpoint
@app.get("/")
async def root():
    """API information"""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "docs": "/docs",
        "health": "/health"
    }


# Include routers (when implemented)
# app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
# app.include_router(performance.router, prefix="/api/performance", tags=["Performance"])
# app.include_router(missions.router, prefix="/api/missions", tags=["Missions"])
# app.include_router(questions.router, prefix="/api/questions", tags=["Questions"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )

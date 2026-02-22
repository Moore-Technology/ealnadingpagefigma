# EA Study Coach - Backend Setup

## 🚀 FastAPI Backend Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                      # FastAPI app entry point
│   ├── config.py                    # Environment variables
│   ├── database.py                  # Supabase/PostgreSQL connection
│   │
│   ├── agents/                      # AI Agent System
│   │   ├── __init__.py
│   │   ├── base_agent.py           # Abstract base class
│   │   ├── orchestrator.py         # Router agent
│   │   ├── tax_specialist.py       # Tax law expert
│   │   ├── socratic_coach.py       # Adaptive teaching
│   │   └── data_analyst.py         # Performance analytics
│   │
│   ├── rag/                         # Retrieval-Augmented Generation
│   │   ├── __init__.py
│   │   ├── embeddings.py           # OpenAI embeddings
│   │   ├── vector_store.py         # Pinecone/ChromaDB
│   │   └── retriever.py            # Search logic
│   │
│   ├── api/                         # API Routes
│   │   ├── __init__.py
│   │   ├── chat.py                 # Chat endpoints
│   │   ├── performance.py          # Performance analytics
│   │   ├── missions.py             # Daily missions
│   │   └── questions.py            # Practice questions
│   │
│   ├── models/                      # Database Models (SQLAlchemy/Pydantic)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── question_attempt.py
│   │   ├── conversation.py
│   │   └── knowledge_state.py
│   │
│   ├── schemas/                     # Pydantic Schemas (API validation)
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   ├── performance.py
│   │   └── mission.py
│   │
│   └── utils/                       # Helper Functions
│       ├── __init__.py
│       ├── auth.py                 # JWT validation
│       ├── irt_calculator.py       # Item Response Theory
│       └── spaced_repetition.py    # SM-2 algorithm
│
├── data/                            # RAG Knowledge Base
│   ├── irs_publications/
│   │   ├── pub_17_2024.pdf
│   │   ├── pub_334_2024.pdf
│   │   └── circular_230.pdf
│   └── processed/
│       └── embeddings.json
│
├── tests/
│   ├── test_agents.py
│   ├── test_rag.py
│   └── test_api.py
│
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## 📦 Installation

### Prerequisites
- Python 3.11+
- PostgreSQL 15+ (or Supabase account)
- OpenAI API key
- Pinecone API key (optional - can use ChromaDB locally)

### Step 1: Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Set Environment Variables

Create `.env` file:

```bash
# OpenAI
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL_SPECIALIST=gpt-4-turbo-preview
OPENAI_MODEL_COACH=gpt-4-turbo-preview
OPENAI_MODEL_ORCHESTRATOR=gpt-3.5-turbo

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Vector Database (Pinecone)
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=us-west1-gcp
PINECONE_INDEX_NAME=ea-study-rag

# Alternative: ChromaDB (local)
CHROMA_PERSIST_DIRECTORY=./chroma_db

# API Settings
API_HOST=0.0.0.0
API_PORT=8000
API_WORKERS=4
CORS_ORIGINS=["http://localhost:3000", "https://ea-study-app.vercel.app"]

# Rate Limiting
RATE_LIMIT_MESSAGES_PER_HOUR=60
RATE_LIMIT_QUESTIONS_PER_DAY=200

# Cost Controls
MAX_TOKENS_PER_REQUEST=4000
MONTHLY_COST_LIMIT_PER_USER=5.00
```

### Step 4: Initialize Database

```bash
# Run Alembic migrations
alembic upgrade head

# Seed sample data (optional)
python scripts/seed_data.py
```

### Step 5: Process IRS Publications (RAG Setup)

```bash
# Download IRS publications
python scripts/download_irs_pubs.py

# Generate embeddings
python scripts/generate_embeddings.py

# Upload to Pinecone
python scripts/upload_vectors.py
```

This will:
1. Download IRS Pubs 17, 334, 541, 542, Circular 230
2. Split into chunks (512 tokens each)
3. Generate OpenAI embeddings
4. Store in Pinecone vector database

**Cost estimate**: ~$2 for one-time embedding generation

### Step 6: Start Server

```bash
# Development (with hot reload)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

API will be available at: **http://localhost:8000**

API Docs: **http://localhost:8000/docs** (automatic Swagger UI)

---

## 🧪 Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Test Specific Agent
```bash
pytest tests/test_agents.py::test_tax_specialist_agent -v
```

### Test RAG Pipeline
```bash
pytest tests/test_rag.py::test_retrieve_partnership_basis -v
```

### Load Testing
```bash
locust -f tests/load_test.py --host http://localhost:8000
```

---

## 🔄 Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/add-ethics-agent
```

### 2. Make Changes
Edit files in `app/agents/` or `app/api/`

### 3. Test Locally
```bash
pytest tests/
python -m app.main  # Start server
```

### 4. Commit and Push
```bash
git add .
git commit -m "feat: Add ethics specialist agent"
git push origin feature/add-ethics-agent
```

### 5. Deploy
```bash
# Railway
railway up

# Render
git push render main
```

---

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:8000/health
```

**Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "agents": {
    "orchestrator": "online",
    "tax_specialist": "online",
    "socratic_coach": "online",
    "data_analyst": "online"
  },
  "database": "connected",
  "vector_store": "connected"
}
```

### View Logs
```bash
# Development
tail -f logs/app.log

# Production (Railway)
railway logs

# Production (Render)
render logs
```

### Monitor Costs
```bash
# OpenAI usage
python scripts/check_openai_usage.py

# Per-user costs
python scripts/analyze_user_costs.py
```

---

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=sk-...
```

**Cost**: $5/month (starter plan)

---

### Option 2: Render
```bash
# Create render.yaml
service:
  type: web
  env: python
  buildCommand: pip install -r requirements.txt
  startCommand: gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

Push to GitHub, connect to Render dashboard.

**Cost**: $7/month (starter plan)

---

### Option 3: Fly.io
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch

# Deploy
fly deploy
```

**Cost**: $1.94/month (shared-cpu-1x)

---

### Option 4: AWS Lambda (Serverless)
```bash
# Use Mangum adapter
pip install mangum

# Deploy with Serverless Framework
serverless deploy
```

**Cost**: Free tier (1M requests/month)

---

## 🔧 Configuration

### Agent Temperature Settings

Edit `app/config.py`:

```python
# Deterministic (factual answers)
TAX_SPECIALIST_TEMPERATURE = 0.5

# Creative (varied teaching approaches)
SOCRATIC_COACH_TEMPERATURE = 0.7

# Precise (calculations)
DATA_ANALYST_TEMPERATURE = 0.2

# Fast routing
ORCHESTRATOR_TEMPERATURE = 0.3
```

### RAG Chunk Size

```python
# Smaller = more precise, higher cost
CHUNK_SIZE = 512

# Larger = more context, lower cost
CHUNK_SIZE = 1024
```

### Cost Controls

```python
# Maximum tokens per API call
MAX_TOKENS_PER_REQUEST = 4000

# Stop if user exceeds monthly limit
MONTHLY_COST_LIMIT_PER_USER = 5.00

# Cache common responses (24 hours)
RESPONSE_CACHE_TTL = 86400
```

---

## 📈 Performance Optimization

### 1. Response Caching
```python
# Cache common tax questions
@cache(ttl=86400)  # 24 hours
async def get_standard_deduction():
    return await tax_specialist.answer("What is the standard deduction?")
```

### 2. Parallel Agent Calls
```python
# Call multiple agents simultaneously
tasks = [
    tax_specialist.answer(question),
    socratic_coach.generate_mission(user_id)
]
results = await asyncio.gather(*tasks)
```

### 3. Database Indexing
```sql
-- Speed up weak area queries
CREATE INDEX idx_knowledge_state_proficiency 
ON knowledge_state(user_id, proficiency_score);

-- Speed up question retrieval
CREATE INDEX idx_question_attempts_user_topic 
ON question_attempts(user_id, question_topic, attempted_at);
```

### 4. Connection Pooling
```python
# PostgreSQL connection pool
DATABASE_POOL_SIZE = 20
DATABASE_MAX_OVERFLOW = 10
```

---

## 🐛 Common Issues

### Issue: "OpenAI rate limit exceeded"
**Solution**: Implement exponential backoff

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=10)
)
async def call_openai(prompt):
    return await openai.ChatCompletion.create(...)
```

---

### Issue: "Pinecone index not found"
**Solution**: Create index first

```bash
python scripts/create_pinecone_index.py
```

---

### Issue: "Supabase connection timeout"
**Solution**: Check connection string and firewall

```python
# Test connection
python -c "from app.database import test_connection; test_connection()"
```

---

## 📚 Additional Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **OpenAI Cookbook**: https://github.com/openai/openai-cookbook
- **LangChain Docs**: https://python.langchain.com/
- **Pinecone Docs**: https://docs.pinecone.io/
- **Supabase Docs**: https://supabase.com/docs

---

## 🎯 Next Steps

Once backend is running:

1. ✅ Test agents via Swagger UI (http://localhost:8000/docs)
2. ✅ Send test message: `POST /api/chat`
3. ✅ Check RAG search: `POST /api/rag/search`
4. ✅ Update frontend to use backend API
5. ✅ Deploy to Railway/Render

---

**Ready for the implementation code?** Let me know when to proceed to Step 2!

# EA Study Coach - Multi-Agent Architecture

## 🎯 System Overview

The EA Study Coach uses a **4-Agent System** orchestrated by an intelligent router that analyzes user intent and delegates to specialized AI agents.

## 🤖 Agent Roles

### 1. **Orchestrator Agent** (Router)
**Purpose**: Analyzes user queries and routes to the appropriate specialist agent.

**Responsibilities**:
- Parse user intent from chat messages
- Determine which specialist agent(s) to invoke
- Merge responses from multiple agents if needed
- Handle context switching between conversation types
- Maintain conversation history and state

**Decision Logic**:
```python
if query_contains(['explain', 'what is', 'define']):
    → Tax Specialist Agent
    
elif query_contains(['how do I', 'study plan', 'weak areas']):
    → Socratic Coach Agent
    
elif query_contains(['score', 'progress', 'analytics', 'when ready']):
    → Data Analyst Agent
    
elif query_contains(['practice', 'quiz', 'test me']):
    → Tax Specialist + Socratic Coach (collaborative)
```

**Model**: GPT-4-Turbo (fast routing decisions)  
**Temperature**: 0.3 (deterministic routing)

---

### 2. **Tax Specialist Agent** (Subject Matter Expert)
**Purpose**: Deep tax law knowledge with IRS publication citations.

**Responsibilities**:
- Explain complex tax concepts (IRC sections, regulations)
- Provide IRS publication references (Pub 17, 225, 334, 544, etc.)
- Generate practice questions with detailed explanations
- Clarify differences between similar concepts (e.g., S-Corp vs Partnership)
- Stay updated with current tax year rules

**RAG Knowledge Base**:
- IRS Publications (Pub 17, 225, 334, 544, 946, 970)
- Treasury Regulations (26 CFR)
- Circular 230 (Ethics)
- IRS Form Instructions (1040, 1120, 1065, etc.)
- EA Exam Prometric Content Outlines (Parts 1, 2, 3)

**Model**: GPT-4 (deep reasoning required)  
**Temperature**: 0.5 (balanced creativity/accuracy)  
**Context Window**: 128k tokens (long IRS documents)

**Sample Response Format**:
```json
{
  "explanation": "Detailed tax law explanation...",
  "irs_citations": ["IRC §162", "Pub 334 p.45"],
  "practice_question": {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correct_answer": 2,
    "explanation": "..."
  },
  "related_topics": ["Depreciation", "Section 179"]
}
```

---

### 3. **Socratic Coach Agent** (Adaptive Learning Guide)
**Purpose**: Personalized teaching using the Socratic method and spaced repetition.

**Responsibilities**:
- Analyze learner's current knowledge state (ReadyScore, weak areas)
- Generate adaptive daily missions based on performance data
- Use Socratic questioning (don't just give answers)
- Provide encouraging feedback with growth mindset language
- Adjust difficulty based on user's confidence intervals
- Implement spaced repetition scheduling

**Pedagogical Strategies**:
1. **Scaffolding**: Break complex topics into smaller sub-topics
2. **Metacognition**: Ask "Why did you choose that answer?"
3. **Error Analysis**: "That's a common mistake because..."
4. **Confidence Calibration**: Compare user's confidence vs actual performance
5. **Interleaving**: Mix topics instead of blocking

**Model**: GPT-4 (nuanced teaching required)  
**Temperature**: 0.7 (creative teaching approaches)

**Sample Response Format**:
```json
{
  "teaching_mode": "socratic_question",
  "message": "Before I explain that, what do you think happens to basis when a partner contributes property with debt?",
  "follow_up_prompts": [
    "Consider the liability shift...",
    "Think about who bears the economic risk..."
  ],
  "encouragement": "You're asking great questions about partnership taxation - this is one of the trickiest EA exam topics!",
  "recommended_action": "complete_mission_5_minute_sprint_partnerships"
}
```

---

### 4. **Data Analyst Agent** (Performance Intelligence)
**Purpose**: Track, analyze, and predict user performance with statistical rigor.

**Responsibilities**:
- Calculate ReadyScore with confidence intervals (Bayesian inference)
- Identify weak areas using Item Response Theory (IRT)
- Predict exam readiness date with 90% confidence
- Generate performance analytics (accuracy trends, topic mastery)
- Recommend optimal study schedule based on 3-year exam window
- A/B test different teaching strategies

**Statistical Models**:
1. **ReadyScore Calculation**:
   ```python
   ReadyScore = BASE_SCORE + (correct_answers / total_questions) * SCALE_FACTOR
   Confidence_Interval = ±sqrt((N_questions * p * (1-p))) * Z_score / sqrt(N)
   ```

2. **Weak Area Detection** (IRT):
   ```python
   Ability_Estimate = log((P_correct) / (1 - P_correct))
   if Ability_Estimate < -1.0: → "Critical Weakness"
   ```

3. **Exam Readiness Prediction**:
   ```python
   days_to_ready = (TARGET_SCORE - current_score) / daily_improvement_rate
   prediction_confidence = 1 - (confidence_interval / current_score)
   ```

**Model**: GPT-4 with Code Interpreter (data analysis)  
**Temperature**: 0.2 (precise calculations)

**Sample Response Format**:
```json
{
  "ready_score": 87,
  "confidence_interval": {
    "lower": 79,
    "upper": 95,
    "margin": 8
  },
  "exam_ready_prediction": {
    "target_date": "2025-03-15",
    "confidence": 0.87,
    "assumptions": "Based on current pace of 15 questions/day"
  },
  "weak_areas": [
    {
      "topic": "Partnership Basis",
      "proficiency": 0.42,
      "priority": "critical",
      "questions_needed": 35
    }
  ],
  "study_plan_recommendation": "Focus next 3 days on partnership taxation"
}
```

---

## 🔄 Agent Orchestration Flow

### **Scenario 1: Simple Tax Question**
```
User: "What is the standard deduction for 2024?"

1. Orchestrator analyzes intent → [Tax Specialist]
2. Tax Specialist queries RAG → IRS Pub 17
3. Tax Specialist responds with answer + citation
4. Response sent to user
```

**Latency**: ~2 seconds  
**Tokens Used**: ~500

---

### **Scenario 2: Study Plan Request** (Multi-Agent)
```
User: "I'm weak in partnerships. What should I study?"

1. Orchestrator analyzes intent → [Data Analyst + Socratic Coach]
2. Data Analyst checks user's partnership performance:
   - 12/30 questions correct (40% accuracy)
   - Last studied 5 days ago
   - Spaced repetition due TODAY
3. Socratic Coach generates adaptive mission:
   - 5-Minute Sprint: Partnership Basis (10 questions)
   - Difficulty: Medium (based on IRT ability estimate)
4. Both agents' responses merged by Orchestrator
5. Response sent to user with action plan
```

**Latency**: ~4 seconds (parallel agent calls)  
**Tokens Used**: ~1,200

---

### **Scenario 3: Practice Question with Feedback** (Collaborative)
```
User: "Test me on S-Corporation taxation"

1. Orchestrator → [Tax Specialist + Socratic Coach]
2. Tax Specialist generates question from RAG:
   - Topic: S-Corp shareholder basis
   - Difficulty: Hard (based on user's 87 ReadyScore)
3. User answers INCORRECTLY
4. Socratic Coach analyzes error:
   - Common misconception: Confusing with partnership rules
   - Teaching strategy: Comparison table
5. Combined response with gentle correction + teaching moment
```

**Latency**: ~3 seconds  
**Tokens Used**: ~800

---

## 🗄️ Database Schema (PostgreSQL/Supabase)

### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- EA Exam Progress
  exam_part_1_status VARCHAR(20), -- not_started, in_progress, passed, failed
  exam_part_1_date DATE,
  exam_part_2_status VARCHAR(20),
  exam_part_2_date DATE,
  exam_part_3_status VARCHAR(20),
  exam_part_3_date DATE,
  three_year_deadline DATE, -- Set when first part passed
  
  -- Performance Metrics
  ready_score INTEGER DEFAULT 40,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  study_streak_days INTEGER DEFAULT 0,
  total_study_minutes INTEGER DEFAULT 0,
  
  -- Preferences
  daily_goal_minutes INTEGER DEFAULT 30,
  preferred_study_time TIME DEFAULT '18:00:00',
  notification_settings JSONB
);
```

### **Question Attempts Table** (for IRT calculations)
```sql
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  question_id VARCHAR(50) NOT NULL,
  
  -- Attempt Data
  user_answer INTEGER, -- 0-3 (A, B, C, D)
  correct_answer INTEGER,
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  confidence_level INTEGER, -- 1-5 (how sure they were)
  
  -- Context
  question_topic VARCHAR(100), -- "Partnership Basis"
  question_difficulty VARCHAR(20), -- "easy", "medium", "hard"
  exam_part INTEGER, -- 1, 2, or 3
  
  -- Timestamps
  attempted_at TIMESTAMP DEFAULT NOW(),
  
  -- Spaced Repetition
  next_review_date DATE,
  repetition_number INTEGER DEFAULT 1
);
```

### **Agent Conversations Table**
```sql
CREATE TABLE agent_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  
  -- Message Data
  user_message TEXT NOT NULL,
  agent_response TEXT NOT NULL,
  agent_type VARCHAR(50), -- orchestrator, tax_specialist, socratic_coach, data_analyst
  
  -- Routing Metadata
  intent_classification VARCHAR(50), -- tax_question, study_plan, performance_review
  routing_confidence FLOAT, -- 0.0-1.0
  
  -- Performance
  latency_ms INTEGER,
  tokens_used INTEGER,
  rag_citations JSONB, -- [{"source": "Pub 17", "page": 45}]
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Daily Missions Table** (Generated by Socratic Coach)
```sql
CREATE TABLE daily_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  
  -- Mission Data
  mission_type VARCHAR(50), -- sprint_mode, exam_simulation, ethics_scenario
  title VARCHAR(200),
  description TEXT,
  target_topic VARCHAR(100),
  difficulty VARCHAR(20),
  estimated_minutes INTEGER,
  xp_reward INTEGER,
  
  -- Adaptive Logic
  generated_reason TEXT, -- "Based on your weak performance in partnership basis..."
  target_questions INTEGER,
  
  -- Completion
  status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, skipped
  completed_at TIMESTAMP,
  performance_score FLOAT, -- 0.0-1.0
  
  -- Timestamps
  assigned_date DATE DEFAULT CURRENT_DATE,
  expires_at DATE
);
```

### **Knowledge State Table** (Topic Mastery)
```sql
CREATE TABLE knowledge_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  
  -- Topic Info
  topic_id VARCHAR(50), -- "partnership_basis"
  topic_name VARCHAR(200), -- "Partnership Basis Calculations"
  exam_part INTEGER, -- 1, 2, or 3
  
  -- IRT Metrics
  ability_estimate FLOAT, -- -3.0 to +3.0 (logit scale)
  proficiency_score FLOAT, -- 0.0 to 1.0 (percentage)
  
  -- Performance Data
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  average_time_seconds INTEGER,
  
  -- Spaced Repetition
  last_practiced DATE,
  next_review_date DATE,
  repetition_interval_days INTEGER DEFAULT 1,
  
  -- Mastery Level
  mastery_level VARCHAR(20), -- novice, intermediate, advanced, expert
  
  -- Timestamps
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints (FastAPI)

### **Chat Endpoints**

#### `POST /api/chat`
Send message to AI mentor (orchestrator routes to agents)

**Request**:
```json
{
  "user_id": "uuid",
  "message": "Explain S-Corporation taxation",
  "conversation_history": [
    {"role": "user", "content": "Previous message..."},
    {"role": "assistant", "content": "Previous response..."}
  ]
}
```

**Response**:
```json
{
  "response": "S-Corporations are pass-through entities...",
  "agent_used": "tax_specialist",
  "citations": [
    {"source": "IRC §1361", "url": "..."},
    {"source": "IRS Pub 334", "page": 23}
  ],
  "follow_up_suggestions": [
    "How is basis calculated?",
    "What are the eligibility requirements?"
  ],
  "latency_ms": 2340
}
```

---

#### `POST /api/chat/practice-question`
Generate adaptive practice question

**Request**:
```json
{
  "user_id": "uuid",
  "topic": "partnership_taxation",
  "difficulty": "medium" // or "adaptive" for AI-selected
}
```

**Response**:
```json
{
  "question_id": "pq_12345",
  "question": "Partner A contributes property with FMV $100k...",
  "options": [
    "A) $80,000",
    "B) $100,000",
    "C) $120,000",
    "D) $0"
  ],
  "correct_answer": 1,
  "explanation": "...",
  "topic": "partnership_basis",
  "difficulty": "medium",
  "irs_citation": "Pub 541, page 12"
}
```

---

### **Performance Endpoints**

#### `GET /api/performance/ready-score`
Get current ReadyScore with confidence interval

**Response**:
```json
{
  "ready_score": 87,
  "confidence_interval": {
    "lower": 79,
    "upper": 95,
    "margin": 8,
    "confidence_level": 0.95
  },
  "questions_answered": 286,
  "accuracy": 0.73,
  "trend": "improving" // improving, stable, declining
}
```

---

#### `GET /api/performance/weak-areas`
Get prioritized list of weak areas

**Response**:
```json
{
  "weak_areas": [
    {
      "topic": "Partnership Basis",
      "proficiency": 0.42,
      "priority": "critical",
      "questions_needed": 35,
      "last_studied": "2025-12-15",
      "recommended_action": "5-minute sprint on this topic"
    },
    {
      "topic": "Circular 230 Ethics",
      "proficiency": 0.58,
      "priority": "high",
      "questions_needed": 20,
      "recommended_action": "Ethics roleplay scenario"
    }
  ]
}
```

---

#### `POST /api/performance/predict-readiness`
Predict when user will be exam-ready

**Request**:
```json
{
  "user_id": "uuid",
  "target_score": 105,
  "exam_part": 1
}
```

**Response**:
```json
{
  "prediction": {
    "target_date": "2025-03-15",
    "days_remaining": 85,
    "confidence": 0.87,
    "assumptions": {
      "questions_per_day": 15,
      "study_days_per_week": 6,
      "current_improvement_rate": 0.3
    }
  },
  "recommended_pace": {
    "questions_per_day": 15,
    "study_minutes_per_day": 45,
    "topics_to_focus": ["Partnership Basis", "Ethics"]
  },
  "risk_assessment": "On track to meet 3-year deadline (expires 2027-06-30)"
}
```

---

### **Mission Endpoints**

#### `GET /api/missions/daily`
Get today's adaptive daily missions

**Response**:
```json
{
  "missions": [
    {
      "id": "mission_123",
      "type": "5_minute_sprint",
      "title": "Partnership Basis Blitz",
      "description": "Answer 10 questions on partnership basis calculations",
      "target_topic": "partnership_basis",
      "difficulty": "medium",
      "estimated_minutes": 5,
      "xp_reward": 150,
      "reason": "You scored 40% on this topic last week - time for focused practice!",
      "status": "pending"
    },
    {
      "id": "mission_124",
      "type": "ethics_scenario",
      "title": "Circular 230 Conflict of Interest",
      "description": "Navigate a client scenario involving potential conflicts",
      "estimated_minutes": 8,
      "xp_reward": 200,
      "status": "pending"
    }
  ],
  "total_xp_available": 650,
  "completion_rate_last_7_days": 0.85
}
```

---

#### `POST /api/missions/complete`
Mark mission as complete and get performance feedback

**Request**:
```json
{
  "mission_id": "mission_123",
  "user_id": "uuid",
  "performance_data": {
    "questions_answered": 10,
    "correct_answers": 7,
    "time_spent_seconds": 320
  }
}
```

**Response**:
```json
{
  "success": true,
  "xp_earned": 150,
  "new_ready_score": 88,
  "feedback": {
    "message": "Great job! You improved 10% on partnership basis compared to last time.",
    "encouragement": "Your confidence interval narrowed from ±10 to ±8 - you're getting more consistent!",
    "next_steps": "Tomorrow's mission will focus on partnership distributions to build on this momentum."
  }
}
```

---

### **RAG (Retrieval-Augmented Generation) Endpoints**

#### `POST /api/rag/search`
Search IRS publications for relevant passages

**Request**:
```json
{
  "query": "S-Corporation shareholder basis increase",
  "sources": ["pub_334", "pub_542", "irc"],
  "max_results": 5
}
```

**Response**:
```json
{
  "results": [
    {
      "source": "IRS Pub 334",
      "page": 23,
      "text": "A shareholder's basis is increased by...",
      "relevance_score": 0.94,
      "citation": "Pub 334 (2024), page 23"
    }
  ]
}
```

---

## 🔐 Security & Rate Limiting

### **Authentication**
- Supabase Auth (JWT tokens)
- Row-Level Security (RLS) policies
- User can only access their own data

### **Rate Limits**
```python
# Per User Limits
CHAT_MESSAGES_PER_HOUR = 60  # 1 per minute
PRACTICE_QUESTIONS_PER_DAY = 200
API_CALLS_PER_MINUTE = 30

# Cost Controls
MAX_TOKENS_PER_REQUEST = 4000
MONTHLY_COST_LIMIT_PER_USER = 5.00  # $5 in OpenAI costs
```

---

## 💰 Cost Estimation

### **Per User Per Month** (Based on 100 active users)

| Component | Usage | Cost |
|-----------|-------|------|
| **OpenAI GPT-4** | 500 messages × $0.03 | $15.00 |
| **OpenAI Embeddings** | 10k queries × $0.0001 | $1.00 |
| **Supabase Pro** | Database + Auth | $0.25 |
| **Vercel Hosting** | API calls | $0.10 |
| **Vector DB (Pinecone)** | 100k queries | $0.50 |
| **Total per user** |  | **$16.85** |

**Total for 100 users**: ~$1,685/month

### **Cost Optimization Strategies**
1. **Cache common questions** (90% hit rate) → Save $13.50/user
2. **Use GPT-3.5 for routing** → Save $0.01/message
3. **Batch embeddings** → Save 50% on embeddings
4. **Free tier hosting** (Vercel/Railway) → Save $10/month

**Optimized cost**: ~$4.50/user/month = **$450/month for 100 users**

---

## 📊 Performance SLA

| Metric | Target | Monitoring |
|--------|--------|------------|
| **Chat Response Time** | < 3 seconds | Sentry + CloudWatch |
| **API Uptime** | 99.9% | UptimeRobot |
| **RAG Search Latency** | < 500ms | Custom logging |
| **Database Query Time** | < 100ms | Supabase Analytics |

---

## 🚀 Deployment Architecture

```
[Frontend - Vercel]
    ↓
[API Gateway - Vercel Edge Functions]
    ↓
[FastAPI Backend - Railway/Render]
    ↓
    ├─→ [Orchestrator Agent]
    │       ↓
    │   ├─→ [Tax Specialist] ──→ [RAG Pipeline] ──→ [Pinecone Vector DB]
    │   ├─→ [Socratic Coach]
    │   └─→ [Data Analyst] ──→ [PostgreSQL Analytics]
    │
    └─→ [Supabase]
        ├─→ [PostgreSQL Database]
        ├─→ [Auth (JWT)]
        └─→ [Real-time subscriptions]
```

---

## 📋 Next Steps

1. ✅ **Review Architecture** (You are here)
2. ⏭️ **Set up Backend Project** (FastAPI boilerplate)
3. ⏭️ **Implement Agent Base Classes**
4. ⏭️ **Build RAG Pipeline** (IRS publications → embeddings)
5. ⏭️ **Create API Endpoints**
6. ⏭️ **Update Frontend** (connect to backend)
7. ⏭️ **Deploy & Test**

---

**Ready to proceed to implementation?**

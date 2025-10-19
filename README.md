# TaxEase AI - Professional Tax Assistant for IndiaTaxEase AI - Minimal MVP



An intelligent, conversational tax-filing assistant designed specifically for Indian taxpayers. Features a modern Next.js frontend, FastAPI backend, and RAG-powered AI using Indian tax knowledge base.A conversational tax-filing assistant with Next.js frontend and FastAPI backend.



## 🎯 Key Features## Quick Start



✅ **Professional Fintech UI** - Modern landing page with hero, features, pricing, and FAQs  ### Backend Setup

✅ **Intelligent RAG System** - Semantic search over Indian tax knowledge base using ChromaDB + Sentence Transformers  

✅ **Smart CSV Upload** - Bank statement parsing with automatic transaction classification  ```bash

✅ **Session Memory** - Persistent conversation history with financial summaries  cd backend

✅ **Indian Tax Focus** - Knowledge base includes Income Tax Act sections, GST, ITR forms, deductions  python3 -m venv venv

✅ **Multi-LLM Support** - OpenAI GPT, Ollama (local), or Mock LLM (demo mode)  source venv/bin/activate  # On Windows: venv\Scripts\activate

✅ **Responsive Design** - Beautiful fintech aesthetic with blue color scheme  pip install -r requirements.txt

✅ **Professional Theme** - Enterprise-grade design, not flashy  python3 init_db.py

uvicorn main:app --reload --port 8000

## 🚀 Quick Start```



### Prerequisites### Frontend Setup

- Python 3.10+

- Node.js 16+```bash

- npmcd frontend

npm install

### Backend Setupnpm run dev

```

```bash

cd backendThen open http://localhost:3000

python3 -m venv venv

source venv/bin/activate  # On Windows: venv\Scripts\activate## Features

pip install -r requirements.txt

python3 init_db.py✅ Modern Next.js + Tailwind UI with chat interface  

uvicorn main:app --reload --port 8000✅ CSV bank statement upload and parsing  

```✅ Auto-classification of transactions (income/expense/deductible)  

✅ Session-based conversation memory  

**First run will initialize the RAG system** (loads Indian tax knowledge base into ChromaDB).✅ SQLite database for data persistence  

✅ Mock LLM mode (no API keys needed for testing)  

### Frontend Setup✅ OpenAI & Ollama support for production use  



```bash## LLM Configuration

cd frontend

npm install**Default (Mock LLM - No setup needed):**

npm run devThe backend includes a smart mock LLM that answers common tax questions based on your uploaded data. Perfect for demos!

```

**For Production (OpenAI):**

Then open **http://localhost:3000**Add to `backend/.env`:

```bash

## 📋 Pages & RoutesOPENAI_API_KEY=sk-your-key-here

OPENAI_MODEL=gpt-3.5-turbo

| Route | Purpose |```

|-------|---------|

| `/` | Professional landing page with features, pricing, FAQs |**For Local/Private (Ollama):**

| `/app-dashboard` | Main chat interface for tax assistant |1. Install Ollama: https://ollama.ai

| `/pricing` | Subscription plans |2. Run: `ollama pull llama3.1`

| `/features` | Detailed feature list |3. Add to `backend/.env`:

```bash

## 🤖 LLM ConfigurationOLLAMA_HOST=http://localhost:11434

OLLAMA_MODEL=llama3.1

### Default: Mock LLM (No setup needed)```

Perfect for demos and testing. Returns responses based on Indian tax knowledge base.

## Testing

```bash

# Set in backend/.env```bash

ENABLE_MOCK_LLM=truecd backend

```python3 test_api.py

```

### Production: OpenAI GPT

```bash## Project Structure

OPENAI_API_KEY=sk-your-key-here

OPENAI_MODEL=gpt-4```

```mumbaiHacks/

├── backend/          # FastAPI backend

### Local: Ollama (Private)│   ├── main.py       # FastAPI app & endpoints

```bash│   ├── db.py         # Database setup

# Install: https://ollama.ai│   ├── models.py     # SQLAlchemy models

# Pull model: ollama pull llama3.1│   ├── llm.py        # LLM integration (OpenAI/Ollama/Mock)

│   ├── utils.py      # CSV parsing & classification

OLLAMA_HOST=http://localhost:11434│   ├── init_db.py    # Database initialization

OLLAMA_MODEL=llama3.1│   └── DATABASE.md   # Database documentation

```└── frontend/         # Next.js + Tailwind

    ├── pages/

**LLM Fallback Chain:** OpenAI → Ollama → Mock LLM    │   └── index.js  # Main chat UI

    └── components/

## 🧠 RAG System        └── SuggestedPrompts.js

```

The RAG (Retrieval-Augmented Generation) system provides accurate Indian tax information:

## Database

- **Vector Database:** ChromaDB with persistent storage

- **Embedding Model:** Sentence Transformers (multilingual)- SQLite (default): `backend/taxease.db`

- **Knowledge Base:** - Tables: sessions, messages, summaries

  - `backend/knowledge/indian_tax_kb.md` - Core tax concepts- Initialize: `python3 init_db.py`

  - `backend/knowledge/indian_tax_details.md` - Detailed compliance rules- Reset: `python3 init_db.py --reset`

- **Search:** Semantic similarity search for relevant tax information

## API Endpoints

**How it works:**

1. User asks a tax question- `POST /upload` - Upload CSV file

2. RAG searches knowledge base for relevant sections- `GET /summary?session_id=<id>` - Get financial summary

3. Retrieved context is passed to LLM- `POST /chat` - Send message and get AI response

4. LLM generates personalized response based on context + user data- `GET /docs` - API documentation (Swagger UI)



## 📊 Project Structure## Sample CSV Format



``````csv

mumbaiHacks/date,description,amount

├── frontend/2025-01-01,Salary Deposit,5000.00

│   ├── pages/2025-01-02,Rent Payment,-1200.00

│   │   ├── index.js           # Landing page (fintech theme)2025-01-05,Medical Pharmacy,-45.50

│   │   ├── app-dashboard.js   # Main chat interface2025-01-10,Grocery Shopping,-120.30

│   │   ├── pricing.js         # Pricing page```

│   │   └── features.js        # Features page

│   ├── components/See `sample_statement.csv` for a complete example.

│   │   ├── Header.js          # Navigation bar

│   │   ├── Footer.js          # Footer with links## Tech Stack

│   │   └── SuggestedPrompts.js

│   └── styles/**Frontend:** Next.js 13, React, Tailwind CSS  

│**Backend:** FastAPI, SQLAlchemy, Pandas  

├── backend/**Database:** SQLite (PostgreSQL ready)  

│   ├── main.py                # FastAPI endpoints**AI:** OpenAI GPT / Ollama / Mock LLM  

│   ├── llm.py                 # LLM integration with RAG

│   ├── rag.py                 # RAG system (ChromaDB + embeddings)---

│   ├── models.py              # SQLAlchemy ORM models

│   ├── schemas.py             # Pydantic request/response schemasBuilt for Mumbai Hacks 2025 🚀

│   ├── db.py                  # Database configuration
│   ├── utils.py               # CSV parsing & classification
│   ├── knowledge/             # Tax knowledge base (markdown)
│   │   ├── indian_tax_kb.md
│   │   └── indian_tax_details.md
│   ├── chroma_db/             # Vector database (auto-created)
│   ├── requirements.txt       # Python dependencies
│   └── taxease.db             # SQLite database
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/upload` | Upload CSV bank statement |
| `GET` | `/summary?session_id=...` | Get financial summary |
| `POST` | `/chat` | Send message, get AI response |
| `GET` | `/docs` | Swagger UI documentation |

## 📝 Sample CSV Format

```csv
date,description,amount
2025-01-01,Salary Deposit,5000.00
2025-01-02,Rent Payment,-1200.00
2025-01-05,Medical Pharmacy,-45.50
2025-01-10,Grocery Shopping,-120.30
```

## 💾 Database Schema

**Sessions** - Conversation sessions  
**Messages** - User and assistant messages (session → messages)  
**Summaries** - Financial summaries (JSON: income, expenses, deductions)  

Default: SQLite (`backend/taxease.db`)  
Production: Configure PostgreSQL via `DATABASE_URL`

## 🧪 Testing

```bash
cd backend
python3 test_api.py
```

## 🎨 Design Highlights

- **Color Scheme:** Professional blue fintech palette (#1e40af, #2563eb)
- **Typography:** Bold headlines, clean body text
- **Responsive:** 2-column desktop, 1-column mobile
- **Components:** Reusable Header/Footer across all pages
- **Theme:** Professional and enterprise-grade (not flashy)

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 12+, React, Tailwind CSS 3+ |
| **Backend** | FastAPI, Uvicorn, SQLAlchemy ORM |
| **Database** | SQLite (dev), PostgreSQL (prod) |
| **RAG** | ChromaDB, Sentence Transformers |
| **AI/LLM** | OpenAI API, Ollama, Mock LLM |
| **Data** | Pandas, CSV parsing |

## ⚙️ Environment Variables

### `backend/.env`
```bash
# Database (optional, defaults to SQLite)
DATABASE_URL=postgresql://user:pass@localhost/taxease

# LLM Configuration
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
ENABLE_MOCK_LLM=true
```

## 🚦 Getting Started Tips

1. **First time?** The backend will auto-initialize RAG on startup (loads knowledge base into ChromaDB)
2. **Testing?** Use Mock LLM mode - no API keys needed
3. **Production?** Set OpenAI API key or deploy Ollama locally
4. **Custom knowledge?** Add markdown files to `backend/knowledge/` and restart

## 📱 Demo Flow

1. Open http://localhost:3000
2. Click "Launch App" to go to chat dashboard
3. Upload `sample_indian_statement.csv`
4. Ask a tax question: "What are my tax deductions?" or "How can I save under Section 80C?"
5. AI responds with personalized advice based on your financial data

## 🔐 Privacy & Security

- All data stored locally in SQLite (default)
- No external data transmission unless using OpenAI
- Can run entirely offline with Ollama
- Mock LLM mode: Zero API calls

## 🤝 Contributing

Built for **Mumbai Hacks 2025** 🇮🇳  
Specialized for Indian taxpayers - income tax, GST, ITR filing guidance

---

**Questions?** Check the knowledge base or API docs at `/docs`

TaxEase AI - Minimal MVP

A conversational tax-filing assistant with Next.js frontend and FastAPI backend.

## Quick Start

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 init_db.py
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000

## Features

✅ Modern Next.js + Tailwind UI with chat interface  
✅ CSV bank statement upload and parsing  
✅ Auto-classification of transactions (income/expense/deductible)  
✅ Session-based conversation memory  
✅ SQLite database for data persistence  
✅ Mock LLM mode (no API keys needed for testing)  
✅ OpenAI & Ollama support for production use  

## LLM Configuration

**Default (Mock LLM - No setup needed):**
The backend includes a smart mock LLM that answers common tax questions based on your uploaded data. Perfect for demos!

**For Production (OpenAI):**
Add to `backend/.env`:
```bash
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
```

**For Local/Private (Ollama):**
1. Install Ollama: https://ollama.ai
2. Run: `ollama pull llama3.1`
3. Add to `backend/.env`:
```bash
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
```

## Testing

```bash
cd backend
python3 test_api.py
```

## Project Structure

```
mumbaiHacks/
├── backend/          # FastAPI backend
│   ├── main.py       # FastAPI app & endpoints
│   ├── db.py         # Database setup
│   ├── models.py     # SQLAlchemy models
│   ├── llm.py        # LLM integration (OpenAI/Ollama/Mock)
│   ├── utils.py      # CSV parsing & classification
│   ├── init_db.py    # Database initialization
│   └── DATABASE.md   # Database documentation
└── frontend/         # Next.js + Tailwind
    ├── pages/
    │   └── index.js  # Main chat UI
    └── components/
        └── SuggestedPrompts.js
```

## Database

- SQLite (default): `backend/taxease.db`
- Tables: sessions, messages, summaries
- Initialize: `python3 init_db.py`
- Reset: `python3 init_db.py --reset`

## API Endpoints

- `POST /upload` - Upload CSV file
- `GET /summary?session_id=<id>` - Get financial summary
- `POST /chat` - Send message and get AI response
- `GET /docs` - API documentation (Swagger UI)

## Sample CSV Format

```csv
date,description,amount
2025-01-01,Salary Deposit,5000.00
2025-01-02,Rent Payment,-1200.00
2025-01-05,Medical Pharmacy,-45.50
2025-01-10,Grocery Shopping,-120.30
```

See `sample_statement.csv` for a complete example.

## Tech Stack

**Frontend:** Next.js 13, React, Tailwind CSS  
**Backend:** FastAPI, SQLAlchemy, Pandas  
**Database:** SQLite (PostgreSQL ready)  
**AI:** OpenAI GPT / Ollama / Mock LLM  

---

Built for Mumbai Hacks 2025 🚀

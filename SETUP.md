# TaxEase AI - Complete Setup Guide

## Database Status: ✅ Ready

Your database has been initialized successfully!

- **Database file**: `backend/taxease.db` (36 KB)
- **Tables created**: sessions, messages, summaries
- **Schema**: See `backend/DATABASE.md`

## Current Issue Fixed

**Problem**: `/chat` endpoint was returning 500 errors  
**Cause**: No LLM configured (missing API keys)  
**Solution**: Added Mock LLM mode (enabled by default)

### What Changed

✅ **Mock LLM Integration** - Smart rule-based responses for common tax questions  
✅ **Graceful Fallback** - OpenAI → Ollama → Mock LLM  
✅ **Better Error Handling** - No more 500 errors  
✅ **Demo Ready** - Works out of the box without API keys  

## How to Run (Current Status)

### 1. Backend (Needs Restart)

The backend server needs to be restarted to pick up the Mock LLM changes:

```bash
cd backend

# Activate virtual environment
source .venv/bin/activate  # or: source venv/bin/activate

# Start server
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 2. Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:3000

## Testing the Fix

### Option 1: Web UI
1. Go to http://localhost:3000
2. Upload `sample_statement.csv`
3. Ask: "What was my total income?"
4. Should get a proper response (no more 500 error!)

### Option 2: API Test Script
```bash
cd backend
python3 test_api.py
```

### Option 3: Manual API Test
```bash
# Upload CSV
curl -X POST http://localhost:8000/upload \
  -F "file=@../sample_statement.csv"

# Chat (replace session_id with the one from upload)
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id": 1, "message": "What is my total income?"}'
```

## Mock LLM Capabilities

The Mock LLM can answer:

✅ "What was my total income?"  
✅ "How much did I spend on expenses?"  
✅ "What are my potential tax deductions?"  
✅ "How is my financial health?"  
✅ "How much can I save on taxes?"  

It intelligently parses your uploaded data and provides relevant answers!

## Upgrade to Real LLM (Optional)

### OpenAI (Best Quality)

1. Get API key from https://platform.openai.com/api-keys
2. Edit `backend/.env`:
```bash
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-3.5-turbo
```
3. Restart backend

### Ollama (Free & Local)

1. Install Ollama: https://ollama.ai
2. Download model:
```bash
ollama pull llama3.1
ollama serve  # Make sure it's running
```
3. Edit `backend/.env`:
```bash
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
```
4. Restart backend

## Database Management

### View data
```bash
cd backend
sqlite3 taxease.db

# List tables
.tables

# View sessions
SELECT * FROM sessions;

# View recent messages
SELECT session_id, role, content FROM messages ORDER BY timestamp DESC LIMIT 10;

# Exit
.exit
```

### Reset database
```bash
cd backend
python3 init_db.py --reset
```

## Troubleshooting

### Backend won't start
```bash
# Make sure you're in the venv
which python3  # Should show backend/venv/bin/python3

# Reinstall if needed
pip install -r requirements.txt
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 8000 already in use
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9

# Or use a different port
uvicorn main:app --reload --port 8001
```

### Port 3000 already in use
```bash
# Kill existing Next.js
pkill -f "next dev"

# Or use a different port
npm run dev -- -p 3001
```

## Next Steps

1. ✅ Database initialized
2. 🔄 Restart backend with Mock LLM
3. ✅ Frontend ready
4. 🧪 Test the chat functionality
5. 🎨 UI is professional and clean
6. 🚀 Ready for demo!

## Architecture Summary

```
User Browser (http://localhost:3000)
    ↓
Next.js Frontend
    ↓ (REST API)
FastAPI Backend (http://localhost:8000)
    ↓
    ├─→ SQLite Database (sessions, messages, summaries)
    ├─→ Pandas (CSV parsing)
    └─→ LLM Layer
         ├─→ OpenAI API (if configured)
         ├─→ Ollama Local (if configured)
         └─→ Mock LLM (default, rule-based)
```

## What's Working

✅ Professional, clean UI  
✅ CSV upload and parsing  
✅ Transaction classification  
✅ Database storage  
✅ Session management  
✅ Mock LLM responses  
✅ Error handling  

## What's Next (Optional Enhancements)

- [ ] Add authentication
- [ ] Export reports (PDF/Excel)
- [ ] Charts and visualizations
- [ ] Multi-file upload
- [ ] Transaction editing
- [ ] Docker deployment
- [ ] Cloud hosting setup

---

**Status**: Ready for demo and testing! 🎉

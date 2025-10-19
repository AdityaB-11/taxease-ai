TaxEase AI - Backend

FastAPI backend for MVP.

## Setup

1. Create a virtualenv and install requirements:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Configure environment (optional):

```bash
cp .env.example .env
# Edit .env to add OPENAI_API_KEY or configure Ollama
```

3. Initialize database:

```bash
python init_db.py
```

4. Run the server:

```bash
uvicorn main:app --reload --port 8000
```

## Endpoints

- **POST /upload** : Upload CSV file (multipart). Params: `session_id` (optional)
- **GET /summary?session_id=...** : Get financial summary for session
- **POST /chat** : Send message `{ session_id, message }`

## Database

- **SQLite** (default): `taxease.db` 
- Tables: `sessions`, `messages`, `summaries`
- See `DATABASE.md` for schema details

## Environment Variables

- `OPENAI_API_KEY` (optional) — Use OpenAI for LLM responses
- `OPENAI_MODEL` (optional) — Default "gpt-3.5-turbo"
- `OLLAMA_HOST` (optional) — Use local Ollama (e.g., http://localhost:11434)
- `OLLAMA_MODEL` (optional) — Default "llama3.1"
- `ENABLE_MOCK_LLM` (default: true) — Enable mock LLM for demo/testing without API keys
- `DATABASE_URL` (optional) — Default sqlite:///./taxease.db

### LLM Configuration Modes

**1. Mock LLM (Default - No API keys needed)**
```bash
ENABLE_MOCK_LLM=true
```
Uses rule-based responses for common tax questions. Perfect for demos and testing.

**2. OpenAI (Best quality)**
```bash
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo
```

**3. Ollama (Local, private)**
```bash
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
```

The system tries OpenAI → Ollama → Mock LLM (if enabled) in that order.

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc


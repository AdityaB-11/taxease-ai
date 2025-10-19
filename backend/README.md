TaxEase AI - Backend

FastAPI backend for MVP.

Endpoints:
- POST /upload : multipart file upload (CSV). Params: session_id (optional)
- GET /summary?session_id=... : returns parsed summary
- POST /chat : { session_id, message }

Run:

1. Create a virtualenv and install requirements:

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

2. Run the server:

uvicorn main:app --reload --port 8000

Environment variables:
- OPENAI_API_KEY (optional) — if set, OpenAI will be used for LLM replies.
- OPENAI_MODEL (optional) — default "gpt-3.5-turbo".
- DATABASE_URL (optional) — default sqlite:///./taxease.db

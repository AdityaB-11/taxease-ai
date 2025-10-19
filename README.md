TaxEase AI - Minimal MVP

Folders:
- backend/ : FastAPI backend
- frontend/ : Next.js + Tailwind frontend

Run backend:

cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

Run frontend:

cd frontend
npm install
npm run dev

Notes:
- Set OPENAI_API_KEY in environment to use OpenAI; otherwise configure OLLAMA_HOST to use local Llama.
- Frontend expects backend at http://localhost:8000

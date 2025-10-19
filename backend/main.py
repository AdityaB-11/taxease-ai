import json
import os
from dotenv import load_dotenv

# Load environment variables FIRST, before importing anything else that needs them
load_dotenv()

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import db, models, utils, llm
from schemas import UploadResponse, ChatRequest, ChatResponse

app = FastAPI(title="TaxEase AI Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# initialize DB
models.Base.metadata.create_all(bind=db.engine)


@app.post("/upload", response_model=UploadResponse)
async def upload_csv(file: UploadFile = File(...), session_id: int = Form(None)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
    contents = await file.read()
    try:
        from io import BytesIO, StringIO
        # try to decode
        text = None
        try:
            text = contents.decode('utf-8')
            buf = StringIO(text)
        except Exception:
            buf = BytesIO(contents)
        summary = utils.parse_csv(buf)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse CSV: {e}")

    # store summary in DB
    db_session = next(db.get_db())
    if session_id is None:
        s = models.Session()
        db_session.add(s)
        db_session.commit()
        db_session.refresh(s)
        session_id = s.id
    else:
        s = db_session.query(models.Session).get(session_id)
        if s is None:
            s = models.Session()
            db_session.add(s)
            db_session.commit()
            db_session.refresh(s)
            session_id = s.id
    # store summary
    import datetime
    summ = db_session.query(models.Summary).filter(models.Summary.session_id == session_id).first()
    if summ is None:
        summ = models.Summary(session_id=session_id, data=json.dumps(summary))
        db_session.add(summ)
    else:
        summ.data = json.dumps(summary)
    db_session.commit()

    return {
        "total_income": summary["total_income"],
        "total_expenses": summary["total_expenses"],
        "potential_deductions": summary["potential_deductions"],
        "transactions": summary["transactions"],
        "session_id": session_id,
    }


@app.get("/summary")
async def get_summary(session_id: int):
    db_session = next(db.get_db())
    summ = db_session.query(models.Summary).filter(models.Summary.session_id == session_id).first()
    if not summ:
        raise HTTPException(status_code=404, detail="Summary not found for session")
    return json.loads(summ.data)


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    db_session = next(db.get_db())
    # ensure session
    if req.session_id is None:
        s = models.Session()
        db_session.add(s)
        db_session.commit()
        db_session.refresh(s)
        session_id = s.id
    else:
        session_id = req.session_id
        s = db_session.query(models.Session).get(session_id)
        if s is None:
            s = models.Session()
            db_session.add(s)
            db_session.commit()
            db_session.refresh(s)
            session_id = s.id

    # save user message
    msg = models.Message(session_id=session_id, role='user', content=req.message)
    db_session.add(msg)
    db_session.commit()

    # retrieve summary if exists
    summ = db_session.query(models.Summary).filter(models.Summary.session_id == session_id).first()
    summary_text = "No uploaded data available."
    if summ:
        summary_text = summ.data

    system_prompt = """You are TaxEase AI, an expert Indian tax assistant specializing in Income Tax, GST, and financial planning. 
    
    Your knowledge includes:
    - Indian Income Tax Act (Sections 80C, 80D, 24, etc.)
    - GST regulations
    - ITR forms and filing procedures
    - Tax-saving investments (PPF, ELSS, NPS, etc.)
    - Deductions and exemptions
    
    Always provide amounts in Indian Rupees (₹). Be helpful, accurate, and suggest legitimate tax-saving strategies. 
    Recommend consulting a CA for complex cases."""
    
    prompt = f"Session summary: {summary_text}\n\nUser question: {req.message}\n\nProvide a helpful answer based on the user's financial data and Indian tax regulations. Include specific section numbers (80C, 80D, etc.) when relevant."

    try:
        reply = llm.ask_llm(prompt, system=system_prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    # save assistant message
    amsg = models.Message(session_id=session_id, role='assistant', content=reply)
    db_session.add(amsg)
    db_session.commit()

    return {"reply": reply, "session_id": session_id}

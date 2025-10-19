from pydantic import BaseModel
from typing import List, Optional, Any

class ClassifiedTransaction(BaseModel):
    date: Optional[str]
    description: Optional[str]
    amount: float
    category: str

class UploadResponse(BaseModel):
    total_income: float
    total_expenses: float
    potential_deductions: float
    transactions: List[ClassifiedTransaction]
    session_id: int

class ChatRequest(BaseModel):
    session_id: Optional[int]
    message: str

class ChatResponse(BaseModel):
    reply: str
    session_id: int

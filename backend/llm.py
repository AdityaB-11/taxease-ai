import os
import openai
import requests
from typing import Optional
import json
import re

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
OLLAMA_HOST = os.getenv("OLLAMA_HOST")  # e.g., http://localhost:11434
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1")
ENABLE_MOCK_LLM = os.getenv("ENABLE_MOCK_LLM", "true").lower() == "true"

if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY


def mock_llm_response(prompt: str, system: Optional[str] = None) -> str:
    """Enhanced mock LLM for Indian tax context"""
    
    # Extract summary data from prompt
    summary_match = re.search(r'Session summary: ({.*?})\n', prompt, re.DOTALL)
    summary_data = {}
    if summary_match:
        try:
            summary_data = json.loads(summary_match.group(1))
        except:
            pass
    
    user_q = prompt.lower()
    
    # Indian tax-specific responses
    if "income" in user_q and ("total" in user_q or "how much" in user_q):
        total_income = summary_data.get("total_income", 0)
        return f"Based on your uploaded statement, your total income is ₹{total_income:.2f}.\n\n💡 Tax Tip: For FY 2024-25, income up to ₹3 lakhs is tax-free under the new tax regime. Consider Section 80C investments (up to ₹1.5 lakhs) for additional tax savings under the old regime."
    
    elif "expense" in user_q or "spending" in user_q:
        total_expenses = summary_data.get("total_expenses", 0)
        return f"Your total expenses amount to ₹{total_expenses:.2f}.\n\n💡 Tip: Keep all bills for deductible expenses like medical insurance, home loan interest, and education fees to maximize tax savings."
    
    elif "80c" in user_q:
        return "Section 80C allows deduction up to ₹1.5 lakhs for:\n• LIC premiums\n• EPF/PPF contributions\n• ELSS mutual funds\n• NSC\n• Home loan principal\n• Tuition fees (2 children)\n• Sukanya Samriddhi Yojana\n\nThis can save you up to ₹46,800 in taxes (at 30% slab)!"
    
    elif "80d" in user_q or "health insurance" in user_q or "medical" in user_q:
        deductions = summary_data.get("potential_deductions", 0)
        return f"I found potential medical/health deductions totaling ₹{deductions:.2f} in your transactions.\n\nSection 80D allows:\n• Self/family health insurance: ₹25,000\n• Parents (below 60): ₹25,000\n• Parents (above 60): ₹50,000\n\nMax savings: Up to ₹1 lakh deduction!"
    
    elif "deduction" in user_q or ("tax" in user_q and "save" in user_q):
        deductions = summary_data.get("potential_deductions", 0)
        total_income = summary_data.get("total_income", 0)
        return f"I found potential tax deductions totaling ₹{deductions:.2f} in your transactions.\n\nKey deduction sections for Indians:\n• 80C: ₹1.5L (LIC, PPF, ELSS)\n• 80D: ₹1L (Health insurance)\n• 80E: Unlimited (Education loan interest)\n• 24: ₹2L (Home loan interest)\n\nWith ₹{total_income:.2f} income, these deductions could save you significant tax!"
    
    elif "gst" in user_q:
        return "GST (Goods & Services Tax) rates in India:\n• 0%: Essential items\n• 5%: Household necessities\n• 12%: Processed foods\n• 18%: Most goods & services\n• 28%: Luxury items\n\nGST registration mandatory if turnover > ₹40 lakhs (goods) or ₹20 lakhs (services)."
    
    elif "itr" in user_q or "file" in user_q or "return" in user_q:
        return "ITR filing for Indian taxpayers:\n\n📋 Common Forms:\n• ITR-1 (Sahaj): Salary < ₹50L, one house\n• ITR-2: Multiple properties, capital gains\n• ITR-3: Business income\n• ITR-4 (Sugam): Presumptive taxation\n\n📅 Deadline: July 31 (regular)\nLate filing: Penalty up to ₹5,000\n\nFile online at: incometaxindia.gov.in"
    
    elif "slab" in user_q or "rate" in user_q:
        total_income = summary_data.get("total_income", 0)
        return f"With income of ₹{total_income:.2f}, your tax calculation:\n\n📊 New Tax Regime (FY 24-25):\n• ₹0-3L: Nil\n• ₹3-6L: 5%\n• ₹6-9L: 10%\n• ₹9-12L: 15%\n• ₹12-15L: 20%\n• Above ₹15L: 30%\n\n💡 Tip: Compare with old regime if you have deductions!"
    
    elif any(word in user_q for word in ["health", "financial", "doing"]):
        total_income = summary_data.get("total_income", 0)
        total_expenses = summary_data.get("total_expenses", 0)
        savings_rate = ((total_income - total_expenses) / total_income * 100) if total_income > 0 else 0
        return f"Your financial health looks {'excellent' if savings_rate > 30 else 'good' if savings_rate > 20 else 'moderate'}! 💪\n\nSavings rate: {savings_rate:.1f}%\nIncome: ₹{total_income:.2f}\nExpenses: ₹{total_expenses:.2f}\n\n💡 Indian tax saving tip: Invest your savings in tax-saving instruments like PPF, ELSS, or NPS to reduce taxable income!"
    
    elif "how much" in user_q or "what" in user_q or "summary" in user_q:
        total_income = summary_data.get("total_income", 0)
        total_expenses = summary_data.get("total_expenses", 0)
        deductions = summary_data.get("potential_deductions", 0)
        net = total_income - total_expenses
        return f"📊 Your Financial Summary:\n\n• Total Income: ₹{total_income:.2f}\n• Total Expenses: ₹{total_expenses:.2f}\n• Potential Deductions: ₹{deductions:.2f}\n• Net Savings: ₹{net:.2f}\n\n💡 With ₹{deductions:.2f} in deductible expenses, you could save up to ₹{deductions * 0.3:.2f} in taxes (at 30% slab)!"
    
    else:
        # Generic helpful response for Indian context
        return "Namaste! I'm your Indian tax assistant. I can help you with:\n\n• Income tax calculations & slabs\n• Section 80C, 80D deductions\n• GST information\n• ITR filing guidance\n• Tax-saving investment options\n• Financial health analysis\n\nUpload your bank statement or ask me any tax-related question! 🇮🇳"


def ask_llm_with_rag(prompt: str, system: Optional[str] = None, use_rag: bool = True) -> str:
    """Enhanced LLM with RAG for Indian tax context"""
    
    # Add RAG context if enabled
    rag_context = ""
    if use_rag:
        try:
            from rag import initialize_rag
            rag = initialize_rag()
            rag_context = rag.get_context_for_query(prompt, max_chunks=3)
            
            # If using mock LLM AND RAG has good results, prioritize RAG content
            # Don't prepend RAG context to prompt for mock LLM (causes keyword conflicts)
            # Instead, use RAG directly
            if ENABLE_MOCK_LLM and not OPENAI_API_KEY and not OLLAMA_HOST:
                # Return RAG results directly for better accuracy
                return format_rag_response_with_summary(rag_context, prompt)
            
            # For real LLMs, enhance prompt with RAG context
            prompt = f"{rag_context}\n\nBased on the above tax information and the user's data, {prompt}"
        except Exception as e:
            print(f"RAG error: {e}")
            # Continue without RAG
    
    # Try OpenAI
    if OPENAI_API_KEY:
        try:
            messages = []
            if system:
                messages.append({"role": "system", "content": system})
            messages.append({"role": "user", "content": prompt})
            resp = openai.ChatCompletion.create(model=OPENAI_MODEL, messages=messages, max_tokens=800)
            return resp.choices[0].message.content
        except Exception as e:
            print(f"OpenAI error: {e}")

    # Try Ollama
    if OLLAMA_HOST:
        try:
            url = f"{OLLAMA_HOST}/api/generate"
            
            # Construct full prompt with system message for Ollama
            full_prompt = prompt
            if system:
                full_prompt = f"{system}\n\n{prompt}"
            
            payload = {
                "model": OLLAMA_MODEL,
                "prompt": full_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                }
            }
            r = requests.post(url, json=payload, timeout=60)
            r.raise_for_status()
            data = r.json()
            
            # Handle Ollama response format
            if isinstance(data, dict):
                if "response" in data:
                    return data["response"]
                elif "text" in data:
                    return data["text"]
            return str(data)
        except Exception as e:
            print(f"Ollama error: {e}")

    # Use mock LLM as fallback
    if ENABLE_MOCK_LLM:
        return mock_llm_response(prompt, system)
    
    raise RuntimeError("No LLM configured. Set OPENAI_API_KEY or OLLAMA_HOST environment variable, or enable ENABLE_MOCK_LLM=true for demo mode.")


def format_rag_response_with_summary(rag_context: str, user_question: str) -> str:
    """Format RAG context into a helpful response when using mock LLM"""
    # Extract just the relevant information from RAG without keyword matching issues
    response = f"Based on the Indian Tax Knowledge Base:\n\n{rag_context}"
    
    # Add a relevant tip based on the question
    if any(word in user_question.lower() for word in ["save", "deduction", "investment"]):
        response += "\n\n💡 Tax Tip: Consider consulting with a Chartered Accountant for personalized tax planning strategies."
    elif any(word in user_question.lower() for word in ["file", "return", "itr"]):
        response += "\n\n📝 Note: Ensure all required documents are ready before filing your ITR."
    elif any(word in user_question.lower() for word in ["gst", "business"]):
        response += "\n\n📊 For business-related queries, maintaining detailed records is crucial for tax compliance."
    
    return response


def ask_llm(prompt: str, system: Optional[str] = None) -> str:
    """Legacy function - calls enhanced version with RAG"""
    return ask_llm_with_rag(prompt, system, use_rag=True)


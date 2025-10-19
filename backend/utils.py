import pandas as pd
from typing import List, Dict

# Indian context keywords
INCOME_KEYWORDS = [
    "salary", "payroll", "income", "credit", "bonus", "incentive",
    "freelance", "consulting", "interest", "dividend", "capital gain",
    "professional fees", "commission", "rental income", "business income"
]

EXPENSE_KEYWORDS = [
    "rent", "grocery", "groceries", "swiggy", "zomato", "uber", "ola",
    "dining", "restaurant", "shopping", "flipkart", "amazon", "myntra",
    "transfer", "payment", "bill", "electricity", "water", "gas",
    "phone", "mobile", "internet", "broadband", "recharge",
    "fuel", "petrol", "diesel", "maintenance", "repair"
]

# Indian tax deductible categories (Section 80C, 80D, etc.)
DEDUCTIBLE_KEYWORDS = [
    # Medical - Section 80D
    "medical", "doctor", "hospital", "pharmacy", "apollo", "fortis",
    "health insurance", "mediclaim", "star health",
    
    # Insurance - Section 80C
    "lic", "life insurance", "sbi life", "hdfc life", "icici prudential",
    
    # Investments - Section 80C
    "ppf", "epf", "pf", "provident fund", "elss", "mutual fund",
    "nsc", "national savings", "tax saver", "sukanya samriddhi",
    
    # Donations - Section 80G
    "charity", "donation", "charitable", "ngo", "relief fund",
    "pm cares", "national defence fund",
    
    # Education - Section 80E
    "tuition", "school fees", "college fees", "education loan",
    
    # Home Loan - Section 24
    "home loan", "housing loan", "mortgage interest", "hdfc home",
    "sbi home loan", "icici home loan",
    
    # NPS - Section 80CCD(1B)
    "nps", "national pension", "pension scheme"
]


def classify_description(desc: str, amount: float) -> str:
    """Classify transaction for Indian tax context"""
    if not isinstance(desc, str):
        desc = ""
    txt = desc.lower()
    
    # Check for income keywords
    for k in INCOME_KEYWORDS:
        if k in txt:
            return "income"
    
    # Check for deductible keywords (important for Indian tax saving)
    for k in DEDUCTIBLE_KEYWORDS:
        if k in txt:
            return "deductible"
    
    # Check for expense keywords
    for k in EXPENSE_KEYWORDS:
        if k in txt:
            return "expense"
    
    # Fallback by amount sign
    return "income" if amount > 0 else "expense"


def parse_csv(file_path_or_buffer) -> Dict:
    # read CSV with pandas, try to infer columns
    df = pd.read_csv(file_path_or_buffer)
    # Normalize column names
    cols = {c.lower(): c for c in df.columns}
    # Try to find date, desc, amount
    date_col = None
    desc_col = None
    amount_col = None
    for k, v in cols.items():
        if "date" in k:
            date_col = v
        if any(x in k for x in ["desc", "narr", "description", "details"]):
            desc_col = v
        if any(x in k for x in ["amount", "amt", "credit", "debit"]):
            amount_col = v
    if amount_col is None:
        # pick the first numeric column
        numeric_cols = df.select_dtypes(include=['number']).columns
        if len(numeric_cols) > 0:
            amount_col = numeric_cols[0]
        else:
            raise ValueError("Could not find amount column in CSV")

    transactions = []
    total_income = 0.0
    total_expenses = 0.0
    potential_deductions = 0.0

    for _, row in df.iterrows():
        amount = float(row[amount_col])
        desc = row[desc_col] if desc_col in row else ""
        date = row[date_col] if date_col in row else None
        category = classify_description(str(desc), amount)
        if category == "income":
            total_income += amount
        elif category == "expense":
            total_expenses += abs(amount)
        elif category == "deductible":
            potential_deductions += abs(amount)
            total_expenses += abs(amount)
        transactions.append({
            "date": str(date) if date is not None else None,
            "description": str(desc),
            "amount": float(amount),
            "category": category,
        })

    summary = {
        "total_income": total_income,
        "total_expenses": total_expenses,
        "potential_deductions": potential_deductions,
        "transactions": transactions,
    }
    return summary

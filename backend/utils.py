import pandas as pd
from typing import List, Dict

INCOME_KEYWORDS = ["salary", "payroll", "payroll deposit", "income", "credit"]
EXPENSE_KEYWORDS = ["rent", "grocery", "groceries", "uber", "lyft", "dining", "restaurant", "shopping", "transfer", "payment", "bill"]
DEDUCTIBLE_KEYWORDS = ["medical", "doctor", "hospital", "pharmacy", "charity", "donation", "charitable"]


def classify_description(desc: str, amount: float) -> str:
    if not isinstance(desc, str):
        desc = ""
    txt = desc.lower()
    for k in INCOME_KEYWORDS:
        if k in txt:
            return "income"
    for k in DEDUCTIBLE_KEYWORDS:
        if k in txt:
            return "deductible"
    for k in EXPENSE_KEYWORDS:
        if k in txt:
            return "expense"
    # fallback by amount sign: positive income, negative expense
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

#!/usr/bin/env python3
"""
Quick test script for the backend
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_upload():
    """Test CSV upload"""
    print("Testing CSV upload...")
    
    # Create a simple CSV
    csv_content = """date,description,amount
2025-01-01,Salary Deposit,5000
2025-01-02,Rent Payment,-1200
2025-01-05,Medical Pharmacy,-45
2025-01-10,Grocery Shopping,-120
"""
    
    files = {'file': ('test.csv', csv_content, 'text/csv')}
    response = requests.post(f"{BASE_URL}/upload", files=files)
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Upload successful!")
        print(f"   Session ID: {data['session_id']}")
        print(f"   Income: ${data['total_income']}")
        print(f"   Expenses: ${data['total_expenses']}")
        print(f"   Deductions: ${data['potential_deductions']}")
        return data['session_id']
    else:
        print(f"❌ Upload failed: {response.status_code}")
        print(response.text)
        return None

def test_chat(session_id):
    """Test chat endpoint"""
    print("\nTesting chat...")
    
    questions = [
        "What was my total income?",
        "How much did I spend on expenses?",
        "What are my potential tax deductions?",
    ]
    
    for q in questions:
        print(f"\nQ: {q}")
        payload = {"session_id": session_id, "message": q}
        response = requests.post(f"{BASE_URL}/chat", json=payload)
        
        if response.status_code == 200:
            data = response.json()
            print(f"A: {data['reply']}")
        else:
            print(f"❌ Error: {response.status_code}")
            print(response.text)

def test_summary(session_id):
    """Test summary endpoint"""
    print(f"\nTesting summary retrieval for session {session_id}...")
    
    response = requests.get(f"{BASE_URL}/summary?session_id={session_id}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Summary retrieved!")
        print(f"   Transactions: {len(data['transactions'])}")
    else:
        print(f"❌ Failed: {response.status_code}")

if __name__ == "__main__":
    print("🧪 TaxEase Backend Test Suite\n")
    print("Make sure the backend is running on http://localhost:8000\n")
    
    try:
        # Test health
        response = requests.get(f"{BASE_URL}/docs")
        if response.status_code != 200:
            print("❌ Backend doesn't seem to be running!")
            exit(1)
        
        session_id = test_upload()
        
        if session_id:
            test_summary(session_id)
            test_chat(session_id)
            
        print("\n✅ All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend. Is it running on port 8000?")
        print("   Run: uvicorn main:app --reload --port 8000")

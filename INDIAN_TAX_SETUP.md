# TaxEase AI - Indian Tax Setup Guide

## 🇮🇳 Indian Tax Configuration

### 1. Install Ollama (Local LLM)

Ollama is already installed. Let's pull the Llama 3.1 model:

```bash
# Pull the model (8GB download)
ollama pull llama3.1

# Or use the smaller 7B model (4GB)
ollama pull llama3.1:7b

# Start Ollama server
ollama serve
```

**Verify it's working:**
```bash
ollama run llama3.1 "What is Section 80C in India?"
```

### 2. Install RAG Dependencies

```bash
cd backend
source .venv/bin/activate  # or: source venv/bin/activate
pip install -r requirements.txt
```

This installs:
- ChromaDB (vector database)
- Sentence Transformers (embeddings)
- LangChain (RAG framework)

### 3. Initialize RAG Knowledge Base

```bash
cd backend
python3 rag.py
```

This will:
- Load Indian tax knowledge files
- Create vector embeddings
- Store in ChromaDB
- Test with sample queries

### 4. Update Backend Configuration

Edit `backend/.env`:

```bash
# Enable Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1

# Enable RAG
ENABLE_RAG=true

# Database
DATABASE_URL=sqlite:///./taxease.db

# Optional: Disable mock LLM when using real LLM
ENABLE_MOCK_LLM=false
```

### 5. Test the System

```bash
# Terminal 1 - Start Ollama
ollama serve

# Terminal 2 - Start Backend
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 3 - Start Frontend
cd frontend
npm run dev
```

**Test Questions:**
- "What are the income tax slabs in India?"
- "How can I save tax under Section 80C?"
- "What is the GST rate on services?"
- "When is the ITR filing deadline?"
- "What deductions can I claim for LIC premiums?"

---

## 🎯 Indian Tax Features

### Transaction Classification

The system now recognizes Indian-specific transactions:

**Income:**
- Salary, bonus, freelance
- Interest, dividends
- Rental income

**Deductible (Tax-saving):**
- LIC, health insurance (80D)
- PPF, EPF, ELSS (80C)
- Home loan interest (24)
- NPS contributions (80CCD)
- Education fees, donations (80G)

**Expenses:**
- Rent, utilities
- Indian food delivery (Swiggy, Zomato)
- Indian ride-sharing (Uber, Ola)
- Shopping (Flipkart, Amazon)

### Knowledge Base

The RAG system includes comprehensive Indian tax information:

**Income Tax:**
- Tax slabs (New vs Old regime)
- Section 80C deductions
- Section 80D (health insurance)
- Section 24 (home loan)
- Section 80E (education loan)
- ITR forms and filing

**GST:**
- GST rates (0%, 5%, 12%, 18%, 28%)
- Registration requirements
- Input tax credit
- Filing deadlines

**Investment Options:**
- PPF, EPF, NPS
- ELSS mutual funds
- Tax-saver FDs
- Life insurance

---

## 📊 RAG System Architecture

```
User Query
    ↓
Sentence Transformer (Embedding)
    ↓
ChromaDB (Vector Search)
    ↓
Top 3 Relevant Chunks
    ↓
Context + Query → Ollama/OpenAI
    ↓
Enhanced Response
```

### How RAG Works

1. **Indexing** (one-time):
   - Load knowledge base documents
   - Split into chunks (500 chars)
   - Create embeddings using multilingual model
   - Store in ChromaDB vector database

2. **Query** (runtime):
   - User asks question
   - Convert to embedding
   - Find similar chunks (cosine similarity)
   - Inject context into LLM prompt
   - Get enhanced response

### Benefits

✅ **Accurate**: Grounded in Indian tax laws  
✅ **Up-to-date**: Easy to update knowledge base  
✅ **Multilingual**: Supports Hindi queries  
✅ **Efficient**: Fast vector search  
✅ **Offline**: Works with local Ollama  

---

## 🔧 Advanced Configuration

### Use Different Embedding Model

Edit `backend/rag.py`:

```python
# For English only (faster)
self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# For multilingual (Hindi support)
self.embedding_model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
```

### Add More Tax Knowledge

Create new .md files in `backend/knowledge/`:

```bash
backend/knowledge/
├── indian_tax_kb.md          # Core tax info
├── indian_tax_details.md     # Detailed sections
├── gst_guide.md              # Your custom GST guide
└── itr_filing.md             # ITR filing steps
```

Then rebuild:
```bash
python3 rag.py
```

### Use OpenAI Instead

For best quality responses:

```bash
# In .env
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4  # or gpt-3.5-turbo
```

OpenAI will be tried first, with Ollama as fallback.

---

## 🧪 Testing

### Test RAG System
```bash
cd backend
python3 rag.py
```

### Test Backend API
```bash
cd backend
python3 test_api.py
```

### Test Ollama
```bash
# Test model directly
ollama run llama3.1 "Explain Section 80C deductions in India"

# Test API endpoint
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.1",
  "prompt": "What is GST in India?",
  "stream": false
}'
```

---

## 📝 Sample Indian CSV

Use `sample_indian_statement.csv`:
- Salary from Indian company
- LIC, health insurance premiums
- PPF, ELSS investments
- Home loan EMI
- Tuition fees
- Donations
- Indian food delivery, shopping

---

## 🚀 Performance Tips

### Ollama Optimization

```bash
# Use GPU if available
OLLAMA_NUM_GPU=1 ollama serve

# Adjust context window
ollama run llama3.1 --context-length 4096
```

### RAG Optimization

In `rag.py`, adjust:
- `chunk_size`: 500 (smaller = more precise)
- `n_results`: 3 (more = more context)
- `overlap`: 50 (prevents context loss)

---

## 🐛 Troubleshooting

### Ollama Not Responding

```bash
# Check if running
pgrep ollama

# Restart
pkill ollama
ollama serve
```

### RAG Errors

```bash
# Clear and rebuild
cd backend
rm -rf chroma_db/
python3 rag.py
```

### ChromaDB Issues

```bash
# Install specific version
pip install chromadb==0.4.18
```

---

## 🎉 You're Ready!

Your Indian tax assistant now has:

✅ Ollama LLM (local, private)  
✅ RAG system (accurate Indian tax info)  
✅ Indian transaction classification  
✅ Rupee (₹) formatting  
✅ Section 80C, 80D, GST knowledge  
✅ ITR filing guidance  

Start the app and upload `sample_indian_statement.csv` to test!

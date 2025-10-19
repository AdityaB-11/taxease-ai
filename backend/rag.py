"""
RAG System for Indian Tax Knowledge Base
Uses ChromaDB + Sentence Transformers for semantic search
"""
import os
from typing import List, Dict
from sentence_transformers import SentenceTransformer
import chromadb
import re

class IndianTaxRAG:
    def __init__(self, knowledge_dir: str = "./knowledge", collection_name: str = "indian_tax_kb"):
        """Initialize RAG system with ChromaDB and sentence transformers"""
        self.knowledge_dir = knowledge_dir
        self.collection_name = collection_name
        
        # Initialize embedding model (multilingual for Hindi support)
        print("Loading embedding model...")
        self.embedding_model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-mpnet-base-v2')
        
        # Initialize ChromaDB with persistent client (new API)
        print("Initializing ChromaDB...")
        try:
            # Try new ChromaDB API first (v0.4+)
            self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
        except (AttributeError, TypeError):
            # Fallback to older API if needed
            try:
                from chromadb.config import Settings
                self.chroma_client = chromadb.Client(Settings(
                    chroma_db_impl="duckdb+parquet",
                    persist_directory="./chroma_db"
                ))
            except Exception as e:
                print(f"Warning: Falling back to in-memory ChromaDB: {e}")
                self.chroma_client = chromadb.Client()
        
        # Get or create collection
        try:
            self.collection = self.chroma_client.get_collection(name=collection_name)
            print(f"Loaded existing collection: {collection_name}")
        except:
            self.collection = self.chroma_client.create_collection(
                name=collection_name,
                metadata={"description": "Indian Tax Knowledge Base"}
            )
            print(f"Created new collection: {collection_name}")
            self._load_knowledge_base()
    
    def _chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """Split text into overlapping chunks"""
        # Split by paragraphs first
        paragraphs = text.split('\n\n')
        chunks = []
        current_chunk = ""
        
        for para in paragraphs:
            if len(current_chunk) + len(para) < chunk_size:
                current_chunk += para + "\n\n"
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = para + "\n\n"
        
        if current_chunk:
            chunks.append(current_chunk.strip())
        
        return chunks
    
    def _load_knowledge_base(self):
        """Load all markdown files from knowledge directory"""
        if not os.path.exists(self.knowledge_dir):
            print(f"Warning: Knowledge directory {self.knowledge_dir} not found")
            return
        
        documents = []
        metadatas = []
        ids = []
        
        for filename in os.listdir(self.knowledge_dir):
            if filename.endswith('.md'):
                filepath = os.path.join(self.knowledge_dir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Chunk the document
                chunks = self._chunk_text(content)
                
                for i, chunk in enumerate(chunks):
                    documents.append(chunk)
                    metadatas.append({
                        "source": filename,
                        "chunk_id": i,
                        "type": "tax_knowledge"
                    })
                    ids.append(f"{filename}_{i}")
        
        if documents:
            print(f"Loading {len(documents)} chunks into vector database...")
            # Generate embeddings
            embeddings = self.embedding_model.encode(documents).tolist()
            
            # Add to ChromaDB
            self.collection.add(
                embeddings=embeddings,
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            print(f"✅ Loaded {len(documents)} chunks successfully!")
        else:
            print("No knowledge base documents found")
    
    def search(self, query: str, n_results: int = 3) -> List[Dict]:
        """Search for relevant chunks based on query"""
        # Generate query embedding
        query_embedding = self.embedding_model.encode([query])[0].tolist()
        
        # Search in ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        # Format results
        formatted_results = []
        if results['documents'] and results['documents'][0]:
            for i, doc in enumerate(results['documents'][0]):
                formatted_results.append({
                    "content": doc,
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else None
                })
        
        return formatted_results
    
    def get_context_for_query(self, query: str, max_chunks: int = 3) -> str:
        """Get relevant context as a formatted string"""
        results = self.search(query, n_results=max_chunks)
        
        if not results:
            return "No relevant information found in knowledge base."
        
        context = "Relevant Tax Information:\n\n"
        for i, result in enumerate(results, 1):
            context += f"[Source {i}: {result['metadata'].get('source', 'Unknown')}]\n"
            context += f"{result['content']}\n\n"
        
        return context.strip()
    
    def clear_collection(self):
        """Clear the collection (useful for rebuilding)"""
        self.chroma_client.delete_collection(name=self.collection_name)
        print(f"Cleared collection: {self.collection_name}")


def initialize_rag() -> IndianTaxRAG:
    """Initialize RAG system - call this once at startup"""
    return IndianTaxRAG()


# Test function
if __name__ == "__main__":
    print("🚀 Testing Indian Tax RAG System\n")
    
    rag = initialize_rag()
    
    test_queries = [
        "What are the income tax slabs in India?",
        "How can I save tax under Section 80C?",
        "What is the GST rate on services?",
        "When is the ITR filing deadline?",
        "What deductions can I claim for health insurance?"
    ]
    
    for query in test_queries:
        print(f"\n❓ Query: {query}")
        print("-" * 60)
        context = rag.get_context_for_query(query, max_chunks=2)
        print(context)
        print("\n")

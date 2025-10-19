#!/bin/bash
# Ollama Setup Script for TaxEase AI

echo "🚀 Setting up Ollama for TaxEase AI..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "📦 Installing Ollama..."
    curl -fsSL https://ollama.ai/install.sh | sh
else
    echo "✅ Ollama already installed"
fi

# Start Ollama service
echo "🔧 Starting Ollama service..."
ollama serve &
OLLAMA_PID=$!
sleep 5

# Pull Llama 3.1 model (best for Indian languages and context)
echo "📥 Downloading Llama 3.1 8B model..."
ollama pull llama3.1

# Test the model
echo "🧪 Testing model..."
ollama run llama3.1 "What is GST in India?" --verbose=false

echo ""
echo "✅ Ollama setup complete!"
echo ""
echo "Service is running on: http://localhost:11434"
echo "Model: llama3.1"
echo ""
echo "To stop Ollama: kill $OLLAMA_PID"
echo "To restart: ollama serve"

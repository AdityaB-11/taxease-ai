import os
import openai
import requests
from typing import Optional

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
OLLAMA_HOST = os.getenv("OLLAMA_HOST")  # e.g., http://localhost:11434
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY


def ask_llm(prompt: str, system: Optional[str] = None) -> str:
    """Try OpenAI first, fall back to Ollama HTTP if configured."""
    if OPENAI_API_KEY:
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        resp = openai.ChatCompletion.create(model=OPENAI_MODEL, messages=messages, max_tokens=800)
        return resp.choices[0].message.content

    if OLLAMA_HOST:
        # Ollama generate endpoint - best-effort
        url = f"{OLLAMA_HOST}/api/generate"
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "max_tokens": 800,
        }
        r = requests.post(url, json=payload, timeout=30)
        r.raise_for_status()
        data = r.json()
        # This may vary depending on Ollama version
        if isinstance(data, dict) and "text" in data:
            return data["text"]
        return str(data)

    raise RuntimeError("No LLM configured. Set OPENAI_API_KEY or OLLAMA_HOST environment variable.")

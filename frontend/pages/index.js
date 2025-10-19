import { useState, useEffect, useRef } from 'react'
import SuggestedPrompts from '../components/SuggestedPrompts'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const fileRef = useRef()
  const messagesEndRef = useRef()

  useEffect(()=>{
    const s = localStorage.getItem('taxease_session')
    if(s) setSessionId(Number(s))
  },[])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if(!input.trim()) return
    setIsLoading(true)
    const userMsg = input
    setInput('')
    setMessages(prev => [...prev, {role: 'user', text: userMsg}])
    
    try {
      const payload = { session_id: sessionId, message: userMsg }
      const res = await fetch('http://localhost:8000/chat', { 
        method: 'POST', 
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify(payload) 
      })
      const data = await res.json()
      setSessionId(data.session_id)
      localStorage.setItem('taxease_session', String(data.session_id))
      setMessages(prev => [...prev, {role: 'assistant', text: data.reply}])
    } catch(e) {
      setMessages(prev => [...prev, {role: 'assistant', text: 'Error: Could not reach server'}])
    }
    setIsLoading(false)
  }

  const upload = async (e) => {
    e.preventDefault()
    const f = fileRef.current.files[0]
    if(!f) return
    setIsLoading(true)
    const form = new FormData()
    form.append('file', f)
    if(sessionId) form.append('session_id', sessionId)
    
    try {
      const res = await fetch('http://localhost:8000/upload', { method: 'POST', body: form })
      const data = await res.json()
      setSessionId(data.session_id)
      localStorage.setItem('taxease_session', String(data.session_id))
      setSummary(data)
      setMessages(prev => [...prev, {
        role:'assistant', 
        text: `📊 **Upload Summary**\n\n💰 Total Income: $${data.total_income.toFixed(2)}\n💸 Total Expenses: $${data.total_expenses.toFixed(2)}\n🎯 Potential Deductions: $${data.potential_deductions.toFixed(2)}\n\n${data.transactions.length} transactions analyzed successfully!`
      }])
    } catch(e) {
      setMessages(prev => [...prev, {role: 'assistant', text: '❌ Upload failed. Please check your CSV format.'}])
    }
    setIsLoading(false)
    fileRef.current.value = ''
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const newChat = () => {
    setMessages([])
    setSessionId(null)
    setSummary(null)
    localStorage.removeItem('taxease_session')
  }

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              TaxEase AI
            </h1>
          </div>
          <p className="text-sm text-gray-600">Smart Tax Filing Assistant</p>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Upload Statement
            </h3>
            <form onSubmit={upload} className="space-y-3">
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer bg-gray-50">
                  <input 
                    ref={fileRef} 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    onChange={(e) => e.target.files[0] && upload({preventDefault: () => {}})}
                  />
                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-sm text-gray-700 font-medium">Drop CSV or click to browse</div>
                    <div className="text-xs text-gray-500 mt-1">Bank statement format</div>
                  </div>
                </div>
              </label>
            </form>
          </div>

          {/* Summary Stats */}
          {summary && (
            <div className="mb-6 space-y-2 animate-fade-in">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Financial Summary
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="text-xs text-green-700 font-medium">Total Income</div>
                <div className="text-lg font-semibold text-green-900">${summary.total_income.toFixed(2)}</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="text-xs text-red-700 font-medium">Total Expenses</div>
                <div className="text-lg font-semibold text-red-900">${summary.total_expenses.toFixed(2)}</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-xs text-blue-700 font-medium">Potential Deductions</div>
                <div className="text-lg font-semibold text-blue-900">${summary.potential_deductions.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Session Info */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Session ID</div>
            <div className="text-sm font-mono text-gray-700">
              {sessionId || 'Not started'}
            </div>
          </div>

          <button 
            onClick={newChat}
            className="w-full mt-4 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-300 shadow-sm"
          >
            + New Consultation
          </button>
        </div>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
          Powered by AI • Secure & Private
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Tax Consultation</h2>
              <p className="text-sm text-gray-600">Ask questions about your finances and tax deductions</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${sessionId ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs font-medium text-gray-700">{sessionId ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-6 py-8 bg-gray-50">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-2xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Welcome to TaxEase AI
                </h3>
                <p className="text-gray-600 mb-8">Upload your bank statement CSV and start asking questions about your taxes, deductions, and finances.</p>
                <SuggestedPrompts onSelect={(prompt) => {
                  setInput(prompt)
                }} />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  <div className={`flex gap-3 max-w-[75%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      m.role === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`}>
                      {m.role === 'user' ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-3 shadow-sm ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-slide-up">
                  <div className="flex gap-3 max-w-[75%]">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-200">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your taxes, expenses, or deductions..."
                  className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                  rows="1"
                  style={{minHeight: '52px', maxHeight: '200px'}}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-sm flex items-center gap-2"
                style={{minHeight: '52px'}}
              >
                <span>Send</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              TaxEase AI can make mistakes. Please verify important information.
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

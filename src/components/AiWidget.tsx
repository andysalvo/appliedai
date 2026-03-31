'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GREETING =
  "Hi! I'm the Applied AI assistant. Ask me anything about the club, our programs, AI tools, or how to get involved."

const QUICK_QUESTIONS = ['What is Applied AI Club?', 'How do I join?', 'What events are coming up?']

export function AiWidget() {
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return
      const userMsg = text.trim()
      setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
      setMessage('')
      setLoading(true)

      try {
        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, { role: 'user', content: userMsg }],
          }),
        })
        const data = await resp.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Something went wrong. Try again.' },
        ])
      }
      setLoading(false)
    },
    [loading, messages]
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMessage(message)
  }

  const hasMessages = messages.length > 0

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-xl"
      layout
    >
      <AnimatePresence mode="wait">
        {!expanded ? (
          /* Collapsed pill */
          <motion.button
            key="collapsed"
            onClick={() => setExpanded(true)}
            className="w-full px-5 py-3.5 rounded-2xl backdrop-blur-xl border border-white/[0.12] bg-[#041E42]/90 text-white/60 text-sm text-left flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E407C] to-[#041E42] flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="flex-1 truncate">Ask the AI assistant</span>
            {/* Breathing dot */}
            <span className="w-2 h-2 rounded-full bg-[#1E407C] shrink-0 animate-[breathe_3s_ease-in-out_infinite]" />
          </motion.button>
        ) : (
          /* Expanded chat */
          <motion.div
            key="expanded"
            className="rounded-2xl backdrop-blur-xl bg-[#041E42]/95 border border-white/[0.12] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08]">
              <span className="text-white/70 text-sm font-medium">Applied AI Assistant</span>
              <button
                onClick={() => setExpanded(false)}
                className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="max-h-72 overflow-y-auto px-4 pt-3 space-y-3">
              {/* Greeting */}
              {!hasMessages && !loading && <div className="text-white/60 text-sm">{GREETING}</div>}

              {/* Quick questions (only before first message) */}
              {!hasMessages && !loading && (
                <div className="space-y-2 pt-1">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors text-white/70 hover:text-white text-sm w-full text-left cursor-pointer"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="opacity-40 shrink-0"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm break-words ${
                    msg.role === 'user' ? 'text-white/90 text-right' : 'text-white/60'
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-center gap-1 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_infinite]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/[0.08]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.2] transition-colors"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="px-4 py-2.5 bg-[#1E407C] hover:bg-[#2a5299] rounded-xl text-sm text-white font-medium transition-colors disabled:opacity-30 cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 pt-1">
              <span className="text-white/15 text-[10px]">Powered by AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

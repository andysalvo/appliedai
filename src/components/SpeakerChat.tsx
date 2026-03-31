'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { MessageSquare } from 'lucide-react'

const QUICK_QUESTIONS = [
  'What does speaking look like?',
  'Who has spoken before?',
  'What topics do students want to hear about?',
]

export function SpeakerChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingText])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return
      const userMsg = text.trim()
      const updatedMessages = [...messages, { role: 'user', content: userMsg }]
      setMessages(updatedMessages)
      setMessage('')
      setLoading(true)
      setStreamingText('')

      try {
        const resp = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages }),
        })

        const reader = resp.body?.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))
                  if (data.type === 'text') {
                    fullText += data.text
                    setStreamingText(fullText)
                  }
                } catch {
                  // skip malformed lines
                }
              }
            }
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
        setStreamingText('')
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
    <div className="bg-navy/95 rounded-2xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.08]">
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center">
          <MessageSquare size={16} className="text-pugh-blue" />
        </div>
        <div>
          <p className="text-white/80 text-sm font-medium">Ask about speaking</p>
          <p className="text-white/30 text-xs">Powered by AI</p>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="h-64 overflow-y-auto px-5 py-4 space-y-3">
        {/* Greeting */}
        {!hasMessages && !loading && (
          <p className="text-white/50 text-sm">
            Have questions about speaking at Applied AI? Ask here and get an answer right away.
          </p>
        )}

        {/* Quick questions */}
        {!hasMessages && !loading && (
          <div className="space-y-2 pt-2">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-white/60 hover:text-white/90 text-sm w-full text-left cursor-pointer"
              >
                <span className="text-pugh-blue/60 shrink-0">&rsaquo;</span>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'text-white/90 bg-white/[0.06] rounded-xl px-4 py-2.5 ml-8'
                : 'text-white/60'
            }`}
          >
            {msg.content}
          </div>
        ))}

        {/* Streaming text */}
        {streamingText && (
          <div className="text-sm text-white/60 leading-relaxed">{streamingText}</div>
        )}

        {/* Typing indicator */}
        {loading && !streamingText && (
          <div className="flex items-center gap-1 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_infinite]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
          </div>
        )}

        <div />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.08]">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about speaking..."
            className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/[0.15] transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="px-5 py-2.5 bg-beaver-blue hover:bg-beaver-blue/80 rounded-xl text-sm text-white font-medium transition-colors disabled:opacity-30 cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

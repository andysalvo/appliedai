'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { Sparkles, Send } from 'lucide-react'

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
    <div className="relative rounded-2xl overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl" />
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />
      {/* Subtle gradient shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/[0.12] to-white/[0.04] flex items-center justify-center">
            <Sparkles size={14} className="text-white/60" />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide">Ask about speaking</p>
            <p className="text-white/20 text-[11px]">AI assistant</p>
          </div>
        </div>

        {/* Messages area */}
        <div ref={scrollRef} className="h-72 overflow-y-auto px-5 py-4 space-y-4">
          {/* Greeting */}
          {!hasMessages && !loading && (
            <p className="text-white/40 text-sm leading-relaxed">
              Have questions about speaking at Applied AI? Ask here and get an answer right away.
            </p>
          )}

          {/* Quick questions */}
          {!hasMessages && !loading && (
            <div className="space-y-2 pt-1">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-white/[0.1] transition-all text-white/50 hover:text-white/80 text-sm w-full text-left cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors shrink-0" />
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
                  ? 'text-white/80 bg-white/[0.06] backdrop-blur-sm rounded-2xl rounded-br-md px-4 py-3 ml-12 border border-white/[0.05]'
                  : 'text-white/50 pr-8'
              }`}
            >
              {msg.content}
            </div>
          ))}

          {/* Streaming text */}
          {streamingText && (
            <div className="text-sm text-white/50 leading-relaxed pr-8">{streamingText}</div>
          )}

          {/* Typing indicator */}
          {loading && !streamingText && (
            <div className="flex items-center gap-1.5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-[bounce_1.4s_ease-in-out_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
            </div>
          )}

          <div />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.06]">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-white/[0.12] focus:bg-white/[0.05] transition-all"
            />
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="w-10 h-10 flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/[0.15] rounded-xl text-white/40 hover:text-white/70 transition-all disabled:opacity-20 cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

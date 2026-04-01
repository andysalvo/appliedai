'use client'

import { useState, useRef, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { Send, User, Wrench, BookOpen, MessageCircle } from 'lucide-react'
import type { ChatMessage } from '../lib/types'

interface ChatPanelProps {
  messages: ChatMessage[]
  streamingText: string
  loading: boolean
  suggestions: string[]
  onSend: (text: string) => void
}

const quickActions = [
  {
    label: 'Add yourself to the agent list',
    icon: User,
    color: 'bg-blue-100',
  },
  {
    label: 'Add an AI tool to Explore',
    icon: Wrench,
    color: 'bg-green-100',
  },
  {
    label: 'Learn how the website works',
    icon: BookOpen,
    color: 'bg-amber-100',
  },
  {
    label: 'Just ask me anything',
    icon: MessageCircle,
    color: 'bg-purple-100',
  },
]

export function ChatPanel({
  messages,
  streamingText,
  loading,
  suggestions,
  onSend,
}: ChatPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingText])

  const handleSend = () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    onSend(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isFirstVisit = messages.length === 0 && !loading

  const animationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }

  return (
    <LazyMotion features={domAnimation}>
      <div id="chatPanel" className="flex flex-col h-full border-r border-border">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-5">
          {isFirstVisit && (
            <m.div
              {...animationProps}
              className="flex flex-col items-center justify-center h-full gap-6 text-center"
            >
              <div className="w-16 h-16 bg-white border border-border rounded-2xl flex items-center justify-center">
                <span className="text-navy font-extrabold text-xl">AI</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy mb-2">Welcome to Applied AI</h2>
                <p className="text-text-muted text-sm max-w-sm">
                  Tell the agent what you want to do. It handles the code for you.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-sm">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => onSend(action.label)}
                    className="flex items-center gap-3 px-3.5 py-2.5 bg-white border border-border rounded-lg text-left text-sm text-text hover:border-beaver-blue hover:bg-surface-alt transition-colors"
                  >
                    <span
                      className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${action.color}`}
                    >
                      <action.icon className="w-3.5 h-3.5" />
                    </span>
                    {action.label}
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {messages.map((msg, i) => (
            <m.div
              key={i}
              {...animationProps}
              className={`flex gap-3 max-w-[85%] ${
                msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${
                  msg.role === 'user'
                    ? 'bg-beaver-blue text-white'
                    : 'bg-white text-navy font-extrabold text-[11px] border border-border'
                }`}
              >
                {msg.role === 'user' ? 'U' : 'AI'}
              </div>
              {/* Bubble */}
              <div
                className={`px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-navy text-white rounded-xl rounded-br-sm'
                    : 'bg-surface text-text rounded-xl rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </m.div>
          ))}

          {/* Streaming text */}
          {streamingText && (
            <m.div {...animationProps} className="flex gap-3 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-white text-navy font-extrabold text-[11px] border border-border">
                AI
              </div>
              <div className="bg-surface text-text rounded-xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed">
                {streamingText}
              </div>
            </m.div>
          )}

          {/* Typing indicator */}
          {loading && !streamingText && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-white text-navy font-extrabold text-[11px] border border-border">
                AI
              </div>
              <div className="bg-surface rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:200ms]" />
                <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:400ms]" />
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 ml-11">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => onSend(s)}
                  className="px-3 py-1.5 text-xs bg-white border border-border rounded-full text-text hover:border-beaver-blue hover:bg-surface-alt transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div id="inputBar" className="px-6 py-4 border-t border-border">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-1 focus-within:border-beaver-blue transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me what you'd like to do..."
              className="flex-1 bg-transparent text-sm text-text placeholder:text-text-muted outline-none py-2"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-navy rounded-lg text-white flex items-center justify-center flex-shrink-0 hover:bg-beaver-blue transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-text-muted mt-1.5 pl-1">
            Press Enter to send. The agent can add you to the{' '}
            <span className="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">
              agent list
              <span className="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">
                The directory of everyone who contributes to the club site. Your profile, role, and
                contributions are tracked here.
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-navy" />
              </span>
            </span>
            , manage{' '}
            <span className="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">
              tools
              <span className="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">
                The AI tools shown on the Explore page. Each tool has a name, company, description,
                and category.
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-navy" />
              </span>
            </span>
            , and answer questions.
          </p>
        </div>
      </div>
    </LazyMotion>
  )
}

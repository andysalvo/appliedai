'use client'

import { useState, useRef, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { Send, User, Wrench, MessageCircle, Lightbulb } from 'lucide-react'
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
    label: 'Share ideas for the club',
    icon: Lightbulb,
    color: 'bg-navy',
    primary: true,
  },
  {
    label: 'Add yourself to the agent list',
    icon: User,
    color: 'bg-blue-100',
    primary: false,
  },
  {
    label: 'Add an AI tool to Explore',
    icon: Wrench,
    color: 'bg-green-100',
    primary: false,
  },
  {
    label: 'Just ask me anything',
    icon: MessageCircle,
    color: 'bg-purple-100',
    primary: false,
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
  const [isDragOver, setIsDragOver] = useState(false)
  const [dropSuccess, setDropSuccess] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set false if we actually left the container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const artifactText = e.dataTransfer.getData('text/plain')
    if (artifactText) {
      setInput((prev) => artifactText + prev)
      inputRef.current?.focus()
      // Flash green border on success
      setDropSuccess(true)
      setTimeout(() => setDropSuccess(false), 500)
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
      <div
        id="chatPanel"
        className="flex flex-col h-full border-r border-border w-1/2 flex-shrink-0"
      >
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
                <h2 className="text-lg font-semibold text-navy mb-2">
                  Welcome to the Applied AI Workspace
                </h2>
                <p className="text-text-muted text-sm max-w-sm">
                  The agent will get you set up with a few quick questions, then you can start
                  contributing.
                </p>
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
        <div
          id="inputBar"
          className="px-6 py-4 border-t border-border"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`flex items-center gap-2 bg-surface border rounded-xl px-4 py-1 transition-colors duration-300 ${
              dropSuccess
                ? 'border-green-500'
                : isDragOver
                  ? 'border-pa-sky'
                  : 'border-border focus-within:border-beaver-blue'
            }`}
          >
            <input
              ref={inputRef}
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
          {isDragOver ? (
            <p className="text-[11px] text-pa-sky font-medium mt-1.5 pl-1 motion-safe:animate-pulse">
              Drop to attach context
            </p>
          ) : (
            <p className="text-[11px] text-text-muted mt-1.5 pl-1">
              Press Enter to send. The agent can add you to the agent list, manage tools, and answer
              questions.
            </p>
          )}
        </div>
      </div>
    </LazyMotion>
  )
}

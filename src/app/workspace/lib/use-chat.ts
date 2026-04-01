'use client'

import { useState, useCallback } from 'react'
import type { ChatMessage, StreamEvent, AccessTier } from './types'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [changeSummary, setChangeSummary] = useState<string[]>([])
  const [tier] = useState<AccessTier>('contributor')

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: ChatMessage = { role: 'user', content: text }
      setMessages((prev) => [...prev, userMessage])
      setLoading(true)
      setStreamingText('')
      setSuggestions([])

      try {
        const res = await fetch('/workspace/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            tier,
          }),
        })

        if (!res.ok || !res.body) {
          throw new Error('Chat request failed')
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const event: StreamEvent = JSON.parse(data)

              switch (event.type) {
                case 'text':
                  if (event.text) {
                    accumulated += event.text
                    setStreamingText(accumulated)
                  }
                  break

                case 'tool_result':
                  setHasChanges(true)
                  if (event.toolResult) {
                    setChangeSummary((prev) => [...prev, event.toolResult!])
                  }
                  break

                case 'suggestions':
                  if (event.suggestions) {
                    setSuggestions(event.suggestions)
                  }
                  break

                case 'done':
                  break
              }
            } catch {
              // skip malformed JSON lines
            }
          }
        }

        // Move accumulated streaming text into messages
        if (accumulated) {
          setMessages((prev) => [...prev, { role: 'assistant', content: accumulated }])
          setStreamingText('')
        }
      } catch (err) {
        console.error('Chat error:', err)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Something went wrong. Please try again.',
          },
        ])
        setStreamingText('')
      } finally {
        setLoading(false)
      }
    },
    [messages, tier]
  )

  return {
    messages,
    streamingText,
    loading,
    suggestions,
    hasChanges,
    changeSummary,
    tier,
    sendMessage,
  }
}

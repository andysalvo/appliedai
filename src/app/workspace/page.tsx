'use client'

import { useState, useEffect, useCallback } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { SessionBar } from './components/session-bar'
import { ChatPanel } from './components/chat-panel'
import { PreviewPanel } from './components/preview-panel'
import { TourOverlay } from './components/tour-overlay'
import { SessionEndModal } from './components/session-end-modal'
import { useChat } from './lib/use-chat'

export default function WorkspacePage() {
  const chat = useChat()
  const [showTour, setShowTour] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem('workspace-toured')
  })
  const [showEndModal, setShowEndModal] = useState(false)
  const [endStage, setEndStage] = useState<'confirm' | 'success'>('confirm')
  const [prUrl, setPrUrl] = useState('')

  const handleTourEnd = useCallback(() => {
    setShowTour(false)
    localStorage.setItem('workspace-toured', 'true')
  }, [])

  function handleDone() {
    setEndStage('confirm')
    setShowEndModal(true)
  }

  async function handleSubmit() {
    try {
      const resp = await fetch('/workspace/api/session-end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: chat.changeSummary.join('. '),
        }),
      })
      const data = await resp.json()
      if (data.success) {
        setPrUrl(data.prUrl)
        setEndStage('success')
      }
    } catch {
      // handle error
    }
  }

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (chat.hasChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [chat.hasChanges])

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 z-50 bg-white h-screen flex flex-col">
        <SessionBar hasChanges={chat.hasChanges} onDone={handleDone} />
        <div className="flex flex-1 min-h-0">
          <ChatPanel
            messages={chat.messages}
            streamingText={chat.streamingText}
            loading={chat.loading}
            suggestions={chat.suggestions}
            onSend={chat.sendMessage}
          />
          <PreviewPanel />
        </div>
      </div>

      {showTour && <TourOverlay onEnd={handleTourEnd} />}

      {showEndModal && (
        <SessionEndModal
          stage={endStage}
          summary={chat.changeSummary}
          prUrl={prUrl}
          onConfirm={handleSubmit}
          onCancel={() => setShowEndModal(false)}
          onClose={() => setShowEndModal(false)}
        />
      )}
    </LazyMotion>
  )
}

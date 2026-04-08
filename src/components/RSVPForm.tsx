'use client'

import { useState } from 'react'
import { PressableButton } from '@/components/ui/PressableButton'

type FormState = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

interface RSVPFormProps {
  event: string
}

export function RSVPForm({ event }: RSVPFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!fullName || !email) return

    if (!email.toLowerCase().endsWith('@psu.edu')) {
      setState('error')
      setErrorMsg('Please use your @psu.edu email.')
      return
    }

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, event }),
      })

      const result = await res.json()

      if (!res.ok) {
        setState('error')
        setErrorMsg(result.error || 'Something went wrong.')
        return
      }

      if (result.duplicate) {
        setState('duplicate')
      } else {
        setState('success')
      }

      setFullName('')
      setEmail('')
    } catch {
      setState('error')
      setErrorMsg('Something went wrong. Try again or email us at appliedaipsu@gmail.com.')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-4">
        <p className="font-display font-semibold text-white">You&apos;re in. See you April 20th.</p>
      </div>
    )
  }

  if (state === 'duplicate') {
    return (
      <div className="py-4">
        <p className="font-display font-semibold text-white">
          You already RSVP&apos;d. See you there.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">RSVP</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/30 focus:border-pugh-blue/40 transition-all text-sm"
        />
        <input
          type="email"
          placeholder="PSU email (@psu.edu)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/30 focus:border-pugh-blue/40 transition-all text-sm"
        />
        <PressableButton
          type="submit"
          className="px-6 py-3.5 bg-white text-navy rounded-xl font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
        >
          {state === 'submitting' ? 'Saving...' : 'RSVP'}
        </PressableButton>
      </div>
      {state === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}
    </form>
  )
}

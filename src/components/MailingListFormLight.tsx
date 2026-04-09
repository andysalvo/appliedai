'use client'

import { useState } from 'react'
import { PressableButton } from '@/components/ui/PressableButton'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function MailingListFormLight() {
  const [state, setState] = useState<FormState>('idle')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !firstName) return

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, list: 'general' }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Something went wrong.')
      }

      setState('success')
      setFirstName('')
      setEmail('')
    } catch {
      setState('error')
      setErrorMsg('Something went wrong. Try again or email us at appliedaipsu@gmail.com.')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-display font-semibold text-navy">
          You&apos;re in. We&apos;ll be in touch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="px-5 py-3.5 rounded-xl border border-border bg-white text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-beaver-blue/20 focus:border-beaver-blue/40 transition-all"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="px-5 py-3.5 rounded-xl border border-border bg-white text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-beaver-blue/20 focus:border-beaver-blue/40 transition-all"
      />
      <PressableButton
        type="submit"
        className="px-6 py-3.5 bg-beaver-blue text-white rounded-xl font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? 'Joining...' : 'Join the list'}
      </PressableButton>
      {state === 'error' && <p className="text-error text-sm">{errorMsg}</p>}
    </form>
  )
}

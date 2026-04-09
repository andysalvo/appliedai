'use client'

import { useState } from 'react'
import { PressableButton } from '@/components/ui/PressableButton'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function LabsMailingListForm() {
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
        body: JSON.stringify({ firstName, email, list: 'labs' }),
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
        <p className="text-lg font-display font-semibold text-white">
          You&apos;re in. We&apos;ll reach out when Labs is accepting new members.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="flex-1 px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all backdrop-blur-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all backdrop-blur-sm"
      />
      <PressableButton
        type="submit"
        className="px-8 py-3.5 bg-white text-navy rounded-xl font-semibold text-sm whitespace-nowrap"
      >
        {state === 'submitting' ? 'Joining...' : 'Join Labs'}
      </PressableButton>
      {state === 'error' && <p className="text-red-300 text-sm sm:col-span-full">{errorMsg}</p>}
    </form>
  )
}

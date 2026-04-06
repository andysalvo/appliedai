'use client'

import { useState } from 'react'
import { PressableButton } from '@/components/ui/PressableButton'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function SpeakerForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    topic: '',
    format: 'either',
    notes: '',
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.fullName || !form.email) return

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/speakers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Submission failed')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setErrorMsg(
        err instanceof Error && err.message !== 'Submission failed'
          ? err.message
          : 'Something went wrong. Try again or email us at appliedaipsu@gmail.com.'
      )
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-display font-semibold text-navy mb-2">
          Thank you. We will be in touch.
        </p>
        <p className="text-text-muted text-sm">
          We review every submission and will follow up within a week.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-beaver-blue/20 focus:border-beaver-blue/40 transition-all text-sm'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full name *"
          value={form.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          required
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Organization / Company"
          value={form.organization}
          onChange={(e) => update('organization', e.target.value)}
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Your role"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          className={inputClass}
        />
      </div>
      <textarea
        placeholder="What would you like to talk about? A few sentences is great."
        value={form.topic}
        onChange={(e) => update('topic', e.target.value)}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      <div className="flex items-center gap-6 text-sm text-text-muted">
        <span className="font-medium text-text">Format:</span>
        {['zoom', 'in-person', 'either'].map((opt) => (
          <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="format"
              value={opt}
              checked={form.format === opt}
              onChange={(e) => update('format', e.target.value)}
              className="accent-beaver-blue"
            />
            {opt === 'in-person' ? 'In person' : opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
      <textarea
        placeholder="Anything else you would like us to know (optional)"
        value={form.notes}
        onChange={(e) => update('notes', e.target.value)}
        rows={2}
        className={`${inputClass} resize-none`}
      />
      <PressableButton
        type="submit"
        className="w-full px-6 py-3.5 bg-beaver-blue text-white rounded-xl font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'submitting' ? 'Submitting...' : 'Submit interest'}
      </PressableButton>
      {state === 'error' && <p className="text-error text-sm text-center">{errorMsg}</p>}
    </form>
  )
}

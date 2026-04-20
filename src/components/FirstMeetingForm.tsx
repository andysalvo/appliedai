'use client'

import { useState } from 'react'
import { PressableButton } from '@/components/ui/PressableButton'

type FormState = 'idle' | 'submitting' | 'success' | 'error'
type Interest = 'yes' | 'maybe' | 'no'
type Experience = 'beginner' | 'intermediate' | 'advanced' | 'non-technical'

export function FirstMeetingForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [major, setMajor] = useState('')
  const [year, setYear] = useState('')

  const [labsInterest, setLabsInterest] = useState<Interest | ''>('')
  const [unaskedQuestions, setUnaskedQuestions] = useState('')
  const [additionalInput, setAdditionalInput] = useState('')
  const [positionInterest, setPositionInterest] = useState<Interest | ''>('')
  const [positionAreaLabs, setPositionAreaLabs] = useState(false)
  const [positionAreaProgramming, setPositionAreaProgramming] = useState(false)
  const [positionElaboration, setPositionElaboration] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<Experience | ''>('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!fullName || !email || !labsInterest) {
      setState('error')
      setErrorMsg('Name, email, and Labs interest are required.')
      return
    }

    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/first-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          major: major || null,
          year: year || null,
          labsInterest,
          unaskedQuestions: unaskedQuestions || null,
          additionalInput: additionalInput || null,
          positionInterest: positionInterest || null,
          positionAreaLabs,
          positionAreaProgramming,
          positionElaboration: positionElaboration || null,
          experienceLevel: experienceLevel || null,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Something went wrong.')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Try again or email appliedaipsu@gmail.com.'
      )
    }
  }

  if (state === 'success') {
    return (
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-8 py-14 text-center">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-4">
          Submitted
        </p>
        <h2 className="font-display text-white font-bold text-3xl md:text-4xl mb-4">
          You&apos;re on the list.
        </h2>
        <p className="text-white/60 text-base max-w-md mx-auto leading-relaxed">
          We read every response. If you asked a question or shared an idea, the board will reply
          over the summer. Fall starts with you.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* SECTION · About you */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-pugh-blue font-semibold">
            01
          </span>
          <h3 className="font-display text-white font-semibold text-xl">About you</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm"
          />
          <input
            type="email"
            placeholder="Email (@psu.edu preferred)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm"
          />
          <input
            type="text"
            placeholder="Major (optional)"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm"
          />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm appearance-none cursor-pointer"
          >
            <option value="" className="bg-navy">
              Year (optional)
            </option>
            <option value="freshman" className="bg-navy">
              Freshman
            </option>
            <option value="sophomore" className="bg-navy">
              Sophomore
            </option>
            <option value="junior" className="bg-navy">
              Junior
            </option>
            <option value="senior" className="bg-navy">
              Senior
            </option>
            <option value="graduate" className="bg-navy">
              Graduate
            </option>
            <option value="other" className="bg-navy">
              Other
            </option>
          </select>
        </div>
      </section>

      {/* SECTION · Labs */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-pugh-blue font-semibold">
            02
          </span>
          <h3 className="font-display text-white font-semibold text-xl">
            Are you interested in Labs?
          </h3>
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl">
          Labs is where members build real AI applications in small teams, using industry-standard
          tools. No commitment tonight — just signal.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(['yes', 'maybe', 'no'] as Interest[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setLabsInterest(v)}
              className={`py-4 rounded-xl border text-sm font-medium capitalize transition-all ${
                labsInterest === v
                  ? 'bg-pugh-blue/20 border-pugh-blue text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION · Your voice */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-pugh-blue font-semibold">
            03
          </span>
          <h3 className="font-display text-white font-semibold text-xl">Your voice</h3>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-white/70 text-sm font-medium mb-2 block">
              Any additional questions you didn&apos;t get the chance to ask?
            </span>
            <textarea
              placeholder="Anything you wanted to ask but didn't get to..."
              value={unaskedQuestions}
              onChange={(e) => setUnaskedQuestions(e.target.value)}
              rows={4}
              className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm resize-none"
            />
          </label>

          <label className="block">
            <span className="text-white/70 text-sm font-medium mb-2 block">
              Any input you&apos;d be interested in sharing?
            </span>
            <textarea
              placeholder="Ideas for speakers, topics, projects, workshops, anything..."
              value={additionalInput}
              onChange={(e) => setAdditionalInput(e.target.value)}
              rows={4}
              className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm resize-none"
            />
          </label>
        </div>
      </section>

      {/* SECTION · Leadership */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-pugh-blue font-semibold">
            04
          </span>
          <h3 className="font-display text-white font-semibold text-xl">
            Interested in a Fall board position?
          </h3>
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl">
          The exec board is expanding for Fall. If you&apos;re curious about leading, say so — we
          interview candidates over the summer.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {(['yes', 'maybe', 'no'] as Interest[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setPositionInterest(v)
                if (v === 'no') {
                  setPositionAreaLabs(false)
                  setPositionAreaProgramming(false)
                  setPositionElaboration('')
                }
              }}
              className={`py-4 rounded-xl border text-sm font-medium capitalize transition-all ${
                positionInterest === v
                  ? 'bg-pugh-blue/20 border-pugh-blue text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        {(positionInterest === 'yes' || positionInterest === 'maybe') && (
          <div className="space-y-4 pt-2">
            <p className="text-white/60 text-sm">
              Is your interest in <span className="text-white font-medium">Labs</span> or{' '}
              <span className="text-white font-medium">Programming</span>? (pick either or both)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPositionAreaLabs((v) => !v)}
                className={`py-4 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                  positionAreaLabs
                    ? 'bg-pugh-blue/20 border-pugh-blue text-white'
                    : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <span className="block text-base font-semibold">Labs</span>
                <span className="block text-xs mt-0.5 opacity-70">
                  Technical · building · hands-on projects
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPositionAreaProgramming((v) => !v)}
                className={`py-4 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                  positionAreaProgramming
                    ? 'bg-pugh-blue/20 border-pugh-blue text-white'
                    : 'bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <span className="block text-base font-semibold">Programming</span>
                <span className="block text-xs mt-0.5 opacity-70">
                  Speakers · workshops · case competitions
                </span>
              </button>
            </div>
            {(positionAreaLabs || positionAreaProgramming) && (
              <textarea
                placeholder="Elaborate (optional) — what draws you to this area?"
                value={positionElaboration}
                onChange={(e) => setPositionElaboration(e.target.value)}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pugh-blue/40 focus:border-pugh-blue/40 transition-all text-sm backdrop-blur-sm resize-none"
              />
            )}
          </div>
        )}
      </section>

      {/* SECTION · Experience */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.2em] text-pugh-blue font-semibold">
            05
          </span>
          <h3 className="font-display text-white font-semibold text-xl">Your experience with AI</h3>
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-xl">
          Used for matching Labs teams and case competition groups. No filtering — every level is
          welcome.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { v: 'beginner', label: 'Beginner', desc: 'New to AI tools' },
              { v: 'intermediate', label: 'Intermediate', desc: 'Used AI regularly' },
              { v: 'advanced', label: 'Advanced', desc: 'Built with AI before' },
              { v: 'non-technical', label: 'Non-technical', desc: 'Interested but not coding' },
            ] as { v: Experience; label: string; desc: string }[]
          ).map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setExperienceLevel(opt.v)}
              className={`p-4 rounded-xl border text-left transition-all ${
                experienceLevel === opt.v
                  ? 'bg-pugh-blue/20 border-pugh-blue'
                  : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              <p className="text-white text-sm font-medium mb-1">{opt.label}</p>
              <p className="text-white/50 text-xs">{opt.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* SUBMIT */}
      <div className="pt-4 space-y-4">
        {state === 'error' && <p className="text-red-300 text-sm">{errorMsg}</p>}
        <PressableButton
          type="submit"
          className="w-full py-4 bg-white text-navy rounded-xl font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'submitting' ? 'Sending...' : 'Submit'}
        </PressableButton>
        <p className="text-white/30 text-xs text-center">
          We read every response. No spam. Contact appliedaipsu@gmail.com if you hit an error.
        </p>
      </div>
    </form>
  )
}

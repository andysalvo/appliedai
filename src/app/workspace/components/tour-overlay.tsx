'use client'

import { useState, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'

interface TourOverlayProps {
  onEnd: () => void
}

interface TourStep {
  target: string | null
  title: string
  bodyHtml: string
  label: string
  tooltipPos: 'center' | 'right' | 'left' | 'above' | 'below' | 'below-left'
}

const tourSteps: TourStep[] = [
  {
    target: null,
    title: 'This is your workspace',
    bodyHtml:
      'Everything you see is the actual workspace you will use. On the left, you talk to the AI agent. On the right, you see club activity, the repo map, and the live site. Let me walk you through each part.',
    label: 'Overview',
    tooltipPos: 'center',
  },
  {
    target: 'chatPanel',
    title: 'This is the chat',
    bodyHtml:
      'Type here in plain English. Tell the agent what you want to change. "Add me to the <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">agent list<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">The list of every club member who contributes to the site. Your profile, role, and work are tracked here.</span></span>" or "Add ChatGPT to the <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">tools list<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">The collection of AI tools shown on the Explore page. Each tool has a name, description, and category.</span></span>." The agent writes the code for you.',
    label: 'Step 1 of 5',
    tooltipPos: 'right',
  },
  {
    target: 'previewContent',
    title: 'This is club activity',
    bodyHtml:
      'This panel shows what is happening in the club. Ideas members have proposed, who is contributing, and recent sessions. Use the tabs to switch between activity, the repo map, and the live site.',
    label: 'Step 2 of 5',
    tooltipPos: 'left',
  },
  {
    target: 'inputBar',
    title: 'Just type what you want',
    bodyHtml:
      'You don\'t need to know any code. Say things like "I\'m Sarah, the new Events Coordinator" or "Add Perplexity to the research tools." The agent figures out the rest and updates the <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">data files<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">Simple lists stored in the project that hold all the site\'s content: who\'s on the team, which tools are listed, etc. The agent edits these for you.</span></span>.',
    label: 'Step 3 of 5',
    tooltipPos: 'above',
  },
  {
    target: 'doneBtn',
    title: "Click here when you're finished",
    bodyHtml:
      'When you\'re done, click "I\'m done." The agent summarizes your work, packages it into a <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">pull request<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">A way to submit changes for review. Think of it like turning in a draft -- a club leader checks it before it goes live on the real site.</span></span>, and a club leader reviews it. That\'s the whole process.',
    label: 'Step 4 of 5',
    tooltipPos: 'below',
  },
  {
    target: 'previewTabs',
    title: 'Compare your changes',
    bodyHtml:
      'Use the tabs to explore. <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">Activity<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">Shows who is contributing, what ideas have been proposed, and recent sessions. This is the club\'s pulse.</span></span> shows the club\'s pulse. <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">Repo Map<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">A visual guide to every file in the project. Green files are ones you can edit, blue are pages only admins touch, gray is infrastructure.</span></span> shows how the project is organized. <span class="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">Site Preview<span class="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">Shows the real Applied AI website. When the agent makes a change, you can check how it looks here.</span></span> shows the live website.',
    label: 'Step 5 of 5',
    tooltipPos: 'below',
  },
]

export function TourOverlay({ onEnd }: TourOverlayProps) {
  const [step, setStep] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const currentStep = tourSteps[step]
  const isLastStep = step === tourSteps.length - 1

  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (!currentStep.target) {
      setRect(null)
      return
    }
    const el = document.getElementById(currentStep.target)
    setRect(el ? el.getBoundingClientRect() : null)
  }, [step, currentStep.target])

  const next = () => {
    if (isLastStep) {
      onEnd()
    } else {
      setStep((s) => s + 1)
    }
  }

  const pad = 8
  const r = 12

  // Build clip-path polygon for the mask cutout
  const clipPath = rect
    ? (() => {
        const t = rect.top - pad
        const l = rect.left - pad
        const w = rect.width + pad * 2
        const h = rect.height + pad * 2
        return `polygon(
          0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
          ${l}px ${t + r}px,
          ${l + r}px ${t}px,
          ${l + w - r}px ${t}px,
          ${l + w}px ${t + r}px,
          ${l + w}px ${t + h - r}px,
          ${l + w - r}px ${t + h}px,
          ${l + r}px ${t + h}px,
          ${l}px ${t + h - r}px,
          ${l}px ${t + r}px
        )`
      })()
    : 'none'

  // Tooltip positioning
  const tooltipStyle: React.CSSProperties = {}
  if (!rect || currentStep.tooltipPos === 'center') {
    tooltipStyle.top = '50%'
    tooltipStyle.left = '50%'
    tooltipStyle.transform = 'translate(-50%, -50%)'
  } else if (currentStep.tooltipPos === 'right') {
    tooltipStyle.top = rect.top + 20
    tooltipStyle.left = rect.right + 24
  } else if (currentStep.tooltipPos === 'left') {
    tooltipStyle.top = rect.top + 20
    tooltipStyle.right = window.innerWidth - rect.left + 24
  } else if (currentStep.tooltipPos === 'above') {
    tooltipStyle.bottom = window.innerHeight - rect.top + 16
    tooltipStyle.left = rect.left
  } else if (currentStep.tooltipPos === 'below' || currentStep.tooltipPos === 'below-left') {
    tooltipStyle.top = rect.bottom + 16
    tooltipStyle.right = 24
  }

  const cardAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Dark mask with cutout */}
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{
            background: 'rgba(0, 15, 35, 0.75)',
            clipPath,
          }}
        />

        {/* Spotlight border */}
        {rect && (
          <div
            className="absolute border-2 border-pa-sky rounded-xl pointer-events-none z-[51]"
            style={{
              top: rect.top - pad,
              left: rect.left - pad,
              width: rect.width + pad * 2,
              height: rect.height + pad * 2,
              boxShadow: '0 0 0 4px rgba(0,156,222,0.2), 0 0 40px rgba(0,156,222,0.15)',
            }}
          />
        )}

        {/* Tooltip */}
        <m.div
          key={step}
          {...cardAnimation}
          className="absolute bg-white rounded-xl p-6 max-w-[360px] shadow-xl z-[52] pointer-events-auto"
          style={tooltipStyle}
        >
          <div className="text-[11px] font-semibold text-pa-sky tracking-widest uppercase mb-2">
            {currentStep.label}
          </div>
          <h3 className="font-display text-lg text-navy font-semibold mb-2 leading-tight">
            {currentStep.title}
          </h3>
          <p
            className="text-sm text-text-muted leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: currentStep.bodyHtml }}
          />

          <div className="flex items-center justify-between">
            {/* Progress dots */}
            <div className="flex gap-1.5">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full ${
                    i === step ? 'w-[18px] bg-pa-sky' : 'w-1.5 bg-border'
                  }`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={next}
              className="flex items-center gap-1.5 bg-navy text-white px-5 py-2 rounded-lg text-[13px] font-medium hover:bg-beaver-blue transition-colors"
            >
              {isLastStep ? 'Start working' : 'Next'}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </m.div>

        {/* Skip tour button */}
        <button
          onClick={onEnd}
          className="fixed top-4 right-4 z-[53] pointer-events-auto flex items-center gap-1 bg-white/10 border border-white/20 text-white/70 px-3.5 py-1.5 rounded-md text-xs hover:text-white hover:bg-white/15 transition-colors"
        >
          <X className="w-3 h-3" />
          Skip tour
        </button>
      </div>
    </LazyMotion>
  )
}

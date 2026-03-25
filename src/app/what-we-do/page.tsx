import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, FlaskConical, Compass, Users, Mic, Wrench } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'

export const metadata: Metadata = {
  title: 'What We Do',
  description:
    'The Applied AI Club runs events, builds projects through Labs, and maintains a registry of AI tools worth knowing.',
}

export default function WhatWeDoPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
              What We Do
            </p>
            <h1
              className="font-display text-navy font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Three pillars, one goal
            </h1>
            <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
              Everything we do is built around helping Penn State students understand and work with
              AI. We run events, build real projects, and maintain tools that make it easier to get
              started.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── EVENTS ─── */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-navy/[0.03] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div className="w-14 h-14 rounded-xl bg-navy/[0.08] flex items-center justify-center mb-6">
                <Calendar size={26} className="text-navy" />
              </div>
              <h2
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Events and Programming
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We will host guest speakers, run tool walkthroughs, and discuss how AI is changing
                business and the workplace. Meetings will be open to all Penn State students
                regardless of major or experience.
              </p>
              <p className="text-text-muted leading-relaxed">
                Events and regular meetings begin Fall 2026 at Penn State. Join the mailing list or
                GroupMe to get notified when we launch.
              </p>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-4">
                {[
                  {
                    icon: Mic,
                    title: 'Guest speakers',
                    desc: 'Industry professionals and faculty share how AI is used in their work.',
                  },
                  {
                    icon: Wrench,
                    title: 'Tool walkthroughs',
                    desc: 'Hands-on sessions with ChatGPT, Claude, Cursor, and other AI tools.',
                  },
                  {
                    icon: Users,
                    title: 'Open discussions',
                    desc: 'What is happening with AI, how it affects careers, and where it is going.',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <AnimatedCard
                      key={item.title}
                      className="bg-white rounded-xl p-6 border border-border flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-navy/[0.06] flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-navy" />
                      </div>
                      <div>
                        <p className="font-display text-navy font-semibold text-sm mb-1">
                          {item.title}
                        </p>
                        <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </AnimatedCard>
                  )
                })}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── LABS ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left" className="order-2 lg:order-1">
              <AnimatedCard className="bg-gradient-to-br from-navy to-beaver-blue rounded-2xl p-8 md:p-10 text-white shadow-xl shadow-navy/10">
                <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-4">
                  Applied AI Labs
                </p>
                <p className="font-display text-xl font-semibold mb-3">
                  Where students build with AI
                </p>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Labs members work with Claude Code, Next.js, GitHub Actions, Google Workspace
                  integrations, and the same tools that real teams ship with.
                </p>
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 text-pugh-blue font-medium text-sm hover:text-white transition-colors"
                >
                  Learn more about Labs
                  <ArrowRight size={14} />
                </Link>
              </AnimatedCard>
            </SlideIn>

            <SlideIn direction="right" className="order-1 lg:order-2">
              <div className="w-14 h-14 rounded-xl bg-beaver-blue/[0.08] flex items-center justify-center mb-6">
                <FlaskConical size={26} className="text-beaver-blue" />
              </div>
              <h2
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Applied AI Labs
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Labs is the research and development arm of the club. We run experiments, build
                tools, and give members who want to go deeper a place to work on real projects with
                real AI systems.
              </p>
              <p className="text-text-muted leading-relaxed">
                Our first project is the Student AI Hub. The roadmap includes more hands-on work
                with the same stack serious teams use.
              </p>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── EXPLORE AI ─── */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-pugh-blue/[0.04] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div className="w-14 h-14 rounded-xl bg-pugh-blue/[0.15] flex items-center justify-center mb-6">
                <Compass size={26} className="text-navy" />
              </div>
              <h2
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Explore AI
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We maintain a registry of AI tools worth knowing, organized for students at every
                level. From beginner-friendly assistants to the agentic tools shaping the industry.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                Each tool includes what it does, who makes it, and what you can do with it. No hype.
                Just honest descriptions.
              </p>
              <PressableButton
                href="/explore"
                className="inline-flex items-center gap-2 bg-beaver-blue text-white px-7 py-3.5 rounded-xl font-medium text-sm"
              >
                Browse AI tools
                <ArrowRight size={16} />
              </PressableButton>
            </SlideIn>

            <SlideIn direction="right">
              <div className="grid grid-cols-2 gap-3">
                {['ChatGPT', 'Claude', 'Perplexity', 'Cursor', 'Ollama', 'Codex'].map((tool) => (
                  <div
                    key={tool}
                    className="bg-white rounded-xl p-4 border border-border text-center"
                  >
                    <p className="font-display text-navy text-sm font-semibold">{tool}</p>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="font-display text-navy font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Ready to get involved?
            </h2>
            <p className="text-text-muted mb-10 max-w-md mx-auto">
              Join the GroupMe or sign up for the mailing list. Regular meetings begin Fall 2026 at
              Penn State. No application. No prerequisites.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PressableButton
                href="/team"
                className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
              >
                How to join
                <ArrowRight size={16} />
              </PressableButton>
              <PressableButton
                href="/#join"
                className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
              >
                Mailing list
              </PressableButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

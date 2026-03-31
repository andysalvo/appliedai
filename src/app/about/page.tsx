import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, FlaskConical, Compass, Users, Mic, Wrench } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import { FadeIn } from '@/components/ui/FadeIn'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { PressableButton } from '@/components/ui/PressableButton'
import { team, teamSemester } from '@/data/team'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Applied AI Club runs events, builds projects through Labs, and maintains a registry of AI tools worth knowing.',
}

export default function WhatWeDoPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-beaver-blue/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-3">
              What We Do
            </p>
            <h1
              className="font-display text-white font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Three pillars, one goal
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Everything we do is built around helping Penn State students understand and work with
              AI. We run events, build real projects, and maintain tools that make it easier to get
              started.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── EVENTS ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
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

      {/* ─── LABS (dark section) ─── */}
      <section className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pugh-blue via-pa-sky to-beaver-blue" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div className="w-14 h-14 rounded-xl bg-white/[0.06] flex items-center justify-center mb-6">
                <FlaskConical size={26} className="text-pugh-blue" />
              </div>
              <h2
                className="font-display text-white font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Applied AI Labs
              </h2>
              <p className="text-white/50 leading-relaxed mb-4">
                Labs is the research and development arm of the club. We run experiments, build
                tools, and give members who want to go deeper a place to work on real projects with
                real AI systems.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Our first project is the Student AI Hub. The roadmap includes more hands-on work
                with the same stack serious teams use.
              </p>
              <Link
                href="/labs"
                className="inline-flex items-center gap-2 text-pugh-blue font-medium text-sm hover:text-white transition-colors"
              >
                Learn more about Labs
                <ArrowRight size={14} />
              </Link>
            </SlideIn>

            <SlideIn direction="right">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8">
                <p className="text-white/60 font-display font-semibold text-sm mb-4">The stack</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Claude Code',
                    'Next.js',
                    'Tailwind CSS',
                    'GitHub Actions',
                    'Google Workspace',
                    'Playwright',
                  ].map((tool) => (
                    <div
                      key={tool}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center"
                    >
                      <p className="text-white/70 text-sm font-medium">{tool}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── EXPLORE AI ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
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
                Each tool includes what it does, who makes it, and what you can do with it.
                Straightforward descriptions written by club members.
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

      {/* ─── TEAM ─── */}
      <section className="py-14 md:py-20 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3 text-center">
              Our Team
            </p>
            <h2
              className="font-display text-navy font-bold leading-tight mb-4 text-center"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
            >
              {teamSemester} executive board
            </h2>
            <p className="text-text-muted text-center max-w-lg mx-auto mb-10">
              We are building something new and want more people involved.
            </p>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <AnimatedCard className="bg-white rounded-2xl p-6 border border-border text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-navy/[0.06] ring-2 ring-border ring-offset-2 ring-offset-white">
                    {member.photo ? (
                      <Image
                        src={assetPath(member.photo)}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-navy text-xl font-semibold">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-display font-semibold text-navy text-sm">{member.name}</p>
                  <p className="text-text-muted text-xs mt-1">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-link hover:text-link-hover mt-2 inline-block transition-colors"
                  >
                    {member.email}
                  </a>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-beaver-blue/20 to-transparent mb-14" />
          <div className="text-center">
            <FadeIn>
              <h2
                className="font-display text-navy font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Ready to get involved?
              </h2>
              <p className="text-text-muted mb-10 max-w-md mx-auto">
                Join the GroupMe or sign up for the mailing list. Regular meetings begin Fall 2026
                at Penn State. Open to all students.
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
        </div>
      </section>
    </>
  )
}

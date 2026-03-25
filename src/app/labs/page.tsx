import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  Code2,
  Database,
  Bot,
  BrainCircuit,
  Blocks,
  Terminal,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'
import { LabsMailingListForm } from '@/components/LabsMailingListForm'
import { FloatingShapes } from '@/components/ui/FloatingShapes'

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Applied AI Labs is where Penn State students build real things with AI. Join us.',
}

const stack = [
  { name: 'Claude Code', icon: Terminal, desc: 'AI-powered development and automation' },
  { name: 'Next.js + React', icon: Code2, desc: 'Modern web apps with static export' },
  { name: 'Tailwind CSS', icon: Blocks, desc: 'Design systems with brand tokens' },
  { name: 'GitHub Actions', icon: Bot, desc: 'CI/CD, deploy, and automation pipelines' },
  { name: 'Google Workspace', icon: Database, desc: 'Sheets, Docs, and Apps Script integrations' },
  { name: 'Playwright', icon: BrainCircuit, desc: 'Testing, screenshots, and visual QA' },
]

export default function LabsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy to-beaver-blue text-white py-32 md:py-40">
        {/* 3D floating shapes */}
        <FloatingShapes />

        {/* Ambient glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pugh-blue/[0.1] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] rounded-full bg-pa-sky/[0.08] blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pointer-events-none">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-4">
              Applied AI Labs
            </p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Where students build with AI,
              <br />
              not just learn about it
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              Labs is the research and development arm of Applied AI. We run experiments, build
              tools, and give members who want to go deeper a place to work on real projects with
              real AI systems.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="pointer-events-auto">
              <LabsMailingListForm />
              <p className="mt-4 text-white/40 text-xs">
                Sign up to get notified when Labs is accepting new members.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHAT LABS DOES ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
                How it works
              </p>
              <h2
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}
              >
                Ideas in, projects out
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We collect ideas from students, faculty, and partners about how AI is being used at
                Penn State and store every submission in a structured database that grows across
                semesters.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Members who want to go deeper can get hands-on with the tools and concepts shaping
                the field. You pick a project, form a team, and build it.
              </p>
              <p className="text-text-muted leading-relaxed">
                No prior experience required. If you are curious and want to learn by doing, Labs is
                the place.
              </p>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Submit an idea',
                    desc: 'Anyone can propose a project. We track every idea in a shared database.',
                  },
                  {
                    step: '02',
                    title: 'Form a team',
                    desc: 'Pick a project that interests you and work with other members.',
                  },
                  {
                    step: '03',
                    title: 'Build it',
                    desc: 'Use real tools, real APIs, real data. Ship something that works.',
                  },
                ].map((item) => (
                  <AnimatedCard
                    key={item.step}
                    className="bg-surface-alt rounded-xl p-6 border border-border flex gap-5"
                  >
                    <span className="font-display text-beaver-blue/30 text-3xl font-bold leading-none mt-1">
                      {item.step}
                    </span>
                    <div>
                      <p className="font-display text-navy font-semibold mb-1">{item.title}</p>
                      <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── THE STACK ─── */}
      <section className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
                The Stack
              </p>
              <h2
                className="font-display text-navy font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                What you will work with
              </h2>
              <p className="text-text-muted max-w-lg mx-auto">
                The same tools and techniques used in production AI systems. Hands-on, not
                theoretical.
              </p>
            </div>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stack.map((tool) => {
              const Icon = tool.icon
              return (
                <StaggerItem key={tool.name}>
                  <AnimatedCard className="bg-white rounded-2xl border border-border p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-navy/[0.06] flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-navy" />
                    </div>
                    <div>
                      <p className="font-display text-navy font-semibold text-sm">{tool.name}</p>
                      <p className="text-text-muted text-xs mt-1">{tool.desc}</p>
                    </div>
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── WHAT WE'VE BUILT ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
              What we have built
            </p>
            <h2
              className="font-display text-navy font-bold leading-tight mb-14"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Projects from Labs
            </h2>
          </FadeIn>

          <SlideIn direction="left">
            <AnimatedCard className="bg-gradient-to-br from-navy to-beaver-blue rounded-2xl p-8 md:p-12 text-white shadow-xl shadow-navy/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-4">
                    Project 01
                  </p>
                  <p className="font-display text-2xl md:text-3xl font-bold mb-4">Student AI Hub</p>
                  <p className="text-white/70 leading-relaxed mb-6">
                    A student-built resource covering AI in business, school, and professional life.
                    Ten interactive modules for every Smeal major, built from 22 foundational
                    sources using Codex, AI-assisted scraping, and modern web tools.
                  </p>
                  <a
                    href="https://andysalvo.github.io/smealstudentaihub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-pugh-blue font-medium text-sm hover:text-white transition-colors"
                  >
                    Visit the Hub
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                      Built with
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js', 'React', 'Tailwind', 'MDX', 'GitHub Pages', 'Pexels API'].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-white/10 px-3 py-1.5 rounded-full text-white/80 font-medium"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                      By the numbers
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-display text-xl font-bold">10</p>
                        <p className="text-white/50 text-xs">Modules</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold">162</p>
                        <p className="text-white/50 text-xs">Concepts</p>
                      </div>
                      <div>
                        <p className="font-display text-xl font-bold">22</p>
                        <p className="text-white/50 text-xs">Sources</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </SlideIn>

          <FadeIn delay={0.2}>
            <p className="text-center text-text-muted text-sm mt-10">
              More projects coming. Want to build the next one?
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-navy to-beaver-blue text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-pugh-blue/[0.1] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="font-display font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Build something real
            </h2>
            <p className="text-white/60 text-lg max-w-md mx-auto mb-12">
              Labs is where you go from learning about AI to building with it. No gatekeeping. Just
              projects.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <LabsMailingListForm />
            <p className="mt-4 text-white/40 text-xs">
              Sign up to get notified when Labs is accepting new members.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">
                Back to Applied AI
              </Link>
              <span className="hidden sm:inline text-white/20">|</span>
              <Link href="/explore" className="hover:text-white transition-colors">
                Explore AI tools
              </Link>
              <span className="hidden sm:inline text-white/20">|</span>
              <a
                href="mailto:appliedaipsu@gmail.com"
                className="hover:text-white transition-colors"
              >
                appliedaipsu@gmail.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

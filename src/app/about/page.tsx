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
import { ParallaxText } from '@/components/ui/ParallaxText'
import { team, teamSemester } from '@/data/team'
import { FAQStructuredData } from '@/components/FAQStructuredData'

export const metadata: Metadata = {
  title: 'About the Applied AI Club',
  description:
    'What the Applied AI Club at Penn State does: guest speakers, hands-on workshops, case competitions, and Applied AI Labs. Open to every Penn State student regardless of major or experience.',
  alternates: { canonical: 'https://appliedaipennstate.com/about' },
  openGraph: {
    title: 'About the Applied AI Club at Penn State',
    description:
      'Guest speakers, hands-on workshops, case competitions, and Applied AI Labs. Open to every Penn State student.',
    url: 'https://appliedaipennstate.com/about',
  },
}

const aboutFaqs = [
  {
    question: 'Is there an AI club at Penn State?',
    answer:
      'Yes. The Applied AI Club at Penn State is a student organization that runs guest speakers, hands-on workshops, case competitions, and a Labs program where members build real applications with AI. It is open to every Penn State student regardless of major or prior experience.',
  },
  {
    question: 'How do I join the Applied AI Club at Penn State?',
    answer:
      'Join the mailing list at appliedaipennstate.com, add the club GroupMe, or come to the next general meeting. There is no application or prior experience required. The first general meeting is April 20, 2026, and regular meetings begin Fall 2026.',
  },
  {
    question: 'When does the Applied AI Club meet?',
    answer:
      'The first general meeting is April 20, 2026, at 6:00 PM. Regular meetings begin Fall 2026 at Penn State University Park.',
  },
  {
    question: 'Who can join the Applied AI Club at Penn State?',
    answer:
      'Every Penn State student is welcome regardless of major, college, or AI experience. Members come from Smeal, Engineering, Liberal Arts, IST, and across the university. Whether you have never used AI before or build applications with it already, there is a place for you.',
  },
  {
    question: 'What is Applied AI Labs?',
    answer:
      'Applied AI Labs is the project track of the Applied AI Club. Members form teams to build real applications with AI using industry-standard development workflows including Claude Code, Next.js, GitHub Actions, and Playwright. The first Labs project is the Student AI Hub.',
  },
  {
    question: 'Does Penn State have an AI student organization?',
    answer:
      'Yes. The Applied AI Club at Penn State is a student organization focused on helping students learn how AI shows up in professional work and giving them hands-on experience using it.',
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      <FAQStructuredData faqs={aboutFaqs} />
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
              What we do
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Most of our members are still early in their exposure to how AI shows up in
              professional settings. We run guest speaker sessions, hands-on workshops, and case
              competitions where members work through real business problems using AI. For members
              who want to go deeper, our Labs program takes on full application builds using
              industry-standard development workflows.
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
                Guest Speakers, Workshops, and Competitions
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We bring in professionals from all fields to share how AI has changed the way they
                work. We also run hands-on workshops and case competitions where members work
                through real business problems using AI. Open to all Penn State students regardless
                of major or experience.
              </p>
              <p className="text-text-muted leading-relaxed">
                Guest speakers help bridge the gap between what students learn in the classroom and
                what professionals work with every day. Regular meetings begin Fall 2026.
              </p>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-4">
                {[
                  {
                    icon: Mic,
                    title: 'Guest speakers',
                    desc: 'Professionals from all fields share how AI has changed the way they work.',
                  },
                  {
                    icon: Wrench,
                    title: 'Hands-on workshops',
                    desc: 'Work directly with AI tools on real tasks. Learn by doing, not just watching.',
                  },
                  {
                    icon: Users,
                    title: 'Case competitions',
                    desc: 'Teams work through real business problems using AI and present their solutions.',
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
                For members who want to go deeper, Labs takes on full application builds using
                industry-standard development workflows. You pick a project, form a team, and ship
                it.
              </p>
              <p className="text-white/50 leading-relaxed mb-8">
                Our first project is the Student AI Hub. The roadmap includes more hands-on work
                with the same tools and workflows used in professional engineering teams.
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
                    {
                      name: 'Claude Code',
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Next.js',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.878.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Tailwind CSS',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'GitHub Actions',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Google Workspace',
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      ),
                    },
                    {
                      name: 'Playwright',
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                      ),
                    },
                  ].map((tool) => (
                    <div
                      key={tool.name}
                      className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3"
                    >
                      <div className="text-pugh-blue shrink-0">{tool.icon}</div>
                      <p className="text-white/70 text-sm font-medium">{tool.name}</p>
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
                We also maintain a registry of AI tools worth knowing, organized for students at
                every level. It is a good starting point if you are not sure what is out there.
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
                {[
                  'AI Assistants',
                  'Research Tools',
                  'Developer Tools',
                  'Creative Tools',
                  'Local Models',
                  'Code Editors',
                ].map((cat) => (
                  <div
                    key={cat}
                    className="bg-white rounded-xl p-4 border border-border text-center"
                  >
                    <p className="font-display text-navy text-sm font-semibold">{cat}</p>
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

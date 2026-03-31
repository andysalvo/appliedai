import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ExternalLink, MessageCircle, Mail, CheckCircle2 } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import { FadeIn } from '@/components/ui/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'
import { team, teamSemester } from '@/data/team'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the Applied AI executive board and learn how to get involved.',
}

export default function TeamPage() {
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
              Our Team
            </p>
            <h1
              className="font-display text-white font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Meet the board
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              {teamSemester} executive board. We are building something new and want more people
              involved.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── TEAM GRID ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <AnimatedCard className="bg-white rounded-2xl p-8 border border-border text-center">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-navy/[0.06] ring-2 ring-border ring-offset-2 ring-offset-white">
                    {member.photo ? (
                      <Image
                        src={assetPath(member.photo)}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-navy text-2xl font-semibold">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-display font-semibold text-navy text-base">{member.name}</p>
                  <p className="text-text-muted text-sm mt-1">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-link hover:text-link-hover mt-3 inline-block transition-colors"
                  >
                    {member.email}
                  </a>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── HOW TO JOIN ─── */}
      <section className="bg-navy relative overflow-hidden py-14 md:py-20 text-white">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute top-0 left-[10%] right-[10%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-beaver-blue/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-3">
                Get Involved
              </p>
              <h2
                className="font-display font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                How to join Applied AI
              </h2>
              <p className="text-white/60 max-w-lg mx-auto">
                Open to all Penn State students. Three steps to get started.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            <StaggerGrid className="space-y-6">
              <StaggerItem>
                <AnimatedCard className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex gap-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MessageCircle size={24} className="text-pugh-blue" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold mb-2">
                      Step 1: Join the GroupMe
                    </p>
                    <p className="text-white/60 leading-relaxed mb-4">
                      This is where everything will happen starting Fall 2026. Announcements,
                      meeting info, project updates, and general discussion all go through GroupMe.
                    </p>
                    <PressableButton
                      href="https://groupme.com/join_group/111640691/x4UBh7SL"
                      className="inline-flex items-center gap-2 bg-white text-navy px-6 py-3 rounded-xl font-semibold text-sm"
                    >
                      Join the GroupMe
                      <ExternalLink size={14} />
                    </PressableButton>
                  </div>
                </AnimatedCard>
              </StaggerItem>

              <StaggerItem>
                <AnimatedCard className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex gap-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} className="text-pugh-blue" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold mb-2">
                      Step 2: Register on Discover
                    </p>
                    <p className="text-white/60 leading-relaxed mb-4">
                      Officially join the club through Penn State Discover, the university org
                      management platform.
                    </p>
                    <PressableButton
                      href="https://discover.psu.edu/organization/appliedai"
                      className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm"
                    >
                      Register on Discover
                      <ExternalLink size={14} />
                    </PressableButton>
                  </div>
                </AnimatedCard>
              </StaggerItem>

              <StaggerItem>
                <AnimatedCard className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex gap-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="font-display text-pugh-blue text-lg font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold mb-2">
                      Step 3: Follow the pinned message
                    </p>
                    <p className="text-white/60 leading-relaxed">
                      The pinned message in GroupMe has instructions for getting started. Regular
                      meetings begin Fall 2026 at Penn State. Open to all students regardless of
                      major or experience.
                    </p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="font-display text-navy font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Questions?
            </h2>
            <p className="text-text-muted mb-8 max-w-md mx-auto">
              Reach out to any board member directly or email the club.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PressableButton
                href="mailto:appliedaipsu@gmail.com"
                className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
              >
                <Mail size={16} />
                appliedaipsu@gmail.com
              </PressableButton>
              <PressableButton
                href="https://www.linkedin.com/company/penn-state-applied-ai-club/"
                className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
              >
                LinkedIn
                <ExternalLink size={14} />
              </PressableButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

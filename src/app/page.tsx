import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, FlaskConical, Compass, Mic, Mail } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { PressableButton } from '@/components/ui/PressableButton'
import { ParallaxText } from '@/components/ui/ParallaxText'
import { MailingListForm } from '@/components/MailingListForm'
import { MailingListFormLight } from '@/components/MailingListFormLight'

const sections = [
  {
    icon: Calendar,
    title: 'Guest Speakers and Workshops',
    description:
      'We bring in professionals to share how AI shows up in their work, and we run hands-on workshops and case competitions where members work through real problems.',
    href: '/about',
    cta: 'Learn more',
  },
  {
    icon: FlaskConical,
    title: 'Applied AI Labs',
    description:
      'For members who want to go deeper. Labs takes on full application builds using industry-standard development workflows.',
    href: '/labs',
    cta: 'Explore Labs',
  },
  {
    icon: Compass,
    title: 'Explore AI',
    description:
      'A registry of AI tools worth knowing, organized for students at every level. Straightforward descriptions of what each tool does and why it matters.',
    href: '/explore',
    cta: 'Browse tools',
  },
]

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-navy min-h-[60vh] flex items-center">
        {/* Gradient accent glow matching logo bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[120px] bg-gradient-to-r from-beaver-blue/20 via-pa-sky/15 to-pugh-blue/10 blur-[80px]" />
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-beaver-blue/10 blur-[150px]" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-24 w-full text-center">
          <FadeIn>
            <Image
              src={assetPath('/images/logo.png')}
              alt="Applied AI"
              width={822}
              height={205}
              className="w-[min(80vw,420px)] h-auto mx-auto brightness-0 invert"
              priority
            />
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mt-5 text-white/50 text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
              <RevealText
                text="Where Penn State students learn to think with AI."
                className="text-white/50"
                delay={0.3}
              />
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <PressableButton
                href="/team"
                className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-xl font-semibold text-sm"
              >
                Get involved
                <ArrowRight size={16} />
              </PressableButton>
              <PressableButton
                href="/explore"
                className="inline-flex items-center gap-2 border border-white/15 text-white/80 px-8 py-4 rounded-xl font-medium text-sm hover:bg-white/[0.06]"
              >
                Explore AI tools
              </PressableButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-6">
              Our Mission
            </p>
          </FadeIn>
          <ParallaxText offset={15}>
            <p
              className="font-display text-navy font-semibold leading-snug"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Build a community where students learn how AI is showing up in professional settings
              and get hands-on experience working with it.
            </p>
          </ParallaxText>
          <FadeIn delay={0.15}>
            <p className="mt-8 text-text-muted text-base leading-relaxed max-w-xl mx-auto">
              Most of our members are still early in their exposure to how AI shows up in
              professional settings. We run guest speaker sessions, hands-on workshops, and case
              competitions to help bridge that gap. Regular meetings begin Fall 2026.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── GRADIENT DIVIDER ─── */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-beaver-blue/20 to-transparent" />
      </div>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3 text-center">
              What We Do
            </p>
          </FadeIn>
          <ParallaxText offset={10}>
            <h2
              className="font-display text-navy font-bold leading-tight mb-14 text-center"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              How we spend our time
            </h2>
          </ParallaxText>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <StaggerItem key={section.title}>
                  <Link href={section.href} className="block h-full">
                    <div className="bg-white rounded-2xl border border-border px-8 py-10 h-full hover:shadow-lg hover:border-beaver-blue/20 transition-all cursor-pointer group">
                      <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center mb-6 group-hover:bg-beaver-blue/[0.08] transition-colors">
                        <Icon size={22} className="text-beaver-blue" />
                      </div>
                      <h3 className="font-display text-navy text-lg font-semibold mb-4">
                        {section.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {section.description}
                      </p>
                      <p className="mt-8 text-beaver-blue text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        {section.cta} <ArrowRight size={12} />
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── SPEAKERS ─── */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute top-0 left-[15%] right-[15%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    <Mic size={20} className="text-pugh-blue" />
                  </div>
                  <p className="text-pugh-blue text-xs uppercase tracking-widest font-semibold">
                    Guest Speaker Program
                  </p>
                </div>
                <h2 className="font-display text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
                  Share what AI looks like in your work
                </h2>
                <p className="text-white/40 leading-relaxed mb-8">
                  We bring in professionals from all fields who can talk honestly about how AI has
                  changed the way they work. 30 to 45 minutes, Zoom or in person.
                </p>
                <PressableButton
                  href="/speakers"
                  className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-xl font-semibold text-sm"
                >
                  Apply to speak
                  <ArrowRight size={14} />
                </PressableButton>
              </div>
              <div className="flex-1 w-full max-w-sm">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                  <p className="text-white/60 font-display font-semibold text-sm mb-4">
                    Topics our members want to hear about
                  </p>
                  <div className="space-y-3">
                    {[
                      'What "using AI at work" actually looks like',
                      'How AI changed the way you do your job',
                      'What students should know before entering the workforce',
                      'Lessons from adopting AI in your team or company',
                      'How to talk about AI skills in interviews',
                    ].map((topic) => (
                      <div key={topic} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-pa-sky mt-2 shrink-0" />
                        <p className="text-white/40 text-sm">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pugh-blue via-pa-sky to-beaver-blue" />
      </section>

      {/* ─── JOIN ─── */}
      <section id="join" className="py-16 md:py-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-14 h-14 rounded-2xl bg-surface-alt flex items-center justify-center mx-auto mb-6">
              <Mail size={24} className="text-beaver-blue" />
            </div>
            <h2
              className="font-display text-navy font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Stay in the loop
            </h2>
            <p className="text-text-muted mb-12">
              Add your info and we will keep you updated on events, launches, and how to get
              involved.
            </p>

            <MailingListFormLight />

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-text-muted">
              <a
                href="https://groupme.com/join_group/111640691/x4UBh7SL"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-navy transition-colors"
              >
                Students: Join our GroupMe
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a href="mailto:appliedaipsu@gmail.com" className="hover:text-navy transition-colors">
                appliedaipsu@gmail.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

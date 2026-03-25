import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Calendar, FlaskConical, Compass } from 'lucide-react'
import { assetPath } from '@/lib/assetPath'
import { FadeIn } from '@/components/ui/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'
import { MailingListForm } from '@/components/MailingListForm'

const sections = [
  {
    icon: Calendar,
    title: 'Events and Programming',
    description:
      'Guest speakers, tool walkthroughs, and discussions about how AI is changing business and the workplace. Starting Fall 2026 at Penn State.',
    href: '/what-we-do',
    accent: 'border-t-navy',
    iconBg: 'bg-navy/[0.08]',
    cta: 'Learn more',
  },
  {
    icon: FlaskConical,
    title: 'Applied AI Labs',
    description:
      'The R&D arm of the club. Build real projects with Claude Code, Next.js, GitHub Actions, and the same tools real teams ship with.',
    href: '/labs',
    accent: 'border-t-beaver-blue',
    iconBg: 'bg-beaver-blue/[0.08]',
    cta: 'Explore Labs',
  },
  {
    icon: Compass,
    title: 'Explore AI',
    description:
      'A registry of AI tools worth knowing, organized for students at every level. From beginner-friendly assistants to agentic tools shaping the industry.',
    href: '/explore',
    accent: 'border-t-pugh-blue',
    iconBg: 'bg-pugh-blue/[0.15]',
    cta: 'Browse tools',
  },
]

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden py-36 md:py-44 lg:py-52">
        <div className="absolute top-[-15%] right-[-8%] w-[500px] h-[500px] rounded-full bg-pugh-blue/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-pa-sky/[0.03] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #001E44 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <FadeIn>
              <Image
                src={assetPath('/images/logo.png')}
                alt="Applied AI"
                width={840}
                height={241}
                className="w-[min(65vw,380px)] h-auto"
                priority
              />
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-10 text-text-muted text-lg md:text-xl leading-relaxed max-w-md tracking-wide">
                Where Penn State students learn to think with AI.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mt-12 flex flex-wrap justify-center gap-4">
                <PressableButton
                  href="/team"
                  className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
                >
                  Get involved
                  <ArrowRight size={16} />
                </PressableButton>
                <PressableButton
                  href="/explore"
                  className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
                >
                  Explore AI tools
                </PressableButton>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={20} className="text-text-muted/40" />
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-6">
                Our Mission
              </p>
              <div className="border-l-4 border-beaver-blue pl-6 md:pl-8">
                <p
                  className="font-display text-navy font-semibold leading-snug"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  Our mission is to build a community where students can learn how AI is applied in
                  real-world settings and explore the many ways it creates value in different areas
                  of business.
                </p>
              </div>
              <p className="mt-8 text-text-muted text-base leading-relaxed max-w-2xl">
                The Applied AI Club at Penn State brings together students who are curious about AI
                and want to learn and build together. Regular meetings and events begin Fall 2026.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
              What We Do
            </p>
            <h2
              className="font-display text-navy font-bold leading-tight mb-14"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Three ways to get involved
            </h2>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <StaggerItem key={section.title}>
                  <Link href={section.href} className="block h-full">
                    <AnimatedCard
                      className={`bg-white rounded-2xl border-t-[3px] ${section.accent} border border-border px-8 py-10 h-full cursor-pointer shadow-sm`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center mb-6`}
                      >
                        <Icon size={22} className="text-navy" />
                      </div>
                      <h3 className="font-display text-navy text-lg font-semibold mb-4">
                        {section.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {section.description}
                      </p>
                      <p className="mt-8 text-beaver-blue text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        {section.cta} <ArrowRight size={12} />
                      </p>
                    </AnimatedCard>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── JOIN ─── */}
      <section id="join" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
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

              <MailingListForm />

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
                <a
                  href="mailto:appliedaipsu@gmail.com"
                  className="hover:text-navy transition-colors"
                >
                  appliedaipsu@gmail.com
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Laptop,
  Palette,
  GitBranch,
  BookOpen,
  Brain,
  Shield,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'

export const metadata: Metadata = {
  title: 'Get Equipped',
  description:
    'Free AI and software tools available to every Penn State student with a psu.edu email.',
}

const freeTools = [
  {
    icon: Brain,
    title: 'Microsoft Copilot',
    description:
      "Penn State's approved AI assistant. Available to all students through your Penn State Microsoft account. Use it for writing, research, data analysis, and brainstorming.",
    link: 'https://copilot.microsoft.com/',
    linkText: 'Open Copilot',
    how: 'Sign in with your psu.edu email at copilot.microsoft.com',
    accent: 'bg-navy/[0.06]',
  },
  {
    icon: Laptop,
    title: 'Microsoft 365',
    description:
      'Full Office suite including Word, Excel, PowerPoint, OneNote, and Teams. Install on up to 5 devices or use in the browser.',
    link: 'https://office365.psu.edu/',
    linkText: 'Get Office 365',
    how: 'Visit office365.psu.edu and sign in with your Penn State credentials',
    accent: 'bg-beaver-blue/[0.06]',
  },
  {
    icon: Palette,
    title: 'Adobe Creative Cloud',
    description:
      'The full Adobe suite at no cost. Photoshop, Illustrator, Premiere Pro, After Effects, Lightroom, and everything else in Creative Cloud.',
    link: 'https://softwarerequest.psu.edu/',
    linkText: 'Request Adobe CC',
    how: 'Go to softwarerequest.psu.edu and search for Adobe',
    accent: 'bg-pugh-blue/[0.12]',
  },
  {
    icon: GitBranch,
    title: 'GitHub Student Developer Pack',
    description:
      'Free GitHub Copilot, free domains, $100 Azure credits, Canva Pro, and 20+ developer tools. Over $12,000 in value, free for students.',
    link: 'https://education.github.com/pack',
    linkText: 'Get the pack',
    how: 'Apply at education.github.com/pack with your psu.edu email',
    accent: 'bg-pa-sky/[0.08]',
  },
  {
    icon: BookOpen,
    title: 'LinkedIn Learning',
    description:
      'Thousands of video courses on AI, programming, design, business, and more. Free for all Penn State students and faculty.',
    link: 'https://www.linkedin.com/learning/',
    linkText: 'Start learning',
    how: 'Sign in through Penn State SSO at LinkedIn Learning',
    accent: 'bg-navy/[0.06]',
  },
  {
    icon: Laptop,
    title: 'WebApps (MATLAB, SAS, more)',
    description:
      'Access lab software from your browser. MATLAB, Mathematica, Minitab, SolidWorks, SAS, ArcGIS, and Microsoft Office without installing anything.',
    link: 'https://webapps.psu.edu/',
    linkText: 'Open WebApps',
    how: 'Visit webapps.psu.edu and sign in with your Penn State account',
    accent: 'bg-beaver-blue/[0.06]',
  },
]

export default function GetEquippedPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[300px] h-[300px] rounded-full bg-navy/[0.03] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
                Get Equipped
              </p>
              <h1
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
              >
                What you already have access to
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                Penn State students get a lot of tools for free that most people pay for. AI
                assistants, creative software, developer tools, and learning platforms. All you need
                is your psu.edu email.
              </p>
              <p className="text-text-muted leading-relaxed">
                We put this page together because most students do not know half of this exists.
                None of these are affiliated with Applied AI. They are just resources that every
                Penn State student should know about.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── TOOLS GRID ─── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {freeTools.map((tool) => {
              const Icon = tool.icon
              return (
                <StaggerItem key={tool.title}>
                  <AnimatedCard className="bg-white rounded-2xl border border-border p-8 h-full">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl ${tool.accent} flex items-center justify-center shrink-0`}
                      >
                        <Icon size={22} className="text-navy" />
                      </div>
                      <div>
                        <h2 className="font-display text-navy text-lg font-semibold">
                          {tool.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed mb-5">
                      {tool.description}
                    </p>

                    <div className="bg-surface-alt rounded-lg p-4 mb-5">
                      <p className="text-xs uppercase tracking-widest text-beaver-blue/50 font-semibold mb-1.5">
                        How to get it
                      </p>
                      <p className="text-text-muted text-sm">{tool.how}</p>
                    </div>

                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-beaver-blue text-xs uppercase tracking-wider font-semibold hover:text-navy transition-colors"
                    >
                      {tool.linkText} <ExternalLink size={11} />
                    </a>
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── PSU AI HUB ─── */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-pugh-blue/[0.03] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <SlideIn direction="left">
              <div className="w-14 h-14 rounded-xl bg-navy/[0.08] flex items-center justify-center mb-6">
                <GraduationCap size={26} className="text-navy" />
              </div>
              <h2
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                Penn State AI resources
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                Penn State has its own AI Hub with guidelines, research consulting, and an AI
                Literacy Framework. If you want to understand the university&apos;s approach to AI,
                start here.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                The IT Learning and Development team also offers one-on-one AI Guide consultations
                if you want help getting started with any of these tools.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://ai.psu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-beaver-blue font-medium text-sm hover:text-navy transition-colors"
                >
                  Penn State AI Hub <ExternalLink size={14} />
                </a>
                <span className="text-border">|</span>
                <a
                  href="https://itld.psu.edu/ai-guides/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-beaver-blue font-medium text-sm hover:text-navy transition-colors"
                >
                  AI Guides <ExternalLink size={14} />
                </a>
                <span className="text-border">|</span>
                <a
                  href="https://ai.psu.edu/guidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-beaver-blue font-medium text-sm hover:text-navy transition-colors"
                >
                  AI Guidelines <ExternalLink size={14} />
                </a>
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <AnimatedCard className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-5">
                  <Shield size={20} className="text-beaver-blue" />
                  <p className="font-display text-navy font-semibold">A note on responsible use</p>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Penn State has clear guidelines on using AI tools in coursework. The rules depend
                  on the class and the instructor. When in doubt, check your syllabus or ask.
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Applied AI is about understanding these tools, not about shortcuts. We encourage
                  responsible, transparent use of AI in everything we do.
                </p>
              </AnimatedCard>
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
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Now explore what is out there
            </h2>
            <p className="text-text-muted mb-10 max-w-md mx-auto">
              Penn State gives you the foundation. The wider AI ecosystem has even more. We track
              the best tools on our Explore AI page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PressableButton
                href="/explore"
                className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
              >
                Explore AI tools
                <ArrowRight size={16} />
              </PressableButton>
              <PressableButton
                href="/team"
                className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
              >
                Join the club
              </PressableButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

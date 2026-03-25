import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ExternalLink,
  ArrowRight,
  MessageSquare,
  Brain,
  Search,
  Blocks,
  HardDrive,
  Code2,
  Layers,
  Terminal,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'
import { tools, categories } from '@/data/tools'

export const metadata: Metadata = {
  title: 'Explore AI',
  description: 'A list of essential AI tools worth knowing, organized for students at every level.',
}

const toolIcons: Record<string, typeof MessageSquare> = {
  ChatGPT: MessageSquare,
  Claude: Brain,
  Perplexity: Search,
  Openclaw: Blocks,
  Ollama: HardDrive,
  Cursor: Code2,
  v0: Layers,
  Codex: Terminal,
}

export default function ExplorePage() {
  const grouped = {
    assistant: tools.filter((t) => t.category === 'assistant'),
    research: tools.filter((t) => t.category === 'research'),
    developer: tools.filter((t) => t.category === 'developer'),
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-pugh-blue/[0.04] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-8%] w-[300px] h-[300px] rounded-full bg-pa-sky/[0.03] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
                Explore AI
              </p>
              <h1
                className="font-display text-navy font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
              >
                Align yourself
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-4">
                AI is moving fast. These are the tools worth knowing right now, organized by what
                you want to do with them. No hype. Just honest descriptions of what each tool does
                and why it matters.
              </p>
              <p className="text-text-muted leading-relaxed">
                Whether you are writing a paper, building an app, or just trying to understand what
                everyone is talking about, start here.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── AI ASSISTANTS ─── */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div
                className={`w-10 h-10 rounded-lg ${categories.assistant.bg} flex items-center justify-center`}
              >
                <MessageSquare size={18} className="text-navy" />
              </div>
              <div>
                <h2 className="font-display text-navy text-xl font-semibold">
                  {categories.assistant.label}
                </h2>
                <p className="text-text-muted text-sm">
                  Chat with AI. Ask questions, write, brainstorm, analyze.
                </p>
              </div>
            </div>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grouped.assistant.map((tool) => (
              <StaggerItem key={tool.name}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── RESEARCH ─── */}
      <section className="py-20 md:py-28 bg-surface-alt relative overflow-hidden">
        <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full bg-pugh-blue/[0.03] blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div
                className={`w-10 h-10 rounded-lg ${categories.research.bg} flex items-center justify-center`}
              >
                <Search size={18} className="text-beaver-blue" />
              </div>
              <div>
                <h2 className="font-display text-navy text-xl font-semibold">
                  {categories.research.label}
                </h2>
                <p className="text-text-muted text-sm">
                  Find information, verify sources, synthesize knowledge.
                </p>
              </div>
            </div>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grouped.research.map((tool) => (
              <StaggerItem key={tool.name}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── DEVELOPER TOOLS ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <div
                className={`w-10 h-10 rounded-lg ${categories.developer.bg} flex items-center justify-center`}
              >
                <Code2 size={18} className="text-navy" />
              </div>
              <div>
                <h2 className="font-display text-navy text-xl font-semibold">
                  {categories.developer.label}
                </h2>
                <p className="text-text-muted text-sm">
                  Write code, build apps, deploy agents. The tools Labs uses.
                </p>
              </div>
            </div>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grouped.developer.map((tool) => (
              <StaggerItem key={tool.name}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-surface-alt">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FadeIn>
            <h2
              className="font-display text-navy font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              Want to learn these tools hands-on?
            </h2>
            <p className="text-text-muted mb-10 max-w-md mx-auto">
              Labs members work with these tools on real projects. No lectures. Just building.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <PressableButton
                href="/labs"
                className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
              >
                Explore Labs
                <ArrowRight size={16} />
              </PressableButton>
              <PressableButton
                href="/team"
                className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
              >
                How to join
              </PressableButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const Icon = toolIcons[tool.name] || MessageSquare
  const cat = categories[tool.category]

  return (
    <AnimatedCard
      className={`bg-white rounded-2xl border-t-[3px] ${cat.accent} border border-border p-8 h-full`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${cat.bg} flex items-center justify-center`}>
            <Icon size={18} className="text-navy" />
          </div>
          <div>
            <h3 className="font-display text-navy text-lg font-semibold">{tool.name}</h3>
            <p className="text-text-muted text-xs">{tool.maker}</p>
          </div>
        </div>
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-beaver-blue transition-colors shrink-0 ml-4 mt-1"
          aria-label={`Visit ${tool.name}`}
        >
          <ExternalLink size={15} />
        </a>
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-6">{tool.description}</p>

      <div>
        <p className="text-xs uppercase tracking-widest text-beaver-blue/50 font-semibold mb-3">
          What you can do with it
        </p>
        <ul className="space-y-2">
          {tool.capabilities.map((cap) => (
            <li key={cap} className="text-sm text-text-muted flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
              {cap}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-6 text-beaver-blue text-xs uppercase tracking-wider font-semibold hover:text-navy transition-colors"
      >
        Try {tool.name} <ExternalLink size={11} />
      </a>
    </AnimatedCard>
  )
}

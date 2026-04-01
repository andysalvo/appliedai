'use client'

import { useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { FileText, BookOpen, Palette, PenTool, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { agents } from '@/data/agents'

type Tab = 'preview' | 'map' | 'compare'

const tabs: { id: Tab; label: string }[] = [
  { id: 'preview', label: 'Site Preview' },
  { id: 'map', label: 'Repo Map' },
  { id: 'compare', label: 'Compare' },
]

interface Artifact {
  id: string
  title: string
  icon: LucideIcon
  preview: string
  fullText: string
}

const artifacts: Artifact[] = [
  {
    id: 'mission',
    title: 'Mission Statement',
    icon: FileText,
    preview:
      'The Applied AI Club is a student organization at Penn State dedicated to helping students understand how AI is changing the way businesses operate.',
    fullText:
      'The Applied AI Club is a student organization at Penn State dedicated to helping students understand how AI is changing the way businesses operate. Membership is primarily based in the Smeal College of Business, though students from all colleges and majors are welcome.',
  },
  {
    id: 'speakers',
    title: 'Guest Speaker Program',
    icon: BookOpen,
    preview:
      'We are looking for professionals from any field whose work has been shaped by AI. 30-45 minutes including Q&A.',
    fullText:
      'We are looking for professionals from any field whose work has been shaped by AI. 30-45 minutes including Q&A, Zoom or in person at Penn State. Topics our members want to hear about: AI in consulting, how startups use AI, AI in finance, what using AI at work actually looks like.',
  },
  {
    id: 'voice',
    title: 'Voice Brief',
    icon: PenTool,
    preview:
      'No em dashes. No hype words (revolutionary, game-changing, cutting-edge). No parallel cadences.',
    fullText:
      "No em dashes. No hype words (revolutionary, game-changing, cutting-edge). No parallel cadences. Describe what exists. Use 'we' naturally. Hedging is fine. Ban 'curated'.",
  },
  {
    id: 'brand',
    title: 'Brand Guide',
    icon: Palette,
    preview:
      'Nittany Navy (#001E44) for headings and dark canvas. Beaver Blue (#1E407C) for buttons and links.',
    fullText:
      'Nittany Navy (#001E44) for headings and dark canvas. Beaver Blue (#1E407C) for buttons and links. Pugh Blue (#96BEE6) for secondary elements. PA Sky (#009CDE) for accents. Inter for body text, Roboto Slab for display headings.',
  },
]

function ExplainTip({ term, tip }: { term: string; tip: string }) {
  return (
    <span className="group/explain relative text-pa-sky underline decoration-dotted underline-offset-2 cursor-help whitespace-nowrap">
      {term}
      <span className="hidden group-hover/explain:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-navy text-white px-3.5 py-2.5 rounded-lg text-xs leading-relaxed w-60 z-50 shadow-lg pointer-events-none">
        {tip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-navy" />
      </span>
    </span>
  )
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = artifact.icon

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `[Context: ${artifact.title}] ${artifact.fullText}\n\n`)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      <m.div
        className="bg-white border border-border rounded-xl p-4 h-full"
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.02,
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-navy flex-shrink-0" />
          <h4 className="text-sm font-bold text-navy truncate">{artifact.title}</h4>
        </div>
        <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2 mb-3">
          {artifact.preview}
        </p>
        <span className="text-[10px] text-pa-sky font-medium">Drag to chat</span>
      </m.div>
    </div>
  )
}

function CollapsibleSection({
  title,
  colorClasses,
  children,
}: {
  title: React.ReactNode
  colorClasses: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2 ${colorClasses}`}
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}
        />
        {title}
      </button>
      {open && children}
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

function RepoMap() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full h-full bg-white rounded-lg border border-border p-6 overflow-y-auto">
        {/* Active Members */}
        <div className="mb-6">
          <h3 className="font-display text-base text-navy mb-0.5">
            Active Members{' '}
            <span className="text-pugh-blue font-normal text-sm">({agents.length})</span>
          </h3>
          <p className="text-[11px] text-text-muted mb-3">
            Everyone who contributes to the website
          </p>
          <div className="grid grid-cols-2 gap-3">
            {agents.map((agent) => (
              <div
                key={agent.email}
                className="bg-white border border-border rounded-lg px-3 py-2.5 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[11px] font-semibold">
                    {getInitials(agent.name)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-navy leading-tight truncate">
                      {agent.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  </div>
                  <span className="text-xs text-text-muted">{agent.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Documents - Artifact Cards */}
        <h3 className="font-display text-base text-navy mb-4">Club Documents</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {artifacts.map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </div>

        {/* Project Files - Collapsible sections */}
        <h3 className="font-display text-base text-navy mb-4">Project Files</h3>
        <div className="flex flex-col gap-3">
          <CollapsibleSection
            title={
              <>
                You Edit These (
                <ExplainTip
                  term="data files"
                  tip="These are simple lists that hold all the content on the site. You don't write code -- the agent edits these for you."
                />
                )
              </>
            }
            colorClasses="bg-green-100 text-green-800"
          >
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/data/agents.ts -{' '}
              <ExplainTip
                term="agent list"
                tip="Every club member who contributes gets an agent profile here. It tracks who you are, your role, and your work in the repo."
              />
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/data/tools.ts -{' '}
              <ExplainTip
                term="AI tools list"
                tip="The list of AI tools shown on the Explore page. Each entry has a name, description, category, and link."
              />
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/data/pillars.ts -{' '}
              <ExplainTip
                term="club programs"
                tip="The three pillars of the club: Events, Labs, and Explore AI. These rarely change."
              />
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={
              <>
                Pages (
                <ExplainTip
                  term="admin only"
                  tip="Only Andy and Ryan can edit page layouts. Regular contributors add content through the agent list and tools list."
                />
                )
              </>
            }
            colorClasses="bg-blue-100 text-blue-800"
          >
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/app/page.tsx - home
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/app/about/ - about us
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/app/explore/ - AI tools
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              src/app/agents/ - agent directory
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title={
              <>
                Don&apos;t Touch (
                <ExplainTip
                  term="infrastructure"
                  tip="These files control how the site is built, tested, and deployed. Changing them can break things. Leave them alone."
                />
                )
              </>
            }
            colorClasses="bg-surface text-text-muted"
          >
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              brand/ -{' '}
              <ExplainTip
                term="Penn State brand assets"
                tip="Official Penn State colors, fonts, and design rules. The site must follow these -- it's a student org requirement."
              />
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              content/ -{' '}
              <ExplainTip
                term="voice and writing rules"
                tip="Rules for how we write: no hype words, no em dashes, describe what exists. The agent enforces these automatically."
              />
            </div>
            <div className="px-3.5 py-1.5 pl-8 text-[11px] text-text-muted border-t border-border font-mono">
              .github/ -{' '}
              <ExplainTip
                term="CI/CD pipelines"
                tip="Automated checks that run when you submit changes. They test the code, check formatting, and deploy the site. You never need to touch these."
              />
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </LazyMotion>
  )
}

function CompareView() {
  return (
    <div className="flex w-full h-full gap-3">
      <div className="flex-1 rounded-lg overflow-hidden border border-border flex flex-col">
        <div className="px-3 py-2 text-[11px] font-semibold text-center bg-green-100 text-green-800">
          Live Site (appliedaipennstate.com)
        </div>
        <iframe
          src="https://appliedaipennstate.com"
          title="Live site"
          className="flex-1 w-full border-none"
        />
      </div>
      <div className="flex-1 rounded-lg overflow-hidden border border-border flex flex-col">
        <div className="px-3 py-2 text-[11px] font-semibold text-center bg-blue-100 text-blue-800">
          Your Changes (local)
        </div>
        <iframe src="/about/" title="Your local site" className="flex-1 w-full border-none" />
      </div>
    </div>
  )
}

export function PreviewPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('preview')

  return (
    <div id="previewPanel" className="flex-1 flex flex-col bg-surface relative z-5">
      {/* Tabs */}
      <div id="previewTabs" className="flex border-b border-border bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-[13px] font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-navy border-navy'
                : 'text-text-muted border-transparent hover:text-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div id="previewContent" className="flex-1 p-4 overflow-hidden relative">
        {activeTab === 'preview' && (
          <iframe
            id="previewIframe"
            src="https://appliedaipennstate.com"
            title="Live site preview"
            className="w-full h-full border border-border rounded-lg bg-white"
          />
        )}
        {activeTab === 'map' && <RepoMap />}
        {activeTab === 'compare' && <CompareView />}
      </div>
    </div>
  )
}

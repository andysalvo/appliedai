'use client'

import { useState, useEffect } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { FileText, BookOpen, Palette, PenTool, ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { agents } from '@/data/agents'

type Tab = 'preview' | 'map' | 'compare' | 'activity'

const tabs: { id: Tab; label: string }[] = [
  { id: 'activity', label: 'Activity' },
  { id: 'map', label: 'Repo Map' },
  { id: 'preview', label: 'Site Preview' },
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

type RepoView = 'home' | 'members' | 'documents' | 'files'

function RepoMapHome({ onNavigate }: { onNavigate: (view: RepoView) => void }) {
  return (
    <div className="flex flex-col gap-4 h-full justify-center">
      <h3 className="font-display text-lg text-navy text-center mb-2">Repo Map</h3>
      <button
        onClick={() => onNavigate('members')}
        className="bg-white border border-border rounded-xl p-5 text-left hover:border-beaver-blue transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-navy">Agent List</h4>
            <p className="text-[11px] text-text-muted mt-1">{agents.length} people in agents.ts</p>
          </div>
          <span className="text-text-muted text-lg">&rsaquo;</span>
        </div>
      </button>
      <button
        onClick={() => onNavigate('documents')}
        className="bg-white border border-border rounded-xl p-5 text-left hover:border-beaver-blue transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-navy">Club Documents</h4>
            <p className="text-[11px] text-text-muted mt-1">
              Mission, speakers, voice, brand — drag to chat
            </p>
          </div>
          <span className="text-text-muted text-lg">&rsaquo;</span>
        </div>
      </button>
      <button
        onClick={() => onNavigate('files')}
        className="bg-white border border-border rounded-xl p-5 text-left hover:border-beaver-blue transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-navy">Project Files</h4>
            <p className="text-[11px] text-text-muted mt-1">
              What you can edit, pages, and infrastructure
            </p>
          </div>
          <span className="text-text-muted text-lg">&rsaquo;</span>
        </div>
      </button>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-beaver-blue hover:text-navy transition-colors mb-4 flex items-center gap-1"
    >
      &lsaquo; Back
    </button>
  )
}

function MembersView({ onBack }: { onBack: () => void }) {
  const [members, setMembers] = useState<DashboardData['contributors']>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/workspace/api/dashboard')
      .then((r) => r.json())
      .then((d) => {
        setMembers(d.contributors || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="h-full flex flex-col">
      <BackButton onClick={onBack} />
      <h3 className="font-display text-base text-navy mb-0.5">
        Contributors{' '}
        <span className="text-pugh-blue font-normal text-sm">
          ({loading ? '...' : members.length})
        </span>
      </h3>
      <p className="text-[11px] text-text-muted mb-3">Everyone who has used the workspace</p>
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        {members.map((c, i) => (
          <details
            key={c.github_username}
            className={`group ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <summary className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-surface/50 list-none">
              <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[9px] font-semibold">
                  {c.display_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </span>
              </div>
              <span className="text-xs font-medium text-navy flex-1">{c.display_name}</span>
              <span className="text-[10px] text-text-muted">
                {c.session_count} session{c.session_count !== 1 ? 's' : ''}
              </span>
              <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
            </summary>
            <div className="px-3 pb-2.5 pt-1.5 border-t border-border/50 bg-surface/30 text-[10px] text-text-muted/60 space-y-1">
              <p>@{c.github_username}</p>
              {c.psu_email && <p>{c.psu_email}</p>}
              {c.contribution_summary && (
                <p className="text-[11px] text-text-muted">{c.contribution_summary}</p>
              )}
              {c.last_session_at && (
                <p>Last active: {new Date(c.last_session_at).toLocaleDateString()}</p>
              )}
            </div>
          </details>
        ))}
        {!loading && members.length === 0 && (
          <p className="text-xs text-text-muted py-6 text-center">No contributors yet.</p>
        )}
      </div>
      {/* Also show agents.ts roster for reference */}
      <h3 className="font-display text-sm text-navy mt-4 mb-1">
        Website Roster{' '}
        <span className="text-pugh-blue font-normal text-xs">({agents.length} in agents.ts)</span>
      </h3>
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        {agents.map((agent, i) => (
          <div
            key={agent.email}
            className={`flex items-center gap-2.5 px-3 py-2 ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <div className="w-6 h-6 rounded-full bg-navy/60 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[9px] font-semibold">{getInitials(agent.name)}</span>
            </div>
            <span className="text-xs text-navy flex-1">{agent.name}</span>
            <span className="text-[10px] text-text-muted">{agent.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <BackButton onClick={onBack} />
      <h3 className="font-display text-base text-navy mb-1">Club Documents</h3>
      <p className="text-[11px] text-text-muted mb-3">Drag any document to the chat for context</p>
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        {artifacts.map((a, i) => {
          const Icon = a.icon
          return (
            <details key={a.id} className={`group ${i > 0 ? 'border-t border-border' : ''}`}>
              <summary
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', `[Context: ${a.title}] ${a.fullText}\n\n`)
                  e.dataTransfer.effectAllowed = 'copy'
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-surface/50 list-none"
              >
                <Icon className="w-3.5 h-3.5 text-navy flex-shrink-0" />
                <span className="text-xs font-medium text-navy flex-1">{a.title}</span>
                <span className="text-[9px] text-pa-sky">drag to chat</span>
                <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-3 pb-3 pt-1.5 border-t border-border/50 bg-surface/30">
                <p className="text-[11px] leading-relaxed text-text-muted">{a.fullText}</p>
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}

function FilesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <BackButton onClick={onBack} />
      <h3 className="font-display text-base text-navy mb-4">Project Files</h3>
      <div className="flex flex-col gap-3">
        <CollapsibleSection
          title="You Edit These (data files)"
          colorClasses="bg-green-100 text-green-800"
        >
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/data/agents.ts</span>
            <span className="text-text-muted"> — the member directory on the site</span>
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/data/tools.ts</span>
            <span className="text-text-muted"> — AI tools on the Explore page</span>
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/data/programs.ts</span>
            <span className="text-text-muted"> — club programs (rarely changes)</span>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Pages (admin only)" colorClasses="bg-blue-100 text-blue-800">
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/app/page.tsx</span> — home
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/app/about/</span> — about us
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/app/explore/</span> — AI tools
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">src/app/agents/</span> — agent directory
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Don't Touch (infrastructure)"
          colorClasses="bg-surface text-text-muted"
        >
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">brand/</span> — Penn State colors, fonts, design rules
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">content/</span> — writing rules the agent enforces
          </div>
          <div className="px-3.5 py-2 pl-8 text-[11px] text-text-muted border-t border-border">
            <span className="font-mono">.github/</span> — automated checks and deploys
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}

function RepoMap() {
  const [view, setView] = useState<RepoView>('home')

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full h-full bg-white rounded-lg border border-border p-6">
        {view === 'home' && <RepoMapHome onNavigate={setView} />}
        {view === 'members' && <MembersView onBack={() => setView('home')} />}
        {view === 'documents' && <DocumentsView onBack={() => setView('home')} />}
        {view === 'files' && <FilesView onBack={() => setView('home')} />}
      </div>
    </LazyMotion>
  )
}

interface DashboardData {
  contributors: {
    github_username: string
    display_name: string
    psu_email: string
    interests: string[]
    skill_signals: string[]
    session_count: number
    last_session_at: string | null
    contribution_summary: string
    created_at: string
  }[]
  sessions: {
    id: string
    github_username: string
    started_at: string
    ended_at: string | null
    ideas_discussed: string[]
    tools_used: string[]
    changes_made: string[]
    files_modified: string[]
    pr_url: string | null
    conversation_summary: string
  }[]
  ideas: {
    id: string
    title: string
    category: string
    description: string
    github_username: string
    relevance_score: number
    votes: number
    endorsements: string[]
    created_at: string
  }[]
}

const categoryColors: Record<string, string> = {
  event: 'bg-pugh-blue/20 text-beaver-blue',
  project: 'bg-navy/10 text-navy',
  content: 'bg-amber-100 text-amber-800',
  outreach: 'bg-emerald-100 text-emerald-800',
  improvement: 'bg-violet-100 text-violet-800',
}

function PageNav({
  page,
  totalPages,
  onPage,
}: {
  page: number
  totalPages: number
  onPage: (p: number) => void
}) {
  return (
    <div className="flex items-center justify-between mt-3">
      <button
        onClick={() => onPage(Math.max(0, page - 1))}
        disabled={page === 0}
        className="text-[11px] font-medium text-beaver-blue disabled:text-text-muted/30 disabled:cursor-default hover:text-navy transition-colors"
      >
        Previous
      </button>
      <span className="text-[10px] text-text-muted">
        {page + 1} of {totalPages}
      </span>
      <button
        onClick={() => onPage(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
        className="text-[11px] font-medium text-beaver-blue disabled:text-text-muted/30 disabled:cursor-default hover:text-navy transition-colors"
      >
        Next
      </button>
    </div>
  )
}

type ActivitySection = 'ideas' | 'people' | 'sessions'

const PAGE_SIZE = 5

function ActivityView() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [section, setSection] = useState<ActivitySection>('ideas')
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetch('/workspace/api/dashboard')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted text-sm">
        Loading activity...
      </div>
    )
  }

  const active = data.contributors.filter((c) => c.session_count > 0).length
  const sections: { id: ActivitySection; label: string; count: number }[] = [
    { id: 'ideas', label: 'Ideas', count: data.ideas.length },
    { id: 'people', label: 'People', count: active },
    { id: 'sessions', label: 'Sessions', count: data.sessions.length },
  ]

  return (
    <div className="h-full flex flex-col">
      {/* Stats + section nav */}
      <div className="flex gap-2 mb-4">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSection(s.id)
              setPage(0)
            }}
            className={`flex-1 rounded-lg border p-3 text-left transition-colors ${
              section === s.id
                ? 'border-beaver-blue bg-beaver-blue/5'
                : 'border-border bg-white hover:border-beaver-blue/30'
            }`}
          >
            <p className="text-2xl font-semibold text-navy">{s.count}</p>
            <p
              className={`text-[10px] font-semibold uppercase tracking-wider ${
                section === s.id ? 'text-beaver-blue' : 'text-text-muted'
              }`}
            >
              {s.label}
            </p>
          </button>
        ))}
      </div>

      {/* Section content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          {section === 'ideas' &&
            (() => {
              const items = data.ideas.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
              const totalPages = Math.ceil(data.ideas.length / PAGE_SIZE)
              return (
                <>
                  <div className="rounded-lg border border-border bg-white overflow-hidden">
                    {items.map((idea, i) => (
                      <details
                        key={idea.id}
                        className={`group ${i > 0 ? 'border-t border-border' : ''}`}
                      >
                        <summary className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-surface/50 list-none">
                          <span
                            className={`flex-shrink-0 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${categoryColors[idea.category] || 'bg-gray-100 text-gray-600'}`}
                          >
                            {idea.category}
                          </span>
                          <span className="text-xs font-medium text-navy truncate flex-1">
                            {idea.title}
                          </span>
                          <span className="text-[10px] text-text-muted flex-shrink-0">
                            @{idea.github_username}
                          </span>
                          <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-3 pb-3 pt-2 border-t border-border/50 bg-surface/30 space-y-1.5">
                          <p className="text-[11px] leading-relaxed text-text-muted">
                            {idea.description}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-text-muted/60">
                            <span>Relevance: {idea.relevance_score}/5</span>
                            <span>Votes: {idea.votes}</span>
                            {idea.endorsements?.length > 0 && (
                              <span>Endorsed by: {idea.endorsements.join(', ')}</span>
                            )}
                            <span>Proposed: {new Date(idea.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </details>
                    ))}
                    {data.ideas.length === 0 && (
                      <p className="text-xs text-text-muted py-6 text-center">No ideas yet.</p>
                    )}
                  </div>
                  {totalPages > 1 && (
                    <PageNav page={page} totalPages={totalPages} onPage={setPage} />
                  )}
                </>
              )
            })()}

          {section === 'people' &&
            (() => {
              const items = data.contributors.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
              const totalPages = Math.ceil(data.contributors.length / PAGE_SIZE)
              return (
                <>
                  <div className="rounded-lg border border-border bg-white overflow-hidden">
                    {items.map((c, i) => (
                      <details
                        key={c.github_username}
                        className={`group ${i > 0 ? 'border-t border-border' : ''}`}
                      >
                        <summary className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-surface/50 list-none">
                          <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[9px] font-semibold">
                              {c.display_name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-medium text-navy">{c.display_name}</span>
                            <span className="text-[10px] text-text-muted ml-1.5">
                              {c.session_count} session{c.session_count !== 1 ? 's' : ''}
                            </span>
                          </div>
                          {c.interests.length > 0 && (
                            <span className="rounded bg-pugh-blue/15 px-1.5 py-0.5 text-[9px] text-beaver-blue flex-shrink-0">
                              {c.interests[0]}
                            </span>
                          )}
                          <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-3 pb-3 pt-2 border-t border-border/50 bg-surface/30 space-y-1.5">
                          {c.interests.length > 0 && (
                            <div>
                              <span className="text-[9px] font-semibold uppercase text-text-muted/50">
                                Interests
                              </span>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {c.interests.map((int) => (
                                  <span
                                    key={int}
                                    className="rounded bg-pugh-blue/15 px-1.5 py-0.5 text-[9px] text-beaver-blue"
                                  >
                                    {int}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {c.skill_signals?.length > 0 && (
                            <div>
                              <span className="text-[9px] font-semibold uppercase text-text-muted/50">
                                Skills
                              </span>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {c.skill_signals.map((s) => (
                                  <span
                                    key={s}
                                    className="rounded bg-navy/5 px-1.5 py-0.5 text-[9px] text-navy/60"
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <p className="text-[11px] leading-relaxed text-text-muted">
                            {c.contribution_summary || 'No summary yet.'}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-text-muted/60">
                            <span>Email: {c.psu_email || 'not set'}</span>
                            <span>Joined: {new Date(c.created_at).toLocaleDateString()}</span>
                            {c.last_session_at && (
                              <span>
                                Last active: {new Date(c.last_session_at).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <PageNav page={page} totalPages={totalPages} onPage={setPage} />
                  )}
                </>
              )
            })()}

          {section === 'sessions' &&
            (() => {
              const items = data.sessions.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
              const totalPages = Math.ceil(data.sessions.length / PAGE_SIZE)
              return (
                <>
                  <div className="rounded-lg border border-border bg-white overflow-hidden">
                    {items.map((s, i) => (
                      <details
                        key={s.id}
                        className={`group ${i > 0 ? 'border-t border-border' : ''}`}
                      >
                        <summary className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-surface/50 list-none">
                          <span className="text-xs font-medium text-navy">
                            @{s.github_username}
                          </span>
                          {s.tools_used.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="rounded border border-border px-1 py-0.5 text-[8px] font-mono text-text-muted"
                            >
                              {t}
                            </span>
                          ))}
                          <span className="flex-1" />
                          <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
                        </summary>
                        <div className="px-3 pb-3 pt-2 border-t border-border/50 bg-surface/30 space-y-1.5">
                          <p className="text-[11px] leading-relaxed text-text-muted">
                            {s.conversation_summary}
                          </p>
                          {s.changes_made?.length > 0 && (
                            <div>
                              <span className="text-[9px] font-semibold uppercase text-text-muted/50">
                                Changes
                              </span>
                              <div className="mt-0.5 space-y-0.5">
                                {s.changes_made.map((c, ci) => (
                                  <p key={ci} className="text-[10px] text-text-muted">
                                    + {c}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          {s.files_modified?.length > 0 && (
                            <div>
                              <span className="text-[9px] font-semibold uppercase text-text-muted/50">
                                Files
                              </span>
                              <div className="mt-0.5 flex flex-wrap gap-1">
                                {s.files_modified.map((f) => (
                                  <span
                                    key={f}
                                    className="rounded bg-navy/5 px-1.5 py-0.5 text-[9px] font-mono text-navy/50"
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-text-muted/60">
                            <span>Started: {new Date(s.started_at).toLocaleString()}</span>
                            {s.ended_at && (
                              <span>Ended: {new Date(s.ended_at).toLocaleString()}</span>
                            )}
                            {s.pr_url && (
                              <a
                                href={s.pr_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-beaver-blue hover:underline"
                              >
                                View PR
                              </a>
                            )}
                            {s.ideas_discussed?.length > 0 && (
                              <span>Ideas: {s.ideas_discussed.join(', ')}</span>
                            )}
                          </div>
                        </div>
                      </details>
                    ))}
                    {data.sessions.length === 0 && (
                      <p className="text-xs text-text-muted py-6 text-center">No sessions yet.</p>
                    )}
                  </div>
                  {totalPages > 1 && (
                    <PageNav page={page} totalPages={totalPages} onPage={setPage} />
                  )}
                </>
              )
            })()}
        </div>
      </div>
    </div>
  )
}

function CompareView() {
  const [changes, setChanges] = useState<DashboardData['sessions']>([])

  useEffect(() => {
    fetch('/workspace/api/dashboard')
      .then((r) => r.json())
      .then((d) => setChanges(d.sessions || []))
      .catch(() => {})
  }, [])

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {/* Live site iframe */}
      <div className="flex-1 rounded-lg overflow-hidden border border-border flex flex-col min-h-0">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-center bg-green-100 text-green-800 flex-shrink-0">
          Live Site (appliedaipennstate.com)
        </div>
        <iframe
          src="https://appliedaipennstate.com"
          title="Live site"
          className="flex-1 w-full border-none"
        />
      </div>

      {/* Changed files from sessions */}
      <div className="flex-shrink-0 rounded-lg border border-border bg-white overflow-hidden">
        <div className="px-3 py-1.5 text-[11px] font-semibold bg-blue-100 text-blue-800">
          Recent changes from workspace sessions
        </div>
        {changes.length > 0 ? (
          changes.slice(0, 3).map((s, i) => (
            <details
              key={s.id}
              className={`group ${i > 0 || true ? 'border-t border-border' : ''}`}
            >
              <summary className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-surface/50 list-none">
                <span className="text-xs font-medium text-navy">@{s.github_username}</span>
                <span className="text-[10px] text-text-muted flex-1 truncate">
                  {s.changes_made?.[0] || 'Session'}
                </span>
                <ChevronDown className="w-3 h-3 text-text-muted group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-3 pb-2 pt-1 border-t border-border/50 bg-surface/30 space-y-1">
                {s.files_modified?.map((f) => (
                  <p key={f} className="text-[10px] font-mono text-text-muted">
                    + {f}
                  </p>
                ))}
                {s.changes_made?.map((c, ci) => (
                  <p key={ci} className="text-[10px] text-text-muted">
                    {c}
                  </p>
                ))}
                {s.pr_url && (
                  <a
                    href={s.pr_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-beaver-blue hover:underline"
                  >
                    View PR
                  </a>
                )}
              </div>
            </details>
          ))
        ) : (
          <p className="text-xs text-text-muted py-3 px-3">No changes yet this session.</p>
        )}
      </div>
    </div>
  )
}

export function PreviewPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('activity')

  return (
    <div id="previewPanel" className="w-1/2 flex flex-col bg-surface relative z-5 min-h-0">
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
      <div id="previewContent" className="flex-1 p-4 overflow-y-auto min-h-0 relative">
        {activeTab === 'activity' && <ActivityView />}
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

'use client'

import { useState } from 'react'

type Tab = 'preview' | 'map' | 'compare'

const tabs: { id: Tab; label: string }[] = [
  { id: 'preview', label: 'Site Preview' },
  { id: 'map', label: 'Repo Map' },
  { id: 'compare', label: 'Compare' },
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

function RepoMap() {
  return (
    <div className="w-full h-full bg-white rounded-lg border border-border p-6 overflow-y-auto">
      <h3 className="font-display text-base text-navy mb-4">How This Repo Works</h3>

      {/* Editable data files */}
      <div className="mb-4 border border-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2 bg-green-100 text-green-800">
          You Edit These (
          <ExplainTip
            term="data files"
            tip="These are simple lists that hold all the content on the site. You don't write code -- the agent edits these for you."
          />
          )
        </div>
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
      </div>

      {/* Pages */}
      <div className="mb-4 border border-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2 bg-blue-100 text-blue-800">
          Pages (
          <ExplainTip
            term="admin only"
            tip="Only Andy and Ryan can edit page layouts. Regular contributors add content through the agent list and tools list."
          />
          )
        </div>
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
      </div>

      {/* Infrastructure */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="px-3.5 py-2.5 text-xs font-semibold flex items-center gap-2 bg-surface text-text-muted">
          Don&apos;t Touch (
          <ExplainTip
            term="infrastructure"
            tip="These files control how the site is built, tested, and deployed. Changing them can break things. Leave them alone."
          />
          )
        </div>
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
      </div>
    </div>
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

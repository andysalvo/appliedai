'use client'

interface SessionBarProps {
  hasChanges: boolean
  onDone: () => void
}

export function SessionBar({ hasChanges, onDone }: SessionBarProps) {
  return (
    <div
      id="headerBar"
      className="h-14 bg-navy flex items-center justify-between px-6 relative z-10"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-extrabold text-[13px] text-navy tracking-tight flex-shrink-0">
          AI
        </div>
        <div>
          <div className="text-white font-semibold text-[15px]">Applied AI Workspace</div>
          <div className="text-pugh-blue text-xs">Talk to the agent to contribute</div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {hasChanges && (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[11px] px-2 py-0.5 rounded-full font-medium">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Unsaved changes
          </span>
        )}
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-pugh-blue text-xs">Agent ready</span>
        <button
          id="doneBtn"
          onClick={onDone}
          className="bg-transparent border border-white/20 text-white px-4 py-1.5 rounded-md text-[13px] font-medium hover:bg-white/10 transition-colors"
        >
          I&apos;m done
        </button>
      </div>
    </div>
  )
}

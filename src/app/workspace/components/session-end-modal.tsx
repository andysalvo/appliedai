'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { AlertTriangle, Check, GitPullRequest } from 'lucide-react'

interface SessionEndModalProps {
  stage: 'confirm' | 'success'
  summary: string[]
  prUrl: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

export function SessionEndModal({
  stage,
  summary,
  prUrl,
  onConfirm,
  onCancel,
  onClose,
}: SessionEndModalProps) {
  const shouldReduceMotion = useReducedMotion()

  const cardAnimation = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }

  // Derive commit message and files changed from summary
  const commitMessage =
    summary.length > 0 ? `feat: ${summary[0].toLowerCase()}` : 'feat: workspace changes'

  const filesChanged =
    summary.length > 0 ? `${summary.length} file(s) modified` : 'No changes detected'

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 bg-navy/85 backdrop-blur-sm z-[100] flex items-center justify-center">
        {stage === 'confirm' && (
          <m.div
            {...cardAnimation}
            className="bg-white rounded-2xl p-10 max-w-[480px] w-[90%] text-center"
          >
            {/* Warning icon */}
            <div className="w-14 h-14 rounded-full bg-amber-100 mx-auto mb-5 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>

            <h2 className="font-display text-xl text-navy mb-2">Ready to submit?</h2>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              This will package everything you did into a pull request for review. Once submitted,
              this session is closed.
            </p>

            {/* Summary */}
            <div className="text-left bg-surface rounded-lg p-4 mb-5 text-sm">
              <dt className="font-semibold text-text mb-0.5">Session summary</dt>
              <dd className="text-text-muted mb-2.5">
                {summary.length > 0 ? summary.join('; ') : 'No changes recorded'}
              </dd>
              <dt className="font-semibold text-text mb-0.5">Files changed</dt>
              <dd className="text-text-muted mb-2.5">{filesChanged}</dd>
              <dt className="font-semibold text-text mb-0.5">Commit message</dt>
              <dd className="text-text-muted">{commitMessage}</dd>
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5 justify-center">
              <button
                onClick={onCancel}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-surface text-text border border-border hover:bg-surface-alt transition-colors"
              >
                Go back
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-navy text-white hover:bg-beaver-blue transition-colors"
              >
                Submit changes
              </button>
            </div>
          </m.div>
        )}

        {stage === 'success' && (
          <m.div
            {...cardAnimation}
            className="bg-white rounded-2xl p-10 max-w-[480px] w-[90%] text-center"
          >
            {/* Success icon */}
            <div className="w-14 h-14 rounded-full bg-green-100 mx-auto mb-5 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>

            <h2 className="font-display text-xl text-navy mb-2">Changes Submitted</h2>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Your contributions have been saved. A club leader will review and merge them.
            </p>

            {/* PR link */}
            {prUrl && (
              <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-surface px-4 py-2.5 rounded-lg text-sm text-beaver-blue font-medium border border-border mb-5 hover:bg-surface-alt transition-colors"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                {prUrl}
              </a>
            )}

            <div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-navy text-white hover:bg-beaver-blue transition-colors"
              >
                Close
              </button>
            </div>
          </m.div>
        )}
      </div>
    </LazyMotion>
  )
}

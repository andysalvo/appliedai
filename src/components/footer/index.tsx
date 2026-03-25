import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-bold">Applied AI</p>
            <p className="text-pugh-blue/80 mt-1 text-sm">at Penn State</p>
            <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-xs">
              Building a community where students learn how AI is used in the real world and explore
              its impact together.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs uppercase tracking-wider text-pugh-blue/60 font-semibold mb-4">
              Navigate
            </p>
            <div className="space-y-3">
              <a
                href="#what-we-do"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                What We Do
              </a>
              <a
                href="#labs"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Labs
              </a>
              <a
                href="#team"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Team
              </a>
              <Link
                href="/explore"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Explore AI
              </Link>
              <a
                href="#join"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Join
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs uppercase tracking-wider text-pugh-blue/60 font-semibold mb-4">
              Connect
            </p>
            <div className="space-y-3">
              <a
                href="mailto:appliedaipsu@gmail.com"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                appliedaipsu@gmail.com
              </a>
              <a
                href="https://groupme.com/join_group/111640691/x4UBh7SL"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Join our GroupMe
              </a>
              <a
                href="https://www.linkedin.com/company/penn-state-applied-ai-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30 leading-relaxed">
            This is a student organization website and does not represent official Penn State
            positions. &copy; {year} Applied AI Club at Penn State.
          </p>
        </div>
      </div>
    </footer>
  )
}

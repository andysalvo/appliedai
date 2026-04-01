import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Applied AI Workspace',
  description: 'Contribute to the Applied AI Club website',
  robots: 'noindex, nofollow',
}

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

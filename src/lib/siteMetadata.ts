import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://andysalvo.github.io/appliedai'),
  title: {
    default: 'Applied AI',
    template: '%s | Applied AI',
  },
  description:
    'The Applied AI Club at Penn State helps students understand how AI is used in the real world.',
  keywords: [
    'AI',
    'artificial intelligence',
    'Penn State',
    'student club',
    'applied AI',
    'machine learning',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Applied AI',
    title: 'Applied AI',
    description:
      'The Applied AI Club at Penn State helps students understand how AI is used in the real world.',
  },
}

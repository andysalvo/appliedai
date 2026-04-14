import type { Metadata } from 'next'

const SITE_URL = 'https://appliedaipennstate.com'
const OG_IMAGE = `${SITE_URL}/images/og-default.png`

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Applied AI Club at Penn State | AI Club at PSU',
    template: '%s | Applied AI Club at Penn State',
  },
  description:
    'The Applied AI Club at Penn State runs guest speakers, hands-on workshops, case competitions, and Applied AI Labs. Open to every Penn State student regardless of major or experience.',
  applicationName: 'Applied AI Club at Penn State',
  authors: [{ name: 'Applied AI Club at Penn State' }],
  category: 'education',
  keywords: [
    'Applied AI Club',
    'Applied AI Club Penn State',
    'Penn State AI club',
    'AI club at Penn State',
    'PSU AI club',
    'Penn State artificial intelligence club',
    'Smeal AI club',
    'Penn State student AI organization',
    'AI club State College',
    'artificial intelligence Penn State',
    'Applied AI Labs',
    'Penn State AI workshops',
    'Penn State AI speakers',
    'AI case competitions Penn State',
    'Penn State AI tools',
    'free AI tools Penn State',
    'Claude Code Penn State',
    'ChatGPT Penn State students',
  ],
  alternates: {
    canonical: SITE_URL,
  },
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
    url: SITE_URL,
    siteName: 'Applied AI Club at Penn State',
    title: 'Applied AI Club at Penn State',
    description:
      'Where Penn State students learn to think with AI. Guest speakers, hands-on workshops, case competitions, and Applied AI Labs. Open to every Penn State student.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Applied AI Club at Penn State',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Applied AI Club at Penn State',
    description:
      'Guest speakers, workshops, case competitions, and Applied AI Labs. Open to every Penn State student.',
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'google-site-verification': 'TBD',
  },
}

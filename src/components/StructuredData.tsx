import Script from 'next/script'

const SITE_URL = 'https://appliedaipennstate.com'

const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Applied AI Club at Penn State',
  alternateName: [
    'Applied AI Club',
    'Applied AI Penn State',
    'Penn State Applied AI Club',
    'PSU AI Club',
  ],
  description:
    'A student organization at Penn State running guest speakers, hands-on workshops, case competitions, and Applied AI Labs. Open to every Penn State student regardless of major.',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo.png`,
    width: 840,
    height: 241,
  },
  image: `${SITE_URL}/images/og-default.png`,
  email: 'appliedaipsu@gmail.com',
  foundingDate: '2026',
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'Pennsylvania State University',
    alternateName: ['Penn State', 'Penn State University', 'PSU'],
    url: 'https://www.psu.edu',
    sameAs: 'https://en.wikipedia.org/wiki/Pennsylvania_State_University',
  },
  location: {
    '@type': 'Place',
    name: 'Pennsylvania State University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'University Park',
      addressRegion: 'PA',
      postalCode: '16802',
      addressCountry: 'US',
    },
  },
  areaServed: {
    '@type': 'Place',
    name: 'Penn State University Park',
  },
  memberOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Pennsylvania State University',
  },
  knowsAbout: [
    'Artificial Intelligence',
    'Applied AI',
    'Machine Learning',
    'Large Language Models',
    'AI Tools for Students',
    'AI in Professional Work',
  ],
  sameAs: ['https://groupme.com/join_group/111640691/x4UBh7SL'],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'appliedaipsu@gmail.com',
    contactType: 'student inquiries',
    availableLanguage: ['English'],
  },
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Applied AI Club at Penn State',
  description: 'Where Penn State students learn to think with AI.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/explore?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export function StructuredData() {
  return (
    <>
      <Script
        id="ld-organization"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}

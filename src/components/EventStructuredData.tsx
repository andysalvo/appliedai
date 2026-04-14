const SITE_URL = 'https://appliedaipennstate.com'

interface EventInput {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  isOnline?: boolean
}

export function EventStructuredData({ events }: { events: EventInput[] }) {
  const payload = events.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/events#${event.id}`,
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: event.isOnline
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.isOnline
      ? {
          '@type': 'VirtualLocation',
          url: SITE_URL,
        }
      : {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'University Park',
            addressRegion: 'PA',
            postalCode: '16802',
            addressCountry: 'US',
          },
        },
    organizer: { '@id': `${SITE_URL}/#organization` },
    isAccessibleForFree: true,
    url: `${SITE_URL}/events`,
    image: `${SITE_URL}/images/og-default.png`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/events`,
      validFrom: '2026-01-01',
    },
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/workspace/'],
      },
    ],
    sitemap: 'https://appliedaipennstate.com/sitemap.xml',
  }
}

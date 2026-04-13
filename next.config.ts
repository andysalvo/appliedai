import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: isDev ? ['dev.ts', 'dev.tsx', 'ts', 'tsx'] : ['ts', 'tsx'],
  redirects: async () => {
    if (isDev) {
      return [
        {
          source: '/',
          destination: '/workspace/',
          permanent: false,
        },
      ]
    }
    return []
  },
}

export default nextConfig

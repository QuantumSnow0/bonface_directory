import {withSentryConfig} from '@sentry/nextjs'
import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: '/api/:path*',
        headers: [
          {key: 'Access-Control-Allow-Credentials', value: 'true'},
          {key: 'Access-Control-Allow-Origin', value: 'https://bonface-directory.vercel.app'},
          {key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  // Sentry options
  org: 'snow-ur',
  project: 'javascript-nextjs',

  silent: !process.env.CI,

  widenClientFileUpload: true,

  reactComponentAnnotation: {
    enabled: true,
  },

  hideSourceMaps: true,

  disableLogger: true,

  automaticVercelMonitors: true,
})

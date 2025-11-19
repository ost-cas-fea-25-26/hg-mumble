import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
    incomingRequests: {
      ignore: [/feed/],
    },
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)

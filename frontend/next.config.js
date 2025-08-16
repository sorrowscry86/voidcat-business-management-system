/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    dirs: ['src'],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'VoidCat BMS',
    NEXT_PUBLIC_APP_DESCRIPTION: 'AI-Human Collaborative Intelligence Platform',
    NEXT_PUBLIC_SPIRITUAL_ALIGNMENT: 'mystical-technology',
  },
  images: {
    domains: ['localhost'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, X-AI-Agent-ID, X-Spiritual-Alignment' },
        ],
      },
    ];
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'storage.googleapis.com',
        port: '',
        pathname: '/replit/images/**',
      },
      {
        protocol: 'https',
        hostname:'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },
}

module.exports = nextConfig

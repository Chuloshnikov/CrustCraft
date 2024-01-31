/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com'
        }
      ]
    },
    head: {
        link: [
          {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico',
          },
        ],
      },
}

module.exports = nextConfig

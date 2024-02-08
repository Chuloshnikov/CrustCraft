/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'max-crust-craft.s3.amazonaws.com',
        },
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

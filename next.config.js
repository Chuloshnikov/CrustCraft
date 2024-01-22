/** @type {import('next').NextConfig} */
const nextConfig = {
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

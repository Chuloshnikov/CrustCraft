/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.googleusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'crust-craft.s3.amazonaws.com',
        },
      ]
    },
    typescript: {
      ignoreBuildErrors: true,
    }
}

module.exports = nextConfig

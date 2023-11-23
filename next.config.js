/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.melivecode.com',
            port: '',
            pathname: '/attractions/**',
          },
        ],
      },

}

module.exports = nextConfig

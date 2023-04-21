/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.zipcpq.com',
        port: '',
        pathname: '/mdisk/**',
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@moneymap/ui'],
  },
  transpilePackages: ['@moneymap/ui', '@moneymap/types'],
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.API_BASE_URL || 'http://localhost:3333'}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

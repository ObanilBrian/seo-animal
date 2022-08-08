/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: [
      'upload.wikimedia.org',
      'i.natgeofe.com',
    ]
  }
}

module.exports = nextConfig

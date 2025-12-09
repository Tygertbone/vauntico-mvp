const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['api.placeholder.com'],
  },
  webpack: (config) => {
    // Exclude root src directory from Next.js build to prevent Vite file conflicts
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: [path.resolve(__dirname, 'src')],
    });
    return config;
  },
}

module.exports = nextConfig

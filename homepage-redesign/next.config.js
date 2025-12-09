/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['api.placeholder.com'],
  },
  // Completely ignore root src directory (Vite React app)
  transpilePackages: [],
  webpack: (config) => {
    // Exclude root src directory from Next.js build
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: (resourcePath) => !resourcePath.includes('/src/'),
    });
    return config;
  },
}

module.exports = nextConfig

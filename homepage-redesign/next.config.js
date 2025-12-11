/* eslint-disable no-undef */
import path from 'path'

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
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    // Override any @ alias to point to the local directory only
    config.resolve.alias = {
      ...config.resolve.alias,
      // Override any @ alias to point to the local directory only
      '@': path.resolve(process.cwd()),
    };
    return config;
  },
}

export default nextConfig

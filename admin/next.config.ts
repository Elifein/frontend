import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    PORT: '3001', // must be a string
  },
  images: {
    domains: ['blr1.digitaloceanspaces.com'],
  },
};

export default nextConfig;

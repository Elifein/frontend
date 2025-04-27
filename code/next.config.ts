import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    PORT: '3000', // must be a string
  },
  images: {
    domains: ['blr1.digitaloceanspaces.com', 'via.placeholder.com'],
  },
};

export default nextConfig;

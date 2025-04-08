import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    PORT: '3001', // must be a string
  },
};

export default nextConfig;

// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   output: 'standalone',
//   env: {
//     PORT: '3000', // must be a string
//   },
//   images: {
//     domains: ['blr1.digitaloceanspaces.com', 'via.placeholder.com'],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: isProd, // Skip ESLint in production builds
  },
  typescript: {
    ignoreBuildErrors: isProd, // Skip TypeScript errors in production builds
  },
  images: {
    domains: ['blr1.digitaloceanspaces.com'],
  },

};

export default nextConfig;

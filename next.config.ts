import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  // Configure Turbopack path aliases (required for Next.js 16 with Turbopack)
  experimental: {
    turbo: {
      resolveAlias: {
        "@": "./src",
      },
    },
  },
};

export default nextConfig;

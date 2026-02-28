import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Rewrite /uploads/* to API route BEFORE static file lookup
  // (beforeFiles ensures it runs before Next.js tries to serve from /public)
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/uploads/:path*",
          destination: "/api/uploads/:path*",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // Turbopack configuration for path aliases
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
  turbopack: {
    resolveAlias: {
      "@": "./src",
    },
  },
};

export default nextConfig;

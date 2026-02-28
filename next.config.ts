import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images — allow external sources if needed later
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Stripe webhook needs raw body — exclude from body parsers
  serverExternalPackages: ["pg"],
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Experimental performance features
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

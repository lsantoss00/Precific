import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["i.ytimg.com"],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;

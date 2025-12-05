import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.infrastructureLogging = {
      level: "error",
    };

    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module: any) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module: any) {
                const hash = require("crypto");
                const ident = module.identifier();
                return (
                  "lib-" +
                  hash
                    .createHash("sha1")
                    .update(ident)
                    .digest("hex")
                    .substring(0, 8)
                );
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
        },
      };
    }

    return config;
  },
  images: {
    remotePatterns: [{ hostname: "i.ytimg.com" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    globalNotFound: true,
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/landing-page/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

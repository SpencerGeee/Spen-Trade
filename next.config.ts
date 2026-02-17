import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // ... existing config ...
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com; connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com; img-src 'self' data: https://*.clerk.com https://images.unsplash.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:;",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "spentrade",
  project: "spentrade-next",
});

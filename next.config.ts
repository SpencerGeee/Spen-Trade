import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  // ... existing config ...
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.cryptocompare.com" },
      { protocol: "https", hostname: "resources.cryptocompare.com" },
      { protocol: "https", hostname: "www.cryptocompare.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://*.magic.link https://*.coinbase.com; worker-src 'self' blob:; connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://min-api.cryptocompare.com https://api.web3modal.org https://*.walletconnect.org https://*.walletconnect.com wss://*.walletconnect.org wss://*.walletconnect.com https://explorer-api.walletconnect.com https://rpc.walletconnect.com https://*.magic.link https://*.fortmatic.com https://*.coinbase.com https://api.developer.coinbase.com; img-src 'self' data: blob: https://*.clerk.com https://images.unsplash.com https://images.cryptocompare.com https://resources.cryptocompare.com https://www.cryptocompare.com https://*.walletconnect.org https://*.walletconnect.com https://api.web3modal.org https://tokens-data.walletconnect.com https://tokens.1inch.io https://*.1inch.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://*.walletconnect.org https://secure.walletconnect.org https://auth.magic.link https://*.coinbase.com https://pay.coinbase.com;",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

// export default withSentryConfig(nextConfig, {
//   silent: true,
//   org: "spentrade",
//   project: "spentrade-next",
// });
export default nextConfig;

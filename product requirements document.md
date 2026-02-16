SPENTrade – Enterprise-Grade P2P Crypto Trading Platform
Product Requirements Document (PRD) + Complete Build Roadmap
Version: 1.0 | Date: February 2026 | Owner: Cyril (Solo Founder)
Goal: Build a secure, scalable, compliant P2P crypto marketplace (like LocalBitcoins + Paxful + Binance P2P) that works in Ghana/Africa first, then globally. Must handle real money, real blockchain, and real users from day 1.
1. Executive Summary

Vision: The most trusted P2P crypto platform in Africa — fiat-to-crypto, crypto-to-crypto, gift cards, escrow, KYC, and community trust features.
Target Launch: MVP in 6–8 weeks (solo + AI agent), full enterprise in 3–4 months.
Success Metrics: 1,000 active traders in 3 months, zero major security incidents, 99.9% uptime.
Non-Negotiables: Security-first, mobile-first, real-time, compliant (KYC/AML), beautiful UI that feels premium.

2. Current Repo State (Deep Analysis)

Tech Stack (Excellent Foundation):
Next.js 16.1.6 (App Router + React 19)
TypeScript, Tailwind 4, shadcn/ui + Radix primitives
Clerk (auth), Zustand (state), TanStack Query (data), Zod + React Hook Form
Animations: Framer Motion + GSAP (great for smooth UX)
Themes, Lucide icons, ESLint

What's Already Good:
Clean Next.js structure with src/app
Clerk ready for production auth
shadcn components.json → easy to add beautiful UI
Modern tooling (no jQuery mess from old repo)

What's Missing / Broken (Everything to Fix):
No custom pages/components yet (just default Next.js template)
No database (Prisma + PostgreSQL needed)
No backend logic (API routes or tRPC)
No blockchain integration (ethers/viem, escrow contracts)
No payments (Stripe + Flutterwave)
No real-time (Socket.io or Pusher)
Build logs show compilation issues → clean those first
No tests, no Docker, no CI/CD, no monitoring


Bottom Line: This is a blank canvas with perfect tools. We are starting from zero features but with enterprise-ready foundations.
3. Core Features (What Must Be Built)
Phase 0 – Foundation (Week 1)

Authentication (Clerk – already there)
Database schema (Prisma + PostgreSQL)
UI Theme & Layout (Dark/Light, gold accent #856d47)

Phase 1 – MVP (Weeks 2–4) – Launchable

User Profiles + KYC (tiers: Basic → Verified → Premium)
Offer Creation & Browsing (Buy/Sell crypto, gift cards)
Trade Flow with On-Chain Escrow (Ethereum + BSC first)
Wallet System (connect MetaMask/WalletConnect, deposit addresses, balances)
Transaction History + Notifications
Basic Dashboard

Phase 2 – Core Product (Weeks 5–8)

Real-time chat in trades
Dispute resolution + arbitration
Payment integrations (Stripe, Flutterwave, mobile money)
Advanced search & filters
Reviews & Trust scores
Market prices (CoinGecko + WebSockets)

Phase 3 – Enterprise (Months 3–4)

Multi-chain (Bitcoin, Solana, etc.)
Admin dashboard
API for partners
Mobile PWA + native wrapper
Analytics + fraud detection
Full compliance (AML screening, audit logs)

4. Enterprise Requirements (Must Be Baked In)

Security: Clerk + 2FA, rate limiting, input sanitization, CSP, no secrets in code.
Performance: Edge caching (Vercel), React Server Components, TanStack Query caching.
Scalability: Prisma with connection pooling, Redis for sessions/prices.
Reliability: Full test coverage (Jest + Playwright), Sentry monitoring, CI/CD.
Compliance: KYC via SumSub, AML via Chainalysis, GDPR-ready.
UX: 60fps animations, mobile-first, accessibility (ARIA), dark mode.
Observability: Logging, error tracking, performance monitoring.

5. Complete Phased Roadmap (What the AI Agent Must Do)
Copy-paste this into your agent and tell it: “Follow this roadmap exactly, one phase at a time. After each phase, ask me for confirmation before moving on.”
PHASE 0: Clean & Foundation (1–3 days)

Fix all build errors (delete build_log files, run npm run build until clean).
Install core packages:Bashnpm install prisma @prisma/client @clerk/nextjs @tanstack/react-query zustand
npm install -D prisma
npm install viem ethers @web3modal/ethers5 wagmi
npm install stripe @stripe/stripe-js
npm install pusher pusher-js
npm install redis
npm install @sentry/nextjs
Set up Prisma + PostgreSQL (Supabase or Neon – free tier).
Run npx prisma init
Create schema.prisma with User, Offer, Trade, Transaction, Wallet, Kyc models.

Configure Clerk (already installed) + middleware.ts for protected routes.
Create root layout with shadcn theme (gold accent, dark mode).
Set up TanStack Query provider + Zustand stores (auth, wallet, theme).

PHASE 1: Authentication & Core UI (3–5 days)

Build layout: Navbar, Sidebar, Footer (using shadcn + Radix).
Protected routes with Clerk.
Dashboard page with portfolio overview (use TanStack Query to fetch mock balances first).
Profile + KYC page (multi-step form with Zod validation).
Theme toggle (next-themes already installed).

PHASE 2: Wallet System (Production-Ready) – 5–7 days

Wallet connect page (Web3Modal + wagmi/viem).
Dynamic deposit addresses (use Tatum or Moralis API).
Real balance fetching (viem + public RPCs).
Transaction history (Prisma + TanStack Query).
Internal transfers + fiat on-ramp (Stripe).

PHASE 3: Offers & Trades (7–10 days)

Offer creation form (Zod + React Hook Form).
Browse offers page with filters (price, payment method, location).
Trade detail page with real-time chat (Pusher or Socket.io).
Escrow smart contract (Solidity + Hardhat) + deployment script.
On-chain escrow creation/release via wagmi.

PHASE 4: Payments & Escrow (5–7 days)

Stripe + Flutterwave webhooks.
Gift card valuation service (integrate real APIs).
Full trade flow: Offer → Match → Escrow → Release → Review.

PHASE 5: Polish & Production (Ongoing)

Add tests (Jest for components, Playwright for E2E).
Set up CI/CD (GitHub Actions: test → build → deploy to Vercel).
Docker + Docker Compose for local dev.
Sentry + Vercel Analytics.
SEO (metadata, sitemap).
Rate limiting + security headers.

PHASE 6: Launch Readiness (Final Week)

Load testing (Artillery or k6).
Security audit (npm audit + manual review).
Compliance checklist (KYC flow, privacy policy).
Beta launch with 50 Ghanaian users.

6. AI Agent Instructions (Exact Commands)
When you paste this to your agent, say:
“You are now the lead engineer for SpenTrade. Follow the PRD and Roadmap exactly. Work one phase at a time. After completing a phase, output a summary + next steps. Never skip security or testing. Use TypeScript everywhere, Server Actions where possible, and keep everything in the App Router.”
7. Final Notes

Deployment: Vercel (free + fast) for frontend + API routes. Supabase/Neon for DB. Railway or Render for any extra services.
Budget: <$30/month at launch.
Your Role: Review every phase, test on mobile, give feedback from Accra perspective.
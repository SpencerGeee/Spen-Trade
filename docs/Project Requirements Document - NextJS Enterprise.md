# SpenTrade Next.js Enterprise Migration - PRD v1.0

## 1. Project Overview
**SpenTrade** is a high-end, enterprise-grade Peer-to-Peer (P2P) Cryptocurrency Trading Platform. This document outlines the technical requirements and product specifications for migrating the existing SpenTrade MVP to the **Next.js** framework to ensure scalability, performance, and a "luxurious" user experience.

The platform facilitates secure trades between users with built-in escrow protection, multi-currency support, and sophisticated payment orchestration.

---

## 2. Core Vision & Aesthetics
The platform must feel **premium, state-of-the-art, and secure**. We leverage the "Quardo" design aesthetic from the current codebase:
- **Primary Color:** Gold (`#856d47`) and Sleek Dark Mode.
- **Typography:** Argesta Display (Luxury Serif) for headers, Jost (Modern Sans) for UI/Body.
- **Animations:** Extensive use of Framer Motion (for layout) and GSAP (for complex transitions, magnetic cursors, and reveal effects).
- **UX Feel:** Smooth horizontal/vertical scroll (Smooth Scrollbar), skeleton loaders for all data fetching, and micro-interactions on every button/hover.

---

## 3. Technology Stack (Enterprise Grade)
### Frontend
- **Framework:** Next.js 15 (App Router).
- **Language:** TypeScript (Strict Mode).
- **Styling:** Tailwind CSS + Shadcn/UI (Customized with Gold palette).
- **Animations:** Framer Motion (Transitions), GSAP (Magnetic/Reveal), Swiper.js (Sliders).
- **State Management:** TanStack Query (Server State), Zustand (Client State).
- **Icons:** LineIcons / Lucide React.

### Backend & Infrastructure
- **API:** Next.js Server Components & Route Handlers.
- **Database:** PostgreSQL (Vercel Postgres / Neon) with **Prisma** or **Drizzle ORM**.
- **Real-time:** Ably or Pusher (Enterprise-grade WebSockets for trade chat & notifications).
- **Auth:** NextAuth.js / Auth.js (supporting Email/Pass, Goole OAuth, and 2FA via Speakeasy).
- **Web3:** Ethers.js / Viem, Wagmi (Wallet connection/Escrow interaction).
- **Payments:** Stripe (Fiat), Flutterwave (Local African Payments).
- **KYC:** SumSub or Onfido (Third-party automated verification).
- **Storage:** Amazon S3 or Cloudinary (KYC docs, user uploads).

---

## 4. Feature Specifications

### A. Professional Authentication
- Multi-step registration with real-time validation.
- Secure login with JWT/Cookies and mandatory 2FA (Authenticator app).
- Anti-Phishing security codes in all platform emails.
- Device authorization (Identify new logins and require email confirmation).

### B. Dynamic P2P Marketplace
- **Search & Filter:** Advanced filtering by crypto, fiat, payment method, location, and user verification status.
- **Offer Creation:** Sophisticated offer builder with margin pricing (Market + X%) or fixed pricing.
- **Trust System:** Trust score calculation based on completion rate, trade volume, and user reviews.

### C. Secure Escrow & Trading
- **Escrow Logic:** Automated locking of crypto upon trade initiation.
- **Trade Chat:** Real-time messaging with image/file upload (payment proofs).
- **Dispute Resolution:** In-platform dispute opening and moderator workstation for arbitration.
- **Auto-Cancellation:** Countdown timers for payment and release.

### D. Multi-Currency Wallet
- Internal platform wallets for multiple currencies (BTC, ETH, USDT, USDC, LTC).
- Real-time balance updates via CoinGecko/Moralis.
- Deposit address generation with QR codes.
- Transaction history with blockchain explorer links.

---

## 5. Required Pages Library (Next.js Modules)

### Public Pages
1. `index.tsx`: High-impact landing page with parallax hero, quick trade widget, and live market stats.
2. `about.tsx`: Luxury brand story, mission, and how it works.
3. `contact.tsx`: Support hub with categorization and priority routing.
4. `terms.tsx` / `privacy.tsx`: Interactive legal docs.
5. `news/index.tsx`: Market news aggregator.

### Auth Module
6. `login.tsx`: Clean, centered login with 2FA modal.
7. `register.tsx`: Three-step stepper for registration.
8. `forgot-password.tsx` / `reset-password.tsx`.
9. `verify-email.tsx`: Automated verification landing.

### User Dashboard (The Workspace)
10. `dashboard/index.tsx`: Central hub with quick stats, active trades, and wallet summary.
11. `dashboard/wallet.tsx`: Portfolio management, pie charts, deposit/withdraw modals.
12. `dashboard/trades/index.tsx`: List of all filtered trades (Active, Past, Disputed).
13. `dashboard/trades/[id].tsx`: The "Trade Terminal" - Chat, Evidence, Actions, Timeline.
14. `dashboard/offers/index.tsx`: Manage your ads (Active/Paused).
15. `dashboard/offers/create.tsx`: Offer creation stepper.
16. `offers/index.tsx`: Public marketplace browsing.
17. `offers/[id].tsx`: Public offer detail view with trader profile stats.

### User Settings & Social
18. `profile/index.tsx`: Public/Private profile view with trust badges.
19. `profile/edit.tsx`: Update bio, avatar, and trading preferences.
20. `settings/security.tsx`: Password, 2FA, session management.
21. `settings/notifications.tsx`: Granular control over Email/SMS/Push.
22. `kyc.tsx`: Verification tiers (Tier 1-3) with document upload.

### Admin High-Command
23. `admin/dashboard.tsx`: Global stats (Volume, Users, Revenue).
24. `admin/users.tsx`: User management, ban/unban, impersonate.
25. `admin/trades.tsx`: Global trade monitoring.
26. `admin/disputes.tsx`: Arbitration queue.
27. `admin/kyc.tsx`: Document review workstation.
28. `admin/settings.tsx`: Platform fees, supported currencies, maintenance mode.

---

## 6. Engineering Requirements (Success Metrics)
- **Performance:** Lighthouse score > 90 on all pages. Utilize Next.js Image optimization and Server Components over Client Components.
- **Aesthetics:** Implementation of the "Reveal Effect" on all page headings. Magnetic buttons for primary CTAs. Smooth page transitions via GSAP.
- **Scalability:** Stateless API design, Redis for rate limiting, and PostHog for analytics.
- **Security:** CSRF protection, SQL Injection prevention (via ORM), and strict CSP headers.
- **Testing:** 80% coverage with Playwright (E2E) and Vitest (Unit).

---

## 7. Deployment Plan
- **Platform:** Vercel (Edge Functions enabled).
- **Environment:** Staging (preview branches) and Production (main branch).
- **Monitoring:** Sentry for error tracking and Logtail for backend logs.

# TRAUMA BOX — Digital Containment Unit

> *Restricted content. Proceed at your own emotional risk.*

A Next.js web application housing the **Trauma Box** ecosystem — a platform for inappropriate, darkly comedic content. Flagship product: **Absolutely Terrible Children's Stories** (ATCS).

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4 + custom CSS animations
- **Language:** TypeScript 5 (strict mode)
- **Database:** PostgreSQL via Supabase + Prisma 7 ORM
- **Payments:** Stripe (Checkout + Connect + Webhooks)
- **Validation:** Zod schema validation on API inputs
- **Auth:** Supabase Auth (SSR-ready with `@supabase/ssr`)
- **Deployment:** Vercel
- **Domain:** GoDaddy

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Glitch boot sequence landing page
│   ├── layout.tsx            # Root layout (scanlines, VCR grain)
│   ├── not-found.tsx         # Sardonic 404 page
│   ├── globals.css           # All custom animations & styles
│   ├── api/
│   │   ├── auth/me/          # Session / user info endpoint
│   │   ├── content/          # Public content feed + unlock
│   │   ├── studio/           # Creator dashboard APIs (stats, submit, payout)
│   │   ├── tokens/           # Stripe checkout + dev credit
│   │   ├── transactions/     # User transaction ledger
│   │   └── webhooks/stripe/  # Stripe webhook handler
│   ├── feed/
│   │   ├── layout.tsx        # Control panel navigation + token context
│   │   ├── page.tsx          # "The Manifest" — marketplace content catalog
│   │   ├── archives/page.tsx # Spreadsheet-style archive browser
│   │   ├── shop/page.tsx     # "Substandard Goods" merch store
│   │   ├── transactions/     # Token ledger history
│   │   └── about/page.tsx    # "Dossier" — about page + FAQ
│   └── studio/
│       ├── layout.tsx        # Creator terminal navigation
│       ├── page.tsx          # "The Leak Protocol" — creator dashboard
│       ├── submit/page.tsx   # Content submission form
│       ├── revenue/page.tsx  # "Blood Money" — revenue breakdown
│       └── agreement/page.tsx# Creator agreement / contract
├── components/               # Shared UI (TokenShop, WalletDisplay, ContentGate, etc.)
├── lib/
│   ├── auth.ts               # Session resolution helper
│   ├── db.ts                 # Prisma client singleton
│   ├── stripe.ts             # Stripe client + token packs
│   └── tokens.ts             # Token operations (credit, unlock, payout, revenue split)
└── generated/prisma/         # Prisma generated client
```

## ALL WRONGS RESERVED — Trauma Box Industries

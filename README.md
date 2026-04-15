ve AI Agent learniing # TRAUMA BOX — Digital Containment Unit

> *Restricted content. Proceed at your own emotional risk.*

A Next.js web application housing the **Trauma Box** ecosystem — a platform for inappropriate, darkly comedic content. Flagship product: **Absolutely Terrible Children's Stories** (ATCS).

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS 4 + custom CSS animations
- **Language:** TypeScript 5 (strict mode)
- **Database:** PostgreSQL via Supabase + Prisma 7 ORM
- **Validation:** Zod schema validation on API inputs
- **Auth:** Demo mode (placeholder for production auth)
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
│   │   ├── auth/me/          # Session / user info + random token assignment
│   │   ├── content/          # Public content feed + unlock
│   │   ├── studio/           # Creator dashboard APIs (stats, submit)
│   │   ├── tally/            # House Tally (public 90/10 split stats)
│   │   ├── transactions/     # User transaction ledger
│   ├── feed/
│   │   ├── layout.tsx        # Control panel navigation + token context
│   │   ├── page.tsx          # "The Manifest" — content feed
│   │   ├── archives/page.tsx # Spreadsheet-style archive browser
│   │   ├── shop/page.tsx     # "Substandard Goods" merch store
│   │   ├── tally/page.tsx    # House Tally — public 90/10 token split view
│   │   ├── transactions/     # Token ledger history
│   │   └── about/page.tsx    # "Dossier" — about page + FAQ
│   └── studio/
│       ├── layout.tsx        # Creator terminal navigation
│       ├── page.tsx          # "The Leak Protocol" — creator dashboard
│       ├── submit/page.tsx   # Content submission form
│       ├── revenue/page.tsx  # "Token Tally" — token stats breakdown
│       └── agreement/page.tsx# Creator agreement / contract
├── components/               # Shared UI (WalletDisplay, ContentGate, etc.)
├── lib/
│   ├── auth.ts               # Session resolution helper
│   ├── db.ts                 # Prisma client singleton
│   └── tokens.ts             # Token operations (unlock, revenue split, tally)
└── generated/prisma/         # Prisma generated client
```

## ALL WRONGS RESERVED — Trauma Box Industries

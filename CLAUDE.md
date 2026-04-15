# TRAUMA BOX — AI Context Manager

> This file provides structured context for AI-assisted development.
> Prioritize reading this file before fetching individual source files.
> Use `grep` and `find` to look up specific code rather than loading the full repo.

## Project Identity

**TRAUMA BOX** is a Next.js 16 platform for darkly comedic digital content.
Flagship product: **Absolutely Terrible Children's Stories (ATCS)**.
Token-gated content with a 90/10 creator/house split. Tokens are free, random, and worthless.

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16 (App Router, React 19)      |
| Language     | TypeScript 5 (strict mode)             |
| Styling      | Tailwind CSS 4 + custom CSS animations |
| Database     | PostgreSQL via Supabase                 |
| ORM          | Prisma 7 with `@prisma/adapter-pg`     |
| Validation   | Zod 4                                  |
| Auth         | Demo mode (placeholder)                |
| Testing      | Vitest + React Testing Library         |
| Deployment   | Vercel                                 |

## Architecture Overview

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (scanlines, VCR grain)
│   ├── page.tsx            # Boot sequence landing page
│   ├── api/                # Server API routes
│   │   ├── auth/me/        # Session resolution + random token assignment
│   │   ├── content/        # Public feed + unlock (Burn Protocol)
│   │   ├── studio/         # Creator tools (submit, stats)
│   │   ├── tally/          # House Tally (public 90/10 split stats)
│   │   └── transactions/   # Audit trail
│   ├── feed/               # Public feed pages
│   └── studio/             # Creator dashboard pages
├── components/             # Shared React components
│   ├── TokenProvider.tsx   # Global wallet context
│   ├── ContentGate.tsx     # Token-gating wrapper
│   ├── WalletDisplay.tsx   # Header balance counter
│   └── TransactionHistory  # Ledger view
└── lib/                    # Server utilities
    ├── auth.ts             # Session resolution
    ├── db.ts               # Prisma singleton
    ├── tokens.ts           # All token operations (Burn Protocol)
    └── apiHelpers.ts       # Shared API response/auth helpers
```

## Core Business Logic

### Token Economy
- Tokens have no monetary value — freely and randomly assigned
- Visitors receive 50–5000 random tokens on every visit
- Content prices: 10–1000 tokens (creator-set)
- Revenue split: 90% creator / 10% house (containment fee)
- House Tally tracks the 10% publicly

### The Burn Protocol (`src/lib/tokens.ts`)
Atomic transaction that: deducts buyer tokens → grants access → splits revenue 90/10 → logs everything.

### Key Flows
1. **Get tokens:** Visit site → `/api/auth/me` → random allocation (50-5000 tokens)
2. **Unlock content:** Client → `/api/content/unlock` → `unlockContent()` (atomic)
3. **Submit content:** Client → `/api/studio/submit` → Zod validation → create Content
4. **View tally:** Client → `/api/tally` → `getPlatformTally()` → public stats

## Database Models (Prisma)
- `User` — accounts with token balance and role (READER/CONTRIBUTOR/ADMIN)
- `Content` — case files with pricing, status, creator link
- `Library` — junction table (user ↔ unlocked content)
- `Transaction` — full audit trail (all token movements)
- `RevenueLedger` — records every 90/10 split
- `Payout` — creator cash-out requests

## Conventions

### API Routes
- All mutations require authenticated user via `requireAuth()`
- All inputs validated with Zod schemas
- Consistent JSON error format: `{ error: string }`
- Success format: `{ success: true, ...data }`

### Styling
- Dark theme with orange accent (#ff6600), terminal green (#00ff41)
- VCR/glitch aesthetic throughout
- All interactive elements need ARIA labels
- Responsive: mobile-first with sm/md/lg breakpoints

### Security Rules
- Never trust client-sent amounts — always recalculate server-side
- All token mutations happen inside Prisma `$transaction` blocks
- Dev-only endpoints gated by `NODE_ENV` check
- Rate limit sensitive endpoints (auth, unlock, submit)

## Environment Variables
See `.env.example` for required variables. Never commit real secrets.

## Commands
```bash
npm run dev          # Start development server
npm run build        # Prisma generate + Next.js build
npm run lint         # ESLint check
npm run test         # Run Vitest test suite
npx prisma migrate   # Run database migrations
npx prisma db seed   # Seed demo content
```

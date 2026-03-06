# TraumaBox Copilot Instructions

## Project Context
TraumaBox is a Next.js 16 multi-vendor marketplace for darkly comedic digital content.
Read `CLAUDE.md` at the project root for full architecture and conventions.

## Code Style
- TypeScript strict mode — no `any` types
- Tailwind CSS 4 for styling — no inline style objects
- JetBrains Mono for monospace, Archivo Black for headlines
- Dark theme: bg `#0a0a0a`, accent `#ff6600`, terminal green `#00ff41`

## API Route Pattern
All API routes follow this structure:
```typescript
import { requireAuth } from "@/lib/apiHelpers";
// 1. Parse + validate input (Zod for POST bodies)
// 2. Authenticate via requireAuth()
// 3. Business logic in lib/ functions
// 4. Return consistent JSON: { success, ...data } or { error }
```

## Security Rules
- All token mutations use Prisma `$transaction` for atomicity
- Never trust client amounts — validate and recalculate server-side
- Stripe webhooks verified by signature before processing
- Dev-only routes gated by NODE_ENV AND VERCEL_ENV checks
- Input validated with Zod schemas at API boundaries

## Component Patterns
- Client components marked with `"use client"`
- Global state via `TokenProvider` context (useTokens hook)
- All interactive elements require ARIA labels
- Modals need focus trapping and Escape key handling
- Responsive: mobile-first with sm/md/lg Tailwind breakpoints

## Database
- Prisma 7 with PostgreSQL adapter
- Schema at `prisma/schema.prisma`
- Generated client at `src/generated/prisma/`
- All financial operations in `src/lib/tokens.ts`

## Testing
- Vitest for unit/integration tests
- Tests live in `__tests__/` directory
- Run with `npm test`

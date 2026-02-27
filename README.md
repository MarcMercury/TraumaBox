# TRAUMA BOX — Digital Containment Unit

> *Restricted content. Proceed at your own emotional risk.*

A Next.js web application housing the **Trauma Box** ecosystem — a platform for inappropriate, darkly comedic content. Flagship product: **Absolutely Terrible Children's Stories** (ATCS).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4 + custom CSS animations
- **Language:** TypeScript
- **Deployment:** Vercel
- **Database:** Supabase (coming soon)
- **AI:** OpenAI integration (coming soon)
- **Domain:** GoDaddy

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/app/
├── page.tsx              # Glitch boot sequence landing page
├── layout.tsx            # Root layout (scanlines, VCR grain)
├── not-found.tsx         # Sardonic 404 page
├── globals.css           # All custom animations & styles
└── feed/
    ├── layout.tsx        # Control panel navigation
    ├── page.tsx          # "The Manifest" — content catalog
    ├── archives/page.tsx # Spreadsheet-style archive browser
    ├── shop/page.tsx     # "Substandard Goods" merch store
    └── about/page.tsx    # "Dossier" — about page + FAQ
```

## ALL WRONGS RESERVED — Trauma Box Industries

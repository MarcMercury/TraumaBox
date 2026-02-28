// ─── Stripe Server-Side Client ─────────────────────
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Token packs available for purchase
export const TOKEN_PACKS = [
  {
    id: "sad-sack",
    name: "The Sad Sack",
    tokens: 500,
    priceUsd: 500, // $5.00 in cents
    tagline: "Enough to ruin a few evenings",
    icon: "😢",
  },
  {
    id: "glutton",
    name: "The Glutton",
    tokens: 2000,
    priceUsd: 2000, // $20.00 in cents
    tagline: "For the emotionally masochistic",
    icon: "🤮",
  },
  {
    id: "shareholder",
    name: "The Shareholder",
    tokens: 10000,
    priceUsd: 10000, // $100.00 in cents
    tagline: "You're investing in suffering",
    icon: "💀",
  },
] as const;

export type TokenPack = (typeof TOKEN_PACKS)[number];

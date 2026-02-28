// ─── Stripe Server-Side Client ─────────────────────
import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("[TRAUMA_BOX] STRIPE_SECRET_KEY not set");
    _stripe = new Stripe(key, { apiVersion: "2026-02-25.clover" });
  }
  return _stripe;
}

/** @deprecated Use getStripe() instead — kept for backward compat */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
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

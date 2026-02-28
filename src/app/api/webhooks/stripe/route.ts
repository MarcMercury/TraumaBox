// ─── POST /api/webhooks/stripe ──────────────────────
// Stripe sends a webhook when payment completes.
// This credits tokens to the user's account.

import { NextRequest, NextResponse } from "next/server";
import { stripe, TOKEN_PACKS } from "@/lib/stripe";
import { creditTokens } from "@/lib/tokens";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, packId, tokenAmount } = session.metadata ?? {};

    if (!userId || !tokenAmount) {
      console.error("[STRIPE WEBHOOK] Missing metadata in session");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const pack = TOKEN_PACKS.find((p) => p.id === packId);
    const tokens = parseInt(tokenAmount, 10);

    try {
      await creditTokens(
        userId,
        tokens,
        `Purchased: ${pack?.name ?? "Token Pack"} (${tokens} tokens)`,
        session.id
      );

      console.log(
        `[STRIPE WEBHOOK] Credited ${tokens} tokens to user ${userId}`
      );
    } catch (error) {
      console.error("[STRIPE WEBHOOK] Failed to credit tokens:", error);
      return NextResponse.json(
        { error: "Failed to credit tokens" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

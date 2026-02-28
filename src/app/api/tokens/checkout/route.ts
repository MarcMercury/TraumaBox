// ─── POST /api/tokens/checkout ──────────────────────
// Creates a Stripe Checkout session for buying a token pack

import { NextRequest, NextResponse } from "next/server";
import { stripe, TOKEN_PACKS } from "@/lib/stripe";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { packId } = await request.json();

    const pack = TOKEN_PACKS.find((p) => p.id === packId);
    if (!pack) {
      return NextResponse.json(
        { error: "Invalid pack. Nice try." },
        { status: 400 }
      );
    }

    // Get current user
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${pack.name} — ${pack.tokens} Trauma Tokens`,
              description: pack.tagline,
            },
            unit_amount: pack.priceUsd,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/feed?purchase=success&tokens=${pack.tokens}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/feed?purchase=cancelled`,
      metadata: {
        userId: user.id,
        packId: pack.id,
        tokenAmount: pack.tokens.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return NextResponse.json(
      { error: "Stripe refused to cooperate. Try again." },
      { status: 500 }
    );
  }
}

// ─── POST /api/tokens/dev-credit ────────────────────
// DEV ONLY: Instantly credit tokens without Stripe
// Gated by NODE_ENV — returns 403 in production.

import { NextRequest, NextResponse } from "next/server";
import { creditTokens } from "@/lib/tokens";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Block in production and Vercel preview deployments
  if (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  ) {
    return NextResponse.json({ error: "Nice try." }, { status: 403 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { amount } = body as { amount?: string };
    const tokens = Math.min(Math.max(parseInt(amount as string, 10) || 100, 1), 99999);

    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const result = await creditTokens(
      user.id,
      tokens,
      `DEV CREDIT: ${tokens} tokens injected into the system`,
      "DEV_MODE"
    );

    return NextResponse.json({
      success: true,
      balance: result.balance,
      message: `${tokens} tokens materialized from the void.`,
    });
  } catch (error) {
    console.error("[DEV-CREDIT]", error);
    return NextResponse.json({ error: "Credit failed" }, { status: 500 });
  }
}

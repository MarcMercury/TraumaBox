// ─── POST /api/tokens/dev-credit ────────────────────
// DEV ONLY: Instantly credit tokens without Stripe
// Remove this in production!

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { creditTokens } from "@/lib/tokens";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Nice try." }, { status: 403 });
  }

  try {
    const { amount } = await request.json();
    const tokens = Math.min(Math.max(parseInt(amount, 10) || 100, 1), 99999);

    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

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

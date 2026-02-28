// ─── POST /api/studio/payout ────────────────────────
// Cash out tokens — "Compensation for Damages"
// Min threshold: 2000 tokens ($20.00)
// In production: triggers Stripe Connect payout

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requestPayout } from "@/lib/tokens";

export async function POST() {
  try {
    // Demo user (production: parse session)
    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Can't pay someone who doesn't exist." },
        { status: 401 }
      );
    }

    const result = await requestPayout(user.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      payoutId: result.payoutId,
    });
  } catch (error) {
    console.error("[STUDIO/PAYOUT]", error);
    return NextResponse.json(
      { error: "Payout failed. Try again when Mercury is out of retrograde." },
      { status: 500 }
    );
  }
}

// ─── GET /api/studio/payout ─────────────────────────
// Get payout history
export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

    if (!user) {
      return NextResponse.json({ error: "Ghost mode." }, { status: 401 });
    }

    const payouts = await prisma.payout.findMany({
      where: { userId: user.id },
      orderBy: { requestedAt: "desc" },
    });

    return NextResponse.json({
      payouts: payouts.map((p) => ({
        id: p.id,
        tokenAmount: p.tokenAmount,
        usdAmount: (p.usdAmount / 100).toFixed(2),
        status: p.status,
        requestedAt: p.requestedAt,
        completedAt: p.completedAt,
      })),
    });
  } catch (error) {
    console.error("[STUDIO/PAYOUT/GET]", error);
    return NextResponse.json(
      { error: "Could not retrieve payout history." },
      { status: 500 }
    );
  }
}

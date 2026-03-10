// ─── GET /api/tally ─────────────────────────────────
// Public endpoint showing the house tally — how many tokens
// the platform has collected (10%) vs creators (90%)
// Visible to everyone. Full transparency on the chaos economy.

import { NextResponse } from "next/server";
import { getPlatformTally } from "@/lib/tokens";

export async function GET() {
  try {
    const tally = await getPlatformTally();

    return NextResponse.json({
      success: true,
      ...tally,
    });
  } catch (error) {
    console.error("[TALLY]", error);
    return NextResponse.json(
      { error: "Failed to count the chaos." },
      { status: 500 }
    );
  }
}

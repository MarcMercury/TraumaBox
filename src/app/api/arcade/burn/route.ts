// ─── POST /api/arcade/burn ──────────────────────────
// Burn 25 tokens to play an arcade game

import { NextRequest, NextResponse } from "next/server";
import { burnArcadeTokens } from "@/lib/tokens";
import { requireAuth } from "@/lib/apiHelpers";
import { z } from "zod";

const burnSchema = z.object({
  gameId: z.string().min(1).max(100),
  gameTitle: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = burnSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing or invalid game info." },
        { status: 400 }
      );
    }

    const { gameId, gameTitle } = parsed.data;

    const [user, errorResponse] = await requireAuth();
    if (errorResponse) return errorResponse;

    const result = await burnArcadeTokens(user.id, gameId, gameTitle);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      balance: result.balance,
    });
  } catch {
    return NextResponse.json(
      { error: "Arcade malfunction. Please try again." },
      { status: 500 }
    );
  }
}

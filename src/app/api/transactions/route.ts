// ─── GET /api/transactions ──────────────────────────
// Returns the user's transaction history (the audit trail)

import { NextRequest, NextResponse } from "next/server";
import { getTransactionHistory } from "@/lib/tokens";
import { requireAuth } from "@/lib/apiHelpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawLimit = parseInt(searchParams.get("limit") ?? "50", 10);
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(rawLimit, 200)) : 50;

    const [user, errorResponse] = await requireAuth();
    if (errorResponse) return errorResponse;

    const transactions = await getTransactionHistory(user.id, limit);

    return NextResponse.json({
      transactions: transactions.map((t) => ({
        id: t.id,
        amount: t.amount,
        type: t.type,
        detail: t.detail,
        reference: t.reference,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error("[TRANSACTIONS]", error);
    return NextResponse.json(
      { error: "Failed to retrieve transaction ledger" },
      { status: 500 }
    );
  }
}

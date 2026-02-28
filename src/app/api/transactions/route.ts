// ─── GET /api/transactions ──────────────────────────
// Returns the user's transaction history (the audit trail)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getTransactionHistory } from "@/lib/tokens";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);

    // Get demo user
    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

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

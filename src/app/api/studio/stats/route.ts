// ─── GET /api/studio/stats ──────────────────────────
// Returns the creator's blood money stats

import { NextResponse } from "next/server";
import { getCreatorStats, getCreatorRevenue } from "@/lib/tokens";
import { requireAuth } from "@/lib/apiHelpers";

export async function GET() {
  try {
    const [user, errorResponse] = await requireAuth();
    if (errorResponse) return errorResponse;

    if (user.role !== "CONTRIBUTOR" && user.role !== "ADMIN") {
      return NextResponse.json({
        isContributor: false,
        message: "You haven't contributed anything yet. Submit something first.",
        stats: null,
        content: [],
      });
    }

    const [stats, content] = await Promise.all([
      getCreatorStats(user.id),
      getCreatorRevenue(user.id),
    ]);

    // Transform content into a more readable format
    const contentWithStats = content.map((c: typeof content[number]) => ({
      id: c.id,
      caseFileId: c.caseFileId,
      title: c.title,
      tokenCost: c.tokenCost,
      status: c.status,
      totalUnlocks: c._count.unlockedBy,
      totalRevenue: c.revenueLedger.reduce((sum: number, r: { creatorShare: number }) => sum + r.creatorShare, 0),
      createdAt: c.createdAt,
    }));

    return NextResponse.json({
      isContributor: true,
      stats,
      content: contentWithStats,
      user: {
        displayName: user.displayName,
        role: user.role,
        tokenBalance: user.tokenBalance,
      },
    });
  } catch (error) {
    console.error("[STUDIO/STATS]", error);
    return NextResponse.json(
      { error: "Failed to load stats. The ledger is on fire." },
      { status: 500 }
    );
  }
}

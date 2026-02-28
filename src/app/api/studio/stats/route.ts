// ─── GET /api/studio/stats ──────────────────────────
// Returns the creator's blood money stats

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCreatorStats, getCreatorRevenue } from "@/lib/tokens";

export async function GET() {
  try {
    // Demo user (production: parse session)
    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Hard to track earnings for a ghost." },
        { status: 401 }
      );
    }

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
    const contentWithStats = content.map((c) => ({
      id: c.id,
      caseFileId: c.caseFileId,
      title: c.title,
      tokenCost: c.tokenCost,
      status: c.status,
      totalUnlocks: c._count.unlockedBy,
      totalRevenue: c.revenueLedger.reduce((sum, r) => sum + r.creatorShare, 0),
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

// ─── GET /api/studio/content ────────────────────────
// List all content by the current user (creator view)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

    if (!user) {
      return NextResponse.json({ error: "No user." }, { status: 401 });
    }

    const content = await prisma.content.findMany({
      where: { creatorId: user.id },
      include: {
        _count: { select: { unlockedBy: true } },
        revenueLedger: {
          select: { creatorShare: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      content: content.map((c: any) => ({
        id: c.id,
        caseFileId: c.caseFileId,
        title: c.title,
        series: c.series,
        tokenCost: c.tokenCost,
        status: c.status,
        classification: c.classification,
        description: c.description,
        totalUnlocks: c._count.unlockedBy,
        totalEarned: c.revenueLedger.reduce((sum: number, r: { creatorShare: number }) => sum + r.creatorShare, 0),
        createdAt: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("[STUDIO/CONTENT]", error);
    return NextResponse.json(
      { error: "Failed to load your content." },
      { status: 500 }
    );
  }
}

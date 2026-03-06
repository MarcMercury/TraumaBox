// ─── GET /api/content/[caseFileId] ──────────────────
// Returns full content detail for a specific case file
// Body text only returned if user has unlocked it

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ caseFileId: string }> }
) {
  try {
    const { caseFileId } = await params;

    const content = await prisma.content.findUnique({
      where: { caseFileId },
      include: {
        creator: { select: { id: true, displayName: true } },
        _count: { select: { unlockedBy: true } },
      },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Case file not found in containment database." },
        { status: 404 }
      );
    }

    // Only published content is visible publicly
    if (!["LEAKED", "OPENED", "REDACTED"].includes(content.status)) {
      return NextResponse.json(
        { error: "This case file is still under review." },
        { status: 403 }
      );
    }

    // Check if the user has unlocked this content
    const user = await getSessionUser();
    let unlocked = false;
    if (user) {
      const lib = await prisma.library.findUnique({
        where: { userId_contentId: { userId: user.id, contentId: content.id } },
      });
      unlocked = !!lib;
    }

    return NextResponse.json({
      id: content.id,
      caseFileId: content.caseFileId,
      title: content.title,
      series: content.series,
      tokenCost: content.tokenCost,
      status: content.status,
      classification: content.classification,
      description: content.description,
      sideEffects: content.sideEffects,
      consumptionTime: content.consumptionTime,
      filePath: content.filePath,
      creatorName: content.creator?.displayName ?? "TRAUMA BOX",
      creatorId: content.creatorId,
      totalUnlocks: content._count.unlockedBy,
      createdAt: content.createdAt,
      unlocked,
      // Only include the body if unlocked
      body: unlocked ? content.body : null,
    });
  } catch (error) {
    console.error("[CONTENT/DETAIL]", error);
    return NextResponse.json(
      { error: "Failed to retrieve case file." },
      { status: 500 }
    );
  }
}

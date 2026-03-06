// ─── /api/studio/content ────────────────────────────
// GET: List all content by the current user (creator view)
// PATCH: Update content status (publish, redact)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
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
      content: content.map((c: typeof content[number]) => ({
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

export async function PATCH(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { contentId, action } = await request.json();

    if (!contentId || !action) {
      return NextResponse.json({ error: "Missing contentId or action." }, { status: 400 });
    }

    const content = await prisma.content.findUnique({ where: { id: contentId } });
    if (!content) {
      return NextResponse.json({ error: "Content not found." }, { status: 404 });
    }

    // Only the creator (or admin) can modify their content
    if (content.creatorId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "You can only manage your own content." }, { status: 403 });
    }

    if (action === "publish") {
      if (content.status !== "PENDING") {
        return NextResponse.json({ error: "Only PENDING content can be published." }, { status: 400 });
      }
      await prisma.content.update({
        where: { id: contentId },
        data: { status: "LEAKED" },
      });
      return NextResponse.json({ success: true, message: "Content published. The leak is live." });
    }

    if (action === "redact") {
      await prisma.content.update({
        where: { id: contentId },
        data: { status: "REDACTED" },
      });
      return NextResponse.json({ success: true, message: "Content redacted. It never happened." });
    }

    return NextResponse.json({ error: "Unknown action. Try 'publish' or 'redact'." }, { status: 400 });
  } catch (error) {
    console.error("[STUDIO/CONTENT/PATCH]", error);
    return NextResponse.json({ error: "Failed to update content." }, { status: 500 });
  }
}

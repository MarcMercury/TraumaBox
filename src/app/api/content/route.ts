// ─── GET /api/content ────────────────────────────────
// Public feed — returns all published content (LEAKED, OPENED, REDACTED)
// Includes creator attribution for the marketplace

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Force dynamic since content changes with purchases
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await prisma.content.findMany({
      where: {
        status: { in: ["LEAKED", "OPENED", "REDACTED"] },
      },
      include: {
        creator: {
          select: {
            id: true,
            displayName: true,
          },
        },
        _count: {
          select: { unlockedBy: true },
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
        sideEffects: c.sideEffects,
        consumptionTime: c.consumptionTime,
        filePath: c.filePath,
        creatorName: c.creator?.displayName ?? "TRAUMA BOX",
        creatorId: c.creatorId,
        totalUnlocks: c._count.unlockedBy,
        createdAt: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("[CONTENT/FEED]", error);
    return NextResponse.json(
      { error: "Failed to load the manifest. The containment unit is unresponsive." },
      { status: 500 }
    );
  }
}

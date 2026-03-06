// ─── POST /api/content/unlock ───────────────────────
// The Burn Protocol endpoint — spend tokens to unlock content

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { unlockContent } from "@/lib/tokens";
import { requireAuth } from "@/lib/apiHelpers";
import { z } from "zod";

const unlockSchema = z.object({
  caseFileId: z.string().min(1).max(50),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = unlockSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Missing or invalid caseFileId." },
        { status: 400 }
      );
    }

    const { caseFileId } = parsed.data;

    const [user, errorResponse] = await requireAuth();
    if (errorResponse) return errorResponse;

    // Resolve caseFileId to actual content ID
    const content = await prisma.content.findUnique({
      where: { caseFileId },
    });

    if (!content) {
      return NextResponse.json(
        { error: "Content not found in containment database." },
        { status: 404 }
      );
    }

    // Execute the Burn Protocol
    const result = await unlockContent(user.id, content.id);

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
  } catch (error) {
    console.error("[UNLOCK]", error);
    return NextResponse.json(
      { error: "The Burn Protocol encountered a fatal error." },
      { status: 500 }
    );
  }
}

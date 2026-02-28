// ─── POST /api/content/unlock ───────────────────────
// The Burn Protocol endpoint — spend tokens to unlock content

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { unlockContent } from "@/lib/tokens";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { caseFileId } = await request.json();

    if (!caseFileId) {
      return NextResponse.json(
        { error: "Missing caseFileId. What are you trying to unlock, air?" },
        { status: 400 }
      );
    }

    // Get the current user (demo user for now)
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not found. Perhaps you don't exist." },
        { status: 401 }
      );
    }

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

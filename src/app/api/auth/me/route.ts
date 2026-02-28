// ─── GET /api/auth/me ───────────────────────────────
// Returns current user info & balance.
// In production, this checks a session/JWT.
// For now, uses a demo user (auto-created).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const DEMO_EMAIL = "subject@trauma.box";

async function getOrCreateDemoUser() {
  let user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: DEMO_EMAIL,
        displayName: "TEST_SUBJECT_001",
        tokenBalance: 250, // Free starter tokens
      },
    });

    // Log the welcome bonus
    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: 250,
        type: "BONUS",
        detail: "Welcome to Trauma Box. Here are some tokens. You'll need them.",
      },
    });
  }

  return user;
}

export async function GET() {
  try {
    // In production: parse session cookie / JWT here
    // For dev: always return demo user
    const user = await getOrCreateDemoUser();

    // Get unlocked content IDs
    const library = await prisma.library.findMany({
      where: { userId: user.id },
      select: { contentId: true, content: { select: { caseFileId: true } } },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      tokenBalance: user.tokenBalance,
      unlockedCaseFileIds: library.map((l: { content: { caseFileId: string } }) => l.content.caseFileId),
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("[AUTH/ME]", error);
    return NextResponse.json(
      { error: "SYSTEM_FAILURE: Could not authenticate subject" },
      { status: 500 }
    );
  }
}

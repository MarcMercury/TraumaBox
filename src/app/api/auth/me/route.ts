// ─── GET /api/auth/me ───────────────────────────────
// Returns current user info & randomly assigned tokens.
// Every visit = new random token allocation. No purchases. Pure chaos.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const DEMO_EMAIL = "subject@trauma.box";

/** Generate a cryptographically random token amount between 50 and 5000 */
function rollRandomTokens(): number {
  const bytes = crypto.randomBytes(2);
  const value = bytes.readUInt16BE(0); // 0–65535
  return 50 + (value % 4951); // 50–5000
}

async function getOrCreateDemoUser() {
  let user = await prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });

  if (!user) {
    const startingTokens = rollRandomTokens();
    user = await prisma.user.create({
      data: {
        email: DEMO_EMAIL,
        displayName: "TEST_SUBJECT_001",
        tokenBalance: startingTokens,
      },
    });

    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: startingTokens,
        type: "BONUS",
        detail: `Welcome to Trauma Box. The chaos assigned you ${startingTokens} tokens. Spend wisely. Or don't.`,
      },
    });
  } else {
    // Every session gets a fresh random token allocation
    const newTokens = rollRandomTokens();
    user = await prisma.user.update({
      where: { id: user.id },
      data: { tokenBalance: newTokens },
    });

    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: newTokens,
        type: "BONUS",
        detail: `The void has spoken. You've been assigned ${newTokens} tokens this session.`,
      },
    });
  }

  return user;
}

export async function GET() {
  try {
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

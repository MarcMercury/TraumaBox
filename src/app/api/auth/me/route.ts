// ─── GET /api/auth/me ───────────────────────────────
// Returns current user info & randomly assigned tokens.
// Tokens rerolled once per session (cookie-gated). No purchases. Pure chaos.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import crypto from "crypto";

const DEMO_EMAIL = "subject@trauma.box";
const SESSION_COOKIE = "tb_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

/** Generate a cryptographically random token amount between 50 and 5000 */
function rollRandomTokens(): number {
  const bytes = crypto.randomBytes(2);
  const value = bytes.readUInt16BE(0); // 0–65535
  return 50 + (value % 4951); // 50–5000
}

/** Create user with initial token allocation */
async function createDemoUser() {
  const startingTokens = rollRandomTokens();
  const user = await prisma.user.create({
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

  return user;
}

/** Reroll tokens for an existing user (new session only) */
async function rerollTokens(userId: string) {
  const newTokens = rollRandomTokens();
  const user = await prisma.user.update({
    where: { id: userId },
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

  return user;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const hasSession = cookieStore.get(SESSION_COOKIE);

    let user = await prisma.user.findUnique({
      where: { email: DEMO_EMAIL },
    });

    if (!user) {
      // First time ever — create user + allocate tokens
      user = await createDemoUser();
    } else if (!hasSession) {
      // New session (no cookie) — reroll tokens once
      user = await rerollTokens(user.id);
    }
    // Existing session (cookie present) — just return current data, no DB writes

    // Get unlocked content IDs
    const library = await prisma.library.findMany({
      where: { userId: user.id },
      select: { contentId: true, content: { select: { caseFileId: true } } },
    });

    const body = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      tokenBalance: user.tokenBalance,
      unlockedCaseFileIds: library.map((l: { content: { caseFileId: string } }) => l.content.caseFileId),
      createdAt: user.createdAt,
    };

    const response = NextResponse.json(body);

    // Set session cookie so subsequent calls skip the reroll
    if (!hasSession) {
      response.cookies.set(SESSION_COOKIE, "1", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
      });
    }

    return response;
  } catch (error) {
    console.error("[AUTH/ME]", error);
    return NextResponse.json(
      { error: "SYSTEM_FAILURE: Could not authenticate subject" },
      { status: 500 }
    );
  }
}

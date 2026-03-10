// ─── Token Operations (The Burn Protocol) ──────────
// All token mutations go through here for atomicity
// Revenue split: 90% creator / 10% platform (containment fee)
// Tokens are freely assigned — no real money, just chaos currency

import { prisma } from "./db";
import type { PrismaClient } from "@/generated/prisma/client";

/** Transaction client type for interactive transactions */
type TxClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;

/** Platform revenue split — the "containment fee" */
export const PLATFORM_FEE_PERCENT = 10;
export const CREATOR_SHARE_PERCENT = 90;

/**
 * Check if a user has unlocked a specific piece of content
 */
export async function hasUnlocked(userId: string, contentId: string): Promise<boolean> {
  const record = await prisma.library.findUnique({
    where: { userId_contentId: { userId, contentId } },
  });
  return !!record;
}

/**
 * Get user's token balance
 */
export async function getBalance(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tokenBalance: true },
  });
  return user?.tokenBalance ?? 0;
}

/**
 * THE BURN PROTOCOL
 * Atomically deduct tokens, grant content access, and split revenue 90/10.
 * - 90% of token value credits the creator's pending balance
 * - 10% goes to the platform (Trauma Box containment fee)
 * Fails safely — no tokens lost without content granted.
 */
export async function unlockContent(
  userId: string,
  contentId: string
): Promise<{ success: boolean; message: string; balance?: number }> {
  try {
    const result = await prisma.$transaction(async (tx: TxClient) => {
      // Step 1: Get content cost + creator info
      const content = await tx.content.findUnique({
        where: { id: contentId },
        include: { creator: true },
      });
      if (!content) throw new Error("CONTENT_NOT_FOUND");

      // Step 2: Check if already unlocked
      const existing = await tx.library.findUnique({
        where: { userId_contentId: { userId, contentId } },
      });
      if (existing) throw new Error("ALREADY_UNLOCKED");

      // Step 3: Check balance
      const user = await tx.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new Error("USER_NOT_FOUND");
      if (user.tokenBalance < content.tokenCost) throw new Error("INSUFFICIENT_TOKENS");

      // Step 4: Deduct tokens from buyer
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { tokenBalance: { decrement: content.tokenCost } },
      });

      // Step 5: Grant access
      await tx.library.create({
        data: { userId, contentId },
      });

      // Step 6: Log the buyer's spend transaction
      await tx.transaction.create({
        data: {
          userId,
          amount: -content.tokenCost,
          type: "SPEND",
          detail: `Unlocked: ${content.title}`,
          reference: content.caseFileId,
        },
      });

      // Step 7: Revenue split — 90% creator / 10% platform
      const creatorShare = Math.floor(content.tokenCost * CREATOR_SHARE_PERCENT / 100);
      const platformFee = content.tokenCost - creatorShare;

      if (content.creatorId && content.creator) {
        // Credit creator's token balance (their pending "blood money")
        await tx.user.update({
          where: { id: content.creatorId },
          data: { tokenBalance: { increment: creatorShare } },
        });

        // Log creator earning
        await tx.transaction.create({
          data: {
            userId: content.creatorId,
            amount: +creatorShare,
            type: "CREATOR_EARNING",
            detail: `Earned from: ${content.title} (90% of ${content.tokenCost} tokens)`,
            reference: content.caseFileId,
          },
        });
      }

      // Log platform fee (attributed to the buyer's transaction trail for audit)
      await tx.transaction.create({
        data: {
          userId,
          amount: 0, // Not debited from anyone — just a record
          type: "PLATFORM_FEE",
          detail: `Containment fee: ${platformFee} tokens from ${content.title}`,
          reference: content.caseFileId,
        },
      });

      // Step 8: Record in revenue ledger
      await tx.revenueLedger.create({
        data: {
          contentId: content.id,
          buyerId: userId,
          creatorId: content.creatorId ?? "PLATFORM",
          totalTokens: content.tokenCost,
          creatorShare,
          platformFee,
        },
      });

      return { balance: updatedUser.tokenBalance, title: content.title };
    });

    return {
      success: true,
      message: `Access granted to "${result.title}". Emotional damage incoming.`,
      balance: result.balance,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    const messages: Record<string, string> = {
      CONTENT_NOT_FOUND: "This trauma doesn't exist. Lucky you.",
      ALREADY_UNLOCKED: "You already own this disappointment.",
      USER_NOT_FOUND: "Who are you? Seriously.",
      INSUFFICIENT_TOKENS: "Not enough tokens. Refresh for a new random allocation.",
    };
    return { success: false, message: messages[msg] ?? "Something broke. It wasn't your fault. Probably." };
  }
}

/** Cost to play an arcade game */
export const ARCADE_GAME_COST = 25;

/**
 * Burn tokens for an arcade game play.
 * All tokens go to the house — no creator split.
 */
export async function burnArcadeTokens(
  userId: string,
  gameId: string,
  gameTitle: string
): Promise<{ success: boolean; message: string; balance?: number }> {
  try {
    const result = await prisma.$transaction(async (tx: TxClient) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");
      if (user.tokenBalance < ARCADE_GAME_COST) throw new Error("INSUFFICIENT_TOKENS");

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { tokenBalance: { decrement: ARCADE_GAME_COST } },
      });

      await tx.transaction.create({
        data: {
          userId,
          amount: -ARCADE_GAME_COST,
          type: "SPEND",
          detail: `Arcade: ${gameTitle}`,
          reference: `arcade:${gameId}`,
        },
      });

      return { balance: updatedUser.tokenBalance };
    });

    return {
      success: true,
      message: `Inserted ${ARCADE_GAME_COST} tokens. Game loaded.`,
      balance: result.balance,
    };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    const messages: Record<string, string> = {
      USER_NOT_FOUND: "Who are you? Seriously.",
      INSUFFICIENT_TOKENS: "Not enough tokens. Refresh for a new random allocation.",
    };
    return { success: false, message: messages[msg] ?? "The arcade machine ate your tokens. Sorry." };
  }
}

/**
 * Get a user's complete transaction history
 */
export async function getTransactionHistory(userId: string, limit = 50) {
  // Clamp limit to prevent unreasonable queries
  const safeLimit = Math.max(1, Math.min(limit, 200));
  return prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: safeLimit,
  });
}

/**
 * Get all content IDs a user has unlocked
 */
export async function getUserLibrary(userId: string) {
  return prisma.library.findMany({
    where: { userId },
    include: { content: true },
    orderBy: { unlockedAt: "desc" },
  });
}

/**
 * Get creator stats — total earnings, content count, token balance
 */
export async function getCreatorStats(creatorId: string) {
  const [totalEarnings, contentCount, pendingBalance, totalSales] = await Promise.all([
    prisma.revenueLedger.aggregate({
      where: { creatorId },
      _sum: { creatorShare: true },
    }),
    prisma.content.count({
      where: { creatorId },
    }),
    prisma.user.findUnique({
      where: { id: creatorId },
      select: { tokenBalance: true },
    }),
    prisma.revenueLedger.count({
      where: { creatorId },
    }),
  ]);

  return {
    totalTokensEarned: totalEarnings._sum.creatorShare ?? 0,
    contentCount,
    pendingTokenBalance: pendingBalance?.tokenBalance ?? 0,
    totalSales,
  };
}

/**
 * Get revenue breakdown for a creator's content
 */
export async function getCreatorRevenue(creatorId: string) {
  return prisma.content.findMany({
    where: { creatorId },
    include: {
      revenueLedger: {
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { unlockedBy: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get the platform tally — total tokens collected as the 10% "house" fee
 * and total tokens distributed to creators. Visible to everyone.
 */
export async function getPlatformTally() {
  const [platformTotal, creatorTotal, totalTransactions, totalUnlocks] = await Promise.all([
    prisma.revenueLedger.aggregate({
      _sum: { platformFee: true },
    }),
    prisma.revenueLedger.aggregate({
      _sum: { creatorShare: true },
    }),
    prisma.revenueLedger.count(),
    prisma.library.count(),
  ]);

  return {
    platformTokens: platformTotal._sum.platformFee ?? 0,
    creatorTokens: creatorTotal._sum.creatorShare ?? 0,
    totalTransactions,
    totalUnlocks,
  };
}

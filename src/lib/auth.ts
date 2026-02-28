// ─── Auth Helpers ───────────────────────────────────
// Centralized session resolution.
// In production: replace with Supabase Auth / JWT parsing.
// For now: returns the demo user.

import { prisma } from "./db";

const DEMO_EMAIL = "subject@trauma.box";

/**
 * Resolve the current session user.
 * Returns null if no user is found (caller should return 401).
 */
export async function getSessionUser() {
  return prisma.user.findUnique({
    where: { email: DEMO_EMAIL },
  });
}

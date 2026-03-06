// ─── Shared API Helpers (Skill Builder Pattern) ────
// Reusable auth guard, response formatting, and validation
// for all API routes. Eliminates copy-paste auth checks.

import { NextResponse } from "next/server";
import { getSessionUser } from "./auth";

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSessionUser>>>;

/**
 * Require an authenticated user or return 401.
 * Eliminates repeated getSessionUser() + null check in every route.
 *
 * Usage:
 *   const [user, errorResponse] = await requireAuth();
 *   if (errorResponse) return errorResponse;
 *   // user is guaranteed non-null here
 */
export async function requireAuth(): Promise<
  [SessionUser, null] | [null, NextResponse]
> {
  const user = await getSessionUser();
  if (!user) {
    return [
      null,
      NextResponse.json(
        { error: "Authentication required. You need to exist first." },
        { status: 401 }
      ),
    ];
  }
  return [user, null];
}

/**
 * Require user to have CONTRIBUTOR or ADMIN role.
 */
export async function requireContributor(): Promise<
  [SessionUser, null] | [null, NextResponse]
> {
  const [user, err] = await requireAuth();
  if (err) return [null, err];
  if (user.role !== "CONTRIBUTOR" && user.role !== "ADMIN") {
    return [
      null,
      NextResponse.json(
        { error: "Contributor access required." },
        { status: 403 }
      ),
    ];
  }
  return [user, null];
}

/**
 * Standard success response.
 */
export function apiSuccess<T extends Record<string, unknown>>(
  data: T,
  status = 200
) {
  return NextResponse.json({ success: true, ...data }, { status });
}

/**
 * Standard error response.
 */
export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message, success: false }, { status });
}

/**
 * Clamp a numeric value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

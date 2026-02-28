// ─── Prisma Client Singleton ───────────────────────
// Prevents multiple instances in Next.js dev hot-reload

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrisma(): PrismaClient {
  const url = process.env.DATABASE_URL;

  // During build or when no DB is configured, skip client creation
  if (!url || url === "file:./dev.db" && typeof window === "undefined" && process.env.NEXT_PHASE === "phase-production-build") {
    console.warn("[TRAUMA_BOX] No production database — running in UI-only mode");
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === "$connect" || prop === "$disconnect") return () => Promise.resolve();
        if (typeof prop === "string") {
          return new Proxy({}, {
            get() {
              return () => Promise.resolve(null);
            },
          });
        }
        return undefined;
      },
    });
  }

  // Use libsql adapter for Turso/LibSQL URLs
  if (url.startsWith("libsql://") || url.startsWith("https://")) {
    const { PrismaLibSQL } = require("@prisma/adapter-libsql");
    const { createClient } = require("@libsql/client");
    const libsql = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }

  // Fallback: Local SQLite via file URL (dev only)
  try {
    const { PrismaLibSQL } = require("@prisma/adapter-libsql");
    const { createClient } = require("@libsql/client");
    const libsql = createClient({ url });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  } catch (e) {
    console.warn("[TRAUMA_BOX] Database connection failed:", (e as Error).message);
    return null as unknown as PrismaClient;
  }
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

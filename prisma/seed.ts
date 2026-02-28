// ─── Database Seed ──────────────────────────────────
// Populates the Content table with case files & their token costs
// Run with: npx tsx --tsconfig tsconfig.json prisma/seed.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

// Resolve the database URL — "file:./dev.db" from .env is relative to prisma/
// libsql requires an absolute file path
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbPath = rawUrl.replace("file:", "").replace("./", "");
const absoluteUrl = `file:/workspaces/TraumaBox/prisma/${dbPath}`;

console.log("DB URL:", absoluteUrl);

const libsql = createClient({ url: absoluteUrl });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter, datasourceUrl: absoluteUrl } as any);

const CONTENT_SEED = [
  {
    caseFileId: "ATCS-001",
    title: "The Hindenburg: A Hot Air Balloon Story",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "LEAKED",
    classification: "CATASTROPHIC",
    description: "Little Timmy learns about the magic of flying — and the slightly less magical part where everything catches fire and people scream.",
    sideEffects: "Mild existential dread, inappropriate laughter",
    consumptionTime: "4 minutes of your life you won't get back",
    filePath: "/ATCS/ATCS%20B1.pdf",
  },
  {
    caseFileId: "ATCS-002",
    title: "Pompeii: A Nature Walk Gone Wrong",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "Join young Marcus on an educational tour of his lovely city! Spoiler: the mountain is not sleeping.",
    sideEffects: "Volcanic anxiety, history trauma",
    consumptionTime: "5 minutes of escalating discomfort",
  },
  {
    caseFileId: "ATCS-003",
    title: "The Titanic: A Boat Ride Adventure",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 60,
    status: "LEAKED",
    classification: "CATASTROPHIC",
    description: "An unsinkable ship meets a very sink-able reality. Features fun activities like 'spot the iceberg' and 'count the lifeboats' (trick question — there aren't enough).",
    sideEffects: "Aquaphobia, trust issues with icebergs",
    consumptionTime: "6 minutes of sinking feeling",
  },
  {
    caseFileId: "ATCS-004",
    title: "Chernobyl: A Glowing Bedtime Story",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 100,
    status: "REDACTED",
    classification: "NUCLEAR",
    description: "Little Svetlana notices the power plant is glowing tonight! How pretty! This cannot possibly end poorly.",
    sideEffects: "Radiophobia, third arm growth (unconfirmed)",
    consumptionTime: "3 minutes with a half-life of forever",
  },
  {
    caseFileId: "ATCS-005",
    title: "The Donner Party: A Camping Cookbook",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "LEAKED",
    classification: "GASTRONOMIC",
    description: "The pioneers packed everything for their trip west! Well, almost everything. Mostly, they forgot enough food. But necessity is the mother of invention... and some other things.",
    sideEffects: "Loss of appetite, camping phobia, trust issues",
    consumptionTime: "4 minutes of increasing hunger",
  },
  {
    caseFileId: "ATCS-006",
    title: "The Plague: A Counting Book",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "LEAKED",
    classification: "BIOHAZARD",
    description: "Count along as the rats multiply! One rat, two rats, three rats... uh oh. This is a numbers game everyone loses.",
    sideEffects: "Germaphobia, distrust of rodents",
    consumptionTime: "3 minutes of escalating dread",
  },
  {
    caseFileId: "TB-GAME-001",
    title: "Trauma Bingo",
    series: "Interactive Containment",
    tokenCost: 25,
    status: "OPENED",
    classification: "INTERACTIVE",
    description: "Mark off historical disasters as they're read aloud! First to fill a row wins absolutely nothing of value.",
    sideEffects: "Competitive suffering, hollow victory",
    consumptionTime: "As long as your soul lasts",
  },
  {
    caseFileId: "TB-VID-001",
    title: "Behind the Trauma: Making Of",
    series: "Interactive Containment",
    tokenCost: 10,
    status: "OPENED",
    classification: "DOCUMENTARY",
    description: "A behind-the-scenes look at how we make children's stories about historical tragedies. Spoiler: we're not okay.",
    sideEffects: "Empathy for the damned",
    consumptionTime: "8 minutes of questionable choices",
  },
];

async function main() {
  console.log("🌱 Seeding content database...\n");

  for (const content of CONTENT_SEED) {
    const result = await prisma.content.upsert({
      where: { caseFileId: content.caseFileId },
      update: content,
      create: content,
    });
    console.log(`  ✓ ${result.caseFileId}: "${result.title}" — ${result.tokenCost} tokens`);
  }

  console.log(`\n✅ Seeded ${CONTENT_SEED.length} content entries.`);
  console.log("   Token costs range: 10–100 tokens ($0.10–$1.00)\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

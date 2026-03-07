// ─── Database Seed ──────────────────────────────────
// Populates the Content table with case files & their token costs
// Run with: npx tsx prisma/seed.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");

console.log("Connecting to PostgreSQL...");

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

const CONTENT_SEED = [
  {
    caseFileId: "ATCS-001",
    title: "A Perfectly Safe Trip Across the Atlantic",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A giant ship that everyone said could never sink decided to prove everyone wrong in the middle of a very cold ocean.",
    sideEffects: "Aquaphobia, trust issues with icebergs",
    consumptionTime: "5 minutes of sinking feeling",
    filePath: "/ATCS/ATCS%20Titanic.png",
  },
  {
    caseFileId: "ATCS-002",
    title: "The Spanish Flu: A Germ's World Tour",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "BIOHAZARD",
    description: "Invisible danger spreads across the globe. A story about germs, community care, and how science learned over time to fight what it couldn't see.",
    sideEffects: "Germaphobia, compulsive hand-washing",
    consumptionTime: "5 minutes of escalating paranoia",
    filePath: "/ATCS/ATCS%20Spanish%20Flu.png",
  },
  {
    caseFileId: "ATCS-003",
    title: "Everyone Was Rich Yesterday",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "One morning people woke up to discover their money had quietly disappeared overnight and nobody could quite remember where it went.",
    sideEffects: "Financial anxiety, piggy bank hoarding",
    consumptionTime: "5 minutes of economic dread",
    filePath: "/ATCS/ATCS%20Depression.png",
  },
  {
    caseFileId: "ATCS-004",
    title: "Niko Learns to Run",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "Niko had always preferred walking everywhere until the nearby mountain suddenly started throwing rocks, fire, and very strong suggestions to hurry.",
    sideEffects: "Volcanic anxiety, history trauma",
    consumptionTime: "5 minutes of escalating discomfort",
    filePath: "/ATCS/ATCS%20Pompeii.png",
  },
  {
    caseFileId: "ATCS-005",
    title: "Let's Go Surfing!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "One morning the ocean decided to stand up very tall and come visit everyone at once.",
    sideEffects: "Thalassophobia, heightened wave awareness",
    consumptionTime: "5 minutes of rising dread",
    filePath: "/ATCS/Tsunami%201.png",
  },
  {
    caseFileId: "ATCS-006",
    title: "The Very Responsible Chemical Company",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "BIOHAZARD",
    description: "A factory promised everything was perfectly safe right before a mysterious cloud wandered into town to meet everyone.",
    sideEffects: "Distrust of factories, air quality anxiety",
    consumptionTime: "5 minutes of breath-holding",
    filePath: "/ATCS/Bohpal.png",
  },
  {
    caseFileId: "ATCS-007",
    title: "Let's Go Surfing… Again!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "NUCLEAR",
    description: "An earthquake shook the ground, a giant wave followed behind it, and the power plant had a very bad day.",
    sideEffects: "Radiophobia, distrust of power plants",
    consumptionTime: "5 minutes of compounding anxiety",
    filePath: "/ATCS/Surfing%20again.png",
  },
  {
    caseFileId: "ATCS-008",
    title: "Learning to Bake!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A tiny bakery fire grew so excited that it accidentally tried baking the entire city.",
    sideEffects: "Pyrophobia, sudden interest in architecture",
    consumptionTime: "5 minutes of smoldering",
    filePath: "/ATCS/London%20Fire.png",
  },
  {
    caseFileId: "ATCS-009",
    title: "Kenji Forgot His Sunglasses!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "NUCLEAR",
    description: "Kenji stepped outside on a bright morning and suddenly the sun seemed to appear much closer than usual.",
    sideEffects: "Existential dread, pacifist tendencies",
    consumptionTime: "6 minutes of heavy silence",
    filePath: "/ATCS/Hiroshima.png",
  },
  {
    caseFileId: "ATCS-010",
    title: "Challenger: Reaching for the Stars",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "Ambition and risk. Space, teachers, a live broadcast, and an engineering failure. Sometimes the sky isn't the limit — it's the problem.",
    sideEffects: "Fear of heights, engineering skepticism",
    consumptionTime: "5 minutes of sky-gazing",
    filePath: "/ATCS/ATCS%20Challenger.png",
  },
  {
    caseFileId: "ATCS-011",
    title: "Let's Dig a Hole!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "Some people drilled a very deep hole in the ocean and the ocean politely tried to give it back.",
    sideEffects: "Eco-anxiety, distrust of oil companies",
    consumptionTime: "5 minutes of oily dread",
    filePath: "/ATCS/Deepwater%20dig%20a%20hole.png",
  },
  {
    caseFileId: "ATCS-012",
    title: "The City That Needed a Bigger Umbrella",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A giant storm arrived at the party and forgot to stop raining for a very long time.",
    sideEffects: "Weather anxiety, distrust of authority",
    filePath: "/ATCS/Katrina.png",
    consumptionTime: "5 minutes of rising water",
  },
  {
    caseFileId: "ATCS-013",
    title: "Inside Voices, Please!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A massive volcanic eruption with global atmospheric impact. Dramatic visuals and a boom heard around the world. The earth cleared its throat.",
    sideEffects: "Volcanic dread, noise sensitivity",
    consumptionTime: "5 minutes of rumbling tension",
  },
  {
    caseFileId: "ATCS-014",
    title: "Don't Forget Your Sunscreen!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "ENVIRONMENTAL",
    description: "Scientists discovered the sky's protective sunscreen had a big hole in it and everyone started looking for a very large bottle.",
    sideEffects: "Cautious optimism, sunscreen awareness",
    consumptionTime: "5 minutes ending with hope",
    filePath: "/ATCS/Ozone%20(2).png",
  },
  {
    caseFileId: "ATCS-015",
    title: "Chernobyl: A Glowing Bedtime Story",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "NUCLEAR",
    description: "The worst nuclear disaster in history, told through a child's eyes. Invisible danger, abandoned cities, and lessons about the atoms we split but couldn't control.",
    sideEffects: "Radiophobia, Geiger counter obsession",
    consumptionTime: "8 minutes of glowing dread",
    filePath: "/ATCS/Chernobyl.png",
  },
  {
    caseFileId: "ATCS-016",
    title: "Learning New Skills at Home",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "BIOHAZARD",
    description: "A tiny traveling germ convinced the whole world to stay home, bake bread, and learn what 'six feet' really means.",
    sideEffects: "Zoom fatigue, hand sanitizer dependency",
    consumptionTime: "5 minutes of indefinite lockdown",
    filePath: "/ATCS/Covid.png",
  },
  {
    caseFileId: "ATCS-017",
    title: "I Want THAT Balloon, Mommy!",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A giant flying balloon full of passengers decided to end its trip with a very dramatic firework.",
    sideEffects: "Balloon phobia, involuntary flinching near open flames",
    consumptionTime: "5 minutes of explosive regret",
    filePath: "/ATCS/Hindenburg.png",
  },
  {
    caseFileId: "ATCS-018",
    title: "Winter Picnic",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "CATASTROPHIC",
    description: "A group of travelers took a shortcut through the mountains and discovered winter had already reserved the campsite.",
    sideEffects: "Permanent distrust of shortcuts, loss of appetite",
    consumptionTime: "5 minutes of mounting hunger",
    filePath: "/ATCS/Donner.png",
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

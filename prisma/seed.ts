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
    description: "Pride, technology, class, and hubris collide on the unsinkable ship. A dramatic beginning, a devastating event, and a powerful moral about overconfidence and safety.",
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
    description: "Money disappeared, jobs vanished, and the world learned the hard way about systems and resilience. Economy collapse explained for tiny humans.",
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
    description: "Nature's power — a volcano, ash, and a city frozen in time. Visually dramatic and mythic. The mountain was not sleeping.",
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
    description: "A sudden natural disaster teaches about earthquakes, ocean waves, and the importance of warning systems. The ocean doesn't send invitations.",
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
    description: "Corporate negligence meets invisible danger. An industrial accident that teaches the heavy responsibility companies carry — and what happens when they drop it.",
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
    description: "Natural disaster meets nuclear power. Earthquake, tsunami, reactor failure — layered but narratively clean. Three disasters in one terrible package.",
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
    description: "Urban planning and rebuilding. A clear event, a clear aftermath, and a strong rebuilding arc. Sometimes you need to burn it all down to build it better.",
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
    description: "The power of weapons. A serious moral lesson about war and responsibility. Much heavier tone. The world changed in a flash — literally.",
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
    description: "Environmental disaster — visual wildlife impact, corporate responsibility, and cleanup efforts. The ocean asked for nothing and got the worst of us.",
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
    description: "Government response and inequality collide. A natural disaster that exposed human systems failure. The storm was only the beginning.",
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
    description: "Environmental damage reversed. The world actually cooperated and fixed it. A rare story that ends positively — proof that humans can occasionally get it right.",
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
    filePath: "/ATCS/ATCS%20Chernobyl.pdf",
  },
  {
    caseFileId: "ATCS-016",
    title: "Learning New Skills at Home",
    series: "Absolutely Terrible Children's Stories",
    tokenCost: 50,
    status: "OPENED",
    classification: "BIOHAZARD",
    description: "A global pandemic locks everyone indoors. Toilet paper vanishes, sourdough rises, and the world learns that 'two weeks to flatten the curve' was optimistic at best.",
    sideEffects: "Zoom fatigue, hand sanitizer dependency",
    consumptionTime: "5 minutes of indefinite lockdown",
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

// ─── POST /api/studio/submit ────────────────────────
// The Leak Protocol — submit content to the marketplace
// Anyone can publish. Set your price. Retain your rights.
// We just take 10% for keeping the lights on.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

const submitSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  series: z.string().max(100).optional().default(""),
  description: z.string().min(1, "Description is required").max(2000),
  sideEffects: z.string().max(500).optional().default(""),
  consumptionTime: z.string().max(100).optional().default(""),
  classification: z.string().max(50).optional().default("COMMUNITY"),
  tokenCost: z.number().int().min(10).max(1000),
  contentBody: z.string().max(50000).optional().default(""),
});

function generateCaseFileId(): string {
  const prefix = "TB";
  const num = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `${prefix}-${num}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = submitSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { error: `Validation failed: ${firstError}. Even chaos has standards.` },
        { status: 400 }
      );
    }

    const { title, series, description, sideEffects, consumptionTime, classification, tokenCost, contentBody } = parsed.data;

    // Get or create the demo user as contributor (in production: check session)
    let user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { error: "You need to exist before you can contribute. Philosophical requirements." },
        { status: 401 }
      );
    }

    // Upgrade to CONTRIBUTOR if they're just a READER
    if (user.role === "READER") {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: "CONTRIBUTOR" },
      });
    }

    // Generate unique case file ID
    let caseFileId = generateCaseFileId();
    let attempts = 0;
    while (await prisma.content.findUnique({ where: { caseFileId } })) {
      caseFileId = generateCaseFileId();
      attempts++;
      if (attempts > 10) {
        return NextResponse.json(
          { error: "Couldn't generate a unique ID. The namespace is haunted." },
          { status: 500 }
        );
      }
    }

    // Create the content
    const content = await prisma.content.create({
      data: {
        caseFileId,
        title,
        series: series || "Community Submissions",
        tokenCost,
        status: "PENDING", // Needs approval before going LEAKED
        classification: classification || "COMMUNITY",
        description,
        sideEffects: sideEffects || "Unknown — proceed at your own risk",
        consumptionTime: consumptionTime || "Your guess is as good as ours",
        body: contentBody || "",
        creatorId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Case file ${caseFileId} submitted for containment review. Your trauma has been received.`,
      caseFileId: content.caseFileId,
      contentId: content.id,
    });
  } catch (error) {
    console.error("[STUDIO/SUBMIT]", error);
    return NextResponse.json(
      { error: "Submission failed. Your trauma remains uncontained." },
      { status: 500 }
    );
  }
}

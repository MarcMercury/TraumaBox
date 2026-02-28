// ─── POST /api/studio/submit ────────────────────────
// The Leak Protocol — submit content to the marketplace
// Anyone can publish. Set your price. Retain your rights.
// We just take 10% for keeping the lights on.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    const { title, series, description, sideEffects, consumptionTime, classification, tokenCost, contentBody } = body;

    // Validation — because even chaos has standards
    if (!title || !description || !tokenCost) {
      return NextResponse.json(
        { error: "Missing required fields. At minimum: title, description, and token cost. We're not that demanding." },
        { status: 400 }
      );
    }

    if (tokenCost < 10 || tokenCost > 1000) {
      return NextResponse.json(
        { error: "Token cost must be between 10 and 1000. We said you could charge whatever you want, but within reason." },
        { status: 400 }
      );
    }

    // Get or create the demo user as contributor (in production: check session)
    let user = await prisma.user.findUnique({
      where: { email: "subject@trauma.box" },
    });

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

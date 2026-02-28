"use client";

import { useState } from "react";
import Image from "next/image";
import { useTokens } from "@/components/TokenProvider";

// Sample case files — will eventually come from Supabase
// tokenCost: price in tokens (1 token = $0.01)
const CASE_FILES = [
  {
    id: "ATCS-001",
    title: "The Hindenburg: A Hot Air Balloon Story",
    series: "Absolutely Terrible Children's Stories",
    status: "LEAKED" as const,
    sideEffects: "Mild existential dread, inappropriate laughter",
    consumptionTime: "4 minutes of your life you won't get back",
    classification: "CATASTROPHIC",
    tokenCost: 50,
    thumbnail: null,
    file: "/ATCS/ATCS%20B1.pdf",
    description:
      "Little Timmy learns about the magic of flying — and the slightly less magical part where everything catches fire and people scream.",
  },
  {
    id: "ATCS-002",
    title: "Pompeii: A Nature Walk Gone Wrong",
    series: "Absolutely Terrible Children's Stories",
    status: "OPENED" as const,
    sideEffects: "Volcanic anxiety, history trauma",
    consumptionTime: "5 minutes of escalating discomfort",
    classification: "CATASTROPHIC",
    tokenCost: 50,
    thumbnail: null,
    file: null,
    description:
      "Join young Marcus on an educational tour of his lovely city! Spoiler: the mountain is not sleeping.",
  },
  {
    id: "ATCS-003",
    title: "The Titanic: A Boat Ride Adventure",
    series: "Absolutely Terrible Children's Stories",
    status: "LEAKED" as const,
    sideEffects: "Aquaphobia, trust issues with icebergs",
    consumptionTime: "6 minutes of sinking feeling",
    classification: "CATASTROPHIC",
    tokenCost: 60,
    thumbnail: null,
    file: null,
    description:
      "An unsinkable ship meets a very sink-able reality. Features fun activities like 'spot the iceberg' and 'count the lifeboats' (trick question — there aren't enough).",
  },
  {
    id: "ATCS-004",
    title: "Chernobyl: A Glowing Bedtime Story",
    series: "Absolutely Terrible Children's Stories",
    status: "REDACTED" as const,
    sideEffects: "Radiophobia, third arm growth (unconfirmed)",
    consumptionTime: "3 minutes with a half-life of forever",
    classification: "NUCLEAR",
    tokenCost: 100,
    thumbnail: null,
    file: null,
    description:
      "Little Svetlana notices the power plant is glowing tonight! How pretty! This cannot possibly end poorly.",
  },
  {
    id: "ATCS-005",
    title: "The Donner Party: A Camping Cookbook",
    series: "Absolutely Terrible Children's Stories",
    status: "LEAKED" as const,
    sideEffects: "Loss of appetite, camping phobia, trust issues",
    consumptionTime: "4 minutes of increasing hunger",
    classification: "GASTRONOMIC",
    tokenCost: 50,
    thumbnail: null,
    file: null,
    description:
      "The pioneers packed everything for their trip west! Well, almost everything. Mostly, they forgot enough food. But necessity is the mother of invention... and some other things.",
  },
  {
    id: "TB-GAME-001",
    title: "Trauma Bingo",
    series: "Interactive Containment",
    status: "OPENED" as const,
    sideEffects: "Competitive suffering, hollow victory",
    consumptionTime: "As long as your soul lasts",
    classification: "INTERACTIVE",
    tokenCost: 25,
    thumbnail: null,
    file: null,
    description:
      "Mark off historical disasters as they're read aloud! First to fill a row wins absolutely nothing of value.",
  },
];

type StatusType = "REDACTED" | "LEAKED" | "OPENED";

const STATUS_CONFIG: Record<StatusType, { class: string; icon: string }> = {
  REDACTED: { class: "status-redacted", icon: "█" },
  LEAKED: { class: "status-leaked", icon: "⚡" },
  OPENED: { class: "status-opened", icon: "◉" },
};

export default function FeedPage() {
  const [filter, setFilter] = useState<StatusType | "ALL">("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { user, hasUnlocked, unlockContent } = useTokens();
  const [unlocking, setUnlocking] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  const filtered =
    filter === "ALL"
      ? CASE_FILES
      : CASE_FILES.filter((f) => f.status === filter);

  const handleUnlock = async (caseFileId: string) => {
    setUnlocking(caseFileId);
    setFeedback(null);
    const result = await unlockContent(caseFileId);
    setFeedback({ id: caseFileId, msg: result.message, ok: result.success });
    setUnlocking(null);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-[var(--accent)] animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-[var(--accent)] tracking-wider glitch-text"
            data-text="THE MANIFEST"
          >
            THE MANIFEST
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          CLASSIFIED CONTENT REPOSITORY — {CASE_FILES.length} CASE FILES LOADED
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
        <span className="text-[#555] mr-2">FILTER:</span>
        {(["ALL", "LEAKED", "OPENED", "REDACTED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 border transition-all ${
              filter === s
                ? "border-[var(--accent)] text-[var(--accent)] bg-[rgba(255,102,0,0.1)]"
                : "border-[#333] text-[#666] hover:border-[#555] hover:text-[#999]"
            }`}
          >
            {s === "ALL" ? `ALL [${CASE_FILES.length}]` : `${s} [${CASE_FILES.filter((f) => f.status === s).length}]`}
          </button>
        ))}
      </div>

      {/* Case File Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((file, index) => (
          <div
            key={file.id}
            className="case-file p-4 glitch-hover"
            onMouseEnter={() => setHoveredId(file.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* File header */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-[#555]">
                CASE: {file.id}
              </span>
              <span
                className={`${
                  STATUS_CONFIG[file.status].class
                } px-2 py-0.5 text-[10px] font-mono font-bold`}
              >
                {STATUS_CONFIG[file.status].icon} {file.status}
              </span>
            </div>

            {/* Thumbnail placeholder */}
            <div className="relative w-full h-40 bg-[#111] border border-[#222] mb-3 flex items-center justify-center overflow-hidden group">
              {file.status === "REDACTED" ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">█████</div>
                  <div className="font-mono text-[10px] text-[#444]">
                    CONTENT REDACTED
                  </div>
                </div>
              ) : (
                <div className="text-center relative">
                  <div className="text-5xl mb-2 opacity-20">
                    {file.classification === "INTERACTIVE" ? "🎮" : "📁"}
                  </div>
                  <div className="font-mono text-[10px] text-[#444]">
                    {file.classification}
                  </div>
                  {/* Hover scan effect */}
                  {hoveredId === file.id && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-10 animate-pulse" />
                  )}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="font-sans text-lg text-white mb-1 leading-tight">
              {file.title}
            </h3>

            {/* Series */}
            <div className="font-mono text-[10px] text-[var(--accent)] mb-3 tracking-wider">
              {file.series.toUpperCase()}
            </div>

            {/* Description */}
            <p className="font-mono text-xs text-[#888] mb-4 leading-relaxed">
              {file.status === "REDACTED"
                ? "████████ ████ ██████████ ███ ████████ █████████ ████████"
                : file.description}
            </p>

            {/* Metadata */}
            <div className="space-y-1 border-t border-[#222] pt-3">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#555]">SIDE EFFECTS:</span>
                <span className="text-[#777] text-right max-w-[60%]">
                  {file.sideEffects}
                </span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#555]">TIME COST:</span>
                <span className="text-[#777]">{file.consumptionTime}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#555]">TOKEN COST:</span>
                <span className={`font-bold ${hasUnlocked(file.id) ? "text-[var(--terminal-green)]" : "text-[var(--accent)]"}`}>
                  {hasUnlocked(file.id) ? "OWNED ✓" : `${file.tokenCost} T ($${(file.tokenCost * 0.01).toFixed(2)})`}
                </span>
              </div>
            </div>

            {/* Action button — token-gated */}
            {hasUnlocked(file.id) ? (
              file.file ? (
                <a
                  href={file.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 py-2 font-mono text-xs tracking-wider border text-center transition-all border-[var(--terminal-green)] text-[var(--terminal-green)] hover:bg-[var(--terminal-green)] hover:text-black"
                >
                  ◉ ACCESS GRANTED — OPEN CASE FILE →
                </a>
              ) : (
                <button
                  className="w-full mt-4 py-2 font-mono text-xs tracking-wider border border-[var(--terminal-green)] text-[var(--terminal-green)] cursor-default"
                  disabled
                >
                  ◉ UNLOCKED — CONTENT PENDING UPLOAD
                </button>
              )
            ) : file.status === "REDACTED" ? (
              <button
                className="w-full mt-4 py-2 font-mono text-xs tracking-wider border border-[#333] text-[#444] cursor-not-allowed"
                disabled
              >
                ACCESS DENIED — CLASSIFICATION: {file.classification}
              </button>
            ) : (
              <button
                onClick={() => handleUnlock(file.id)}
                disabled={unlocking === file.id || (user?.tokenBalance ?? 0) < file.tokenCost}
                className={`w-full mt-4 py-2 font-mono text-xs tracking-wider border transition-all ${
                  unlocking === file.id
                    ? "border-[var(--accent)] text-[var(--accent)] animate-pulse"
                    : (user?.tokenBalance ?? 0) >= file.tokenCost
                    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                    : "border-[#333] text-[#555] cursor-not-allowed"
                }`}
              >
                {unlocking === file.id
                  ? "BURNING TOKENS..."
                  : (user?.tokenBalance ?? 0) >= file.tokenCost
                  ? `Spend ${file.tokenCost} Tokens to ruin your day →`
                  : `Need ${file.tokenCost - (user?.tokenBalance ?? 0)} more tokens`}
              </button>
            )}

            {/* Feedback toast */}
            {feedback?.id === file.id && (
              <div className={`mt-2 px-3 py-1.5 font-mono text-[10px] border ${
                feedback.ok
                  ? "border-[var(--terminal-green)] text-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)]"
                  : "border-red-500 text-red-500 bg-[rgba(255,0,0,0.05)]"
              }`}>
                {feedback.msg}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom status bar */}
      <div className="mt-8 border-t border-[#1a1a1a] pt-4 flex flex-wrap items-center justify-between font-mono text-[10px] text-[#444]">
        <span>
          DISPLAYING {filtered.length} OF {CASE_FILES.length} CASE FILES
        </span>
        <span>
          LAST CONTAINMENT AUDIT:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </span>
      </div>

      {/* Email signup */}
      <div className="mt-12 border border-[#222] bg-[#0d0d0d] p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-sans text-lg text-white mb-1">
              JOIN THE MAILING LIST
            </h3>
            <p className="font-mono text-xs text-[#555]">
              For updates you&apos;ll likely ignore. We promise to occasionally
              deliver content directly to your inbox that you didn&apos;t ask for.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.doom"
              className="bg-black border border-[#333] px-3 py-2 font-mono text-xs text-[#999] focus:border-[var(--accent)] focus:outline-none flex-1 sm:w-48"
            />
            <button className="px-4 py-2 bg-[var(--accent)] text-black font-mono text-xs font-bold hover:bg-white transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

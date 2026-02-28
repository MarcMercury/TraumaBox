// ─── Content Gate (The Toll Booth) ──────────────────
// Gatekeeper component: shows locked/unlocked state
// "Spend X Tokens to ruin your day?"

"use client";

import { useState } from "react";
import { useTokens } from "./TokenProvider";

interface ContentGateProps {
  caseFileId: string;
  title: string;
  tokenCost: number;
  children: React.ReactNode; // The actual content (shown when unlocked)
  blurPreview?: React.ReactNode; // Optional: blurred/redacted preview
}

export default function ContentGate({
  caseFileId,
  title,
  tokenCost,
  children,
  blurPreview,
}: ContentGateProps) {
  const { user, hasUnlocked, unlockContent } = useTokens();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [justUnlocked, setJustUnlocked] = useState(false);

  const isOwned = hasUnlocked(caseFileId);
  const canAfford = (user?.tokenBalance ?? 0) >= tokenCost;

  const handleUnlock = async () => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    setFeedback(null);

    const result = await unlockContent(caseFileId);

    setFeedback({
      type: result.success ? "success" : "error",
      msg: result.message,
    });

    if (result.success) {
      setJustUnlocked(true);
    }

    setIsUnlocking(false);
  };

  // ──── UNLOCKED STATE ────
  if (isOwned || justUnlocked) {
    return (
      <div className="content-gate-unlocked">
        {justUnlocked && (
          <div className="content-gate-flash mb-4 p-3 border border-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)] font-mono text-xs text-[var(--terminal-green)]">
            <span className="animate-boot-blink mr-2">◉</span>
            ACCESS GRANTED — Content decrypted successfully
          </div>
        )}
        {children}
      </div>
    );
  }

  // ──── LOCKED STATE (The Toll Booth) ────
  return (
    <div className="content-gate-locked relative">
      {/* Blurred preview or default redacted block */}
      <div className="relative overflow-hidden">
        {blurPreview ? (
          <div className="blur-sm pointer-events-none select-none opacity-40">
            {blurPreview}
          </div>
        ) : (
          <div className="bg-[#0a0a0a] border border-[#222] p-8 text-center">
            <div className="text-4xl mb-4 opacity-20">🔒</div>
            <div className="font-mono text-sm text-[#333] space-y-1">
              <div>████████ ████ ██████████</div>
              <div>███ ████████ █████████</div>
              <div>████████ ███████ ████</div>
              <div>█████ ████████████ ██</div>
            </div>
          </div>
        )}

        {/* Lock overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black flex flex-col items-center justify-end pb-6">
          <div className="text-center space-y-3">
            {/* Classification banner */}
            <div className="inline-block px-3 py-1 border border-[var(--accent)] bg-[rgba(255,102,0,0.1)] font-mono text-[10px] text-[var(--accent)] tracking-widest">
              ◈ CLASSIFIED CONTENT ◈
            </div>

            {/* Title */}
            <h3 className="font-sans text-lg text-white px-4">
              {title}
            </h3>

            {/* Cost display */}
            <div className="font-mono text-xs text-[#888]">
              TOKEN COST:{" "}
              <span className={`font-bold ${canAfford ? "text-[var(--accent)]" : "text-red-500"}`}>
                {tokenCost}
              </span>
              <span className="text-[#444] ml-1">(${(tokenCost * 0.01).toFixed(2)})</span>
            </div>

            {/* The sardonic unlock button */}
            <button
              onClick={handleUnlock}
              disabled={isUnlocking || !canAfford}
              className={`
                px-6 py-3 font-mono text-xs tracking-wider border transition-all
                ${isUnlocking ? "animate-pulse" : ""}
                ${
                  canAfford
                    ? "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                    : "border-[#333] text-[#555] cursor-not-allowed"
                }
              `}
            >
              {isUnlocking
                ? "PROCESSING EMOTIONAL TRANSACTION..."
                : canAfford
                ? `Exchange ${tokenCost} Tokens for this disappointment`
                : `INSUFFICIENT TOKENS (Need ${tokenCost - (user?.tokenBalance ?? 0)} more)`}
            </button>

            {!canAfford && (
              <p className="font-mono text-[10px] text-[#444]">
                Visit the TRAUMA KIT to acquire more tokens
              </p>
            )}

            {/* Feedback message */}
            {feedback && (
              <div
                className={`font-mono text-xs px-4 py-2 border ${
                  feedback.type === "success"
                    ? "border-[var(--terminal-green)] text-[var(--terminal-green)]"
                    : "border-red-500 text-red-500"
                }`}
              >
                {feedback.msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

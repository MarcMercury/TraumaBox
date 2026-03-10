"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTokens } from "@/components/TokenProvider";

interface ContentDetail {
  id: string;
  caseFileId: string;
  title: string;
  series: string;
  tokenCost: number;
  status: string;
  classification: string;
  description: string;
  sideEffects: string;
  consumptionTime: string;
  filePath: string | null;
  thumbnailPath: string | null;
  creatorName: string;
  creatorId: string | null;
  totalUnlocks: number;
  createdAt: string;
  unlocked: boolean;
  body: string | null;
}

export default function ContentViewerPage() {
  const { caseFileId } = useParams<{ caseFileId: string }>();
  const [content, setContent] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);
  const { user, unlockContent, hasUnlocked } = useTokens();

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content/${encodeURIComponent(caseFileId)}`);
      const data = await res.json();
      if (res.ok) {
        setContent(data);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to reach containment database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseFileId]);

  const handleUnlock = async () => {
    setUnlocking(true);
    setFeedback(null);
    const result = await unlockContent(caseFileId);
    setFeedback({ msg: result.message, ok: result.success });
    if (result.success) {
      // Refetch to get the body
      await fetchContent();
    }
    setUnlocking(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          RETRIEVING CASE FILE...
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="border border-[var(--danger)] bg-[rgba(255,34,34,0.05)] p-6 font-mono text-sm text-[var(--danger)]">
          {error ?? "Case file not found."}
        </div>
        <Link href="/feed" className="font-mono text-xs text-[#555] mt-4 inline-block hover:text-[var(--accent)]">
          ← BACK TO THE MANIFEST
        </Link>
      </div>
    );
  }

  const isUnlocked = content.unlocked || hasUnlocked(caseFileId);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="font-mono text-[10px] text-[#444] mb-6">
        <Link href="/feed" className="hover:text-[var(--accent)] transition-colors">THE MANIFEST</Link>
        <span className="mx-2">/</span>
        <span className="text-[#666]">{content.caseFileId}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
            content.status === "LEAKED"
              ? "text-[var(--accent)] border-[var(--accent)]"
              : content.status === "OPENED"
              ? "text-[var(--terminal-green)] border-[var(--terminal-green)]"
              : "text-[#555] border-[#333]"
          }`}>
            {content.status}
          </span>
          <span className="font-mono text-[10px] text-[#555]">
            CASE: {content.caseFileId}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-sans text-white tracking-wide mb-2">
          {content.status === "REDACTED" ? "████████████████████" : content.title}
        </h1>
        <div className="flex items-center gap-4 font-mono text-xs text-[#666]">
          <span className="text-[var(--accent)]">{content.series.toUpperCase()}</span>
          <span>by <span className={content.creatorId ? "text-[var(--terminal-green)]" : "text-[#777]"}>{content.creatorName}</span></span>
          <span>{content.totalUnlocks} {content.totalUnlocks === 1 ? "unlock" : "unlocks"}</span>
        </div>
      </div>

      {/* Description */}
      <div className="border border-[#222] bg-[#0d0d0d] p-4 mb-6">
        <p className="font-mono text-xs text-[#888] leading-relaxed">
          {content.status === "REDACTED"
            ? "████████ ████ ██████████ ███ ████████ █████████ ████████ ███ ████████ ██████████"
            : content.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <MetaCard label="CLASSIFICATION" value={content.classification} />
        <MetaCard label="SIDE EFFECTS" value={content.sideEffects || "Unknown"} />
        <MetaCard label="TIME COST" value={content.consumptionTime || "TBD"} />
        <MetaCard label="TOKEN COST" value={isUnlocked ? "OWNED ✓" : `${content.tokenCost} T`} accent={!isUnlocked} />
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className={`mb-6 p-4 border font-mono text-sm ${
          feedback.ok
            ? "border-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)] text-[var(--terminal-green)]"
            : "border-[var(--danger)] bg-[rgba(255,34,34,0.05)] text-[var(--danger)]"
        }`}>
          {feedback.msg}
        </div>
      )}

      {/* Content Body or Lock Gate */}
      {isUnlocked ? (
        <div className="border border-[var(--terminal-green)] bg-[#0a0a0a]">
          <div className="border-b border-[#222] px-4 py-2 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[var(--terminal-green)]">◉ ACCESS GRANTED</span>
            <span className="font-mono text-[10px] text-[#555]">CASE FILE: {content.caseFileId}</span>
          </div>
          <div className="p-6">
            {content.body ? (
              <div className="font-mono text-sm text-[#ccc] leading-relaxed whitespace-pre-wrap">
                {content.body}
              </div>
            ) : content.filePath && !/\.(png|jpg|jpeg|webp)$/i.test(content.filePath) ? (
              <div className="space-y-6">
                {content.thumbnailPath && (
                  <img
                    src={content.thumbnailPath}
                    alt={content.title}
                    className="w-full border border-[#222]"
                  />
                )}
                <div className="text-center py-4">
                  <a
                    href={content.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[var(--terminal-green)] text-[var(--terminal-green)] font-mono text-sm hover:bg-[var(--terminal-green)] hover:text-black transition-all inline-block"
                  >
                    ◉ OPEN FULL CASE FILE →
                  </a>
                  <div className="font-mono text-[10px] text-[#555] mt-3">
                    DECLASSIFIED DOCUMENT — TAP TO READ
                  </div>
                </div>
              </div>
            ) : content.filePath && /\.(png|jpg|jpeg|webp)$/i.test(content.filePath) ? (
              <div className="space-y-4">
                <img
                  src={content.filePath}
                  alt={content.title}
                  className="w-full border border-[#222]"
                />
              </div>
            ) : (
              <div className="text-center py-8 font-mono text-sm text-[#555]">
                Content has been unlocked but no body or file has been uploaded yet.
                <br />
                <span className="text-[10px] text-[#444]">The void is empty. Check back later.</span>
              </div>
            )}
          </div>
        </div>
      ) : content.status === "REDACTED" ? (
        <div className="border border-[#333] bg-[#0a0a0a] p-8 text-center">
          <div className="text-4xl mb-4">█████████</div>
          <div className="font-mono text-sm text-[#555] mb-2">CLASSIFICATION: {content.classification}</div>
          <div className="font-mono text-xs text-[#444]">This content has been redacted. Access denied.</div>
        </div>
      ) : (
        <div className="border border-[var(--accent)] bg-[#0a0a0a] p-8 text-center">
          <div className="font-mono text-lg text-[var(--accent)] mb-2">🔒 CONTENT LOCKED</div>
          <div className="font-mono text-xs text-[#888] mb-6">
            Pay <span className="text-[var(--accent)] font-bold">{content.tokenCost} tokens</span> to access this case file.
            {user && (
              <span className="block mt-1 text-[#555]">
                Your balance: {user.tokenBalance} tokens
              </span>
            )}
          </div>
          <button
            onClick={handleUnlock}
            disabled={unlocking || !user || user.tokenBalance < content.tokenCost}
            className={`px-6 py-3 font-mono text-sm border transition-all ${
              unlocking
                ? "border-yellow-500 text-yellow-500 animate-pulse"
                : !user || user.tokenBalance < content.tokenCost
                ? "border-[#333] text-[#444] cursor-not-allowed"
                : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
            }`}
          >
            {unlocking ? "PROCESSING BURN PROTOCOL..." : `BURN ${content.tokenCost} TOKENS → UNLOCK`}
          </button>
          {user && user.tokenBalance < content.tokenCost && (
            <div className="mt-3 font-mono text-[10px] text-[var(--danger)]">
              INSUFFICIENT TOKENS — Refresh the page for a new random token allocation.
            </div>
          )}
        </div>
      )}

      {/* Back link */}
      <div className="mt-8 pt-4 border-t border-[#222]">
        <Link href="/feed" className="font-mono text-xs text-[#555] hover:text-[var(--accent)] transition-colors">
          ← BACK TO THE MANIFEST
        </Link>
      </div>
    </div>
  );
}

function MetaCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-[#222] bg-[#0d0d0d] p-3">
      <div className="font-mono text-[10px] text-[#555] mb-1">{label}</div>
      <div className={`font-mono text-xs ${accent ? "text-[var(--accent)] font-bold" : "text-[#888]"}`}>
        {value}
      </div>
    </div>
  );
}

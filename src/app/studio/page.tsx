"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface CreatorStats {
  totalTokensEarned: number;
  contentCount: number;
  pendingTokenBalance: number;
  totalSales: number;
}

interface ContentItem {
  id: string;
  caseFileId: string;
  title: string;
  tokenCost: number;
  status: string;
  totalUnlocks: number;
  totalRevenue: number;
  createdAt: string;
}

interface StudioData {
  isContributor: boolean;
  message?: string;
  stats: CreatorStats | null;
  content: ContentItem[];
  user?: {
    displayName: string;
    role: string;
    tokenBalance: number;
  };
}

export default function StudioDashboard() {
  const [data, setData] = useState<StudioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch("/api/studio/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (contentId: string, action: "publish" | "redact") => {
    setActionLoading(contentId);
    try {
      const res = await fetch("/api/studio/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId, action }),
      });
      const result = await res.json();
      if (result.success) {
        fetchData();
      }
    } catch {
      // silent
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          LOADING CREATOR TERMINAL...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-[var(--terminal-green)] animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-[var(--terminal-green)] tracking-wider glitch-text"
            data-text="THE LEAK PROTOCOL"
          >
            THE LEAK PROTOCOL
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          CREATOR DASHBOARD — ADD TO THE FEED (90% TOKEN SHARE)
        </p>
      </div>

      {/* Welcome / Pitch Banner */}
      {!data?.isContributor && (
        <div className="border border-[var(--terminal-green)] bg-[rgba(0,255,65,0.03)] p-6 mb-8">
          <h2 className="font-sans text-xl text-white mb-3">
            WELCOME TO THE CHAOS ENGINE
          </h2>
          <div className="font-mono text-xs text-[#888] space-y-3 leading-relaxed">
            <p>
              Trauma Box is now an <span className="text-[var(--terminal-green)]">open feed</span>.
              Anyone can contribute content. Tokens are freely assigned — no money involved.
            </p>
            <p>
              <span className="text-white">The deal is simple:</span> You create. You set the token cost.
              Readers spend their randomly assigned tokens. You get <span className="text-[var(--terminal-green)]">90%</span>.
              The house keeps <span className="text-[var(--accent)]">10%</span> as a containment fee tally.
            </p>
            <p>
              You retain <span className="text-white">100% ownership</span> of your intellectual property.
              We&apos;re just the middleman. A morally questionable middleman, but a middleman nonetheless.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <Link
              href="/studio/submit"
              className="px-6 py-3 bg-[var(--terminal-green)] text-black font-mono text-sm font-bold hover:bg-white transition-colors"
            >
              CONTRIBUTE TO THE CHAOS →
            </Link>
            <Link
              href="/studio/agreement"
              className="px-6 py-3 border border-[#333] text-[#888] font-mono text-sm hover:border-[#555] transition-colors"
            >
              READ THE CONTRACT
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {data?.isContributor && data.stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="TOTAL TOKENS EARNED"
              value={data.stats.totalTokensEarned.toLocaleString()}
              subValue="tokens earned from unlocks"
              color="var(--terminal-green)"
            />
            <StatCard
              label="CURRENT TOKEN BALANCE"
              value={data.stats.pendingTokenBalance.toLocaleString()}
              subValue="tokens in your account"
              color="var(--accent)"
            />
            <StatCard
              label="CASE FILES"
              value={data.stats.contentCount.toString()}
              subValue="content published"
              color="white"
            />
            <StatCard
              label="TOTAL SALES"
              value={data.stats.totalSales.toString()}
              subValue="souls consumed your work"
              color="var(--danger)"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/studio/submit"
              className="px-6 py-3 bg-[var(--terminal-green)] text-black font-mono text-sm font-bold hover:bg-white transition-colors"
            >
              ⬆ ADD TO FEED
            </Link>
            <Link
              href="/feed/tally"
              className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] font-mono text-sm hover:bg-[var(--accent)] hover:text-black transition-colors"
            >
              ⚖ VIEW HOUSE TALLY
            </Link>
          </div>

          {/* Content Table */}
          <div className="border border-[#222] bg-[#0d0d0d]">
            <div className="border-b border-[#222] px-4 py-3 flex items-center justify-between">
              <h2 className="font-sans text-lg text-white">YOUR CASE FILES</h2>
              <span className="font-mono text-[10px] text-[#555]">
                {data.content.length} SUBMISSIONS
              </span>
            </div>

            {data.content.length === 0 ? (
              <div className="p-8 text-center font-mono text-sm text-[#555]">
                No content yet. The void stares back. <br />
                <Link href="/studio/submit" className="text-[var(--terminal-green)] underline mt-2 inline-block">
                  Submit your first case file →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#1a1a1a]">
                {data.content.map((item) => (
                  <div key={item.id} className="px-4 py-3 flex items-center justify-between hover:bg-[#111] transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[#555]">{item.caseFileId}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                          item.status === "LEAKED" ? "text-[var(--terminal-green)] border-[var(--terminal-green)]" :
                          item.status === "PENDING" ? "text-yellow-500 border-yellow-500" :
                          "text-[#555] border-[#333]"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-sans text-sm text-white mt-1">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-xs">
                      <div className="text-right">
                        <div className="text-[#555]">PRICE</div>
                        <div className="text-[var(--accent)]">{item.tokenCost} TKN</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#555]">SALES</div>
                        <div className="text-white">{item.totalUnlocks}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#555]">EARNED</div>
                        <div className="text-[var(--terminal-green)]">{item.totalRevenue} TKN</div>
                      </div>
                      {item.status === "PENDING" && (
                        <button
                          onClick={() => handleAction(item.id, "publish")}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1.5 border border-[var(--terminal-green)] text-[var(--terminal-green)] text-[10px] hover:bg-[var(--terminal-green)] hover:text-black transition-all disabled:opacity-50"
                        >
                          {actionLoading === item.id ? "..." : "PUBLISH"}
                        </button>
                      )}
                      {(item.status === "LEAKED" || item.status === "OPENED") && (
                        <button
                          onClick={() => handleAction(item.id, "redact")}
                          disabled={actionLoading === item.id}
                          className="px-3 py-1.5 border border-[#555] text-[#555] text-[10px] hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all disabled:opacity-50"
                        >
                          {actionLoading === item.id ? "..." : "REDACT"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* How It Works */}
      <div className="mt-12 border border-[#222] bg-[#0d0d0d] p-6">
        <h2 className="font-sans text-xl text-white mb-4">HOW THE LEAK PROTOCOL WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-4xl">📤</div>
            <h3 className="font-sans text-sm text-white">1. ADD TO THE FEED</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              Upload stories, games, media — whatever fits the vibe.
              Set your token cost between 10–1000. Your content, your rules.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🎲</div>
            <h3 className="font-sans text-sm text-white">2. RANDOM TOKEN ECONOMY</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              Visitors get randomly assigned tokens each visit. When they unlock
              your content, you get 90% of the tokens. The house gets 10%.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">⚖</div>
            <h3 className="font-sans text-sm text-white">3. THE TALLY</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              Check the House Tally to see the running totals.
              Tokens are chaos currency — freely assigned, freely spent, worthless everywhere else.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subValue,
  color,
}: {
  label: string;
  value: string;
  subValue: string;
  color: string;
}) {
  return (
    <div className="border border-[#222] bg-[#0d0d0d] p-4">
      <div className="font-mono text-[10px] text-[#555] mb-2">{label}</div>
      <div className="font-sans text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="font-mono text-[10px] text-[#444] mt-1">{subValue}</div>
    </div>
  );
}

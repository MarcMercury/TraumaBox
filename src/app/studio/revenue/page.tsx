"use client";

import { useState, useEffect } from "react";

interface ContentRevenue {
  id: string;
  caseFileId: string;
  title: string;
  tokenCost: number;
  status: string;
  totalUnlocks: number;
  totalRevenue: number;
  createdAt: string;
}

export default function RevenuePage() {
  const [stats, setStats] = useState<{
    totalTokensEarned: number;
    contentCount: number;
    pendingTokenBalance: number;
    totalSales: number;
  } | null>(null);
  const [content, setContent] = useState<ContentRevenue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/studio/stats")
      .then((r) => r.json())
      .then((statsData) => {
        if (statsData.stats) setStats(statsData.stats);
        if (statsData.content) setContent(statsData.content);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          COUNTING YOUR TOKENS...
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-[var(--accent)] animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-[var(--accent)] tracking-wider glitch-text"
            data-text="TOKEN TALLY"
          >
            TOKEN TALLY
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          YOUR TOKEN EARNINGS FROM THE CHAOS ECONOMY
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">LIFETIME TOKENS EARNED</div>
            <div className="font-sans text-2xl font-bold text-[var(--terminal-green)]">
              {stats.totalTokensEarned.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">
              from all unlocks (90% share)
            </div>
          </div>
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">CURRENT BALANCE</div>
            <div className="font-sans text-2xl font-bold text-[var(--accent)]">
              {stats.pendingTokenBalance.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">
              tokens in your account
            </div>
          </div>
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">TOTAL UNLOCKS</div>
            <div className="font-sans text-2xl font-bold text-white">
              {stats.totalSales}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">across all content</div>
          </div>
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">PUBLISHED CONTENT</div>
            <div className="font-sans text-2xl font-bold text-white">
              {stats.contentCount}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">case files active</div>
          </div>
        </div>
      )}

      {/* Revenue Per Content */}
      <div className="border border-[#222] bg-[#0d0d0d] mb-8">
        <div className="border-b border-[#222] px-4 py-3">
          <h2 className="font-sans text-lg text-white">TOKENS BY CASE FILE</h2>
        </div>

        {content.length === 0 ? (
          <div className="p-8 text-center font-mono text-sm text-[#555]">
            No content published yet. No content = no tokens. Simple math.
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {content.map((item) => {
              const revenuePercent =
                stats && stats.totalTokensEarned > 0
                  ? ((item.totalRevenue / stats.totalTokensEarned) * 100).toFixed(1)
                  : "0";

              return (
                <div key={item.id} className="px-4 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-mono text-[10px] text-[#555] mr-2">
                        {item.caseFileId}
                      </span>
                      <span className="font-sans text-sm text-white">{item.title}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--terminal-green)]">
                      {item.totalRevenue} TKN earned
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-[#222] mb-2">
                    <div
                      className="h-full bg-[var(--terminal-green)] transition-all"
                      style={{ width: `${Math.min(100, parseFloat(revenuePercent))}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-[#555]">
                    <span>
                      {item.totalUnlocks} unlocks &times; {item.tokenCost} TKN &times;
                      90% = {item.totalRevenue} TKN
                    </span>
                    <span>{revenuePercent}% of total earnings</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fine Print */}
      <div className="mt-8 font-mono text-[10px] text-[#444] leading-relaxed">
        <p>
          TOKEN ECONOMICS: Tokens are randomly assigned chaos currency with no monetary value.
          The 90/10 split is a scoring mechanism, not a financial transaction.
          Check the House Tally page for the global running totals.
        </p>
      </div>
    </div>
  );
}

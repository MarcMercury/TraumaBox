"use client";

import { useState, useEffect } from "react";

interface TallyData {
  platformTokens: number;
  creatorTokens: number;
  totalTransactions: number;
  totalUnlocks: number;
}

export default function TallyPage() {
  const [tally, setTally] = useState<TallyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tally")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setTally(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          COUNTING THE CHAOS...
        </div>
      </div>
    );
  }

  const totalTokensFlowed = (tally?.platformTokens ?? 0) + (tally?.creatorTokens ?? 0);
  const platformPercent = totalTokensFlowed > 0
    ? ((tally?.platformTokens ?? 0) / totalTokensFlowed * 100).toFixed(1)
    : "0";
  const creatorPercent = totalTokensFlowed > 0
    ? ((tally?.creatorTokens ?? 0) / totalTokensFlowed * 100).toFixed(1)
    : "0";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-[var(--accent)] animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-[var(--accent)] tracking-wider glitch-text"
            data-text="THE HOUSE TALLY"
          >
            THE HOUSE TALLY
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          FULL TRANSPARENCY — WHERE THE CHAOS TOKENS FLOW
        </p>
      </div>

      {/* Explainer */}
      <div className="border border-[#222] bg-[#0d0d0d] p-4 mb-8">
        <p className="font-mono text-xs text-[#888] leading-relaxed">
          Every time someone unlocks content, the token cost splits:{" "}
          <span className="text-[var(--terminal-green)]">90% to the creator</span>,{" "}
          <span className="text-[var(--accent)]">10% to the house</span>.
          Tokens don&apos;t represent money. They&apos;re freely assigned chaos currency.
          This page tracks the running total so everyone can see where the tokens go.
        </p>
      </div>

      {/* Big Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* House (Platform) */}
        <div className="border border-[var(--accent)] bg-[rgba(255,102,0,0.03)] p-6">
          <div className="font-mono text-[10px] text-[#555] mb-2">THE HOUSE (10%)</div>
          <div className="font-sans text-5xl font-bold text-[var(--accent)]">
            {(tally?.platformTokens ?? 0).toLocaleString()}
          </div>
          <div className="font-mono text-xs text-[#444] mt-2">
            TOKENS COLLECTED AS CONTAINMENT FEE
          </div>
          <div className="w-full h-2 bg-[#222] mt-4">
            <div
              className="h-full bg-[var(--accent)] transition-all"
              style={{ width: `${platformPercent}%` }}
            />
          </div>
          <div className="font-mono text-[10px] text-[#555] mt-1">{platformPercent}% of all tokens</div>
        </div>

        {/* Creators */}
        <div className="border border-[var(--terminal-green)] bg-[rgba(0,255,65,0.03)] p-6">
          <div className="font-mono text-[10px] text-[#555] mb-2">THE CREATORS (90%)</div>
          <div className="font-sans text-5xl font-bold text-[var(--terminal-green)]">
            {(tally?.creatorTokens ?? 0).toLocaleString()}
          </div>
          <div className="font-mono text-xs text-[#444] mt-2">
            TOKENS DISTRIBUTED TO CONTENT CREATORS
          </div>
          <div className="w-full h-2 bg-[#222] mt-4">
            <div
              className="h-full bg-[var(--terminal-green)] transition-all"
              style={{ width: `${creatorPercent}%` }}
            />
          </div>
          <div className="font-mono text-[10px] text-[#555] mt-1">{creatorPercent}% of all tokens</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <div className="font-mono text-[10px] text-[#555] mb-2">TOTAL TOKENS BURNED</div>
          <div className="font-sans text-2xl font-bold text-white">
            {totalTokensFlowed.toLocaleString()}
          </div>
        </div>
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <div className="font-mono text-[10px] text-[#555] mb-2">TOTAL UNLOCKS</div>
          <div className="font-sans text-2xl font-bold text-white">
            {(tally?.totalUnlocks ?? 0).toLocaleString()}
          </div>
        </div>
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <div className="font-mono text-[10px] text-[#555] mb-2">REVENUE SPLITS</div>
          <div className="font-sans text-2xl font-bold text-white">
            {(tally?.totalTransactions ?? 0).toLocaleString()}
          </div>
        </div>
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <div className="font-mono text-[10px] text-[#555] mb-2">TOKEN VALUE</div>
          <div className="font-sans text-2xl font-bold text-[#555]">
            $0.00
          </div>
          <div className="font-mono text-[10px] text-[#333] mt-1">WORTHLESS BY DESIGN</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="border border-[#222] bg-[#0d0d0d] p-6">
        <h2 className="font-sans text-xl text-white mb-4">HOW THE CHAOS ECONOMY WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-4xl">🎲</div>
            <h3 className="font-sans text-sm text-white">1. RANDOM TOKEN ASSIGNMENT</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              Every time you visit, the void assigns you a random number of tokens.
              No purchases. No money. Just pure, beautiful chaos.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">🔓</div>
            <h3 className="font-sans text-sm text-white">2. SPEND TO UNLOCK</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              Creators set token prices on their content. You spend your randomly
              assigned tokens to unlock it. The burn protocol splits it 90/10.
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl">⚖</div>
            <h3 className="font-sans text-sm text-white">3. THE TALLY</h3>
            <p className="font-mono text-xs text-[#888] leading-relaxed">
              This page tracks where every token goes. 90% to creators, 10% to the house.
              The tokens are worthless. The content is the point.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface PayoutRecord {
  id: string;
  tokenAmount: number;
  usdAmount: string;
  status: string;
  requestedAt: string;
  completedAt: string | null;
}

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
    pendingUsd: string;
    totalEarnedUsd: string;
  } | null>(null);
  const [content, setContent] = useState<ContentRevenue[]>([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/studio/stats").then((r) => r.json()),
      fetch("/api/studio/payout").then((r) => r.json()),
    ])
      .then(([statsData, payoutData]) => {
        if (statsData.stats) setStats(statsData.stats);
        if (statsData.content) setContent(statsData.content);
        if (payoutData.payouts) setPayouts(payoutData.payouts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handlePayout = async () => {
    setPayoutLoading(true);
    setPayoutMessage(null);

    try {
      const res = await fetch("/api/studio/payout", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        setPayoutMessage({ success: true, text: data.message });
        // Refresh stats
        const refreshed = await fetch("/api/studio/stats").then((r) => r.json());
        if (refreshed.stats) setStats(refreshed.stats);
        // Refresh payouts
        const refreshedPayouts = await fetch("/api/studio/payout").then((r) => r.json());
        if (refreshedPayouts.payouts) setPayouts(refreshedPayouts.payouts);
      } else {
        setPayoutMessage({ success: false, text: data.error });
      }
    } catch {
      setPayoutMessage({
        success: false,
        text: "Payout request failed. The banking system is experiencing existential doubt.",
      });
    } finally {
      setPayoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          COUNTING YOUR BLOOD MONEY...
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
            data-text="BLOOD MONEY"
          >
            BLOOD MONEY
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          COMPENSATION FOR DAMAGES — YOUR REVENUE BREAKDOWN
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">LIFETIME EARNINGS</div>
            <div className="font-sans text-2xl font-bold text-[var(--terminal-green)]">
              ${stats.totalEarnedUsd}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">
              {stats.totalTokensEarned} tokens total
            </div>
          </div>
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">AVAILABLE TO WITHDRAW</div>
            <div className="font-sans text-2xl font-bold text-[var(--accent)]">
              ${stats.pendingUsd}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">
              {stats.pendingTokenBalance} tokens pending
            </div>
          </div>
          <div className="border border-[#222] bg-[#0d0d0d] p-4">
            <div className="font-mono text-[10px] text-[#555] mb-2">TOTAL SALES</div>
            <div className="font-sans text-2xl font-bold text-white">
              {stats.totalSales}
            </div>
            <div className="font-mono text-[10px] text-[#444] mt-1">unlocks across all content</div>
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

      {/* Payout Section */}
      <div className="border border-[var(--accent)] bg-[rgba(255,102,0,0.03)] p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-lg text-white mb-1">CASH OUT</h2>
            <p className="font-mono text-xs text-[#888]">
              Minimum payout: 2,000 tokens ($20.00). Your blood money, converted to actual money.
            </p>
            {stats && stats.pendingTokenBalance < 2000 && (
              <p className="font-mono text-[10px] text-[var(--accent)] mt-1">
                {2000 - stats.pendingTokenBalance} more tokens needed to reach minimum.
                Keep grinding.
              </p>
            )}
          </div>
          <button
            onClick={handlePayout}
            disabled={payoutLoading || !stats || stats.pendingTokenBalance < 2000}
            className={`px-6 py-3 font-mono text-sm font-bold transition-all whitespace-nowrap ${
              payoutLoading || !stats || stats.pendingTokenBalance < 2000
                ? "bg-[#222] text-[#555] cursor-not-allowed"
                : "bg-[var(--accent)] text-black hover:bg-white"
            }`}
          >
            {payoutLoading ? "PROCESSING..." : "REQUEST PAYOUT →"}
          </button>
        </div>

        {payoutMessage && (
          <div
            className={`mt-4 p-3 border font-mono text-xs ${
              payoutMessage.success
                ? "border-[var(--terminal-green)] text-[var(--terminal-green)]"
                : "border-[var(--danger)] text-[var(--danger)]"
            }`}
          >
            {payoutMessage.text}
          </div>
        )}
      </div>

      {/* Revenue Per Content */}
      <div className="border border-[#222] bg-[#0d0d0d] mb-8">
        <div className="border-b border-[#222] px-4 py-3">
          <h2 className="font-sans text-lg text-white">REVENUE BY CASE FILE</h2>
        </div>

        {content.length === 0 ? (
          <div className="p-8 text-center font-mono text-sm text-[#555]">
            No content published yet. No content = no money. Simple math.
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
                      {item.totalUnlocks} sales × {item.tokenCost} TKN ×
                      90% = {item.totalRevenue} TKN
                    </span>
                    <span>{revenuePercent}% of total revenue</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payout History */}
      <div className="border border-[#222] bg-[#0d0d0d]">
        <div className="border-b border-[#222] px-4 py-3">
          <h2 className="font-sans text-lg text-white">PAYOUT HISTORY</h2>
        </div>

        {payouts.length === 0 ? (
          <div className="p-8 text-center font-mono text-sm text-[#555]">
            No payouts yet. The blood money remains in the vault.
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {payouts.map((payout) => (
              <div key={payout.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-white">
                    {payout.tokenAmount} tokens → ${payout.usdAmount}
                  </div>
                  <div className="font-mono text-[10px] text-[#555]">
                    {new Date(payout.requestedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                    payout.status === "COMPLETED"
                      ? "text-[var(--terminal-green)] border-[var(--terminal-green)]"
                      : payout.status === "PROCESSING"
                      ? "text-yellow-500 border-yellow-500"
                      : payout.status === "FAILED"
                      ? "text-red-500 border-red-500"
                      : "text-[#888] border-[#555]"
                  }`}
                >
                  {payout.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fine Print */}
      <div className="mt-8 font-mono text-[10px] text-[#444] leading-relaxed">
        <p>
          PAYOUT PROTOCOL: Tokens are converted at $0.01 per token. Minimum withdrawal: 2,000 tokens ($20.00).
          Processing via Stripe Connect. Allow 3-5 business days for the banking system to acknowledge your existence.
          Trauma Box collects a 10% containment fee at the point of sale — not at payout. What you see here is already your 90%.
        </p>
      </div>
    </div>
  );
}

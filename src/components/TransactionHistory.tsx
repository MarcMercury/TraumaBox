// ─── Transaction History ────────────────────────────
// Glitchy ledger UI showing all token movements

"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  amount: number;
  type: string;
  detail: string;
  reference: string | null;
  createdAt: string;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [glitchRow, setGlitchRow] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data.transactions ?? []);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Random glitch effect on rows
  useEffect(() => {
    const interval = setInterval(() => {
      if (transactions.length > 0) {
        const randomTx = transactions[Math.floor(Math.random() * transactions.length)];
        setGlitchRow(randomTx.id);
        setTimeout(() => setGlitchRow(null), 200);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [transactions]);

  const filtered =
    filter === "ALL"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const typeConfig: Record<string, { color: string; icon: string; label: string }> = {
    PURCHASE: { color: "text-[var(--terminal-green)]", icon: "▲", label: "CREDIT" },
    BONUS: { color: "text-cyan-400", icon: "★", label: "BONUS" },
    SPEND: { color: "text-red-500", icon: "▼", label: "DEBIT" },
    REFUND: { color: "text-yellow-500", icon: "↩", label: "REFUND" },
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  if (loading) {
    return (
      <div className="border border-[#222] p-8 text-center">
        <div className="font-mono text-xs text-[#555] animate-pulse">
          DECRYPTING TRANSACTION LEDGER...
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-6 bg-[var(--accent)] opacity-20"
              style={{
                animation: `pulse-glow 1s ${i * 0.1}s infinite`,
                height: `${10 + Math.random() * 20}px`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[var(--accent)] animate-boot-blink" />
          <h2
            className="text-2xl font-sans text-[var(--accent)] tracking-wider glitch-text"
            data-text="TRANSACTION LEDGER"
          >
            TRANSACTION LEDGER
          </h2>
        </div>
        <span className="font-mono text-[10px] text-[#444]">
          {filtered.length} RECORDS
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-[10px]">
        <span className="text-[#555] mr-1">FILTER:</span>
        {["ALL", "PURCHASE", "SPEND", "BONUS", "REFUND"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-2 py-1 border transition-all ${
              filter === type
                ? "border-[var(--accent)] text-[var(--accent)] bg-[rgba(255,102,0,0.1)]"
                : "border-[#333] text-[#666] hover:border-[#555]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      <div className="border border-[#222] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[80px_1fr_100px_100px] gap-px bg-[#111] border-b border-[#333] px-3 py-2 font-mono text-[10px] text-[#555]">
          <span>TYPE</span>
          <span>DETAIL</span>
          <span className="text-right">AMOUNT</span>
          <span className="text-right">TIMESTAMP</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-[#444]">
            NO TRANSACTIONS FOUND — THE LEDGER IS EMPTY
            <br />
            <span className="text-[10px] text-[#333]">
              (Start by buying some tokens or unlocking content)
            </span>
          </div>
        ) : (
          <div className="divide-y divide-[#1a1a1a]">
            {filtered.map((tx, index) => {
              const config = typeConfig[tx.type] ?? {
                color: "text-[#888]",
                icon: "?",
                label: tx.type,
              };
              const isGlitching = glitchRow === tx.id;

              return (
                <div
                  key={tx.id}
                  className={`
                    grid grid-cols-[80px_1fr_100px_100px] gap-px px-3 py-2.5
                    transition-all duration-100 hover:bg-[rgba(255,102,0,0.03)]
                    ${isGlitching ? "bg-[rgba(255,102,0,0.05)] translate-x-[1px]" : ""}
                    ${index % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#0d0d0d]"}
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Type badge */}
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 border font-mono text-[9px] font-bold ${config.color}`}
                      style={{
                        borderColor: "currentColor",
                        backgroundColor: "rgba(0,0,0,0.3)",
                      }}
                    >
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </span>
                  </div>

                  {/* Detail */}
                  <div className="font-mono text-xs text-[#888] truncate">
                    {isGlitching ? (
                      <span className="text-[var(--accent)]">
                        {tx.detail.replace(/[a-zA-Z]/g, () =>
                          String.fromCharCode(33 + Math.floor(Math.random() * 93))
                        )}
                      </span>
                    ) : (
                      tx.detail
                    )}
                    {tx.reference && (
                      <span className="text-[#444] ml-2">[{tx.reference}]</span>
                    )}
                  </div>

                  {/* Amount */}
                  <div
                    className={`font-mono text-xs font-bold text-right ${
                      tx.amount > 0 ? "text-[var(--terminal-green)]" : "text-red-500"
                    }`}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount.toLocaleString()}
                    <span className="text-[#444] text-[9px] ml-0.5">T</span>
                  </div>

                  {/* Timestamp */}
                  <div className="font-mono text-[10px] text-[#555] text-right whitespace-nowrap">
                    {formatDate(tx.createdAt)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Scanline overlay for the table */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#333]">
        <span>END OF LEDGER — ALL TRANSACTIONS ARE IMMUTABLE</span>
        <span className="animate-boot-blink">█</span>
      </div>
    </div>
  );
}

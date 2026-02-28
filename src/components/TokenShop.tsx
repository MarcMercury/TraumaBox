// ─── Token Shop Modal ───────────────────────────────
// "Trauma Packs" — real money → tokens via Stripe

"use client";

import { useState } from "react";
import { useTokens } from "./TokenProvider";

const TOKEN_PACKS = [
  {
    id: "sad-sack",
    name: "The Sad Sack",
    tokens: 500,
    price: "$5.00",
    tagline: "Enough to ruin a few evenings",
    icon: "😢",
    popular: false,
  },
  {
    id: "glutton",
    name: "The Glutton",
    tokens: 2000,
    price: "$20.00",
    tagline: "For the emotionally masochistic",
    icon: "🤮",
    popular: true,
  },
  {
    id: "shareholder",
    name: "The Shareholder",
    tokens: 10000,
    price: "$100.00",
    tagline: "You're investing in suffering",
    icon: "💀",
    popular: false,
  },
];

interface TokenShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TokenShop({ isOpen, onClose }: TokenShopProps) {
  const { user, devCredit } = useTokens();
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [devAmount, setDevAmount] = useState("1000");

  if (!isOpen) return null;

  const handlePurchase = async (packId: string) => {
    setPurchasing(packId);
    try {
      const res = await fetch("/api/tokens/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });
      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setPurchasing(null);
    }
  };

  const handleDevCredit = async () => {
    const amount = parseInt(devAmount, 10);
    if (amount > 0) {
      await devCredit(amount);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 border border-[#333] bg-[#0a0a0a] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-[#222] p-4 flex items-center justify-between">
          <div>
            <h2 className="font-sans text-xl text-[var(--accent)] tracking-wider">
              TOKEN ACQUISITION
            </h2>
            <p className="font-mono text-[10px] text-[#555] mt-1">
              EXCHANGE REAL CURRENCY FOR DIGITAL SUFFERING
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-lg text-[#555] hover:text-red-500 transition-colors px-2"
          >
            ✕
          </button>
        </div>

        {/* Current balance */}
        <div className="border-b border-[#1a1a1a] px-4 py-3 flex items-center justify-between bg-[#0d0d0d]">
          <span className="font-mono text-xs text-[#555]">CURRENT BALANCE:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-[var(--accent)]">
              {user?.tokenBalance.toLocaleString() ?? "---"}
            </span>
            <span className="font-mono text-[10px] text-[#444]">TOKENS</span>
          </div>
        </div>

        {/* Exchange rate notice */}
        <div className="px-4 py-2 bg-[#111] border-b border-[#1a1a1a]">
          <p className="font-mono text-[10px] text-[#444] text-center">
            EXCHANGE RATE: 1 TOKEN = $0.01 USD | ALL TRANSACTIONS ARE FINAL | NO REFUNDS ON EMOTIONAL DAMAGE
          </p>
        </div>

        {/* Token Packs */}
        <div className="p-4 space-y-3">
          {TOKEN_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative border p-4 transition-all hover:border-[var(--accent)] group ${
                pack.popular
                  ? "border-[var(--accent)] bg-[rgba(255,102,0,0.03)]"
                  : "border-[#222] hover:bg-[rgba(255,102,0,0.02)]"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-px right-4 px-2 py-0.5 bg-[var(--accent)] text-black font-mono text-[9px] font-bold tracking-wider">
                  MOST POPULAR MISTAKE
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{pack.icon}</div>
                  <div>
                    <h3 className="font-sans text-lg text-white group-hover:text-[var(--accent)] transition-colors">
                      {pack.name}
                    </h3>
                    <p className="font-mono text-[10px] text-[#555]">
                      {pack.tagline}
                    </p>
                    <div className="font-mono text-xs text-[var(--accent)] mt-1">
                      {pack.tokens.toLocaleString()} TOKENS
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(pack.id)}
                  disabled={purchasing !== null}
                  className={`px-6 py-3 font-mono text-sm font-bold border transition-all ${
                    purchasing === pack.id
                      ? "border-[#555] text-[#555] animate-pulse"
                      : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black"
                  }`}
                >
                  {purchasing === pack.id ? "PROCESSING..." : pack.price}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dev Mode Credit (only in development) */}
        {process.env.NODE_ENV !== "production" && (
          <div className="border-t border-[#222] p-4 bg-[#0d0d0d]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--terminal-green)]" />
              <span className="font-mono text-[10px] text-[var(--terminal-green)]">
                DEV MODE — FREE TOKEN INJECTION
              </span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={devAmount}
                onChange={(e) => setDevAmount(e.target.value)}
                className="bg-black border border-[#333] px-3 py-2 font-mono text-xs text-[var(--terminal-green)] focus:border-[var(--terminal-green)] focus:outline-none w-32"
                min={1}
                max={99999}
              />
              <button
                onClick={handleDevCredit}
                className="px-4 py-2 border border-[var(--terminal-green)] text-[var(--terminal-green)] font-mono text-xs hover:bg-[var(--terminal-green)] hover:text-black transition-all"
              >
                INJECT TOKENS
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-[#1a1a1a] px-4 py-3">
          <p className="font-mono text-[10px] text-[#333] text-center">
            POWERED BY STRIPE — YOUR CARD DETAILS NEVER TOUCH OUR SERVERS — WE HAVE ENOUGH PROBLEMS
          </p>
        </div>
      </div>
    </div>
  );
}

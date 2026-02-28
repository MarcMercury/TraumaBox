// ─── Wallet Display ─────────────────────────────────
// Persistent glitchy token counter for the header

"use client";

import { useState, useEffect } from "react";
import { useTokens } from "./TokenProvider";

export default function WalletDisplay({ onShopClick }: { onShopClick?: () => void }) {
  const { user, loading } = useTokens();
  const [displayBalance, setDisplayBalance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  // Animated counter that rolls to the real number
  useEffect(() => {
    if (user === null) return;
    const target = user.tokenBalance;

    if (displayBalance === target) return;

    const diff = target - displayBalance;
    const step = Math.ceil(Math.abs(diff) / 15);
    const direction = diff > 0 ? 1 : -1;

    // Defer state updates to avoid synchronous setState in effect
    const animStart = setTimeout(() => {
      setIsAnimating(true);
      setGlitchText(true);
    }, 0);

    const interval = setInterval(() => {
      setDisplayBalance((prev) => {
        const next = prev + step * direction;
        if ((direction > 0 && next >= target) || (direction < 0 && next <= target)) {
          clearInterval(interval);
          setIsAnimating(false);
          return target;
        }
        return next;
      });
    }, 30);

    const gt = setTimeout(() => setGlitchText(false), 600);

    return () => {
      clearTimeout(animStart);
      clearInterval(interval);
      clearTimeout(gt);
    };
  }, [user?.tokenBalance]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="wallet-display">
        <span className="font-mono text-[10px] text-[#444] animate-boot-blink">
          LOADING WALLET...
        </span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <button
      onClick={onShopClick}
      className="wallet-display group"
      title="Click to open Token Shop"
    >
      <div className="flex items-center gap-2">
        {/* Token icon */}
        <div
          className={`w-4 h-4 rounded-full border border-[var(--accent)] flex items-center justify-center text-[8px] font-bold text-[var(--accent)] ${
            isAnimating ? "animate-spin" : ""
          }`}
        >
          T
        </div>

        {/* Balance */}
        <span
          className={`font-mono text-sm font-bold tracking-wider transition-colors ${
            isAnimating
              ? "text-white"
              : displayBalance > 0
              ? "text-[var(--accent)]"
              : "text-red-500"
          } ${glitchText ? "glitch-text" : ""}`}
          data-text={displayBalance.toLocaleString()}
        >
          {displayBalance.toLocaleString()}
        </span>

        {/* Label */}
        <span className="font-mono text-[10px] text-[#555] group-hover:text-[var(--accent)] transition-colors">
          TOKENS
        </span>

        {/* USD equivalent */}
        <span className="font-mono text-[10px] text-[#333]">
          (${(displayBalance * 0.01).toFixed(2)})
        </span>
      </div>
    </button>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const GLITCH_CHARS = "█▓▒░╔╗╚╝║═╠╣╦╩╬▄▀▌▐";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const text = Array.from({ length: 30 }, () =>
        GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      ).join("");
      setGlitchText(text);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black grid-bg flex items-center justify-center p-8">
      <div className="max-w-lg text-center">
        {/* Glitch noise */}
        <div className="font-mono text-[10px] text-[#222] mb-4 overflow-hidden whitespace-nowrap">
          {glitchText}
        </div>

        {/* 404 */}
        <h1
          className="text-8xl font-sans text-[var(--accent)] mb-4 glitch-text"
          data-text="404"
        >
          404
        </h1>

        {/* Message */}
        <div className="border border-[#222] bg-[#0d0d0d] p-6 mb-6">
          <p className="font-mono text-sm text-white mb-2">
            CONTAINMENT FILE NOT FOUND
          </p>
          <p className="font-mono text-xs text-[#888] leading-relaxed">
            You found nothing. Truly an apt metaphor for your efforts.
            The content you&apos;re looking for either never existed, was redacted,
            or was consumed by the void — which, to be fair, describes most things.
          </p>
        </div>

        {/* Error details */}
        <div className="font-mono text-[10px] text-[#444] space-y-1 mb-8">
          <p>ERROR CODE: EXISTENCE_NOT_FOUND</p>
          <p>SECTOR: NULL</p>
          <p>RECOMMENDED ACTION: TRY HARDER (OR DON&apos;T)</p>
        </div>

        {/* Glitch noise */}
        <div className="font-mono text-[10px] text-[#222] mb-8 overflow-hidden whitespace-nowrap">
          {glitchText}
        </div>

        {/* Nav options */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs tracking-wider hover:bg-[var(--accent)] hover:text-black transition-all"
          >
            ← RETURN TO ENTRY POINT
          </Link>
          <Link
            href="/feed"
            className="px-6 py-3 border border-[#333] text-[#666] font-mono text-xs tracking-wider hover:border-[#666] hover:text-white transition-all"
          >
            BROWSE THE MANIFEST →
          </Link>
        </div>

        {/* Bottom text */}
        <p className="mt-8 font-mono text-[10px] text-[#333]">
          IF YOU BELIEVE THIS IS AN ERROR, IT ISN&apos;T. BUT YOU CAN TELL YOURSELF THAT.
        </p>
      </div>
    </div>
  );
}

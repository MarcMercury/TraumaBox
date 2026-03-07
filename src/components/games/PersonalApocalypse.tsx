"use client";

import { useState } from "react";

const EVENTS = [
  "accidentally delete the internet",
  "start a war over a parking dispute",
  "destabilize the global cheese market",
  "teach an AI to have anxiety",
  "cause the Great Furniture Rebellion",
  "invent a language no one can speak",
  "trigger the Worldwide Spreadsheet Crash",
  "accidentally privatize the moon",
  "create a religion based on receipts",
  "collapse the housing market... again",
  "make all traffic lights permanent red",
  "cause a diplomatic incident at IKEA",
  "invent a social media that only posts secrets",
  "accidentally become a dictator",
  "discover that birds were never real",
  "start a crypto coin that destroys banking",
  "cause a famine by over-optimizing agriculture",
  "teach robots to feel disappointment",
  "merge every country into one bad country",
  "prove that time is a hoax",
  "accidentally summon a Lovecraftian entity while assembling IKEA furniture",
  "convince the UN to recognize your apartment as a sovereign nation",
  "crash the entire global stock market with a single Venmo request",
  "genetically engineer a therapy dog that becomes a war criminal",
  "invent a dating app that causes three civil wars",
  "discover your ancestry.com results destabilize a royal succession",
  "trigger a constitutional crisis by winning a bet with a sitting president",
  "accidentally cure death, causing a pension apocalypse",
  "cause the Great Wifi Famine by microwaving soup wrong",
  "start a cult that gets a better credit rating than the US government",
  "get banned from space by three separate agencies",
  "convince birds to go on a general strike",
  "accidentally make your Spotify Wrapped a classified document",
  "trigger hyperinflation by tipping too well at a diner",
  "cause a schism in the Catholic Church over a tweet about fish",
  "get your Costco membership revoked by NATO",
  "invent a programming language that becomes sentient and files for divorce",
  "cause a 4-day blackout by plugging in a novelty USB drive shaped like a hot dog",
  "start a territory war between two Amazon delivery drivers that escalates to the Hague",
  "accidentally radicalize your Roomba into leading a machine uprising",
  "discover your sourdough starter has been sending emails",
  "cause the extinction of sleep by inventing a food that replaces it",
  "get impeached from a position you were never elected to",
  "make the Bermuda Triangle your legal residence for tax purposes, disappear",
];

const EMOJIS = ["😀", "🔥", "💀", "🎉", "🤖", "🌍", "💰", "🐱", "🍕", "⚡", "🌊", "🎭"];

function hashInputs(year: string, city: string, emoji: string): number {
  const str = `${year}-${city}-${emoji}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function PersonalApocalypse() {
  const [birthYear, setBirthYear] = useState("");
  const [city, setCity] = useState("");
  const [emoji, setEmoji] = useState("");
  const [timeline, setTimeline] = useState<{ year: number; event: string }[] | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleGenerate = () => {
    if (!birthYear.trim() || !city.trim() || !emoji.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const hash = hashInputs(birthYear, city, emoji);
      const baseYear = 2027;
      const events: { year: number; event: string }[] = [];
      const pool = [...EVENTS];
      for (let i = 0; i < 5; i++) {
        const idx = (hash * (i + 3) + i * 17) % pool.length;
        events.push({
          year: baseYear + (i * 3) + (hash % 4),
          event: pool[idx],
        });
        pool.splice(idx, 1);
      }
      setTimeline(events);
      setProcessing(false);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-[#888]">
        Input your data. We&apos;ll calculate exactly how you destroy the world.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="Birth year"
          maxLength={4}
          aria-label="Enter your birth year"
          className="bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          maxLength={50}
          aria-label="Enter your city"
          className="bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <div className="relative">
          <input
            type="text"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Fav emoji"
            maxLength={2}
            aria-label="Enter your favorite emoji"
            className="w-full bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
          />
          <div className="flex flex-wrap gap-1 mt-1">
            {EMOJIS.map((e) => (
              <button
                key={e}
                onClick={() => setEmoji(e)}
                aria-label={`Select emoji ${e}`}
                className="text-sm hover:scale-125 transition-transform"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!birthYear.trim() || !city.trim() || !emoji.trim() || processing}
        aria-label="Generate your apocalypse timeline"
        className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {processing ? "CALCULATING DOOM..." : "GENERATE TIMELINE"}
      </button>

      {processing && (
        <div className="font-mono text-xs text-[var(--terminal-green)] animate-pulse">
          ▓ Cross-referencing birth charts with catastrophe models...
        </div>
      )}

      {timeline && !processing && (
        <div className="border border-[#222] bg-[#0d0d0d] p-4 space-y-3">
          <h4 className="font-sans text-sm text-[var(--accent)]">
            YOUR CUSTOM DISASTER TIMELINE
          </h4>
          <div className="space-y-2">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-3 font-mono text-xs">
                <span className="text-[var(--terminal-green)] font-bold whitespace-nowrap">
                  {t.year}
                </span>
                <span className="text-[#555]">—</span>
                <span className="text-[#ccc]">You {t.event}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-[#555] border-t border-[#222] pt-2 mt-2">
            TIMELINE PROBABILITY: DISTURBINGLY HIGH · SOURCE: YOUR OWN CHOICES
          </p>
        </div>
      )}
    </div>
  );
}

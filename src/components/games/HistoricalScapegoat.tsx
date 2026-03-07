"use client";

import { useState } from "react";

const SCAPEGOATS = [
  "The interns",
  "The weather",
  "A misunderstood spreadsheet",
  "The previous administration",
  "\"Complex systemic factors\"",
  "Mercury in retrograde",
  "An overly ambitious pigeon",
  "The guy who said \"it'll be fine\"",
  "A rogue algorithm with feelings",
  "An unnamed source close to the situation",
  "Quantum fluctuations",
  "A contractor who technically no longer exists",
  "The marketing team (always the marketing team)",
  "An outdated PDF no one read",
  "A misinterpreted emoji in a group chat",
  "The previous software update",
  "Someone named \"Dave\" (no last name available)",
  "A legacy system from 1997",
  "A strongly worded memo that was never sent",
  "The concept of personal responsibility itself",
  "A haunted Xerox machine that altered key documents",
  "An unpaid parking ticket from 1983 that somehow escalated",
  "The ghost of a middle manager who died at his desk in 2004",
  "A time traveler who made one small change and ruined everything",
  "Elon Musk's 3am tweet that technically constituted a declaration of war",
  "A rounding error that compounded for 40 years",
  "An AI that was only supposed to optimize the cafeteria menu",
  "The janitor who accidentally shredded the Geneva Convention",
  "A group of raccoons who gained access to the server room",
  "An Ouija board used during a budget meeting",
  "A misprinted Bible from 1631 that said 'thou shalt commit adultery'",
  "The butterfly that flapped its wings in Brazil and caused a congressional hearing",
  "A Magic 8-Ball used for foreign policy decisions",
  "An Excel formula that nobody understood but everyone trusted",
  "The founding fathers (they didn't specify this exact scenario)",
  "A burner phone found in the company microwave",
  "A whistleblower who was actually just a parrot repeating what it heard",
  "The metric system (it was the conversion that killed us)",
  "A fortune cookie that was taken too literally by the Secretary of Defense",
  "A LinkedIn motivational post that inspired the wrong person",
  "Whatever was in the water at the 2019 company retreat",
  "A fax machine that has been sending classified memos to a Denny's since 1996",
];

const BLAME_STYLES = [
  "Passive-aggressive press conference",
  "Leaked internal memo",
  "Anonymous tip to a journalist",
  "Vague social media thread",
  "Congressional testimony with selective amnesia",
  "Interpretive corporate video",
  "A podcast episode titled \"My Truth\"",
  "Crying on a late-night talk show while promoting your memoir",
  "A LinkedIn post so long it requires a 'see more' click",
  "Interpretive dance at the shareholder meeting",
  "A Netflix docuseries produced by your own PR team",
  "A cryptic Instagram story that disappears in 24 hours",
  "A carefully timed leak during a bigger scandal",
  "A resignation letter written entirely in emojis",
  "A TED Talk titled 'Failing Forward: A Masterclass in Not My Fault'",
  "A deepfake of yourself apologizing so you don't have to",
  "Telegram messages 'accidentally' sent to a group of 12,000",
  "A ghostwritten op-ed in a newspaper no one reads anymore",
  "An unhinged 47-tweet thread at 4am",
  "A press release formatted as a ransom note",
  "A Substack essay titled 'I Was the Real Victim All Along'",
  "A hologram of yourself projected at a Senate hearing while you're in Cancun",
  "An anonymous Glassdoor review of your own company",
  "A church sermon where you compare yourself to Moses",
  "A handwritten note slid under every door in Congress",
  "Carrier pigeon to the Associated Press",
  "A full-page ad in the New York Times written in Comic Sans",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function HistoricalScapegoat() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    scapegoat: string;
    backup: string;
    style: string;
    plausibility: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const hash = hashString(name.toLowerCase().trim());
      setResult({
        scapegoat: SCAPEGOATS[hash % SCAPEGOATS.length],
        backup: SCAPEGOATS[(hash * 7 + 3) % SCAPEGOATS.length],
        style: BLAME_STYLES[(hash * 13) % BLAME_STYLES.length],
        plausibility: 12 + (hash % 65),
      });
      setProcessing(false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-[#888]">
        When things go terribly wrong, who will you blame?
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Your name or handle"
          maxLength={50}
          aria-label="Enter your name"
          className="flex-1 bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || processing}
          aria-label="Find your scapegoat"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {processing ? "DEFLECTING..." : "BLAME"}
        </button>
      </div>

      {processing && (
        <div className="font-mono text-xs text-[var(--terminal-green)] animate-pulse">
          ▓ Scanning for plausible deniability...
        </div>
      )}

      {result && !processing && (
        <div className="border border-[#222] bg-[#0d0d0d] p-4 space-y-3">
          <p className="font-mono text-xs text-[#888]">
            When things go wrong, <span className="text-white">{name}</span> would blame:
          </p>
          <div className="border-l-2 border-[var(--accent)] pl-3 py-1">
            <p className="font-mono text-sm text-white">{result.scapegoat}</p>
          </div>
          <p className="font-mono text-[10px] text-[#555]">
            BACKUP SCAPEGOAT: <span className="text-[#888]">{result.backup}</span>
          </p>
          <p className="font-mono text-[10px] text-[#555]">
            DELIVERY METHOD: <span className="text-[var(--accent)]">{result.style}</span>
          </p>
          <div className="flex items-center justify-between font-mono text-xs mt-2">
            <span className="text-[#555]">PLAUSIBILITY</span>
            <span className="text-yellow-500">{result.plausibility}%</span>
          </div>
          <div className="w-full h-2 bg-[#1a1a1a]">
            <div
              className="h-full bg-yellow-500 transition-all duration-1000"
              style={{ width: `${result.plausibility}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

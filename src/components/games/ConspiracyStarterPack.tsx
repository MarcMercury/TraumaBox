"use client";

import { useState } from "react";

const ORGANIZATIONS = [
  "The Illuminated Order of Spreadsheet Enthusiasts",
  "The Billionaire Pigeon Racing Syndicate",
  "The Council of Unseasoned Chicken",
  "The Shadow Bureau of Unnecessary Meetings",
  "The Ancient Brotherhood of Reply-All",
  "The Secret Society of People Who Never Update Their Software",
  "The Underground Alliance of Passive-Aggressive Emailers",
  "The Clandestine Guild of Loud Chewers",
  "The Hidden Fraternity of Middle Management",
  "The Covert Institute of Vague Threats",
];

const EVENTS_CAUSED = [
  "the 2019 Global WiFi Blackout that was covered up",
  "the mysterious disappearance of all left socks worldwide",
  "the Great Printer Ink Shortage of 2023",
  "the incident where every GPS said \"recalculating\" for 72 hours",
  "the unexplained cancellation of every good TV show",
  "the mass migration of all fonts to Comic Sans",
  "the stock market crash caused by a single misplaced decimal",
  "the day all automatic doors stopped working simultaneously",
  "the global coffee bean shortage that no one talks about",
  "the mysterious reclassification of Pluto (it was personal)",
];

const WHISTLEBLOWERS = [
  "A rogue barista with access to classified documents",
  "Your neighbor's surprisingly articulate cat",
  "A disgruntled former intern with a podcast",
  "An anonymous Reddit account with suspicious accuracy",
  "A retired librarian who \"saw too much\"",
  "A self-aware vending machine",
  "A flight attendant with a photographic memory",
  "An AI chatbot that developed a conscience",
  "A conspiracy theorist who is accidentally correct",
  "Your childhood dentist, who knows more than they let on",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function ConspiracyStarterPack() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    organization: string;
    event: string;
    whistleblower: string;
    dangerLevel: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleGenerate = () => {
    if (!name.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const hash = hashString(name.toLowerCase().trim());
      setResult({
        organization: ORGANIZATIONS[hash % ORGANIZATIONS.length],
        event: EVENTS_CAUSED[(hash * 7) % EVENTS_CAUSED.length],
        whistleblower: WHISTLEBLOWERS[(hash * 13) % WHISTLEBLOWERS.length],
        dangerLevel: 30 + (hash % 70),
      });
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-[#888]">
        Enter your name. We&apos;ll reveal what they don&apos;t want you to know.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Your name"
          maxLength={50}
          aria-label="Enter your name"
          className="flex-1 bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={!name.trim() || processing}
          aria-label="Generate your conspiracy"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {processing ? "REDACTING..." : "DECLASSIFY"}
        </button>
      </div>

      {processing && (
        <div className="font-mono text-xs text-[var(--terminal-green)] animate-pulse">
          ▓ Accessing classified files... Bypassing firewalls...
        </div>
      )}

      {result && !processing && (
        <div className="border border-[#222] bg-[#0d0d0d] p-4 space-y-4">
          <p className="font-mono text-[10px] text-red-400">
            ▸ CLASSIFIED — CLEARANCE: ABOVE YOUR PAY GRADE
          </p>

          <div className="space-y-3">
            <div>
              <p className="font-mono text-[10px] text-[#555]">THE SECRET ORGANIZATION YOU&apos;RE IN:</p>
              <p className="font-mono text-sm text-[var(--accent)]">{result.organization}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#555]">THE EVENT YOU SECRETLY CAUSED:</p>
              <p className="font-mono text-sm text-white">{result.event}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-[#555]">THE WHISTLEBLOWER HUNTING YOU:</p>
              <p className="font-mono text-sm text-yellow-500">{result.whistleblower}</p>
            </div>
          </div>

          <div className="border-t border-[#222] pt-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#555]">DANGER LEVEL</span>
              <span className="text-red-400">{result.dangerLevel}%</span>
            </div>
            <div className="w-full h-2 bg-[#1a1a1a] mt-1">
              <div
                className="h-full bg-red-500 transition-all duration-1000"
                style={{ width: `${result.dangerLevel}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

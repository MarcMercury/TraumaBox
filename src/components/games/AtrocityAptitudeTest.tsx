"use client";

import { useState } from "react";

const ATROCITIES = [
  "Minor economic collapse",
  "Accidentally inventing a global pandemic",
  "Launching a completely unnecessary war",
  "Destroying an ecosystem for \"growth\"",
  "Running a wildly irresponsible chemical plant",
  "Defunding education during a literacy crisis",
  "Starting a pyramid scheme that topples a government",
  "Privatizing a public water supply",
  "Accidentally deleting critical infrastructure",
  "Founding a social media platform that radicalizes millions",
  "Approving a drug with \"mild\" side effects like \"spontaneous combustion\"",
  "Deregulating an industry that clearly needed regulation",
  "Building a dam that displaces 2 million people",
  "Introducing an invasive species for aesthetic purposes",
  "Launching a satellite that knocks out GPS worldwide",
  "Creating an AI that becomes passive-aggressive",
  "Hosting an international summit that causes 3 wars",
  "Designing a building that is technically a war crime",
  "Publishing a self-help book that destabilizes the economy",
  "Inventing a new currency that only works on Tuesdays",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function getResults(username: string) {
  const hash = hashString(username.toLowerCase().trim());
  const selected: string[] = [];
  const pool = [...ATROCITIES];
  for (let i = 0; i < 5; i++) {
    const idx = (hash * (i + 7) + i * 31) % pool.length;
    selected.push(pool[idx]);
    pool.splice(idx, 1);
  }
  const confidence = 47 + (hash % 52);
  return { atrocities: selected, confidence };
}

export default function AtrocityAptitudeTest() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<{ atrocities: string[]; confidence: number } | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = () => {
    if (!username.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      setResult(getResults(username));
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-[#888]">
        Enter your username to discover your natural disaster potential.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="@username"
          maxLength={50}
          aria-label="Enter your username"
          className="flex-1 bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={!username.trim() || processing}
          aria-label="Run aptitude test"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {processing ? "SCANNING..." : "EVALUATE"}
        </button>
      </div>

      {processing && (
        <div className="font-mono text-xs text-[var(--terminal-green)] animate-pulse">
          ▓ Analyzing moral deficiencies... Calibrating atrocity vectors...
        </div>
      )}

      {result && !processing && (
        <div className="border border-[#222] bg-[#0d0d0d] p-4 space-y-3">
          <p className="font-mono text-xs text-[#888]">
            Based on your vibe, <span className="text-white">@{username}</span>, you would be most effective at:
          </p>
          <h4 className="font-sans text-sm text-[var(--accent)]">
            TOP 5 ATROCITIES YOU COULD PROBABLY PULL OFF
          </h4>
          <ol className="space-y-2">
            {result.atrocities.map((a, i) => (
              <li key={i} className="font-mono text-xs text-[#ccc] flex gap-2">
                <span className="text-[var(--accent)]">{i + 1}.</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
          <div className="border-t border-[#222] pt-3 mt-3">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#555]">CONFIDENCE SCORE</span>
              <span className="text-[var(--terminal-green)]">{result.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-[#1a1a1a] mt-1">
              <div
                className="h-full bg-[var(--terminal-green)] transition-all duration-1000"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

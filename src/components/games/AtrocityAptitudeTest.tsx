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
  "Convincing NATO that a gender reveal party is a military exercise",
  "Accidentally making lead paint the official flavor of a national school lunch program",
  "Teaching nuclear launch codes to a parrot that escaped",
  "Replacing all hospital anesthesia with essential oils and vibes",
  "Lobbying to classify asbestos as a superfood",
  "Running a child labor camp but calling it \"entrepreneurial summer camp\"",
  "Selling the Great Barrier Reef on eBay for $47",
  "Inventing a pesticide that makes crops sentient and angry",
  "Gerrymandering a district so badly it exists in two time zones and a parallel dimension",
  "Crashing the global economy by accidentally mass-shorting oxygen futures",
  "Weaponizing a Roomba fleet and losing control at a peace summit",
  "Convincing three world leaders that birds are government surveillance (correctly)",
  "Performing unlicensed brain surgery via YouTube tutorial during a TED Talk",
  "Building a for-profit prison on sacred Indigenous land and calling it a wellness retreat",
  "Destabilizing the Middle East over a bad Yelp review",
  "Creating an NFT collection that accidentally triggers hyperinflation in six countries",
  "Releasing classified CIA documents as a BuzzFeed quiz",
  "Overthrowing a democracy to install a vending machine as head of state",
  "Convincing the UN that mercury is a human right",
  "Replacing the Geneva Convention with Terms of Service no one reads",
  "Accidentally starting a nuclear arms race by sending a group text to the wrong chat",
  "Genetically engineering a mosquito that distributes propaganda",
  "Making a cryptocurrency backed by the concept of human suffering",
  "Selling fake cancer cures on a children's educational platform",
  "Rebranding colonial genocide as a \"cultural exchange fellowship\"",
  "Drilling for oil in a children's hospital parking lot",
  "Convincing Congress that agent orange is just a spicy Gatorade flavor",
  "Starting a civil war in a country you can't find on a map",
  "Designing an algorithm that radicalized your own grandmother into a domestic threat",
  "Privatizing 911 and putting callers on a 45-minute hold with smooth jazz",
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

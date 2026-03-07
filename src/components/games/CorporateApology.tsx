"use client";

import { useState } from "react";

const SCANDAL_TYPES = [
  "data breach",
  "environmental disaster",
  "labor exploitation",
  "financial fraud",
  "product recall",
  "workplace misconduct",
  "tax evasion",
  "safety violation",
  "false advertising",
  "insider trading",
];

const OPENINGS = [
  "We take this deeply concerning incident very seriously",
  "We are aware of the situation and have launched an immediate investigation",
  "The safety and trust of our stakeholders has always been our highest priority",
  "We were deeply troubled to learn about these allegations",
  "This does not reflect who we are as a company",
];

const ACTIONS = [
  "and have immediately formed a task force to investigate",
  "and have retained independent counsel to conduct a thorough review",
  "and are implementing comprehensive changes across our organization",
  "and have placed the responsible parties on administrative leave pending review",
  "and are cooperating fully with all relevant authorities",
];

const DEFLECTIONS = [
  "While we cannot comment on specifics due to ongoing legal proceedings",
  "Although the full picture is still emerging",
  "We believe this is an isolated incident that does not reflect our broader operations",
  "While external factors contributed significantly to this situation",
  "As a company in a rapidly evolving landscape",
];

const PROMISES = [
  "we remain committed to transparency and accountability.",
  "we are confident that our enhanced protocols will prevent any recurrence.",
  "we look forward to rebuilding the trust we have worked so hard to earn.",
  "we will emerge from this stronger, more resilient, and more aligned with our core values.",
  "we invite our community to join us on this journey of growth and reflection.",
];

const CLOSINGS = [
  "Our thoughts are with all those affected.",
  "We will provide further updates as appropriate.",
  "Thank you for your continued patience and understanding.",
  "We appreciate the opportunity to do better.",
  "Sincerely, The Leadership Team",
];

function hashInputs(company: string, scandal: string): number {
  const str = `${company}${scandal}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function CorporateApology() {
  const [company, setCompany] = useState("");
  const [scandal, setScandal] = useState("");
  const [apology, setApology] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleGenerate = () => {
    if (!company.trim() || !scandal.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      const hash = hashInputs(company, scandal);
      const text = [
        `"${OPENINGS[hash % OPENINGS.length]} ${ACTIONS[(hash * 3) % ACTIONS.length]}.`,
        `${DEFLECTIONS[(hash * 7) % DEFLECTIONS.length]}, ${PROMISES[(hash * 11) % PROMISES.length]}`,
        `${CLOSINGS[(hash * 13) % CLOSINGS.length]}"`,
        `— ${company} Official Statement`,
      ].join("\n\n");
      setApology(text);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-[#888]">
        Generate a perfectly meaningless corporate apology. Just like the real ones.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          maxLength={50}
          aria-label="Enter company name"
          className="bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
        <input
          type="text"
          value={scandal}
          onChange={(e) => setScandal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="The scandal"
          maxLength={100}
          aria-label="Describe the scandal"
          className="bg-black border border-[#333] px-3 py-2 font-mono text-sm text-white placeholder-[#555] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        {SCANDAL_TYPES.map((s) => (
          <button
            key={s}
            onClick={() => setScandal(s)}
            aria-label={`Select scandal type: ${s}`}
            className="px-2 py-1 border border-[#222] font-mono text-[10px] text-[#555] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!company.trim() || !scandal.trim() || processing}
        aria-label="Generate corporate apology"
        className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {processing ? "DRAFTING PR RESPONSE..." : "GENERATE APOLOGY"}
      </button>

      {processing && (
        <div className="font-mono text-xs text-[var(--terminal-green)] animate-pulse">
          ▓ Consulting legal team... Removing all accountability...
        </div>
      )}

      {apology && !processing && (
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <p className="font-mono text-[10px] text-[#555] mb-2">OFFICIAL STATEMENT:</p>
          <div className="font-mono text-xs text-[#ccc] leading-relaxed whitespace-pre-line italic">
            {apology}
          </div>
          <p className="font-mono text-[10px] text-[#555] mt-3 border-t border-[#222] pt-2">
            SINCERITY LEVEL: 0% · LEGAL REVIEW: PASSED · ACCOUNTABILITY: NONE DETECTED
          </p>
        </div>
      )}
    </div>
  );
}

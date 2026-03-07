"use client";

import { useState } from "react";

interface Decision {
  prompt: string;
  options: string[];
}

const DECISIONS: Decision[] = [
  {
    prompt: "A safety inspector has flagged a critical issue at your main facility.",
    options: [
      "Ignore the report — profits are up",
      "Fire the inspector — problem solved",
      "Delay review until after quarterly earnings",
      "Commission a study that takes 3 years",
    ],
  },
  {
    prompt: "Your engineers warn that maintenance is overdue on core infrastructure.",
    options: [
      "Cut maintenance budget by 40%",
      "Outsource to the lowest bidder",
      "Replace engineers with an algorithm",
      "Rebrand \"maintenance\" as \"legacy optimization\" and do nothing",
    ],
  },
  {
    prompt: "Regulators are asking questions about your supply chain.",
    options: [
      "Shred documents preemptively",
      "Launch a lobbying campaign",
      "Relocate operations to a country without regulations",
      "Release a heartwarming ad campaign about puppies",
    ],
  },
  {
    prompt: "Employees are reporting unsafe working conditions.",
    options: [
      "Mandatory fun pizza party",
      "Add \"resilience\" to core values",
      "Replace complainers with contractors",
      "Install motivational posters about hustle culture",
    ],
  },
  {
    prompt: "Your product has been linked to a mild environmental catastrophe.",
    options: [
      "Blame the consumer for misuse",
      "Fund a counter-study",
      "Acquire the news outlet reporting it",
      "Double production — it builds immunity",
    ],
  },
];

const DISASTERS = [
  "The 2037 Global Yogurt Contamination Crisis",
  "The Great Pacific Garbage Continent (it became sentient)",
  "The 2031 Collapse of Every Bridge Simultaneously",
  "The Incident Where All Bees Became Hostile",
  "The 2029 Social Media Singularity Event",
  "The Unauthorized Release of 10 Million Pigeons",
  "The Great Algorithmic Famine of 2034",
  "The Worldwide Printer Uprising",
  "The 2038 Accidental Nuclear Renaissance",
  "The Event That Made Antarctica a Desert",
  "The Mass Recall of All Furniture",
  "The Day the Internet Became Sarcastic",
  "The Time Every GPS Said 'Turn Into the Ocean'",
  "The 2033 Global Spreadsheet Corruption Incident",
  "The Catastrophic Chain Restaurant Singularity",
];

function hashChoices(choices: number[]): number {
  return choices.reduce((acc, c, i) => acc + (c + 1) * (i + 13) * 37, 0);
}

export default function DisasterCEO() {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState<number[]>([]);
  const [disaster, setDisaster] = useState<string | null>(null);
  const [severity, setSeverity] = useState(0);

  const handleChoice = (optionIdx: number) => {
    const newChoices = [...choices, optionIdx];
    setChoices(newChoices);

    if (newChoices.length >= 5) {
      const hash = hashChoices(newChoices);
      setDisaster(DISASTERS[hash % DISASTERS.length]);
      setSeverity(55 + (hash % 45));
    }
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setChoices([]);
    setDisaster(null);
    setSeverity(0);
  };

  if (disaster) {
    return (
      <div className="space-y-4">
        <div className="border border-red-500/30 bg-red-500/5 p-4 space-y-3">
          <p className="font-mono text-xs text-red-400 animate-pulse">
            ⚠ CATASTROPHE SIMULATION COMPLETE
          </p>
          <p className="font-mono text-xs text-[#888]">
            Based on your {choices.length} executive decisions, you have created:
          </p>
          <h4 className="font-sans text-lg text-white leading-tight">
            {disaster}
          </h4>
          <div className="flex items-center justify-between font-mono text-xs mt-2">
            <span className="text-[#555]">SEVERITY INDEX</span>
            <span className="text-red-400">{severity}%</span>
          </div>
          <div className="w-full h-2 bg-[#1a1a1a]">
            <div
              className="h-full bg-red-500 transition-all duration-1000"
              style={{ width: `${severity}%` }}
            />
          </div>
          <p className="font-mono text-[10px] text-[#555] mt-2">
            Casualties: Incalculable · Lawsuits: Pending · Your Bonus: $4.7M
          </p>
        </div>
        <button
          onClick={reset}
          aria-label="Play disaster CEO simulator again"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          DESTROY ANOTHER COMPANY
        </button>
      </div>
    );
  }

  if (step >= DECISIONS.length) return null;

  const current = DECISIONS[step];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
        <span>QUARTER {step + 1} OF 5</span>
        <div className="flex-1 h-px bg-[#222]" />
        <span>{choices.length}/5 DECISIONS</span>
      </div>

      <p className="font-mono text-sm text-[#ccc]">{current.prompt}</p>
      <p className="font-mono text-xs text-[#555]">You:</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(i)}
            aria-label={`Choose: ${opt}`}
            className="w-full text-left px-3 py-2 border border-[#222] bg-[#0d0d0d] font-mono text-xs text-[#ccc] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <span className="text-[#555] mr-2">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

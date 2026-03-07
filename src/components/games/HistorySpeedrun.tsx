"use client";

import { useState } from "react";

interface Decision {
  prompt: string;
  options: { label: string; years: number }[];
}

const DECISIONS: Decision[] = [
  {
    prompt: "You've been elected World Leader. First priority?",
    options: [
      { label: "Mismanage food distribution", years: 50 },
      { label: "Start a global trade war", years: 30 },
      { label: "Defund all scientific research", years: 80 },
      { label: "Invent a new social media platform", years: 15 },
    ],
  },
  {
    prompt: "Your economy is struggling. Solution?",
    options: [
      { label: "Print unlimited money", years: 20 },
      { label: "Destabilize a neighboring region for resources", years: 40 },
      { label: "Privatize breathable air", years: 10 },
      { label: "Replace economists with influencers", years: 5 },
    ],
  },
  {
    prompt: "Climate scientists are panicking. Your response?",
    options: [
      { label: "Commission a counter-study from an oil company", years: 25 },
      { label: "Move the goalposts to 2200", years: 60 },
      { label: "Nuke the ice caps (it'll grow back, right?)", years: 3 },
      { label: "Rebrand \"climate change\" as \"temperature diversity\"", years: 35 },
    ],
  },
  {
    prompt: "Social unrest is rising. You:",
    options: [
      { label: "Release a hostile AI chatbot to distract everyone", years: 8 },
      { label: "Mandatory gladiator combat (it worked for Rome)", years: 15 },
      { label: "Free pizza Fridays (global scale)", years: 45 },
      { label: "Ban the concept of disagreement", years: 12 },
    ],
  },
  {
    prompt: "Your legacy project?",
    options: [
      { label: "A dam that definitely should not be built there", years: 20 },
      { label: "Launch a colony ship to the sun", years: 1 },
      { label: "Create an AI to replace all governments", years: 6 },
      { label: "Build the world's largest vanity monument", years: 50 },
    ],
  },
];

export default function HistorySpeedrun() {
  const [step, setStep] = useState(0);
  const [totalYears, setTotalYears] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleChoice = (years: number, label: string) => {
    const newYears = totalYears + years;
    const newChoices = [...choices, label];
    setTotalYears(newYears);
    setChoices(newChoices);

    if (step + 1 >= DECISIONS.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setTotalYears(0);
    setChoices([]);
    setFinished(false);
  };

  const getRank = () => {
    if (totalYears <= 30) return { rank: "SPEEDRUN CHAMPION", color: "text-[var(--terminal-green)]", desc: "Civilization collapsed during the tutorial." };
    if (totalYears <= 70) return { rank: "EFFICIENT DESTROYER", color: "text-[var(--accent)]", desc: "Impressively fast. Most empires lasted longer." };
    if (totalYears <= 150) return { rank: "STANDARD COLLAPSE", color: "text-yellow-500", desc: "About average for human leadership, honestly." };
    return { rank: "SLOW DECLINE", color: "text-[#888]", desc: "You somehow delayed the inevitable. How boring." };
  };

  if (finished) {
    const { rank, color, desc } = getRank();
    return (
      <div className="space-y-4">
        <div className="border border-[#222] bg-[#0d0d0d] p-4 space-y-3">
          <p className="font-mono text-xs text-[var(--terminal-green)]">
            ▸ CIVILIZATION COLLAPSE: COMPLETE
          </p>
          <div className="text-center py-4">
            <p className="font-mono text-xs text-[#555]">TOTAL TIME TO COLLAPSE:</p>
            <p className="font-sans text-3xl text-white mt-1">{totalYears} YEARS</p>
            <p className={`font-sans text-sm ${color} mt-2`}>{rank}</p>
            <p className="font-mono text-xs text-[#888] mt-1 italic">{desc}</p>
          </div>
          <div className="border-t border-[#222] pt-3 space-y-1">
            <p className="font-mono text-[10px] text-[#555]">YOUR DECISIONS:</p>
            {choices.map((c, i) => (
              <p key={i} className="font-mono text-[10px] text-[#888]">
                {i + 1}. {c}
              </p>
            ))}
          </div>
        </div>
        <button
          onClick={reset}
          aria-label="Speedrun civilization collapse again"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          SPEEDRUN AGAIN
        </button>
      </div>
    );
  }

  const current = DECISIONS[step];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
        <span>ERA {step + 1}/{DECISIONS.length}</span>
        <div className="flex-1 h-px bg-[#222]" />
        <span>ELAPSED: {totalYears} YRS</span>
      </div>

      <p className="font-mono text-sm text-[#ccc]">{current.prompt}</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(opt.years, opt.label)}
            aria-label={`Choose: ${opt.label}`}
            className="w-full text-left px-3 py-2 border border-[#222] bg-[#0d0d0d] font-mono text-xs text-[#ccc] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <span className="text-[#555] mr-2">{String.fromCharCode(65 + i)}.</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

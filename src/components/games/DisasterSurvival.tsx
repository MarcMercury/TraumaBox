"use client";

import { useState } from "react";

interface Question {
  scenario: string;
  options: { label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    scenario: "An earthquake hits. You:",
    options: [
      { label: "Film it for content", points: 2 },
      { label: "Tweet about it", points: 3 },
      { label: "Blame the government", points: 5 },
      { label: "Panic buy toilet paper", points: 8 },
    ],
  },
  {
    scenario: "A tsunami warning is issued. You:",
    options: [
      { label: "Check if your insurance covers tsunamis", points: 4 },
      { label: "Run to higher ground", points: 15 },
      { label: "Post a selfie with the wave", points: 1 },
      { label: "Start a petition", points: 3 },
    ],
  },
  {
    scenario: "The power grid fails nationwide. You:",
    options: [
      { label: "Light a candle and vibe", points: 10 },
      { label: "Immediately loot a Best Buy", points: 2 },
      { label: "Try to fix it yourself", points: 6 },
      { label: "Start a podcast about it (on what device?)", points: 1 },
    ],
  },
  {
    scenario: "A meteor is heading for Earth. You:",
    options: [
      { label: "Max out your credit cards", points: 7 },
      { label: "Write a strongly worded letter to NASA", points: 3 },
      { label: "Start a prayer circle", points: 5 },
      { label: "Refresh Twitter for updates", points: 1 },
    ],
  },
  {
    scenario: "Zombies appear. Your first move:",
    options: [
      { label: "Head to Costco", points: 12 },
      { label: "Negotiate with them", points: 2 },
      { label: "Create a zombie rights movement", points: 1 },
      { label: "Barricade with IKEA furniture", points: 8 },
    ],
  },
];

const SURVIVAL_RESULTS = [
  { max: 10, time: "47 seconds", verdict: "You are the disaster." },
  { max: 18, time: "17 minutes", verdict: "You made it slightly longer than the average house cat." },
  { max: 28, time: "3 hours", verdict: "Enough time to regret every life choice." },
  { max: 40, time: "2 days", verdict: "Impressive. You found a Costco." },
  { max: 100, time: "Somehow indefinitely", verdict: "Either very lucky or very boring." },
];

export default function DisasterSurvival() {
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleChoice = (pts: number) => {
    const newPoints = points + pts;
    setPoints(newPoints);
    if (step + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setPoints(0);
    setFinished(false);
  };

  const getResult = () => {
    return SURVIVAL_RESULTS.find((r) => points <= r.max) ?? SURVIVAL_RESULTS[SURVIVAL_RESULTS.length - 1];
  };

  if (finished) {
    const result = getResult();
    return (
      <div className="space-y-4">
        <div className="border border-[var(--terminal-green)]/30 bg-[var(--terminal-green)]/5 p-4 space-y-3">
          <p className="font-mono text-xs text-[var(--terminal-green)]">
            ▸ SURVIVAL ANALYSIS COMPLETE
          </p>
          <p className="font-mono text-xs text-[#888]">You would survive approximately:</p>
          <h4 className="font-sans text-2xl text-white">{result.time}</h4>
          <p className="font-mono text-xs text-[#888] italic">{result.verdict}</p>
          <p className="font-mono text-[10px] text-[#555]">
            SURVIVAL SCORE: {points} pts · INSURANCE CLAIM: DENIED
          </p>
        </div>
        <button
          onClick={reset}
          aria-label="Retry disaster survival test"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          DIE AGAIN
        </button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
        <span>SCENARIO {step + 1}/{QUESTIONS.length}</span>
        <div className="flex-1 h-px bg-[#222]" />
        <span>SURVIVAL PTS: {points}</span>
      </div>

      <p className="font-mono text-sm text-[#ccc]">{current.scenario}</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(opt.points)}
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

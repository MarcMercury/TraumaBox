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
  {
    scenario: "The sun has not risen for 72 hours. You:",
    options: [
      { label: "Assume it's just Monday", points: 3 },
      { label: "Check if someone unplugged the sun", points: 2 },
      { label: "Start worshipping the nearest lamp", points: 6 },
      { label: "Stockpile vitamin D and become a mole person", points: 11 },
    ],
  },
  {
    scenario: "All animals suddenly gain the ability to speak. You:",
    options: [
      { label: "Apologize to every burger you've ever eaten", points: 4 },
      { label: "Form a political alliance with the crows", points: 9 },
      { label: "Negotiate a peace treaty with your cat (it declines)", points: 5 },
      { label: "Immediately lawyer up — your dog knows too much", points: 7 },
    ],
  },
  {
    scenario: "A supervolcano erupts. Global temperatures drop 20°F. You:",
    options: [
      { label: "Finally wear all the jackets you impulse-bought", points: 6 },
      { label: "Move into a Costco and declare sovereignty", points: 13 },
      { label: "Burn your student loan documents for warmth", points: 8 },
      { label: "Become a warlord of the local Trader Joe's", points: 3 },
    ],
  },
  {
    scenario: "AI has taken over all military systems. You:",
    options: [
      { label: "Ask it politely to stop", points: 2 },
      { label: "Unplug your router and hope for the best", points: 5 },
      { label: "Befriend the AI by complimenting its code", points: 7 },
      { label: "Accept your new robot overlord and apply for middle management", points: 10 },
    ],
  },
  {
    scenario: "Gravity reverses for 10 minutes. You:",
    options: [
      { label: "Grab onto the toilet and pray", points: 8 },
      { label: "Finally achieve your dream of flight (briefly)", points: 4 },
      { label: "Film it vertically like a psychopath", points: 1 },
      { label: "Use the time to organize your ceiling", points: 6 },
    ],
  },
  {
    scenario: "The ocean starts rising 1 foot per hour. You:",
    options: [
      { label: "Buy a boat on Amazon Prime (2-day shipping, obviously)", points: 5 },
      { label: "Move to Denver and pretend everything is fine", points: 9 },
      { label: "Start a beachfront property fire sale grift", points: 2 },
      { label: "Evolve gills through sheer willpower", points: 3 },
    ],
  },
  {
    scenario: "A portal to another dimension opens in your kitchen. You:",
    options: [
      { label: "Throw your roommate in first to test it", points: 3 },
      { label: "Charge admission", points: 7 },
      { label: "Call your landlord (this definitely violates the lease)", points: 5 },
      { label: "Jump in — anywhere is better than here", points: 11 },
    ],
  },
];

const SURVIVAL_RESULTS = [
  { max: 15, time: "47 seconds", verdict: "You are the disaster." },
  { max: 30, time: "17 minutes", verdict: "You made it slightly longer than the average house cat." },
  { max: 45, time: "3 hours", verdict: "Enough time to regret every life choice." },
  { max: 60, time: "2 days", verdict: "Impressive. You found a Costco." },
  { max: 80, time: "3 weeks", verdict: "You've gone feral but you're alive. Barely." },
  { max: 100, time: "6 months", verdict: "You've started a small feudal society in a Walmart. You are feared." },
  { max: 130, time: "Somehow indefinitely", verdict: "Either very lucky, very boring, or the cockroach of people." },
  { max: 999, time: "You outlive the sun", verdict: "You are clearly not human. Report to Area 51 for debriefing." },
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

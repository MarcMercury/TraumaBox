"use client";

import { useState } from "react";

interface Question {
  scenario: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    scenario: "A safety inspector tells you something is wrong.",
    options: [
      { label: "Thank them and address the issue", score: 0 },
      { label: "Fire them", score: 3 },
      { label: "Move the launch date forward", score: 4 },
      { label: "Promote them to a role with no authority", score: 2 },
    ],
  },
  {
    scenario: "Your product is showing signs of failure in testing.",
    options: [
      { label: "Halt production and investigate", score: 0 },
      { label: "Change the definition of 'failure'", score: 3 },
      { label: "Ship it anyway — it's the customer's problem now", score: 4 },
      { label: "Run the test again until you get the right answer", score: 2 },
    ],
  },
  {
    scenario: "An employee raises an ethical concern.",
    options: [
      { label: "Schedule a meeting to discuss", score: 0 },
      { label: "Add 'ethics' to the company values page and move on", score: 2 },
      { label: "Transfer them to a remote office in the Arctic", score: 3 },
      { label: "Launch a mandatory online ethics training (15 min, no quiz)", score: 1 },
    ],
  },
  {
    scenario: "Environmental reports show your facility is polluting a river.",
    options: [
      { label: "Clean it up immediately", score: 0 },
      { label: "Rename the river", score: 3 },
      { label: "Fund a study that concludes pollution is 'complex'", score: 2 },
      { label: "Buy the property downstream so no one can complain", score: 4 },
    ],
  },
  {
    scenario: "The public is angry. What's your response?",
    options: [
      { label: "Genuine apology and concrete action plan", score: 0 },
      { label: "Hire a PR firm to rebrand the disaster", score: 2 },
      { label: "Blame a junior employee", score: 3 },
      { label: "Go dark on social media until they forget", score: 1 },
    ],
  },
  {
    scenario: "Investors want to know about risk management.",
    options: [
      { label: "Honest assessment with mitigation plans", score: 0 },
      { label: "Show them a slideshow with lots of green graphs", score: 2 },
      { label: "Distract them with a stock buyback announcement", score: 3 },
      { label: "What's risk management?", score: 4 },
    ],
  },
  {
    scenario: "Your factory workers are passing out from fumes.",
    options: [
      { label: "Shut down and fix ventilation immediately", score: 0 },
      { label: "Distribute essential oils and motivational quotes", score: 3 },
      { label: "Rebrand the fainting as 'involuntary micro-meditation'", score: 4 },
      { label: "Install a fan and call it a wellness initiative", score: 2 },
    ],
  },
  {
    scenario: "A whistleblower has evidence of fraud.",
    options: [
      { label: "Cooperate with investigators fully", score: 0 },
      { label: "Offer the whistleblower a very generous 'severance'", score: 3 },
      { label: "Destroy the evidence and blame a hacker", score: 4 },
      { label: "Leak a counter-scandal about the whistleblower's Spotify playlists", score: 2 },
    ],
  },
  {
    scenario: "Your product caused 47 hospitalizations.",
    options: [
      { label: "Full recall and compensation immediately", score: 0 },
      { label: "Release a statement saying they used it wrong", score: 3 },
      { label: "Change the product name and re-release it next quarter", score: 4 },
      { label: "Sue the hospitals for treating your customers badly", score: 4 },
    ],
  },
  {
    scenario: "An intern discovers your company's been laundering money.",
    options: [
      { label: "Self-report to authorities", score: 0 },
      { label: "Make the intern CEO so they're now complicit", score: 4 },
      { label: "Start laundering the money through a charity for extra irony", score: 3 },
      { label: "Pivot the entire business model to crypto — it's laundering but legal-ish", score: 2 },
    ],
  },
  {
    scenario: "Your AI hiring tool has been rejecting every applicant named 'Kevin.'",
    options: [
      { label: "Fix the bias immediately and apologize", score: 0 },
      { label: "Claim you've never liked Kevins anyway", score: 2 },
      { label: "Rename the AI 'Kevin' so it's technically self-discrimination", score: 3 },
      { label: "Market it as a premium feature", score: 4 },
    ],
  },
  {
    scenario: "Your company retreat resulted in a diplomatic incident with a sovereign nation.",
    options: [
      { label: "Issue a formal state apology through proper channels", score: 0 },
      { label: "Claim team-building exercises are protected under maritime law", score: 3 },
      { label: "Annex the country and add it to your org chart", score: 4 },
      { label: "Send a fruit basket with a note that says 'our bad'", score: 2 },
    ],
  },
  {
    scenario: "Congress subpoenas your company records.",
    options: [
      { label: "Comply fully and transparently", score: 0 },
      { label: "Comply, but print everything in 2pt font in Wingdings", score: 2 },
      { label: "Claim executive privilege despite not being the executive branch", score: 3 },
      { label: "Counter-sue Congress for wasting your time", score: 4 },
    ],
  },
];

interface Result {
  disasters: number;
  hearings: number;
  title: string;
  verdict: string;
}

function getResult(score: number): Result {
  if (score <= 6) {
    return {
      disasters: 0,
      hearings: 0,
      title: "RESPONSIBLE HUMAN",
      verdict: "You're not the problem. This is boring. Please leave.",
    };
  }
  if (score <= 15) {
    return {
      disasters: 1,
      hearings: 0,
      title: "MILD HAZARD",
      verdict: "You would cause exactly one preventable disaster and feel sort of bad about it.",
    };
  }
  if (score <= 25) {
    return {
      disasters: 3,
      hearings: 1,
      title: "CORPORATE MENACE",
      verdict: "Three environmental disasters and one congressional hearing. HR is concerned.",
    };
  }
  if (score <= 35) {
    return {
      disasters: 7,
      hearings: 3,
      title: "WALKING CATASTROPHE",
      verdict: "You are personally responsible for multiple international incidents. The Hague would like a word.",
    };
  }
  if (score <= 45) {
    return {
      disasters: 14,
      hearings: 7,
      title: "EXTINCTION-LEVEL EXECUTIVE",
      verdict: "Entire ecosystems have collapsed in your wake. Your Wikipedia page has a war crimes section.",
    };
  }
  return {
    disasters: 31,
    hearings: 12,
    title: "HISTORY'S GREATEST MONSTER",
    verdict: "You make the Permian extinction look like a mild inconvenience. Future civilizations will use your name as a curse word.",
  };
}

export default function AreYouTheProblem() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleChoice = (pts: number) => {
    const newScore = score + pts;
    setScore(newScore);
    if (step + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const result = getResult(score);
    return (
      <div className="space-y-4">
        <div className="border border-red-500/30 bg-red-500/5 p-4 space-y-3">
          <p className="font-mono text-xs text-red-400">
            ⚠ ASSESSMENT COMPLETE
          </p>
          <h4 className="font-sans text-lg text-white">{result.title}</h4>
          <p className="font-mono text-xs text-[#888] italic">{result.verdict}</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="border border-[#222] p-2 text-center">
              <p className="font-mono text-lg text-[var(--accent)]">{result.disasters}</p>
              <p className="font-mono text-[10px] text-[#555]">DISASTERS</p>
            </div>
            <div className="border border-[#222] p-2 text-center">
              <p className="font-mono text-lg text-yellow-500">{result.hearings}</p>
              <p className="font-mono text-[10px] text-[#555]">HEARINGS</p>
            </div>
          </div>
          <p className="font-mono text-[10px] text-[#555]">
            PROBLEM SCORE: {score}/{QUESTIONS.length * 4} · LEGAL STATUS: CONSULT YOUR ATTORNEY
          </p>
        </div>
        <button
          onClick={reset}
          aria-label="Retake the problem assessment"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          TAKE TEST AGAIN
        </button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
        <span>QUESTION {step + 1}/{QUESTIONS.length}</span>
        <div className="flex-1 h-px bg-[#222]" />
        <span>PROBLEM INDEX: {score}</span>
      </div>

      <p className="font-mono text-sm text-[#ccc]">{current.scenario}</p>
      <p className="font-mono text-xs text-[#555]">You:</p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(opt.score)}
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

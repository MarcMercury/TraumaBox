"use client";

import { useState } from "react";
import { useTokens } from "@/components/TokenProvider";
import AtrocityAptitudeTest from "@/components/games/AtrocityAptitudeTest";
import DisasterCEO from "@/components/games/DisasterCEO";
import HistoricalScapegoat from "@/components/games/HistoricalScapegoat";
import PersonalApocalypse from "@/components/games/PersonalApocalypse";
import DisasterSurvival from "@/components/games/DisasterSurvival";
import CorporateApology from "@/components/games/CorporateApology";
import DisasterDraft from "@/components/games/DisasterDraft";
import ConspiracyStarterPack from "@/components/games/ConspiracyStarterPack";
import AreYouTheProblem from "@/components/games/AreYouTheProblem";
import HistorySpeedrun from "@/components/games/HistorySpeedrun";

interface GameDef {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  component: React.ComponentType;
}

const GAMES: GameDef[] = [
  {
    id: "atrocity-aptitude",
    title: "THE ATROCITY APTITUDE TEST",
    subtitle: "Discover your natural disaster potential",
    icon: "☣",
    color: "text-[var(--accent)]",
    component: AtrocityAptitudeTest,
  },
  {
    id: "disaster-ceo",
    title: "DISASTER CEO SIMULATOR",
    subtitle: "Run a company into catastrophe",
    icon: "💼",
    color: "text-red-400",
    component: DisasterCEO,
  },
  {
    id: "scapegoat",
    title: "FIND YOUR HISTORICAL SCAPEGOAT",
    subtitle: "When things go wrong, who do you blame?",
    icon: "👉",
    color: "text-yellow-500",
    component: HistoricalScapegoat,
  },
  {
    id: "apocalypse",
    title: "GENERATE YOUR PERSONAL APOCALYPSE",
    subtitle: "Your custom disaster timeline",
    icon: "🌍",
    color: "text-[var(--terminal-green)]",
    component: PersonalApocalypse,
  },
  {
    id: "survival",
    title: "HOW LONG WOULD YOU LAST?",
    subtitle: "Disaster survival assessment",
    icon: "⏱",
    color: "text-cyan-400",
    component: DisasterSurvival,
  },
  {
    id: "corporate-apology",
    title: "CORPORATE APOLOGY GENERATOR",
    subtitle: "Perfectly meaningless statements",
    icon: "📋",
    color: "text-purple-400",
    component: CorporateApology,
  },
  {
    id: "disaster-draft",
    title: "THE HISTORICAL DISASTER DRAFT",
    subtitle: "Fantasy sports, but catastrophic",
    icon: "🏆",
    color: "text-[var(--accent)]",
    component: DisasterDraft,
  },
  {
    id: "conspiracy",
    title: "CONSPIRACY THEORY STARTER PACK",
    subtitle: "Your secret dossier, declassified",
    icon: "🔺",
    color: "text-red-400",
    component: ConspiracyStarterPack,
  },
  {
    id: "are-you-the-problem",
    title: "THE \"ARE YOU THE PROBLEM?\" TEST",
    subtitle: "Spoiler: probably yes",
    icon: "⚠",
    color: "text-yellow-500",
    component: AreYouTheProblem,
  },
  {
    id: "history-speedrun",
    title: "THE HISTORY SPEEDRUN",
    subtitle: "Destroy civilization as fast as possible",
    icon: "⚡",
    color: "text-[var(--terminal-green)]",
    component: HistorySpeedrun,
  },
];

export default function ArcadePage() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [burnError, setBurnError] = useState<string | null>(null);
  const [burning, setBurning] = useState(false);
  const { user, burnArcadeTokens } = useTokens();

  const GAME_COST = 25;

  const active = GAMES.find((g) => g.id === activeGame);

  const handleLaunch = async (game: GameDef) => {
    setBurnError(null);
    setBurning(true);
    const result = await burnArcadeTokens(game.id, game.title);
    setBurning(false);
    if (result.success) {
      setActiveGame(game.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setBurnError(result.message);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-[var(--terminal-green)]" />
        <h1 className="text-3xl sm:text-4xl font-sans text-[var(--terminal-green)] tracking-wider">
          ARCADE
        </h1>
      </div>
      <p className="font-mono text-xs text-[#555] ml-5 mb-8">
        MICRO-GAMES DIVISION — INTERACTIVE CONTAINMENT PROTOCOLS — 25 TOKENS PER PLAY
      </p>

      {/* Burn error feedback */}
      {burnError && (
        <div className="mb-6 border border-red-500/30 bg-red-500/5 p-3 font-mono text-xs text-red-400">
          <span className="text-red-500 font-bold">ERROR:</span> {burnError}
        </div>
      )}

      {/* Active Game */}
      {active && (
        <div className="mb-8">
          <div className="border border-[#222] bg-[#0d0d0d]">
            {/* Terminal window chrome */}
            <div className="border-b border-[#222] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-mono text-[10px] text-[#555] ml-2">
                  /arcade/{active.id}.exe
                </span>
              </div>
              <button
                onClick={() => setActiveGame(null)}
                aria-label="Close game"
                className="font-mono text-xs text-[#555] hover:text-[var(--accent)] transition-colors"
              >
                [✕ CLOSE]
              </button>
            </div>
            {/* Game title bar */}
            <div className="px-4 py-3 border-b border-[#222] flex items-center gap-3">
              <span className="text-xl">{active.icon}</span>
              <div>
                <h2 className={`font-sans text-sm ${active.color}`}>{active.title}</h2>
                <p className="font-mono text-[10px] text-[#555]">{active.subtitle}</p>
              </div>
            </div>
            {/* Game content */}
            <div className="p-4 sm:p-6">
              <active.component />
            </div>
          </div>
        </div>
      )}

      {/* Game Grid */}
      <section>
        <h2 className="font-sans text-xl text-white mb-4 flex items-center gap-2">
          <span className="text-[var(--accent)]">▸</span>
          {activeGame ? "OTHER EXPERIMENTS" : "SELECT EXPERIMENT"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GAMES.filter((g) => g.id !== activeGame).map((game) => (
            <button
              key={game.id}
              onClick={() => handleLaunch(game)}
              disabled={burning}
              aria-label={`Launch ${game.title} — ${GAME_COST} tokens`}
              className="text-left border border-[#222] bg-[#0d0d0d] p-4 hover:border-[var(--accent)] transition-all group disabled:opacity-50 disabled:cursor-wait"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {game.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-sans text-xs ${game.color} group-hover:brightness-125 transition-all`}>
                    {game.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#555] mt-1">
                    {game.subtitle}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[10px] text-[var(--accent)]">
                    {GAME_COST} T
                  </span>
                  <span className={`font-mono text-[10px] group-hover:text-[var(--accent)] transition-colors ${
                    (user?.tokenBalance ?? 0) < GAME_COST ? "text-red-500" : "text-[#333]"
                  }`}>
                    {burning ? "BURNING..." : "LAUNCH ▸"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-8 border-t border-[#222] pt-4">
        <p className="font-mono text-[10px] text-[#333] leading-relaxed">
          DISCLAIMER: All results are generated locally and are entirely fictional.
          No actual civilizations were harmed in the making of these simulations.
          TraumaBox Media assumes no liability for existential crises triggered by your results.
          If you find yourself agreeing with your Atrocity Aptitude score, please consult a professional.
        </p>
      </div>
    </div>
  );
}

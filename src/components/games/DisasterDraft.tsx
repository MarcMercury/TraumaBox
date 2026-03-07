"use client";

import { useState } from "react";

interface DraftPick {
  category: string;
  options: string[];
}

const DRAFT_CATEGORIES: DraftPick[] = [
  {
    category: "VOLCANO",
    options: [
      "Mt. Vesuvius (79 AD) — Classic, devastating, great lava",
      "Krakatoa (1883) — Heard around the world, literally",
      "Mt. St. Helens (1980) — American, dramatic, good footage",
      "Tambora (1815) — Caused a year without summer",
      "Eyjafjallajökull (2010) — Unpronounceable, canceled all flights",
      "Lake Nyos (1986) — Silent CO2 death cloud, nature's war crime",
      "Mt. Pelée (1902) — Wiped out 30,000 in minutes, one survivor in a jail cell",
      "Yellowstone Caldera (TBD) — The apocalypse everyone's waiting for",
      "Thera/Santorini (1600 BC) — Possibly ended the Minoan civilization",
    ],
  },
  {
    category: "VIRUS",
    options: [
      "Black Death (1347) — The original pandemic",
      "Spanish Flu (1918) — 50 million, terrible branding",
      "Smallpox — Patient, thorough, eventually defeated",
      "The Common Cold — Unstoppable, annoying, persistent",
      "Computer Virus (ILOVEYOU) — Digital, romantic, destructive",
      "Rabies — 100% fatal if untreated, makes you fear water",
      "Prions (Mad Cow) — Not even alive, still kills you, cannot be destroyed",
      "Cordyceps (ant zombie fungus) — Nature's The Last of Us",
      "Stuxnet — A government virus that escaped and just vibed globally",
    ],
  },
  {
    category: "WAR",
    options: [
      "Emu War (1932) — Australia lost to birds",
      "War of the Bucket (1325) — Started over a stolen bucket",
      "Football War (1969) — 4 days, caused by a soccer match",
      "Cod Wars (1958-76) — Iceland vs UK over fish",
      "Pig War (1859) — US vs UK, one pig casualty",
      "Pastry War (1838) — France invaded Mexico over damaged pastries",
      "War of the Stray Dog (1925) — Greece invaded Bulgaria over a dog",
      "Toledo War (1835) — Michigan vs Ohio, no deaths, eternal hatred",
      "Aroostook War (1838) — US vs UK, zero casualties, infinite drama",
    ],
  },
  {
    category: "CORPORATE SCANDAL",
    options: [
      "Enron — They cooked the books, then ate them",
      "Theranos — Fake it till you get indicted",
      "Lehman Brothers — Oops, global recession",
      "BP Oil Spill — We're sorry (sort of)",
      "Fyre Festival — Influencer paradise meets FEMA",
      "WeWork — $47B valuation for a landlord with kombucha",
      "FTX — Crypto bro lost $8B in the couch cushions",
      "Purdue Pharma — Invented an opioid crisis for shareholder value",
      "Volkswagen Dieselgate — Taught cars to lie to the government",
    ],
  },
  {
    category: "INFRASTRUCTURE",
    options: [
      "Tacoma Narrows Bridge — Danced itself to death",
      "Chernobyl — Not great, not terrible",
      "Titanic — Unsinkable, they said",
      "Challenge Explosion — O-rings and hubris",
      "Y2K — The disaster that wasn't (or was it?)",
      "Aral Sea — USSR deleted an entire sea for cotton",
      "Banqiao Dam (1975) — Killed 170,000, China kept it secret for decades",
      "Bhopal (1984) — Union Carbide gassed a city and called it an accident",
      "Deepwater Horizon — When cutting corners goes 5,000 feet deep",
    ],
  },
  {
    category: "POLITICAL BLUNDER",
    options: [
      "Bay of Pigs (1961) — CIA's most embarrassing group project",
      "Brexit (2016) — A country rage-quit a continent",
      "Watergate (1972) — It's not the crime, it's the cover-up... and also the crime",
      "Iran-Contra — Sold weapons to fund other weapons, very normal",
      "The Maginot Line — France built a wall, Germany walked around it",
      "Prohibition (1920) — Banning alcohol: what could go wrong? Everything.",
      "Invasion of Russia in Winter — Every century someone tries it again",
      "Treaty of Versailles — Created peace so bad it caused another world war",
      "The Scramble for Africa — European nations carved up a continent at a conference over lunch",
    ],
  },
  {
    category: "COSMIC EVENT",
    options: [
      "Chicxulub Asteroid (65M BC) — Ended the dinosaurs' 165-million-year run",
      "Tunguska Event (1908) — Flattened 800 sq miles of Siberian forest, no crater",
      "Carrington Event (1859) — Solar storm that set telegraph offices on fire",
      "Great Dying (252M BC) — 96% of all species deleted, Earth's hard reset",
      "Chelyabinsk Meteor (2013) — Dashcam footage of God's fastball",
      "Toba Supervolcano (74K BC) — Nearly ended humanity, reduced us to ~10,000 people",
      "Gamma Ray Burst (450M BC) — Ordovician extinction, death beam from a dying star",
      "The Heat Death of the Universe (TBD) — The ultimate long game",
      "The Big Crunch (Theoretical) — The universe folds back in on itself like a bad soufflé",
    ],
  },
];

function calculateScore(picks: number[]): { score: number; rank: string; commentary: string } {
  const hash = picks.reduce((acc, p, i) => acc + (p + 1) * (i + 7) * 41, 0);
  const score = 3200 + (hash % 7800);

  let rank: string;
  let commentary: string;

  if (score > 9000) {
    rank = "EXTINCTION-LEVEL THREAT";
    commentary = "Your lineup would end civilization before halftime.";
  } else if (score > 7000) {
    rank = "GLOBAL CATASTROPHE";
    commentary = "Multiple continents affected. Insurance companies are crying.";
  } else if (score > 5000) {
    rank = "REGIONAL DISASTER";
    commentary = "Impressive damage, but humanity limps on. Try harder.";
  } else {
    rank = "MINOR INCONVENIENCE";
    commentary = "Barely qualifies as a bad day. Your draft strategy needs work.";
  }

  return { score, rank, commentary };
}

export default function DisasterDraft() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [pickNames, setPickNames] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; rank: string; commentary: string } | null>(null);

  const handlePick = (optionIdx: number) => {
    const newPicks = [...picks, optionIdx];
    const newNames = [...pickNames, DRAFT_CATEGORIES[currentCategory].options[optionIdx]];
    setPicks(newPicks);
    setPickNames(newNames);

    if (currentCategory + 1 >= DRAFT_CATEGORIES.length) {
      setResult(calculateScore(newPicks));
    } else {
      setCurrentCategory(currentCategory + 1);
    }
  };

  const reset = () => {
    setCurrentCategory(0);
    setPicks([]);
    setPickNames([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="space-y-4">
        <div className="border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4 space-y-3">
          <p className="font-mono text-xs text-[var(--accent)]">
            ◉ DRAFT COMPLETE — YOUR CATASTROPHE LINEUP
          </p>
          <div className="space-y-1">
            {pickNames.map((pick, i) => (
              <div key={i} className="font-mono text-xs text-[#ccc] flex gap-2">
                <span className="text-[var(--accent)]">#{i + 1}</span>
                <span>{pick.split(" — ")[0]}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#222] pt-3 mt-3 space-y-2">
            <div className="flex justify-between font-mono text-xs">
              <span className="text-[#555]">CATASTROPHE RATING</span>
              <span className="text-white font-bold">{result.score.toLocaleString()}</span>
            </div>
            <p className="font-sans text-sm text-[var(--accent)]">{result.rank}</p>
            <p className="font-mono text-xs text-[#888] italic">{result.commentary}</p>
          </div>
        </div>
        <button
          onClick={reset}
          aria-label="Redraft your disaster lineup"
          className="px-4 py-2 border border-[var(--accent)] text-[var(--accent)] font-mono text-xs hover:bg-[var(--accent)] hover:text-black transition-all"
        >
          REDRAFT
        </button>
      </div>
    );
  }

  const current = DRAFT_CATEGORIES[currentCategory];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
        <span>ROUND {currentCategory + 1}/{DRAFT_CATEGORIES.length}</span>
        <div className="flex-1 h-px bg-[#222]" />
        <span>CATEGORY: {current.category}</span>
      </div>

      <p className="font-mono text-sm text-[#ccc]">
        Draft your <span className="text-[var(--accent)]">{current.category}</span>:
      </p>

      <div className="space-y-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(i)}
            aria-label={`Draft pick: ${opt}`}
            className="w-full text-left px-3 py-2 border border-[#222] bg-[#0d0d0d] font-mono text-xs text-[#ccc] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            {opt}
          </button>
        ))}
      </div>

      {picks.length > 0 && (
        <div className="font-mono text-[10px] text-[#555]">
          DRAFTED: {pickNames.map((p) => p.split(" — ")[0]).join(" + ")}
        </div>
      )}
    </div>
  );
}

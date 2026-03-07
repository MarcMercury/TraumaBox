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
  "child labor cover-up",
  "illegal human experimentation",
  "bribing a small nation",
  "accidentally creating a cartel",
  "union busting via trained falcons",
  "selling expired food to the military",
  "using customers as unwitting test subjects",
  "dumping toxic waste in a national park",
  "secretly mining cryptocurrency with customer devices",
  "funding both sides of a conflict",
  "replacing medicine with sugar pills for profit",
  "CEO's second secret family funded by company",
  "building a literal sweatshop in the metaverse",
  "hiding a sinkhole under the corporate HQ",
  "weaponizing the company mascot",
  "stealing a river",
  "faking the moon landing (the corporate retreat one)",
  "accidentally declaring war on Finland",
  "operating an unlicensed casino in the break room",
  "selling user dreams to advertisers",
];

const OPENINGS = [
  "We take this deeply concerning incident very seriously",
  "We are aware of the situation and have launched an immediate investigation",
  "The safety and trust of our stakeholders has always been our highest priority",
  "We were deeply troubled to learn about these allegations",
  "This does not reflect who we are as a company",
  "We want to be upfront: mistakes were made, by someone, somewhere, at some point",
  "Let us be clear — we are as shocked as you are, despite having known about this for years",
  "In our ongoing commitment to buzzwords and optics",
  "We hear you, we see you, and we have no intention of changing",
  "After an exhaustive 15-minute internal review",
  "Our founder has emerged from his bunker to address this personally",
  "As a family-owned conglomerate worth $47 billion",
  "Before we address the 73 felony charges",
  "We acknowledge that our actions may have inadvertently caused the collapse of a small economy",
  "We understand that trust, once broken, can be rebranded",
  "In the spirit of radical transparency, which our legal team has carefully curated",
  "We recognize this situation is suboptimal for those who survived it",
  "Our hearts go out to those affected, though our wallets remain firmly closed",
  "First, we want to thank our shareholders for their patience during this genocide",
  "We categorically deny the allegations while also settling out of court",
  "We were blindsided by consequences, a concept we believed did not apply to us",
  "Like a phoenix from the ashes of the village we burned",
  "We want to assure the public that what you saw was taken completely out of its 47-minute context",
  "As industry leaders in pretending this isn't happening",
  "We stand firmly behind our decision to not stand behind anything",
];

const ACTIONS = [
  "and have immediately formed a task force to investigate",
  "and have retained independent counsel to conduct a thorough review",
  "and are implementing comprehensive changes across our organization",
  "and have placed the responsible parties on administrative leave pending review",
  "and are cooperating fully with all relevant authorities",
  "and have burned the evidence — sorry, archived the relevant documentation",
  "and have promoted the whistleblower to a position with no email access",
  "and have hired the PR firm that got that dictator a TED Talk",
  "and have scheduled a company-wide yoga session to realign our chakras and share price",
  "and have asked our AI to generate a more sympathetic version of events",
  "and have commissioned a mural in the lobby celebrating accountability",
  "and have donated $500 to a charity we own",
  "and have replaced our entire C-suite with golden retrievers (no further questions)",
  "and have mandatory-voluntarily enrolled all employees in an ethics MOOC they cannot pause",
  "and have formed a Blue Ribbon Panel that will report back never",
  "and are suing the concept of accountability for defamation",
  "and have begun the sacred corporate ritual of Restructuring",
  "and have released a Spotify playlist titled 'Healing & Growth' to all affected parties",
  "and have pivoted the entire scandal into a limited-edition merch drop",
  "and have sent a fruit basket to each of the 12,000 victims",
  "and have asked our interns to draft a sincere-sounding apology using ChatGPT",
  "and have preemptively filed for bankruptcy in a jurisdiction that doesn't exist",
  "and have invited Brené Brown to facilitate our next board meeting",
  "and are exploring whether this qualifies us for a Nobel Peace Prize",
  "and have quietly changed the definition of the word 'ethical' on Wikipedia",
];

const DEFLECTIONS = [
  "While we cannot comment on specifics due to ongoing legal proceedings",
  "Although the full picture is still emerging",
  "We believe this is an isolated incident that does not reflect our broader operations",
  "While external factors contributed significantly to this situation",
  "As a company in a rapidly evolving landscape",
  "While hindsight is 20/20 and our oversight was approximately 0/0",
  "Though technically this happened in international waters",
  "While we acknowledge the situation, we prefer to focus on the vibes",
  "Although our competitors do far worse things that we cannot legally specify",
  "While the word 'catastrophe' is subjective and culturally relative",
  "Though the real victims here are our quarterly projections",
  "While we cannot confirm or deny the satellite imagery",
  "Although we remind the public that no one is technically dead until the paperwork is filed",
  "While the leaked documents are real, the font choice was unauthorized",
  "Though we maintain that the fire started itself",
  "While we understand the frustration, we'd like to redirect attention to our new logo",
  "Although this was clearly an act of God (our lawyers insisted we say this)",
  "While we take full responsibility, we define 'full' differently than most dictionaries",
  "Though we note that the definition of 'toxic' has changed significantly since 1987",
  "While unprecedented times call for unprecedented lack of accountability",
  "Although we were explicitly warned 14 times, the 15th warning was the one we needed",
  "While we appreciate the congressional subpoena, we're going to pass",
  "Though we remind everyone that correlation is not causation, even when it obviously is",
  "While our CEO's offshore accounts are unrelated to this matter",
  "Although technically the explosion improved property values in some areas",
];

const PROMISES = [
  "we remain committed to transparency and accountability.",
  "we are confident that our enhanced protocols will prevent any recurrence.",
  "we look forward to rebuilding the trust we have worked so hard to earn.",
  "we will emerge from this stronger, more resilient, and more aligned with our core values.",
  "we invite our community to join us on this journey of growth and reflection.",
  "we promise to do better, or at least to say we're doing better more convincingly.",
  "we are confident the class action lawsuit will bring us all closer together.",
  "we will continue to put people first, right after profits, shareholders, and executive bonuses.",
  "we have updated our Terms of Service to make this technically not our fault next time.",
  "we pledge to be the change we want to see, primarily in our legal strategy.",
  "we will monetize this learning experience through a forthcoming podcast series.",
  "we believe this crisis has only made our brand story more authentic and relatable.",
  "we are establishing a Victims Fund with an initial balance of our thoughts and prayers.",
  "we look forward to the Netflix documentary clearing everything up.",
  "we commit to never getting caught like this again.",
  "we remain confident that time heals all wounds and statutes of limitations.",
  "we have learned valuable lessons that we will immediately forget.",
  "we are pivoting to a purpose-driven model where the purpose is still money.",
  "we remind our stakeholders that forgiveness is divine, and so are our margins.",
  "we vow to hold ourselves to the highest standards that our legal team will allow.",
  "we are writing a whitepaper on how this was actually innovation all along.",
  "we plan to rebrand this entire catastrophe as a 'growth opportunity.'",
  "we trust the market will correct for our complete absence of morality.",
  "we are entering our redemption arc and have already optioned the film rights.",
  "we look forward to a future where it is someone else's problem.",
];

const CLOSINGS = [
  "Our thoughts are with all those affected.",
  "We will provide further updates as appropriate.",
  "Thank you for your continued patience and understanding.",
  "We appreciate the opportunity to do better.",
  "Sincerely, The Leadership Team",
  "Please direct all further inquiries to our legal team's legal team.",
  "This statement will self-destruct in 24 hours.",
  "We have already moved on and encourage you to do the same.",
  "God bless, and please don't check our Glassdoor reviews.",
  "Sent from my yacht.",
  "No further comments. Our social media manager has been sedated.",
  "Warmly, the algorithm that replaced our communications department.",
  "P.S. Our stock is actually up, so who's really the victim here?",
  "In solidarity with absolutely no one in particular.",
  "This message was approved by our Board of Directors (3 of whom are under indictment).",
  "Remember: we're all in this together. Some of us just have better lawyers.",
  "Namaste, and please see the attached NDA.",
  "With love, the shell corporation that technically employs us all.",
  "This apology is also available as an NFT for a limited time.",
  "Please hold your applause until after the sentencing.",
  "Onward and upward. Mostly upward, into our private jets.",
  "We leave you with our founder's immortal words: 'delete the emails.'",
  "Thank you for coming to our TED Talk / parole hearing.",
  "May this PR crisis bring us all closer to whatever God insurance adjusters believe in.",
  "This concludes our quarterly apology. The next one is scheduled for Q3.",
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

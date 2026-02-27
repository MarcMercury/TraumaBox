"use client";

export default function AboutPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-purple-500" />
        <h1 className="text-3xl sm:text-4xl font-sans text-purple-500 tracking-wider">
          DOSSIER
        </h1>
      </div>
      <p className="font-mono text-xs text-[#555] ml-5 mb-8">
        CLASSIFIED ORGANIZATIONAL PROFILE — CLEARANCE LEVEL: IRRELEVANT
      </p>

      {/* What is Trauma Box */}
      <section className="mb-10">
        <div className="border border-[#222] bg-[#0d0d0d]">
          <div className="border-b border-[#222] px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-mono text-[10px] text-[#555] ml-2">
              /dossier/overview.txt
            </span>
          </div>
          <div className="p-6 font-mono text-sm text-[#ccc] leading-relaxed space-y-4">
            <p>
              <span className="text-[var(--accent)]">TRAUMA BOX</span> is a
              digital containment unit for content that probably shouldn&apos;t
              exist — but does anyway, because the world is a strange and
              terrible place and someone has to document it.
            </p>
            <p>
              Our flagship product,{" "}
              <span className="text-white font-bold">
                Absolutely Terrible Children&apos;s Stories
              </span>
              , takes the worst moments in human history and reformats them as
              bedtime stories for children who don&apos;t exist and shouldn&apos;t
              be read to.
            </p>
            <p>
              Think of us as a museum of human catastrophe, but with better
              graphic design and worse moral judgment.
            </p>
          </div>
        </div>
      </section>

      {/* The Containment Protocol */}
      <section className="mb-10">
        <h2 className="font-sans text-xl text-white mb-4 flex items-center gap-2">
          <span className="text-[var(--accent)]">▸</span> CONTAINMENT PROTOCOL
        </h2>
        <div className="space-y-3 font-mono text-xs text-[#888] leading-relaxed">
          <div className="flex gap-3 p-3 border-l-2 border-[var(--accent)]">
            <span className="text-[var(--accent)] font-bold whitespace-nowrap">
              PHASE 1:
            </span>
            <span>
              Identify a historical event terrible enough that it really
              shouldn&apos;t be a children&apos;s story. This is easier than you&apos;d
              think.
            </span>
          </div>
          <div className="flex gap-3 p-3 border-l-2 border-[var(--accent)]">
            <span className="text-[var(--accent)] font-bold whitespace-nowrap">
              PHASE 2:
            </span>
            <span>
              Write it as a children&apos;s story anyway. Use bright colors.
              Include a moral that makes no one feel better.
            </span>
          </div>
          <div className="flex gap-3 p-3 border-l-2 border-[var(--accent)]">
            <span className="text-[var(--accent)] font-bold whitespace-nowrap">
              PHASE 3:
            </span>
            <span>
              Release it into the world. Accept the consequences. There are
              always consequences.
            </span>
          </div>
          <div className="flex gap-3 p-3 border-l-2 border-red-500">
            <span className="text-red-500 font-bold whitespace-nowrap">
              PHASE 4:
            </span>
            <span>Repeat until someone stops us. No one has stopped us.</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="font-sans text-xl text-white mb-4 flex items-center gap-2">
          <span className="text-[var(--accent)]">▸</span> FREQUENTLY QUESTIONED
          DECISIONS
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Is this appropriate?",
              a: "No. Next question.",
            },
            {
              q: "Who is this for?",
              a: "People who laugh at things they shouldn't. So, most people, but only when no one's watching.",
            },
            {
              q: "Are these real historical events?",
              a: "Unfortunately, yes. Every story is based on an actual human catastrophe. We just added illustrations and a reading level appropriate for ages 4-6.",
            },
            {
              q: "Can I submit my own terrible story ideas?",
              a: "Yes. Please use the Contact form (when it exists). Include the historical event and why you think it deserves to be ruined further.",
            },
            {
              q: "Do you have a moral compass?",
              a: "We had one. It was confiscated during onboarding.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="border border-[#222] bg-[#0d0d0d] p-4"
            >
              <h3 className="font-mono text-sm text-white mb-2">
                <span className="text-[var(--accent)]">&gt;</span> {faq.q}
              </h3>
              <p className="font-mono text-xs text-[#888] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border border-[#222] bg-[#0d0d0d] p-6">
        <h2 className="font-sans text-xl text-white mb-2">CONTACT</h2>
        <p className="font-mono text-xs text-[#555] mb-4">
          We accept complaints, suggestions, and threats. Response time: when we
          feel like it.
        </p>
        <div className="font-mono text-xs text-[#888] space-y-1">
          <p>
            EMAIL: <span className="text-[var(--accent)]">containment@traumabox.com</span>
          </p>
          <p>
            STATUS:{" "}
            <span className="text-yellow-500">
              READING MESSAGES, NOT REPLYING
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

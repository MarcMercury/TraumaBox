"use client";

export default function AgreementPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-red-500 animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-red-500 tracking-wider glitch-text"
            data-text="THE CONTRACT"
          >
            THE CONTRACT
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          CREATOR AGREEMENT — AKA &quot;THE TERMS OF MUTUAL EXPLOITATION&quot;
        </p>
      </div>

      {/* Agreement Body */}
      <div className="border border-[#222] bg-[#0d0d0d]">
        <div className="border-b border-[#222] px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-mono text-[10px] text-[#555] ml-2">
            /legal/creator-agreement-v1.txt
          </span>
        </div>

        <div className="p-6 font-mono text-sm text-[#ccc] leading-relaxed space-y-6">
          {/* Preamble */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">PREAMBLE</h2>
            <p>
              This Creator Agreement (&quot;The Contract,&quot; &quot;This Unfortunate Document,&quot;
              &quot;The Thing You&apos;re Pretending to Read&quot;) is entered into between{" "}
              <span className="text-white">You</span> (hereinafter &quot;The Creator,&quot;
              &quot;The Brave Soul,&quot; &quot;The Person Who Clicked &apos;I Agree&apos; Without Reading This&quot;)
              and <span className="text-[var(--accent)]">Trauma Box Industries</span>
              {" "}(hereinafter &quot;Us,&quot; &quot;The Middleman,&quot; &quot;The People Who Keep the
              Lights On&quot;).
            </p>
            <p className="mt-3 text-[#888]">
              By submitting content to the Trauma Box platform, you acknowledge that you
              have read this agreement. Or at least scrolled past it very quickly. Same thing,
              legally speaking. (Not legal advice.)
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 1: OWNERSHIP (THE PART THAT ACTUALLY MATTERS)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">1.1</span>{" "}
                <span className="text-white font-bold">You own your stuff.</span> Period.
                Full stop. No asterisks. No fine print hidden in a footnote that secretly
                signs over your firstborn. The intellectual property rights to any content
                you submit to Trauma Box remain{" "}
                <span className="text-[var(--terminal-green)]">100% yours</span>.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">1.2</span>{" "}
                Trauma Box acquires <span className="text-white font-bold">zero (0) long-term rights</span>{" "}
                to your content. We don&apos;t own it. We can&apos;t sell it. We can&apos;t license it.
                We can&apos;t put it on a t-shirt (unless you tell us to, and even then, we&apos;d ask
                nicely first).
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">1.3</span>{" "}
                We are granted a <span className="text-white">limited, non-exclusive, revocable license</span>{" "}
                to display and distribute your content on the Trauma Box platform solely for
                the purpose of selling access to readers on your behalf. Think of us as a
                very grim bookshelf.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">1.4</span>{" "}
                You may remove your content at any time. We will comply promptly,
                mostly because we&apos;re terrified of legal proceedings and also because it&apos;s
                the right thing to do. Previously completed purchases remain accessible to
                buyers — we can&apos;t un-read someone&apos;s trauma.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 2: THE MONEY (AKA &quot;COMPENSATION FOR DAMAGES&quot;)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">2.1</span>{" "}
                When a reader pays tokens to access your content, the revenue is split as
                follows:
              </p>
              <div className="bg-black border border-[#333] p-4 my-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">YOU (The Creator)</span>
                  <span className="text-[var(--terminal-green)] text-lg font-bold">90%</span>
                </div>
                <div className="w-full h-3 bg-[#222] mb-3">
                  <div className="h-full bg-[var(--terminal-green)]" style={{ width: "90%" }} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#888]">Trauma Box (The Middleman)</span>
                  <span className="text-[var(--accent)] font-bold">10%</span>
                </div>
                <div className="w-full h-3 bg-[#222] mt-1">
                  <div className="h-full bg-[var(--accent)]" style={{ width: "10%" }} />
                </div>
              </div>
              <p>
                <span className="text-[var(--terminal-green)]">2.2</span>{" "}
                The 10% &quot;containment fee&quot; covers: server costs, payment processing,
                platform maintenance, the therapist we should probably hire, and the
                general overhead of running a marketplace for digital suffering.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">2.3</span>{" "}
                <span className="text-white font-bold">Token-to-USD conversion:</span>{" "}
                1 token = $0.01 USD. If a reader pays 100 tokens for your content,
                you earn 90 tokens ($0.90). We keep 10 tokens ($0.10). Simple math.
                Suspiciously simple for a legal document.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">2.4</span>{" "}
                <span className="text-white font-bold">Payout threshold:</span>{" "}
                You may request a payout once your balance reaches{" "}
                <span className="text-[var(--accent)]">2,000 tokens ($20.00)</span>.
                This minimum exists because payment processors charge fees and we
                refuse to lose money paying you $0.37.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">2.5</span>{" "}
                Payouts are processed via Stripe Connect. Allow 3-5 business days
                for the traditional banking system to slowly acknowledge your existence.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 3: YOUR RESPONSIBILITIES (THE BORING BUT IMPORTANT PART)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">3.1</span>{" "}
                You warrant that any content you submit is <span className="text-white">your original work</span>{" "}
                or you have the legal right to distribute it. If you stole someone else&apos;s
                trauma, that&apos;s on you, not us.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">3.2</span>{" "}
                Content must not contain: actual harmful instructions, real people&apos;s
                private information, content that exploits minors, or anything that would
                make even <em>us</em> uncomfortable — and our bar is... flexible.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">3.3</span>{" "}
                You set your own prices between <span className="text-[var(--accent)]">10 and 1,000 tokens</span>{" "}
                ($0.10 — $10.00). If you want to charge 1,000 tokens for a haiku about
                a hamster, that&apos;s your right and we respect it, even if we question it.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">3.4</span>{" "}
                You are responsible for any applicable taxes on your earnings. We will
                provide tax documentation as required by law. We are not your accountant.
                Please get an accountant.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 4: OUR RESPONSIBILITIES (YES, WE HAVE SOME)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">4.1</span>{" "}
                We will maintain the platform in a reasonably functional state.
                &quot;Reasonably functional&quot; is doing a lot of heavy lifting in that sentence.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">4.2</span>{" "}
                We will process your payouts in a timely manner and not &quot;accidentally&quot;
                lose your money in a Cayman Islands shell company.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">4.3</span>{" "}
                We will not modify, alter, or edit your content without your explicit
                permission. Your typos are your own.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">4.4</span>{" "}
                We reserve the right to remove content that violates Section 3.2 or
                applicable law. If we remove your content, we will tell you why.
                You may disagree. We may not care. But we&apos;ll tell you.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 5: TERMINATION (THE BREAKUP CLAUSE)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">5.1</span>{" "}
                Either party may terminate this agreement at any time.
                You can leave whenever you want. This is a marketplace, not a cult.
                (We think.)
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">5.2</span>{" "}
                Upon termination, any pending balance owed to you will be paid out
                within 30 days, regardless of the minimum threshold. We&apos;re petty,
                but not <em>that</em> petty.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">5.3</span>{" "}
                Your content will be removed from the platform within 48 hours of
                your termination request. Existing purchasers retain access — see
                Section 1.4. No takebacks on consumed trauma.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-[var(--accent)] text-lg font-sans mb-2">
              SECTION 6: THE FINE PRINT (THAT ISN&apos;T ACTUALLY THAT FINE)
            </h2>
            <div className="space-y-3">
              <p>
                <span className="text-[var(--terminal-green)]">6.1</span>{" "}
                This agreement supersedes any previous agreements, verbal promises
                made at 3 AM, or blood oaths sworn during content creation marathons.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">6.2</span>{" "}
                If any provision of this agreement is found to be unenforceable,
                the rest of it still stands. Like a building with one bad pillar.
                Architecturally questionable but legally precedented.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">6.3</span>{" "}
                We may update this agreement from time to time. We will notify
                you of material changes. &quot;Material&quot; means changes that affect your
                money or rights, not changes to our emoji usage in error messages.
              </p>
              <p>
                <span className="text-[var(--terminal-green)]">6.4</span>{" "}
                This agreement is governed by the laws of wherever we happen to be
                incorporated at the time, which is honestly something we should figure out.
              </p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="border border-[var(--terminal-green)] bg-[rgba(0,255,65,0.03)] p-4 mt-6">
            <h3 className="text-[var(--terminal-green)] font-sans text-lg mb-2">
              TL;DR (FOR THE HONEST AMONG US)
            </h3>
            <ul className="space-y-2 text-[#ccc]">
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>Your content is <span className="text-white font-bold">yours</span>. Always.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>You get <span className="text-white font-bold">90%</span> of every sale.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>We take <span className="text-[var(--accent)] font-bold">10%</span> for keeping the infrastructure alive.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>We acquire <span className="text-white font-bold">no long-term rights</span> to your work.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>You can leave anytime and take your content with you.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--terminal-green)]">✓</span>
                <span>We&apos;re just the shelf. You&apos;re the book. Readers pay to open you.</span>
              </li>
            </ul>
          </div>

          {/* Signature Block */}
          <div className="border-t border-[#333] pt-6 mt-6">
            <p className="text-[#555] text-xs">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-[#555] text-xs mt-1">
              Version 1.0 — &quot;The One Where We Actually Tried to Be Fair&quot;
            </p>
            <p className="text-[#444] text-xs mt-3 italic">
              By submitting content to Trauma Box, you acknowledge that you have read,
              understood (or at least skimmed), and agree to these terms. Your continued
              use of the platform constitutes acceptance. Your continued existence
              constitutes nothing — that&apos;s a philosophical question we&apos;re not qualified
              to answer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Boot sequence messages
const BOOT_LINES = [
  { text: "TRAUMA_BOX v6.6.6 — INITIALIZING...", delay: 0 },
  { text: "[ OK ] Mounting containment filesystem", delay: 400 },
  { text: "[ OK ] Loading inappropriate content modules", delay: 800 },
  { text: "[WARN] Moral compass driver not found", delay: 1200 },
  { text: "[ OK ] Bypassing good taste filters", delay: 1600 },
  { text: "[WARN] Empathy module disabled by administrator", delay: 2000 },
  { text: "[ OK ] Connecting to existential dread network", delay: 2400 },
  { text: "[ OK ] Calibrating sardonic response matrix", delay: 2800 },
  { text: "[FAIL] Decency check — SKIPPED", delay: 3200 },
  { text: "DECIPHERING ENCRYPTION.............. 100%", delay: 3600 },
  { text: "", delay: 4000 },
  { text: ">> CONTAINMENT BREACH IMMINENT <<", delay: 4200 },
];

export default function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"boot" | "glitch" | "logo" | "ready">("boot");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Boot sequence
  useEffect(() => {
    if (phase !== "boot") return;

    const timers: NodeJS.Timeout[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          // Update progress
          setProgressWidth(Math.min(((i + 1) / BOOT_LINES.length) * 100, 100));
        }, line.delay)
      );
    });

    // Transition to glitch phase
    timers.push(
      setTimeout(() => {
        setPhase("glitch");
      }, 4800)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // Glitch phase — screen shakes then reveals logo
  useEffect(() => {
    if (phase !== "glitch") return;

    const t0 = setTimeout(() => setIsShaking(true), 0);
    const t1 = setTimeout(() => {
      setIsShaking(false);
      setPhase("logo");
    }, 800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
    };
  }, [phase]);

  // Logo phase — fade in logo, then show enter button
  useEffect(() => {
    if (phase !== "logo") return;

    const t = setTimeout(() => {
      setPhase("ready");
      setTimeout(() => setShowEnter(true), 600);
    }, 1200);

    return () => clearTimeout(t);
  }, [phase]);

  const handleEnter = useCallback(() => {
    // Trigger a flash effect then navigate
    setIsShaking(true);
    setTimeout(() => {
      router.push("/feed");
    }, 400);
  }, [router]);

  return (
    <div
      className={`min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden ${
        isShaking ? "animate-screen-shake" : ""
      }`}
    >
      {/* Ambient grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Random floating glitch bars */}
      <GlitchBars visible={phase === "glitch"} />

      {/* Boot Sequence */}
      {(phase === "boot" || phase === "glitch") && (
        <div className="relative z-10 w-full max-w-2xl px-6">
          <div className="font-mono text-xs sm:text-sm space-y-1">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`animate-float-up ${
                  line.text.includes("[WARN]")
                    ? "text-yellow-500"
                    : line.text.includes("[FAIL]")
                    ? "text-red-500"
                    : line.text.includes(">>")
                    ? "text-[var(--accent)] font-bold"
                    : "text-[var(--terminal-green)]"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-1 bg-[#1a1a1a] border border-[#333] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="mt-1 font-mono text-[10px] text-[#555] flex justify-between">
            <span>DECRYPTING CONTAINMENT FEED</span>
            <span>{Math.round(progressWidth)}%</span>
          </div>
        </div>
      )}

      {/* Logo & Enter Button */}
      {(phase === "logo" || phase === "ready") && (
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">
          {/* Logo with glitch effect */}
          <div
            className={`relative transition-all duration-1000 ${
              phase === "logo" ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            style={{
              transitionDelay: "200ms",
              ...(phase === "ready" ? { opacity: 1, transform: "scale(1)" } : {}),
            }}
          >
            {/* Chromatic aberration layers */}
            <div className="relative">
              <Image
                src="/logo.png"
                alt="TRAUMA BOX"
                width={600}
                height={327}
                priority
                className="relative z-10 animate-flicker"
                style={{ filter: "drop-shadow(0 0 30px rgba(255, 102, 0, 0.3))" }}
              />
              {/* Red ghost */}
              <Image
                src="/logo.png"
                alt=""
                width={600}
                height={327}
                className="absolute top-0 left-0 opacity-30 mix-blend-screen"
                style={{
                  transform: "translate(-3px, 1px)",
                  filter: "hue-rotate(-30deg) saturate(3)",
                }}
              />
              {/* Cyan ghost */}
              <Image
                src="/logo.png"
                alt=""
                width={600}
                height={327}
                className="absolute top-0 left-0 opacity-20 mix-blend-screen"
                style={{
                  transform: "translate(3px, -1px)",
                  filter: "hue-rotate(150deg) saturate(2)",
                }}
              />
            </div>
          </div>

          {/* Tagline */}
          <div
            className={`text-center transition-all duration-700 ${
              phase === "ready" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="font-mono text-xs text-[#555] tracking-[0.3em] uppercase">
              Digital Containment Unit — Restricted Access
            </p>
          </div>

          {/* Enter Button */}
          {showEnter && (
            <div className="animate-slide-up">
              <button onClick={handleEnter} className="enter-btn group">
                <span className="relative z-10 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-[var(--accent)] group-hover:bg-black animate-boot-blink" />
                  ENTER CONTAINMENT
                  <span className="inline-block w-2 h-2 bg-[var(--accent)] group-hover:bg-black animate-boot-blink" />
                </span>
              </button>
              <p className="mt-4 font-mono text-[10px] text-[#444] text-center">
                BY PROCEEDING YOU ACCEPT FULL EMOTIONAL LIABILITY
              </p>
            </div>
          )}
        </div>
      )}

      {/* Corner decorations */}
      <CornerDecorations />
    </div>
  );
}

function GlitchBars({ visible }: { visible: boolean }) {
  const [bars] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      top: `${Math.random() * 100}%`,
      height: `${2 + Math.random() * 6}px`,
      animation: `glitch-anim-1 ${0.1 + Math.random() * 0.3}s linear ${i * 0.05}s`,
    }))
  );

  if (!visible) return null;
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="absolute bg-[var(--accent)] opacity-20"
          style={{
            top: bar.top,
            left: 0,
            width: "100%",
            height: bar.height,
            animation: bar.animation,
          }}
        />
      ))}
    </div>
  );
}

function CornerDecorations() {
  return (
    <>
      {/* Top-left */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-[#333]">
        <div>SYS://TRAUMA_BOX</div>
        <div>BUILD: 6.6.6-RC</div>
      </div>
      {/* Top-right */}
      <div className="absolute top-4 right-4 font-mono text-[10px] text-[#333] text-right">
        <div>CLEARANCE: NONE</div>
        <div>STATUS: <span className="text-red-600">COMPROMISED</span></div>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#333]">
        &copy; TRAUMA BOX INDUSTRIES — ALL WRONGS RESERVED
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-[#333]">
        <span className="animate-boot-blink">&#9608;</span>
      </div>
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-[#333]" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-[#333]" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-[#333]" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-[#333]" />
    </>
  );
}

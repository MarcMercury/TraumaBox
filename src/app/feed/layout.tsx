"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TokenProvider } from "@/components/TokenProvider";
import WalletDisplay from "@/components/WalletDisplay";
import TokenShop from "@/components/TokenShop";

const NAV_ITEMS = [
  { href: "/feed", label: "FEED", icon: "◉" },
  { href: "/feed/archives", label: "ARCHIVES", icon: "▤" },
  { href: "/feed/transactions", label: "LEDGER", icon: "◎" },
  { href: "/feed/shop", label: "TRAUMA KIT", icon: "☢" },
  { href: "/studio", label: "STUDIO", icon: "⬆" },
  { href: "/feed/about", label: "DOSSIER", icon: "◈" },
];

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [systemTime, setSystemTime] = useState("");
  const [panicMode, setPanicMode] = useState(false);
  const [uptime, setUptime] = useState(0);
  const [cookieBanner, setCookieBanner] = useState(true);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setSystemTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePanic = useCallback(() => {
    setPanicMode(true);
    setTimeout(() => {
      setPanicMode(false);
    }, 3000);
  }, []);

  if (panicMode) {
    return <PanicScreen onDismiss={() => setPanicMode(false)} />;
  }

  return (
    <TokenProvider>
    <div className="min-h-screen bg-black grid-bg">
      {/* Top Control Panel */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#222]">
        {/* System bar */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-[#1a1a1a] text-[10px] font-mono text-[#444]">
          <div className="flex items-center gap-4">
            <span>SYS://TRAUMA_BOX_TERMINAL</span>
            <span>PID: {Math.floor(Math.random() * 9999)}</span>
            <span>
              UPTIME: {Math.floor(uptime / 60)}m {uptime % 60}s
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>MEM: {(Math.random() * 40 + 60).toFixed(1)}%</span>
            <span>
              THREAT: <span className="text-red-500">ELEVATED</span>
            </span>
            <span>{systemTime}</span>
          </div>
        </div>

        {/* Wallet bar */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-[#1a1a1a]">
          <div className="font-mono text-[10px] text-[#444]">TOKEN SUBSYSTEM v1.0</div>
          <WalletDisplay onShopClick={() => setShopOpen(true)} />
        </div>

        {/* Main nav */}
        <nav className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-[var(--accent)] font-bold text-lg font-sans tracking-wider glitch-text" data-text="TRAUMA BOX">
              TRAUMA BOX
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item flex items-center gap-2 ${
                  pathname === item.href ? "active" : ""
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}

            <button onClick={handlePanic} className="panic-btn ml-4 text-xs">
              ⚠ PANIC
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] mt-16 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#444]">
          <div>&copy; TRAUMA BOX INDUSTRIES — ALL WRONGS RESERVED</div>
          <div className="flex items-center gap-4">
            <span>TERMS OF SUFFERING</span>
            <span>|</span>
            <span>PRIVACY (LOL)</span>
            <span>|</span>
            <Link href="/studio" className="text-[var(--terminal-green)] hover:text-[var(--accent)] transition-colors">CONTRIBUTE TO THE CHAOS</Link>
            <span>|</span>
            <span>
              STATUS: <span className="text-[var(--terminal-green)]">OPERATIONAL</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      {cookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-[#333] px-6 py-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#888]">
              We&apos;re tracking you, but honestly, we&apos;re not that interested in what we&apos;re seeing.{" "}
              <span className="text-[#555]">[COOKIE NOTICE]</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCookieBanner(false)}
                className="font-mono text-xs px-4 py-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all"
              >
                FINE, WHATEVER
              </button>
              <button
                onClick={() => setCookieBanner(false)}
                className="font-mono text-xs px-4 py-2 border border-[#333] text-[#666] hover:border-[#666] transition-all"
              >
                I OBJECT (WE DON&apos;T CARE)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Token Shop Modal */}
      <TokenShop isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
    </TokenProvider>
  );
}

function PanicScreen({ onDismiss }: { onDismiss: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const errorMessages = [
      "CRITICAL ERROR: CONTAINMENT BREACH IN SECTOR 7",
      "WARNING: INAPPROPRIATE CONTENT LEVELS EXCEEDING SAFE THRESHOLDS",
      "ERROR 0x00000DEAD: MORAL_COMPASS_NOT_FOUND",
      "FATAL: Attempted to load 'decency.dll' — FILE CORRUPTED",
      "WARNING: User has been exposed to Trauma Box content",
      "INITIATING EMOTIONAL DAMAGE PROTOCOL...",
      "ERROR: empathy.service has stopped responding",
      "DUMPING CORE VALUES.............. FAILED",
      "ATTEMPTING SYSTEM RECOVERY........",
      "...",
      "RECOVERY FAILED. EVERYTHING IS FINE. PROBABLY.",
      "",
      "[ CLICK ANYWHERE TO RETURN TO YOUR REGULARLY SCHEDULED TRAUMA ]",
    ];

    const timers: NodeJS.Timeout[] = [];
    errorMessages.forEach((msg, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, msg]);
        }, i * 250)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#000088] flex items-center justify-center p-8 cursor-pointer"
      onClick={onDismiss}
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-white text-4xl font-bold mb-8 font-sans">:( SYSTEM FAILURE</h1>
        <div className="font-mono text-sm text-white/90 space-y-1">
          {lines.map((line, i) => (
            <div key={i} className={line === "" ? "h-4" : ""}>
              {line}
            </div>
          ))}
          <span className="animate-boot-blink">_</span>
        </div>
      </div>
    </div>
  );
}

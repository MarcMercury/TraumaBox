"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STUDIO_NAV = [
  { href: "/studio", label: "DASHBOARD", icon: "◎" },
  { href: "/studio/submit", label: "UPLOAD", icon: "⬆" },
  { href: "/studio/revenue", label: "BLOOD MONEY", icon: "💸" },
  { href: "/studio/agreement", label: "THE CONTRACT", icon: "📜" },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [systemTime, setSystemTime] = useState("");
  const [uptime, setUptime] = useState(0);

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

  return (
    <div className="min-h-screen bg-black grid-bg">
      {/* Top Control Panel */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#222]">
        {/* System bar */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-[#1a1a1a] text-[10px] font-mono text-[#444]">
          <div className="flex items-center gap-4">
            <span>SYS://LEAK_PROTOCOL_TERMINAL</span>
            <span>MODE: CREATOR</span>
            <span>
              UPTIME: {Math.floor(uptime / 60)}m {uptime % 60}s
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>
              CLEARANCE: <span className="text-[var(--terminal-green)]">CONTRIBUTOR</span>
            </span>
            <span>{systemTime}</span>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex items-center justify-between px-4 py-2">
          <Link href="/feed" className="flex items-center gap-2 group">
            <span className="text-[var(--accent)] font-bold text-lg font-sans tracking-wider glitch-text" data-text="TRAUMA BOX">
              TRAUMA BOX
            </span>
            <span className="text-[#555] font-mono text-xs">/ STUDIO</span>
          </Link>

          <div className="flex items-center gap-1">
            {STUDIO_NAV.map((item) => (
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

            <Link
              href="/feed"
              className="nav-item flex items-center gap-2 ml-4 text-[#666] hover:text-[var(--accent)]"
            >
              <span>←</span>
              <span className="hidden sm:inline">BACK TO FEED</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] mt-16 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#444]">
          <div>THE LEAK PROTOCOL — TRAUMA BOX OPEN CONTRIBUTOR PLATFORM</div>
          <div className="flex items-center gap-4">
            <span>90% YOURS / 10% OURS</span>
            <span>|</span>
            <span>YOUR RIGHTS / OUR INFRASTRUCTURE</span>
            <span>|</span>
            <span>
              STATUS: <span className="text-[var(--terminal-green)]">ACCEPTING SUBMISSIONS</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

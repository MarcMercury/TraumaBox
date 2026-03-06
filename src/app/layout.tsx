import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRAUMA BOX — Digital Containment Unit",
  description: "Restricted content. Proceed at your own emotional risk. Home of Absolutely Terrible Children's Stories and other questionable artifacts.",
  keywords: ["trauma box", "dark humor", "terrible children's stories", "comedy"],
  openGraph: {
    title: "TRAUMA BOX",
    description: "You weren't supposed to find this.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="scanlines vcr-grain">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-2 focus:left-2 focus:bg-[var(--accent)] focus:text-black focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

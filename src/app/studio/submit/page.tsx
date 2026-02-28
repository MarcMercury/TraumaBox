"use client";

import { useState } from "react";
import Link from "next/link";

const CLASSIFICATIONS = [
  "CATASTROPHIC",
  "NUCLEAR",
  "GASTRONOMIC",
  "INTERACTIVE",
  "PSYCHOLOGICAL",
  "HISTORICAL",
  "EXISTENTIAL",
  "COMMUNITY",
];

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: "",
    series: "",
    description: "",
    sideEffects: "",
    consumptionTime: "",
    classification: "COMMUNITY",
    tokenCost: 50,
    contentBody: "",
    agreedToTerms: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    caseFileId?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agreedToTerms) {
      setResult({
        success: false,
        message: "You must agree to the Creator Agreement. It's mostly harmless. Mostly.",
      });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/studio/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setResult({
          success: true,
          message: data.message,
          caseFileId: data.caseFileId,
        });
        // Reset form
        setForm({
          title: "",
          series: "",
          description: "",
          sideEffects: "",
          consumptionTime: "",
          classification: "COMMUNITY",
          tokenCost: 50,
          contentBody: "",
          agreedToTerms: false,
        });
      } else {
        setResult({ success: false, message: data.error });
      }
    } catch {
      setResult({ success: false, message: "Network error. The internet is broken. Or maybe it's just us." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-[var(--terminal-green)] animate-boot-blink" />
          <h1
            className="text-3xl sm:text-4xl font-sans text-[var(--terminal-green)] tracking-wider glitch-text"
            data-text="CONTRIBUTE TO THE CHAOS"
          >
            CONTRIBUTE TO THE CHAOS
          </h1>
        </div>
        <p className="font-mono text-xs text-[#555] ml-5">
          UPLOAD EVIDENCE — SET YOUR PRICE — RETAIN YOUR RIGHTS
        </p>
      </div>

      {/* Result Banner */}
      {result && (
        <div
          className={`mb-6 p-4 border font-mono text-sm ${
            result.success
              ? "border-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)] text-[var(--terminal-green)]"
              : "border-[var(--danger)] bg-[rgba(255,34,34,0.05)] text-[var(--danger)]"
          }`}
        >
          <div>{result.message}</div>
          {result.caseFileId && (
            <div className="mt-2 text-[#888]">
              Case File ID: <span className="text-white">{result.caseFileId}</span>
            </div>
          )}
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-mono text-xs text-[#888] mb-2">
            CASE FILE TITLE <span className="text-[var(--danger)]">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., The Bermuda Triangle: A Swimming Lesson"
            required
            className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
          />
        </div>

        {/* Series */}
        <div>
          <label className="block font-mono text-xs text-[#888] mb-2">
            SERIES / COLLECTION
          </label>
          <input
            type="text"
            value={form.series}
            onChange={(e) => setForm({ ...form, series: e.target.value })}
            placeholder="e.g., Absolutely Terrible Children's Stories (or leave blank for Community Submissions)"
            className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-mono text-xs text-[#888] mb-2">
            DESCRIPTION <span className="text-[var(--danger)]">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Summarize your content. Be sardonic. It's expected."
            required
            rows={3}
            className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors resize-y"
          />
        </div>

        {/* Content Body (Markdown) */}
        <div>
          <label className="block font-mono text-xs text-[#888] mb-2">
            CONTENT BODY (MARKDOWN)
          </label>
          <p className="font-mono text-[10px] text-[#555] mb-2">
            This is the actual content readers will see after paying. Supports Markdown formatting.
          </p>
          <textarea
            value={form.contentBody}
            onChange={(e) => setForm({ ...form, contentBody: e.target.value })}
            placeholder="# Your Terrible Story Begins Here&#10;&#10;Once upon a time, in a land that would soon regret existing..."
            rows={12}
            className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors resize-y"
          />
        </div>

        {/* Two column: Classification + Token Cost */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Classification */}
          <div>
            <label className="block font-mono text-xs text-[#888] mb-2">
              CLASSIFICATION
            </label>
            <select
              value={form.classification}
              onChange={(e) => setForm({ ...form, classification: e.target.value })}
              className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
            >
              {CLASSIFICATIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Token Price */}
          <div>
            <label className="block font-mono text-xs text-[#888] mb-2">
              TOKEN PRICE <span className="text-[var(--danger)]">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min={10}
                max={1000}
                value={form.tokenCost}
                onChange={(e) =>
                  setForm({ ...form, tokenCost: Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)) })
                }
                className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#555]">
                TKN
              </div>
            </div>
            <div className="mt-1 font-mono text-[10px] text-[#555]">
              ${(form.tokenCost * 0.01).toFixed(2)} USD • You earn{" "}
              <span className="text-[var(--terminal-green)]">
                {Math.floor(form.tokenCost * 0.9)} TKN (${(Math.floor(form.tokenCost * 0.9) * 0.01).toFixed(2)})
              </span>{" "}
              • Platform fee:{" "}
              <span className="text-[var(--accent)]">
                {form.tokenCost - Math.floor(form.tokenCost * 0.9)} TKN
              </span>
            </div>
          </div>
        </div>

        {/* Two column: Side Effects + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-xs text-[#888] mb-2">
              SIDE EFFECTS
            </label>
            <input
              type="text"
              value={form.sideEffects}
              onChange={(e) => setForm({ ...form, sideEffects: e.target.value })}
              placeholder="e.g., Mild existential dread, inappropriate laughter"
              className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-[#888] mb-2">
              CONSUMPTION TIME
            </label>
            <input
              type="text"
              value={form.consumptionTime}
              onChange={(e) => setForm({ ...form, consumptionTime: e.target.value })}
              placeholder="e.g., 5 minutes of escalating discomfort"
              className="w-full bg-black border border-[#333] px-4 py-3 font-mono text-sm text-white placeholder-[#444] focus:border-[var(--terminal-green)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Revenue Preview */}
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <h3 className="font-mono text-xs text-[#888] mb-3">REVENUE PREVIEW</h3>
          <div className="grid grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <div className="text-[#555]">READER PAYS</div>
              <div className="text-white text-lg">{form.tokenCost} TKN</div>
              <div className="text-[#444]">${(form.tokenCost * 0.01).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-[#555]">YOU EARN (90%)</div>
              <div className="text-[var(--terminal-green)] text-lg">
                {Math.floor(form.tokenCost * 0.9)} TKN
              </div>
              <div className="text-[#444]">${(Math.floor(form.tokenCost * 0.9) * 0.01).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-[#555]">CONTAINMENT FEE (10%)</div>
              <div className="text-[var(--accent)] text-lg">
                {form.tokenCost - Math.floor(form.tokenCost * 0.9)} TKN
              </div>
              <div className="text-[#444]">${((form.tokenCost - Math.floor(form.tokenCost * 0.9)) * 0.01).toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Creator Agreement Checkbox */}
        <div className="border border-[#222] bg-[#0d0d0d] p-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.agreedToTerms}
              onChange={(e) => setForm({ ...form, agreedToTerms: e.target.checked })}
              className="mt-1 accent-[var(--terminal-green)]"
            />
            <div className="font-mono text-xs text-[#888] leading-relaxed">
              I acknowledge that <span className="text-white">Trauma Box is just the middleman</span>.
              They take 10% for keeping the lights on and providing containment infrastructure,
              but the <span className="text-[var(--terminal-green)]">rights to this nightmare remain mine</span>.
              I retain 100% ownership of my intellectual property. Trauma Box acquires no long-term
              rights to my content — they solely facilitate the transaction and collect a 10%
              containment fee per sale.{" "}
              <Link href="/studio/agreement" className="text-[var(--accent)] underline">
                Read the full Creator Agreement →
              </Link>
            </div>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-4 font-mono text-sm font-bold tracking-wider transition-all ${
            submitting
              ? "bg-[#333] text-[#666] cursor-wait"
              : "bg-[var(--terminal-green)] text-black hover:bg-white"
          }`}
        >
          {submitting ? "CONTAINING YOUR TRAUMA..." : "📤 SUBMIT TO THE LEAK PROTOCOL"}
        </button>
      </form>
    </div>
  );
}

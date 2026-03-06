"use client";

import { useState, useEffect } from "react";

interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  type: string;
  status: string;
  views: number;
  danger: string;
}

export default function ArchivesPage() {
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.content) {
          setItems(
            data.content.map((c: { caseFileId: string; title: string; createdAt: string; classification: string; status: string; totalUnlocks: number }) => ({
              id: c.caseFileId,
              title: c.title,
              date: c.createdAt.slice(0, 10),
              type: c.classification,
              status: c.status,
              views: c.totalUnlocks,
              danger: c.classification,
            }))
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (col: string) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    const modifier = sortDir === "asc" ? 1 : -1;
    if (sortBy === "date") return modifier * a.date.localeCompare(b.date);
    if (sortBy === "views") return modifier * (a.views - b.views);
    if (sortBy === "title") return modifier * a.title.localeCompare(b.title);
    return 0;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="font-mono text-sm text-[#555] animate-pulse">
          LOADING ARCHIVE DATABASE...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-2 bg-[var(--terminal-green)]" />
        <h1
          className="text-3xl sm:text-4xl font-sans text-[var(--terminal-green)] tracking-wider"
        >
          ARCHIVES
        </h1>
      </div>
      <p className="font-mono text-xs text-[#555] ml-5 mb-8">
        SEARCHABLE RECORD OF ALL CONTAINMENT FILES — HANDLE WITH INDIFFERENCE
      </p>

      {/* Search */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-mono text-xs text-[#555]">QUERY:</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search case files..."
          className="bg-black border border-[#333] px-3 py-1.5 font-mono text-xs text-[#999] focus:border-[var(--terminal-green)] focus:outline-none flex-1 max-w-md"
        />
        <span className="font-mono text-[10px] text-[#444]">
          {filtered.length} RESULTS
        </span>
      </div>

      {/* Spreadsheet-style table */}
      <div className="border border-[#222] overflow-x-auto">
        <table className="w-full font-mono text-xs">
          <thead>
            <tr className="bg-[#111] border-b border-[#333]">
              {[
                { key: "id", label: "CASE ID", sortable: false },
                { key: "title", label: "DESIGNATION", sortable: true },
                { key: "type", label: "TYPE", sortable: false },
                { key: "status", label: "STATUS", sortable: false },
                { key: "date", label: "FILED", sortable: true },
                { key: "views", label: "EXPOSURES", sortable: true },
                { key: "danger", label: "DANGER", sortable: false },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-3 py-2 text-left text-[#666] font-normal whitespace-nowrap ${
                    col.sortable
                      ? "cursor-pointer hover:text-[var(--accent)]"
                      : ""
                  } ${sortBy === col.key ? "text-[var(--accent)]" : ""}`}
                >
                  {col.label}
                  {sortBy === col.key && (
                    <span className="ml-1">
                      {sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#1a1a1a] hover:bg-[#111] transition-colors group cursor-pointer"
              >
                <td className="px-3 py-2 text-[#555]">{item.id}</td>
                <td className="px-3 py-2 text-white group-hover:text-[var(--accent)] transition-colors">
                  {item.status === "REDACTED"
                    ? "██████████████████████"
                    : item.title}
                </td>
                <td className="px-3 py-2 text-[#666]">{item.type}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-1.5 py-0.5 text-[10px] ${
                      item.status === "LEAKED"
                        ? "text-[var(--accent)] border border-[var(--accent)]"
                        : item.status === "OPENED"
                        ? "text-[var(--terminal-green)] border border-[var(--terminal-green)]"
                        : "text-[#555] border border-[#333] line-through"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-[#555]">{item.date}</td>
                <td className="px-3 py-2 text-[#555]">
                  {item.status === "REDACTED" ? "N/A" : item.views.toLocaleString()}
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`text-[10px] ${
                      item.danger === "NUCLEAR" || item.danger === "EXTREME"
                        ? "text-red-500"
                        : item.danger === "HIGH" || item.danger === "BIOHAZARD"
                        ? "text-[var(--accent)]"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.danger}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 font-mono text-[10px] text-[#444] flex justify-between">
        <span>END OF RECORDS</span>
        <span>
          ARCHIVE INTEGRITY: <span className="text-yellow-500">QUESTIONABLE</span>
        </span>
      </div>
    </div>
  );
}

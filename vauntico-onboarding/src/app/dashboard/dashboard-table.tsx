"use client";
import React, { useEffect, useState } from "react";


async function fetchContributors() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = "Contributor Logs";
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) return [];
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.records || []).map((r: any) => ({
    name: r.fields.Name || "",
    email: r.fields.Email || "",
    productTheme: r.fields.ProductTheme || "",
    affirmation: r.fields.Affirmation || "",
    timestamp: r.fields.Timestamp || r.createdTime,
    status: "Onboarded", // You can enhance this with real status logic
  }));
}


export default function DashboardTable() {
  const [contributors, setContributors] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [theme, setTheme] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [statusTab, setStatusTab] = useState<string>("");
  const [affirmationTab, setAffirmationTab] = useState<string>("");

  useEffect(() => {
    (async () => {
  const AIRTABLE_INSIGHTS = process.env.AIRTABLE_INSIGHTS;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "appKBromKvqM9NyuT";
      const AIRTABLE_TABLE = "Contributor Logs";
      try {
        if (!AIRTABLE_INSIGHTS) {
          setContributors([]);
          setFiltered([]);
          setError("Airtable Insights token missing. Set AIRTABLE_INSIGHTS in .env.local.");
          return;
        }
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${AIRTABLE_INSIGHTS}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch contributors");
        const data = await res.json();
        const rows = (data.records || []).map((r: any) => ({
          name: r.fields.Name || "",
          email: r.fields.Email || "",
          productTheme: r.fields.ProductTheme || "",
          affirmation: r.fields.Affirmation || "",
          timestamp: r.fields.Timestamp || r.createdTime,
          status: "Onboarded",
        }));
        setContributors(rows);
      } catch (err) {
        setContributors([]);
        setFiltered([]);
        setError("Unable to load contributors. Please try again later.");
      }
    })();
  }, []);

  useEffect(() => {
    let data = contributors;
    if (theme) data = data.filter(c => c.productTheme.toLowerCase().includes(theme.toLowerCase()));
    if (statusTab) data = data.filter(c => c.status === statusTab);
    if (affirmationTab) data = data.filter(c => c.affirmation && c.affirmation.toLowerCase().includes(affirmationTab.toLowerCase()));
    if (dateFrom) data = data.filter(c => new Date(c.timestamp) >= new Date(dateFrom));
    if (dateTo) data = data.filter(c => new Date(c.timestamp) <= new Date(dateTo));
    if (keyword) data = data.filter(c => c.affirmation.toLowerCase().includes(keyword.toLowerCase()));
    setFiltered(data);
  }, [contributors, theme, statusTab, affirmationTab, dateFrom, dateTo, keyword]);

  const [error, setError] = useState("");

  // Unique product themes and statuses for tabs
  const themeOptions = Array.from(new Set(contributors.map(c => c.productTheme).filter(Boolean)));
  const statusOptions = ["Onboarded", "Pending", "Fulfilled"];
  const affirmationTypes = ["sacred", "premium", "spiritual", "blessing", "uplift"];

  // Export to CSV
  function exportCSV() {
    const header = ["Name","Email","Product Theme","Status","Affirmation","Submitted"];
    const rows = filtered.map(c => [c.name, c.email, c.productTheme, c.status, c.affirmation, new Date(c.timestamp).toLocaleString()]);
    const csv = [header, ...rows].map(r => r.map(x => `"${(x||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contributor-logs-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Copy to clipboard
  async function copyToClipboard() {
    const header = ["Name","Email","Product Theme","Status","Affirmation","Submitted"];
    const rows = filtered.map(c => [c.name, c.email, c.productTheme, c.status, c.affirmation, new Date(c.timestamp).toLocaleString()]);
    const tsv = [header, ...rows].map(r => r.join("\t")).join("\n");
    await navigator.clipboard.writeText(tsv);
    alert("Contributor logs copied to clipboard!");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 items-end justify-between bg-black/60 p-4 rounded-xl border border-neon shadow-lg">
        {/* Filter Tabs */}
        <div className="w-full flex flex-wrap gap-2 mb-2">
          <div className="flex gap-2">
            {statusOptions.map(opt => (
              <button key={opt} onClick={() => setStatusTab(opt === statusTab ? "" : opt)} className={`px-3 py-1 rounded-full border-2 text-xs font-bold transition-colors ${statusTab === opt ? "bg-neon text-black border-neon" : "border-neon text-neon bg-black/60 hover:bg-neon/10"}`}>
                {opt}
              </button>
            ))}
          </div>
          <div className="flex gap-2 ml-4">
            {affirmationTypes.map(opt => (
              <button key={opt} onClick={() => setAffirmationTab(opt === affirmationTab ? "" : opt)} className={`px-3 py-1 rounded-full border-2 text-xs font-bold transition-colors ${affirmationTab === opt ? "bg-neon text-black border-neon" : "border-neon text-neon bg-black/60 hover:bg-neon/10"}`}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Export/Copy Buttons */}
        <div className="w-full flex gap-4 mb-2">
          <button onClick={exportCSV} className="px-4 py-2 rounded-lg bg-neon text-black font-bold shadow hover:bg-white border border-neon transition">Export CSV</button>
          <button onClick={copyToClipboard} className="px-4 py-2 rounded-lg bg-black text-neon border border-neon font-bold shadow hover:bg-neon hover:text-black transition">Copy to Clipboard</button>
        </div>
        <div className="flex flex-col">
          <label className="text-neon text-xs mb-1">Product Theme</label>
          <select value={theme} onChange={e => setTheme(e.target.value)} className="bg-gray-900 border border-neon rounded px-3 py-2 text-white focus:ring-2 focus:ring-neon">
            <option value="">All</option>
            {themeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-neon text-xs mb-1">Date From</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-gray-900 border border-neon rounded px-3 py-2 text-white focus:ring-2 focus:ring-neon" />
        </div>
        <div className="flex flex-col">
          <label className="text-neon text-xs mb-1">Date To</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-gray-900 border border-neon rounded px-3 py-2 text-white focus:ring-2 focus:ring-neon" />
        </div>
        <div className="flex flex-col flex-1 min-w-[180px]">
          <label className="text-neon text-xs mb-1">Affirmation Keyword</label>
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search affirmations..." className="bg-gray-900 border border-neon rounded px-3 py-2 text-white focus:ring-2 focus:ring-neon" />
        </div>
      </div>
      <div className="overflow-x-auto">
        {error ? (
          <div className="text-center text-neon mt-8 text-lg animate-fade-in">
            <span className="inline-block px-6 py-4 bg-black/80 border border-neon rounded-xl shadow-lg">{error}</span>
          </div>
        ) : (
          <>
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-neon text-lg">
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Product Theme</th>
                  <th>Status</th>
                  <th>Affirmation</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  // Get initials from name
                  const initials = c.name
                    ? c.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
                    : "?";
                  return (
                    <tr key={i} className="bg-gray-900/80 dark:bg-black/80 border-b border-neon hover:bg-neon/10 transition">
                      <td className="py-2 px-2">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black border-2 border-neon text-neon text-lg font-bold shadow-lg drop-shadow-neon">
                          {initials}
                        </span>
                      </td>
                      <td className="py-2 px-4 font-semibold text-white">{c.name}</td>
                      <td className="py-2 px-4 text-white/80">{c.email}</td>
                      <td className="py-2 px-4 text-neon font-bold">{c.productTheme}</td>
                      <td className="py-2 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2
                          ${c.status === "Onboarded" ? "border-neon text-neon bg-black/60" : ""}
                          ${c.status === "Pending" ? "border-yellow-400 text-yellow-300 bg-yellow-900/60" : ""}
                          ${c.status === "Fulfilled" ? "border-green-400 text-green-300 bg-green-900/60" : ""}
                        `}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 italic text-neon drop-shadow-neon max-w-xs truncate" title={c.affirmation}>{c.affirmation}</td>
                      <td className="py-2 px-4 text-white/60">{new Date(c.timestamp).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center text-neon mt-8 text-lg">No contributors found for the selected filters.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

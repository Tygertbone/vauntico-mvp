import React, { useEffect, useState } from "react";
import Link from "next/link";

// Types
export type Contributor = {
  id: string;
  name?: string;
  alias?: string;
  productTheme?: string;
  affirmation?: string;
  legacyScore?: number;
  onboardingDate?: string;
};

const themeStyles = {
  Visionary: "bg-gradient-to-br from-gray-900 to-gray-800 text-neon border-neon/30",
  Grounded: "bg-gradient-to-br from-amber-900 to-amber-700 text-amber-200 border-amber-400/30",
  Connector: "bg-gradient-to-br from-sky-900 to-sky-700 text-sky-200 border-sky-400/30",
};

function getBadge(score: number) {
  if (score > 70) return { label: "Beacon", emoji: "🦋" };
  if (score >= 30) return { label: "Builder", emoji: "🌱" };
  return { label: "Initiate", emoji: "🌑" };
}

const fetchContributors = async () => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_TABLE || process.env.AIRTABLE_CONTRIBUTOR_TABLE || "Contributors";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    return [];
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.records.map((r: any) => ({
    id: r.id,
    name: r.fields.Name,
    alias: r.fields.Alias,
    productTheme: r.fields.ProductTheme,
    affirmation: r.fields.Affirmation,
    legacyScore: r.fields.LegacyScore,
    onboardingDate: r.fields.OnboardingDate,
  }));
};

export default function HallOfLightPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [filter, setFilter] = useState<{ badge?: string; theme?: string; date?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchContributors();
      setContributors(data);
      setLoading(false);
    })();
  }, []);

  // Filtering
  let filtered = contributors;
  if (filter.badge) {
    filtered = filtered.filter((c) => getBadge(c.legacyScore || 0).label === filter.badge);
  }
  if (filter.theme) {
    filtered = filtered.filter((c) => c.productTheme === filter.theme);
  }
  if (filter.date) {
    filtered = filtered.filter((c) => c.onboardingDate && c.onboardingDate.startsWith(filter.date));
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide glow-text">Hall of Light</h1>
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select className="rounded px-3 py-2 bg-gray-800 text-neon" onChange={e => setFilter(f => ({ ...f, badge: e.target.value || undefined }))}>
          <option value="">All Badges</option>
          <option value="Initiate">Initiate</option>
          <option value="Builder">Builder</option>
          <option value="Beacon">Beacon</option>
        </select>
        <select className="rounded px-3 py-2 bg-gray-800 text-neon" onChange={e => setFilter(f => ({ ...f, theme: e.target.value || undefined }))}>
          <option value="">All Themes</option>
          <option value="Visionary">Visionary</option>
          <option value="Grounded">Grounded</option>
          <option value="Connector">Connector</option>
        </select>
        <input type="month" className="rounded px-3 py-2 bg-gray-800 text-neon" onChange={e => setFilter(f => ({ ...f, date: e.target.value || undefined }))} />
      </div>
      {loading ? (
        <div className="text-neon animate-pulse text-center">Loading contributors...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400 text-center">No contributors found for this filter.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c) => {
            const badge = getBadge(c.legacyScore || 0);
            const theme = themeStyles[c.productTheme as keyof typeof themeStyles] || themeStyles.Visionary;
            return (
              <div key={c.id} className={`rounded-xl p-6 shadow-lg border-2 ${theme} animate-fade-in`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{c.name || c.alias || "Anonymous"}</span>
                  <span className="text-lg">{badge.emoji}</span>
                  <span className="text-xs px-2 py-1 rounded bg-black/30 border border-neon ml-2">{badge.label}</span>
                </div>
                <div className="mb-1 text-sm opacity-80">Theme: {c.productTheme || "-"}</div>
                <div className="mb-1 text-sm italic text-neon-light">{c.affirmation || "-"}</div>
                <div className="mb-1 text-sm">Legacy Score: <span className="font-bold">{c.legacyScore ?? "-"}</span></div>
                <div className="mb-1 text-xs text-gray-400">Onboarded: {c.onboardingDate || "-"}</div>
                <Link href={`/vault?id=${c.id}`} className="mt-3 inline-block px-4 py-2 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition text-xs">View My Vault</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";

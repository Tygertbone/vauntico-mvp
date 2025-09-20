import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const fetchContributors = async (adminSecret: string) => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_TABLE || process.env.AIRTABLE_CONTRIBUTOR_TABLE || "Contributors";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    return [];
  }
  // Admin secret check (client-side for demo; move to API route for production)
  if (!adminSecret || adminSecret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
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
    status: r.fields.Status,
    productTheme: r.fields.ProductTheme,
    legacyScore: r.fields.LegacyScore,
    badge: r.fields.Badge,
    affirmation: r.fields.Affirmation,
    logs: r.fields.Logs,
  }));
};

export default function AdminRitualsPage() {
  const searchParams = useSearchParams();
  const [adminSecret, setAdminSecret] = useState<string>("");
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionStatus, setActionStatus] = useState<string>("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");
    const data = await fetchContributors(adminSecret);
    if (data.length === 0) setError("Invalid admin secret or no data.");
    setContributors(data);
    setLoading(false);
  };

  // Admin actions (mocked for demo)
  const blessContributor = (id: string) => setActionStatus(`Blessed contributor ${id}!`);
  const resyncAirtable = () => setActionStatus("Airtable resynced!");
  const unlockVault = (id: string) => setActionStatus(`Vault unlocked for ${id}!");

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-neon text-center">Admin Ritual Console</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="password"
          className="rounded px-4 py-2 bg-gray-800 text-neon border border-neon"
          placeholder="Enter Admin Secret"
          value={adminSecret}
          onChange={e => setAdminSecret(e.target.value)}
        />
        <button className="px-6 py-2 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition" onClick={handleAuth} disabled={loading}>
          {loading ? "Authenticating..." : "Authenticate"}
        </button>
      </div>
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}
      {contributors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-neon">Contributors</h2>
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="text-neon border-b border-neon/30">
                <th>Name</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Legacy Score</th>
                <th>Badge</th>
                <th>Affirmation</th>
                <th>Logs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contributors.map(c => (
                <tr key={c.id} className="border-b border-gray-700/30">
                  <td>{c.name}</td>
                  <td>{c.status}</td>
                  <td>{c.productTheme}</td>
                  <td>{c.legacyScore}</td>
                  <td>{c.badge}</td>
                  <td className="max-w-xs truncate">{c.affirmation}</td>
                  <td className="max-w-xs truncate">{c.logs}</td>
                  <td className="flex flex-col gap-1">
                    <button className="px-2 py-1 rounded bg-neon text-xs text-gray-900 font-bold mb-1" onClick={() => blessContributor(c.id)}>Bless</button>
                    <button className="px-2 py-1 rounded bg-amber-400 text-xs text-gray-900 font-bold mb-1" onClick={resyncAirtable}>Resync</button>
                    <button className="px-2 py-1 rounded bg-sky-400 text-xs text-gray-900 font-bold" onClick={() => unlockVault(c.id)}>Unlock Vault</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {actionStatus && <div className="mt-4 text-center text-neon-light">{actionStatus}</div>}
    </div>
  );
}

export const dynamic = "force-dynamic";

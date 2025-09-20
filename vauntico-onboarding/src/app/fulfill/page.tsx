import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const fetchLegacy = async (idOrEmail: string) => {
  const url = "/api/legacy-impact";
  const res = await fetch(url + `?idOrEmail=${encodeURIComponent(idOrEmail)}`);
  if (!res.ok) throw new Error("Failed to fetch legacy data");
  return res.json();
};

const fetchFulfillmentHistory = async (idOrEmail: string) => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_FULFILLMENT_TABLE || process.env.AIRTABLE_FULFILLMENT_TABLE || "Fulfillment";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Fulfillment] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    return [];
  }
  const filter = idOrEmail.includes("@")
    ? `Email='${idOrEmail}'`
    : `OR(RECORD_ID()='${idOrEmail}',ContributorId='${idOrEmail}')`;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE)}?filterByFormula=${encodeURIComponent(filter)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.records.map((r: any) => r.fields);
};

const claimReward = async (idOrEmail: string, reward: string) => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_FULFILLMENT_TABLE || process.env.AIRTABLE_FULFILLMENT_TABLE || "Fulfillment";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Fulfillment] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    throw new Error("Airtable token missing");
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: { Contributor: idOrEmail, Reward: reward, Status: "Pending", Timestamp: new Date().toISOString() } }),
  });
  if (!res.ok) throw new Error("Failed to claim reward");
  return res.json();
};

function getBadge(score: number) {
  if (score > 70) return { label: "Beacon", emoji: "🦋" };
  if (score >= 30) return { label: "Builder", emoji: "🌱" };
  return { label: "Initiate", emoji: "🌑" };
}

const rewardsByBadge = {
  Initiate: ["Welcome Ritual", "Affirmation Scroll"],
  Builder: ["Legacy Pin", "Spirit Workshop"],
  Beacon: ["Hall of Light Feature", "Premium Blessing"]
};

export default function FulfillPage() {
  const searchParams = useSearchParams();
  const idOrEmail = searchParams.get("id") || searchParams.get("email") || "";
  const [legacy, setLegacy] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!idOrEmail) {
      setError("Missing contributor ID or email.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const legacyData = await fetchLegacy(idOrEmail);
        setLegacy(legacyData);
        const hist = await fetchFulfillmentHistory(idOrEmail);
        setHistory(hist);
      } catch (e: any) {
        setError(e.message || "Failed to load fulfillment.");
      } finally {
        setLoading(false);
      }
    })();
  }, [idOrEmail]);

  const badge = getBadge(legacy?.legacyScore || 0);
  const rewards = rewardsByBadge[badge.label as keyof typeof rewardsByBadge] || [];

  const handleClaim = async () => {
    try {
      setStatus("Claiming...");
      await claimReward(idOrEmail, selected);
      setStatus("Reward claimed! Await fulfillment.");
      setSelected("");
      const hist = await fetchFulfillmentHistory(idOrEmail);
      setHistory(hist);
    } catch (e: any) {
      setStatus(e.message || "Failed to claim reward.");
    }
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh] text-neon animate-pulse">Loading your fulfillment engine...</div>;
  if (error) return <div className="text-red-400 text-center mt-8">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-neon text-center">Contributor Fulfillment Engine</h1>
      <div className="mb-4 text-center">Badge: <span className="font-bold">{badge.label} {badge.emoji}</span> | Legacy Score: <span className="font-bold">{legacy?.legacyScore ?? "-"}</span></div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Available Rewards:</div>
        <div className="flex flex-wrap gap-2">
          {rewards.map(r => (
            <button key={r} className={`px-4 py-2 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition ${selected === r ? "ring-2 ring-neon" : ""}`} onClick={() => setSelected(r)}>{r}</button>
          ))}
        </div>
      </div>
      <button
        className="w-full py-3 mt-2 rounded-lg bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition"
        onClick={handleClaim}
        disabled={!selected || status === "Claiming..."}
      >
        {status === "Claiming..." ? "Claiming..." : "Claim My Reward"}
      </button>
      {status && <div className="mt-4 text-center text-neon-light">{status}</div>}
      <div className="mt-8">
        <div className="font-semibold mb-2">Fulfillment History:</div>
        {history.length === 0 ? (
          <div className="text-gray-400">No fulfillment records yet.</div>
        ) : (
          <ul className="text-xs text-gray-300">
            {history.map((h, i) => (
              <li key={i} className="mb-1">{h.Timestamp}: {h.Reward} - {h.Status}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

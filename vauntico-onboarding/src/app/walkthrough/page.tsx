import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


// Fetch contributor data directly from Airtable API
const fetchContributorData = async (idOrEmail: string) => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_TABLE || process.env.AIRTABLE_CONTRIBUTOR_TABLE || "Contributors";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    throw new Error("Airtable token missing");
  }
  // Search by email or ID
  const filter = idOrEmail.includes("@")
    ? `Email='${idOrEmail}'`
    : `OR(RECORD_ID()='${idOrEmail}',ContributorId='${idOrEmail}')`;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?filterByFormula=${encodeURIComponent(filter)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch contributor data");
  const data = await res.json();
  if (!data.records || !data.records.length) throw new Error("Contributor not found");
  const fields = data.records[0].fields;
  return {
    id: data.records[0].id,
    ...fields,
  };
};

const fetchAffirmation = async (contributorId: string, productTheme: string, traits: string[]) => {
  const url = "/api/affirmation";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contributorId, productTheme, traits }),
  });
  if (!res.ok) throw new Error("Failed to fetch affirmation");
  return res.json();
};

const fetchLegacy = async (idOrEmail: string) => {
  const url = "/api/legacy-impact";
  const res = await fetch(url + `?idOrEmail=${encodeURIComponent(idOrEmail)}`);
  if (!res.ok) throw new Error("Failed to fetch legacy data");
  return res.json();
};

// Badge tiers and theme
function getBadge(score: number) {
  if (score > 70) return { label: "Beacon", emoji: "🦋", color: "sky" };
  if (score >= 30) return { label: "Builder", emoji: "🌱", color: "earth" };
  return { label: "Initiate", emoji: "🌑", color: "neon" };
}

const themeStyles = {
  Visionary: {
    bg: "bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 text-neon",
    step: "border-neon",
  },
  Grounded: {
    bg: "bg-gradient-to-br from-amber-900 to-amber-700 border-amber-400/30 text-amber-200",
    step: "border-amber-400",
  },
  Connector: {
    bg: "bg-gradient-to-br from-sky-900 to-sky-700 border-sky-400/30 text-sky-200",
    step: "border-sky-400",
  },
};

export default function WalkthroughPage() {
  const searchParams = useSearchParams();
  // Support both query and route param (e.g. /walkthrough/[idOrEmail])
  let idOrEmail = searchParams.get("id") || searchParams.get("email") || "";
  if (typeof window !== "undefined" && !idOrEmail) {
    // Try to extract from URL path if present
    const match = window.location.pathname.match(/walkthrough\/(.+)$/);
    if (match) idOrEmail = decodeURIComponent(match[1]);
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [contributor, setContributor] = useState<any>(null);
  const [affirmation, setAffirmation] = useState("");
  const [legacy, setLegacy] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);
  const [exported, setExported] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrEmail) {
      setError("Missing contributor ID or email.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const contributorData = await fetchContributorData(idOrEmail);
        setContributor(contributorData);
        const traits = contributorData.traits ? contributorData.traits.split(",") : [];
        let affirmationText = contributorData.affirmation || "";
        if (!affirmationText) {
          try {
            const affirmationData = await fetchAffirmation(contributorData.id, contributorData.productTheme, traits);
            affirmationText = affirmationData.affirmation;
          } catch {}
        }
        setAffirmation(affirmationText);
        const legacyData = await fetchLegacy(idOrEmail);
        setLegacy(legacyData);
      } catch (e: any) {
        setError(e.message || "Failed to load walkthrough.");
      } finally {
        setLoading(false);
      }
    })();
  }, [idOrEmail]);


  const handleShare = () => {
    const badge = getBadge(legacy?.legacyScore || 0);
    const summary = `Vauntico Contributor Walkthrough\n\nStatus: ${contributor?.status || "-"}\nProduct Theme: ${contributor?.productTheme || "-"}\nAffirmation: ${affirmation}\nLegacy Badge: ${badge.label} ${badge.emoji}\n`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = (type: "json" | "text") => {
    const badge = getBadge(legacy?.legacyScore || 0);
    if (type === "json") {
      setExported(JSON.stringify({
        status: contributor?.status,
        productTheme: contributor?.productTheme,
        affirmation,
        legacyBadge: badge.label,
        legacyScore: legacy?.legacyScore,
      }, null, 2));
    } else {
      setExported(`Vauntico Contributor Walkthrough\n\nStatus: ${contributor?.status || "-"}\nProduct Theme: ${contributor?.productTheme || "-"}\nAffirmation: ${affirmation}\nLegacy Badge: ${badge.label} ${badge.emoji}\n`);
    }
    setTimeout(() => setExported(null), 8000);
  };


  if (loading) return <div className="flex flex-col items-center justify-center min-h-[60vh] text-neon animate-pulse">Loading your spiritual journey...</div>;
  if (error) return <div className="text-red-400 text-center mt-8">{error}</div>;

  // Step logic
  const steps = [
    {
      label: "Onboarding Status",
      value: contributor?.status || "-",
      theme: contributor?.productTheme || "Visionary",
    },
    {
      label: "Product Theme",
      value: contributor?.productTheme || "-",
      theme: contributor?.productTheme || "Visionary",
    },
    {
      label: "Affirmation",
      value: affirmation,
      theme: contributor?.productTheme || "Visionary",
    },
    {
      label: "Legacy Badge",
      value: (() => { const badge = getBadge(legacy?.legacyScore || 0); return `${badge.label} ${badge.emoji}`; })(),
      theme: (() => {
        const badge = getBadge(legacy?.legacyScore || 0);
        if (badge.label === "Beacon") return "Connector";
        if (badge.label === "Builder") return "Grounded";
        return "Visionary";
      })(),
    },
  ];

  const currentStep = steps[step];
  const theme = themeStyles[currentStep.theme as keyof typeof themeStyles] || themeStyles.Visionary;

  return (
    <div className={`max-w-xl mx-auto mt-12 p-8 rounded-xl shadow-lg border transition-all duration-700 ${theme.bg}`}>
      <h1 className="text-3xl font-bold mb-4 text-center">Your Vauntico Walkthrough</h1>
      <div className="flex flex-col items-center mb-6">
        <div className={`w-full p-6 mb-4 rounded-lg border-2 transition-all duration-700 text-center text-xl font-semibold ${theme.step} animate-fade-in`}>
          <span className="block text-lg mb-2 uppercase tracking-widest opacity-80">{currentStep.label}</span>
          <span className="block text-2xl font-bold">{currentStep.value}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {step > 0 && (
            <button className="px-4 py-2 rounded bg-gray-700/60 text-white hover:bg-gray-600 transition" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          {step < steps.length - 1 && (
            <button className="px-4 py-2 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition" onClick={() => setStep(step + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
      {step === steps.length - 1 && (
        <>
          <button
            className="w-full py-3 mt-4 rounded-lg bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition"
            onClick={handleShare}
          >
            {copied ? "Copied!" : "Share My Journey"}
          </button>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 rounded bg-gray-800 text-xs text-white border border-gray-700 hover:bg-gray-700" onClick={() => handleExport("text")}>Export as Text</button>
            <button className="flex-1 py-2 rounded bg-gray-800 text-xs text-white border border-gray-700 hover:bg-gray-700" onClick={() => handleExport("json")}>Export as JSON</button>
          </div>
          <div className="mt-4 text-center text-xs text-gray-400">This ritual honors your unique path. Share your light with the world.</div>
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-300 mb-2">Social Share Preview:</div>
            <div className="bg-gray-900/80 rounded p-4 text-left text-xs text-gray-200 border border-gray-700">
              I just completed my Vauntico onboarding. Here’s my affirmation:<br />
              <span className="italic text-neon-light">{affirmation}</span>
            </div>
          </div>
          {exported && (
            <div className="mt-6 bg-gray-900/90 rounded p-4 text-xs text-gray-200 border border-gray-700 whitespace-pre-wrap">
              <div className="mb-2 font-bold">Exported Walkthrough:</div>
              {exported}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic"; // SSR for up-to-date data

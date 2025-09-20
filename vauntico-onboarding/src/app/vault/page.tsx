import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useContributorStatus } from "../../hooks/useContributorStatus";

// Theme styles
const themeStyles = {
  Visionary: {
    bg: "bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 text-neon",
    border: "border-neon",
  },
  Grounded: {
    bg: "bg-gradient-to-br from-amber-900 to-amber-700 border-amber-400/30 text-amber-200",
    border: "border-amber-400",
  },
  Connector: {
    bg: "bg-gradient-to-br from-sky-900 to-sky-700 border-sky-400/30 text-sky-200",
    border: "border-sky-400",
  },
};

type Badge = { label: string; emoji: string; color: string };
type Contributor = {
  id: string;
  status?: string;
  productTheme?: string;
  traits?: string;
  affirmation?: string;
};
type Legacy = {
  legacyScore?: number;
};

function getBadge(score: number): Badge {
  if (score > 70) return { label: "Beacon", emoji: "🦋", color: "sky" };
  if (score >= 30) return { label: "Builder", emoji: "🌱", color: "earth" };
  return { label: "Initiate", emoji: "🌑", color: "neon" };
}

const fetchContributorData = async (idOrEmail: string): Promise<Contributor> => {
  const AIRTABLE_CONTRIBUTOR_API = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_API || process.env.AIRTABLE_CONTRIBUTOR_API;
  const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE = process.env.NEXT_PUBLIC_AIRTABLE_CONTRIBUTOR_TABLE || process.env.AIRTABLE_CONTRIBUTOR_TABLE || "Contributors";
  if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID.");
    throw new Error("Airtable token missing");
  }
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

const fetchAffirmation = async (contributorId: string, productTheme: string, traits: string[]): Promise<{ affirmation: string }> => {
  const url = "/api/affirmation";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contributorId, productTheme, traits }),
  });
  if (!res.ok) throw new Error("Failed to fetch affirmation");
  return res.json();
};

const fetchLegacy = async (idOrEmail: string): Promise<Legacy> => {
  const url = "/api/legacy-impact";
  const res = await fetch(url + `?idOrEmail=${encodeURIComponent(idOrEmail)}`);
  if (!res.ok) throw new Error("Failed to fetch legacy data");
  return res.json();
};

export default function VaultPage() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email || undefined;
  const { status } = useContributorStatus(contributorEmail);
  const paid = status?.onboardingStatus === "Paid" || status?.onboardingStatus === "Active";

  if (!paid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white p-8">
        <main className="w-full max-w-2xl text-center space-y-8">
          <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">Unlock the Vault</h1>
          <p className="text-lg text-indigo-200 mb-4">Unlock the Vault to access premium prompts, rituals, and legacy tools.</p>
          <a href="/pricing" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition">Unlock Vault</a>
          <div className="mt-6 text-indigo-400 italic">Your legacy awaits. Become a Vauntico Creator to access the Vault.</div>
        </main>
        <footer className="mt-16 text-indigo-300 text-sm space-x-4">
          <a href="/terms" className="hover:underline">Terms & Rituals</a>
          <a href="/contributor-code" className="hover:underline">Contributor Code</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </footer>
      </div>
    );
  }

  // ...existing code for paid contributors (copy from previous return)
  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 text-neon animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-6 text-center tracking-wide glow-text">Welcome to the Vault</h1>
      <div className="mb-8 flex flex-col gap-4 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
          <div className="flex-1">
            <div className="text-lg font-semibold mb-1">Onboarding Status</div>
            <div className="text-2xl font-bold">{status?.onboardingStatus || "-"}</div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold mb-1">Product Theme</div>
            <div className="text-2xl font-bold">{status?.productTheme || "-"}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
          <div className="flex-1">
            <div className="text-lg font-semibold mb-1">Affirmation</div>
            <div className="italic text-neon-light text-xl">{status?.affirmation || "-"}</div>
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold mb-1">Legacy Badge</div>
            <div className="text-2xl font-bold flex items-center gap-2">Vault Unlocked <span>🦋</span></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="py-3 px-8 rounded-xl bg-neon text-gray-900 font-bold shadow-lg hover:bg-neon-light transition text-lg animate-fade-in">Access the Vault</div>
        <div className="mt-6 text-neon-light text-base animate-fade-in">Your Vault is unlocked. Your legacy begins now.</div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic"; // SSR for up-to-date data

import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_AGENT_CORE = process.env.AIRTABLE_AGENT_CORE;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Affirmation Logs";

function generateAffirmation({ traits = [], productTheme = "" }) {
  const templates = [
    `Your journey in ${productTheme} is a sacred act of creation.`,
    `You are a vessel for premium ${productTheme} experiences.`,
    `The spirit of ${productTheme} flows through your intention.`,
    `You are aligned with the higher purpose of ${productTheme}.`,
    `Your light elevates the Vauntico mission in ${productTheme}.`,
    `Welcome, ${productTheme} visionary—your presence is a blessing!`,
    `May your work in ${productTheme} inspire and uplift all beings.`,
    `You are now part of a spiritual movement in ${productTheme}.`,
  ];
  if (traits && traits.length) {
    templates.push(`Your ${traits.join(", ")} are gifts to the world of ${productTheme}.`);
    templates.push(`With your ${traits.join(" and ")}, you manifest greatness in ${productTheme}.`);
  }
  return templates[Math.floor(Math.random() * templates.length)];
}

export async function POST(req: NextRequest) {
  try {
    if (!AIRTABLE_AGENT_CORE || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Affirmation] Missing AIRTABLE_AGENT_CORE or AIRTABLE_BASE_ID.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { contributorId, traits, productTheme } = await req.json();
    if (!contributorId && !productTheme) return NextResponse.json({ error: "Missing contributorId or productTheme" }, { status: 400 });
    const affirmation = generateAffirmation({ traits, productTheme });
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
    const fields = {
      ContributorId: contributorId || "",
      Traits: traits ? traits.join(", ") : "",
      ProductTheme: productTheme || "",
      Affirmation: affirmation,
      Timestamp: new Date().toISOString(),
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_AGENT_CORE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable create failed" }, { status: 500 });
    return NextResponse.json({ affirmation });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

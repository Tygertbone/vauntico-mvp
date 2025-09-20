import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_AGENT_CORE = process.env.AIRTABLE_AGENT_CORE;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Contributor Logs";

async function logToAirtable({ name, email, productTheme, affirmation }: { name: string; email: string; productTheme: string; affirmation: string }) {
  if (!AIRTABLE_AGENT_CORE || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable] Missing AIRTABLE_AGENT_CORE or AIRTABLE_BASE_ID environment variable. Submission not logged.");
    return;
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  const body = {
    fields: {
      Name: name,
      Email: email,
      ProductTheme: productTheme,
      Affirmation: affirmation,
      Timestamp: new Date().toISOString(),
    },
  };
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_AGENT_CORE}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, productTheme } = await req.json();
    if (!name || !email || !productTheme) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    // Generate affirmation
    const base = [
      `Your journey in ${productTheme} is a sacred act of creation.`,
      `You are a vessel for premium ${productTheme} experiences.`,
      `The spirit of ${productTheme} flows through your intention.`,
      `You are aligned with the higher purpose of ${productTheme}.`,
      `Your light elevates the Vauntico mission in ${productTheme}.`,
      `Welcome, ${productTheme} visionary—your presence is a blessing!`,
      `May your work in ${productTheme} inspire and uplift all beings.`,
      `You are now part of a spiritual movement in ${productTheme}.`,
    ];
    const affirmation = base[Math.floor(Math.random() * base.length)];
    // Log to Airtable
    await logToAirtable({ name, email, productTheme, affirmation });
    // TODO: Trigger onboarding flow and send welcome email here
    return NextResponse.json({ ok: true, affirmation });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

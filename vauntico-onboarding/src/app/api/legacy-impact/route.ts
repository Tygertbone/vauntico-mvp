import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_INSIGHTS = process.env.AIRTABLE_INSIGHTS;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Contributor Logs";

function calculateLegacyScore({ onboardingTimestamp, milestones = [], affirmationCount = 0, productTheme = "" }) {
  // Example: score = fast onboarding + more milestones + more affirmations + theme match
  let score = 0;
  if (onboardingTimestamp) {
    const days = (Date.now() - new Date(onboardingTimestamp).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 100 - days); // Faster onboarding = higher score
  }
  score += milestones.length * 20;
  score += affirmationCount * 10;
  if (productTheme && productTheme.toLowerCase().includes("legacy")) score += 30;
  return Math.round(score);
}

export async function POST(req: NextRequest) {
  try {
    if (!AIRTABLE_INSIGHTS || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Legacy] Missing AIRTABLE_INSIGHTS or AIRTABLE_BASE_ID.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { email, id } = await req.json();
    if (!email && !id) return NextResponse.json({ error: "Missing contributor ID or email" }, { status: 400 });
    let filter = [];
    if (email) filter.push(`{Email}='${email}'`);
    if (id) filter.push(`RECORD_ID()='${id}'`);
    let filterFormula = filter.length ? (filter.length > 1 ? `AND(${filter.join(",")})` : filter[0]) : "";
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${filterFormula ? `filterByFormula=${encodeURIComponent(filterFormula)}&` : ""}maxRecords=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_INSIGHTS}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
    const data = await res.json();
    if (!data.records || !data.records.length) return NextResponse.json({ error: "Contributor not found" }, { status: 404 });
    const record = data.records[0].fields;
    // Example: milestones, timestamps, affirmationCount
    const milestones = record.Milestones || [];
    const onboardingTimestamp = record.Timestamp || data.records[0].createdTime;
    const affirmationCount = record.AffirmationCount || 0;
    const productTheme = record.ProductTheme || "";
    const legacyScore = calculateLegacyScore({ onboardingTimestamp, milestones, affirmationCount, productTheme });
    return NextResponse.json({
      milestones,
      onboardingTimestamp,
      affirmationCount,
      productTheme,
      legacyScore,
      timeline: record.Timeline || [],
      impactEvents: record.ImpactEvents || [],
    });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

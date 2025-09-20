// POST: accept email or id in body, return contributor info with extra fields, filtering, and rate limiting stub
let lastRequestTime: number | null = null;
export async function POST(req: NextRequest) {
  try {
    // Simple rate limiting: 1 request per 2 seconds per instance (for demo)
    const now = Date.now();
    if (lastRequestTime && now - lastRequestTime < 2000) {
      return NextResponse.json({ error: "Rate limit exceeded. Please wait and try again." }, { status: 429 });
    }
    lastRequestTime = now;
    if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID environment variable. Query not performed.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { email, id, affirmationKeyword, dateFrom, dateTo } = await req.json();
    if (!email && !id) {
      return NextResponse.json({ error: "Missing email or contributor ID" }, { status: 400 });
    }
    let filter = [];
    if (email) filter.push(`{Email}='${email}'`);
    if (id) filter.push(`RECORD_ID()='${id}'`);
    if (affirmationKeyword) filter.push(`FIND('${affirmationKeyword}', {Affirmation})`);
    if (dateFrom) filter.push(`IS_AFTER({Timestamp}, '${dateFrom}')`);
    if (dateTo) filter.push(`IS_BEFORE({Timestamp}, '${dateTo}')`);
    let filterFormula = filter.length ? (filter.length > 1 ? `AND(${filter.join(",")})` : filter[0]) : "";
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${filterFormula ? `filterByFormula=${encodeURIComponent(filterFormula)}&` : ""}maxRecords=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
    const data = await res.json();
    if (!data.records || !data.records.length) {
      return NextResponse.json({ error: "Contributor not found" }, { status: 404 });
    }
    const record = data.records[0].fields;
    // Compute avatar initials
    let avatarInitials = "";
    if (record.Name) {
      avatarInitials = record.Name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
    }
    return NextResponse.json({
      onboardingStatus: record.Status || "Unknown",
      productTheme: record.ProductTheme || "",
      affirmation: record.Affirmation || "",
      timestamp: record.Timestamp || data.records[0].createdTime || "",
      avatarInitials,
      legacyScore: record.LegacyScore || null,
      submissionMethod: record.SubmissionMethod || null,
    });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_CONTRIBUTOR_API = process.env.AIRTABLE_CONTRIBUTOR_API;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Contributor Logs";

export async function GET(req: NextRequest) {
  try {
    if (!AIRTABLE_CONTRIBUTOR_API || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Contributor] Missing AIRTABLE_CONTRIBUTOR_API or AIRTABLE_BASE_ID environment variable. Query not performed.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    if (!email && !id) {
      return NextResponse.json({ error: "Missing email or contributor ID" }, { status: 400 });
    }
    let filter = "";
    if (email) {
      filter = `AND({Email}='${email}')`;
    } else if (id) {
      filter = `AND(RECORD_ID()='${id}')`;
    }
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?filterByFormula=${encodeURIComponent(filter)}&maxRecords=1`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_CONTRIBUTOR_API}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
    const data = await res.json();
    if (!data.records || !data.records.length) {
      return NextResponse.json({ error: "Contributor not found" }, { status: 404 });
    }
    const record = data.records[0].fields;
    return NextResponse.json({
      onboardingStatus: record.Status || "Unknown",
      productTheme: record.ProductTheme || "",
      affirmation: record.Affirmation || "",
    });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

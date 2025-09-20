import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_AGENT_CORE = process.env.NEXT_PUBLIC_AIRTABLE_AGENT_CORE || process.env.AIRTABLE_AGENT_CORE;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID;
const TABLE = process.env.NEXT_PUBLIC_AIRTABLE_BILLING_TABLE || process.env.AIRTABLE_BILLING_TABLE || "Billing";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!AIRTABLE_AGENT_CORE || !AIRTABLE_BASE_ID || !email) {
    return NextResponse.json({ error: "Missing required params or env vars" }, { status: 400 });
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE)}?filterByFormula=${encodeURIComponent(`OR(Email='${email}')`)}&maxRecords=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_AGENT_CORE}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
  const data = await res.json();
  if (!data.records || !data.records.length) {
    return NextResponse.json({ error: "Billing record not found" }, { status: 404 });
  }
  const record = data.records[0].fields;
  return NextResponse.json({
    SubscriptionType: record.SubscriptionType || null,
    RenewalDate: record.RenewalDate || null,
    Status: record.Status || null,
    Tier: record.Tier || null,
    History: record.History || [],
  });
}

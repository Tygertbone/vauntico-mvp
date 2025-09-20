import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_DEV_SANDBOX = process.env.AIRTABLE_DEV_SANDBOX;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Sandbox Logs";

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.get("simulate")) {
      // Simulated test result for frontend preview
      return NextResponse.json({
        records: [
          { id: "sim1", fields: { testId: "TST-001", status: "success", notes: "Simulated test passed.", Timestamp: new Date().toISOString() } },
          { id: "sim2", fields: { testId: "TST-002", status: "failed", notes: "Simulated test failed.", Timestamp: new Date().toISOString() } },
        ],
        simulated: true,
      });
    }
    if (!AIRTABLE_DEV_SANDBOX || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Sandbox] Missing AIRTABLE_DEV_SANDBOX or AIRTABLE_BASE_ID environment variable. Query not performed.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const testId = searchParams.get("testId");
    const status = searchParams.get("status");
    const createdAfter = searchParams.get("createdAfter");
    let filter = [];
    if (testId) filter.push(`{TestId}='${testId}'`);
    if (status) filter.push(`{Status}='${status}'`);
    if (createdAfter) filter.push(`IS_AFTER({Timestamp}, '${createdAfter}')`);
    let filterFormula = filter.length ? (filter.length > 1 ? `AND(${filter.join(",")})` : filter[0]) : "";
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${filterFormula ? `filterByFormula=${encodeURIComponent(filterFormula)}&` : ""}maxRecords=10&sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_DEV_SANDBOX}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
    const data = await res.json();
    return NextResponse.json({ records: data.records || [] });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!AIRTABLE_DEV_SANDBOX || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Sandbox] Missing AIRTABLE_DEV_SANDBOX or AIRTABLE_BASE_ID environment variable. Submission not logged.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const fields = await req.json();
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_DEV_SANDBOX}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable create failed" }, { status: 500 });
    const data = await res.json();
    return NextResponse.json({ ok: true, record: data });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!AIRTABLE_DEV_SANDBOX || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Sandbox] Missing AIRTABLE_DEV_SANDBOX or AIRTABLE_BASE_ID environment variable. Deletion not performed.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_DEV_SANDBOX}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable delete failed" }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
// GET: fetch test records from Airtable with optional filters
export async function GET(req: NextRequest) {
  try {
    if (!AIRTABLE_DEV_SANDBOX || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Sandbox] Missing AIRTABLE_DEV_SANDBOX or AIRTABLE_BASE_ID environment variable. Query not performed.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { searchParams } = new URL(req.url);
    const testId = searchParams.get("testId");
    const status = searchParams.get("status");
    const createdAfter = searchParams.get("createdAfter");
    let filter = [];
    if (testId) filter.push(`{TestId}='${testId}'`);
    if (status) filter.push(`{Status}='${status}'`);
    if (createdAfter) filter.push(`IS_AFTER({Timestamp}, '${createdAfter}')`);
    let filterFormula = filter.length ? (filter.length > 1 ? `AND(${filter.join(",")})` : filter[0]) : "";
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}?${filterFormula ? `filterByFormula=${encodeURIComponent(filterFormula)}&` : ""}maxRecords=10&sort%5B0%5D%5Bfield%5D=Timestamp&sort%5B0%5D%5Bdirection%5D=desc`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_DEV_SANDBOX}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return NextResponse.json({ error: "Airtable query failed" }, { status: 500 });
    const data = await res.json();
    return NextResponse.json({ records: data.records || [] });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_DEV_SANDBOX = process.env.AIRTABLE_DEV_SANDBOX;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = "Sandbox Logs";

async function logToAirtableSandbox(fields: Record<string, any>) {
  if (!AIRTABLE_DEV_SANDBOX || !AIRTABLE_BASE_ID) {
    console.warn("[Airtable Sandbox] Missing AIRTABLE_DEV_SANDBOX or AIRTABLE_BASE_ID environment variable. Submission not logged.");
    return;
  }
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_DEV_SANDBOX}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const fields = await req.json();
    await logToAirtableSandbox(fields);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

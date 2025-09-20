import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_AGENT_CORE = process.env.AIRTABLE_AGENT_CORE;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_BILLING_TABLE = process.env.AIRTABLE_BILLING_TABLE || "Billing";

export async function POST(req: NextRequest) {
  try {
    if (!AIRTABLE_AGENT_CORE || !AIRTABLE_BASE_ID) {
      console.warn("[Airtable Payment] Missing AIRTABLE_AGENT_CORE or AIRTABLE_BASE_ID.");
      return NextResponse.json({ error: "Airtable token missing" }, { status: 500 });
    }
    const { contributorId, email, tier, amount, status = "active", paymentRef, subscriptionType = "monthly" } = await req.json();
    if (!contributorId && !email) {
      console.warn("[Airtable Payment] Missing contributor ID or email.");
      return NextResponse.json({ error: "Missing contributor ID or email" }, { status: 400 });
    }
    const now = new Date();
    let renewalDate = now.toISOString();
    if (subscriptionType === "annual") {
      const nextYear = new Date(now);
      nextYear.setFullYear(now.getFullYear() + 1);
      renewalDate = nextYear.toISOString();
    } else {
      // Default: add 1 month
      const nextMonth = new Date(now);
      nextMonth.setMonth(now.getMonth() + 1);
      renewalDate = nextMonth.toISOString();
    }
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_BILLING_TABLE)}`;
    const fields = {
      ContributorId: contributorId || "",
      Email: email || "",
      Tier: tier,
      Amount: amount,
      Status: status,
      PaymentRef: paymentRef || "",
      SubscriptionType: subscriptionType,
      RenewalDate: renewalDate,
      Timestamp: now.toISOString(),
    };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_AGENT_CORE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    if (!res.ok) {
      console.warn("[Airtable Payment] Failed to sync payment.");
      return NextResponse.json({ error: "Airtable sync failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

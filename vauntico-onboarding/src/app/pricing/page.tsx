
import React, { useState } from "react";
import Link from "next/link";
import { usePaystackScript } from "./usePaystackScript";

const tiers = [
  {
    name: "Free Ritual",
    price: "$0/mo",
    features: [
      "Basic Vault Access",
      "Community Affirmations",
      "Initiate Badge",
      "Limited Fulfillment Tools",
    ],
    cta: "Unlock My Vault",
    ctaLink: "/vault",
    highlight: false,
  },
  {
    name: "Legacy Tier",
    price: "$9–$29/mo",
    features: [
      "Full Vault Access",
      "Badge Upgrades",
      "Advanced Fulfillment Tools",
      "Priority Support",
      "Legacy Score Tracking",
    ],
    cta: "Unlock My Vault",
    ctaLink: "/vault",
    highlight: true,
  },
  {
    name: "Creator Commander",
    price: "$99+/mo",
    features: [
      "All Legacy Tier Features",
      "Admin Ritual Console",
      "Custom Blessings",
      "Premium Badge",
      "Direct Admin Access",
    ],
    cta: "Become a Commander",
    ctaLink: "/billing",
    highlight: false,
  },
];



export default function PricingPage() {
  usePaystackScript();
  const [contributor, setContributor] = useState("");
  const [status, setStatus] = useState("");
  const [subscriptionType, setSubscriptionType] = useState<"monthly" | "annual">("monthly");
  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY;

  // Pricing in NGN (demo: 900/mo, 9999/yr for Legacy; 9900/mo, 99999/yr for Commander)
  const getAmount = (tier: any) => {
    if (tier.name === "Legacy Tier") return subscriptionType === "annual" ? 9999 : 900;
    if (tier.name === "Creator Commander") return subscriptionType === "annual" ? 99999 : 9900;
    return 0;
  };

  const handlePaystack = (tier: any) => {
    if (!PAYSTACK_PUBLIC_KEY) {
      setStatus("Paystack public key missing.");
      return;
    }
    if (!contributor) {
      setStatus("Please enter your contributor ID or email.");
      return;
    }
    const amount = getAmount(tier);
    // @ts-ignore
    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: contributor.includes("@") ? contributor : `${contributor}@vauntico.com`,
      amount: amount * 100, // kobo
      currency: "NGN",
      ref: `VAU-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Contributor", variable_name: "contributor", value: contributor },
          { display_name: "Tier", variable_name: "tier", value: tier.name },
          { display_name: "Subscription Type", variable_name: "subscriptionType", value: subscriptionType },
        ],
      },
      callback: async (response: any) => {
        setStatus("Payment successful! Syncing...");
        try {
          await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contributorId: contributor,
              email: contributor.includes("@") ? contributor : undefined,
              tier: tier.name,
              amount,
              paymentRef: response.reference,
              status: "success",
              subscriptionType,
            }),
          });
          setStatus("Payment complete! Vault unlocked and badge upgraded.");
        } catch {
          setStatus("Payment succeeded but failed to sync with Airtable.");
        }
      },
      onClose: () => setStatus("Payment cancelled."),
    });
    if (handler) handler.openIframe();
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide glow-text">Choose Your Ritual</h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          className="rounded px-4 py-2 bg-gray-800 text-neon border border-neon"
          placeholder="Enter Contributor ID or Email"
          value={contributor}
          onChange={e => setContributor(e.target.value)}
        />
        <div className="flex gap-2 items-center ml-4">
          <button
            className={`px-4 py-2 rounded-l bg-${subscriptionType === "monthly" ? "neon" : "gray-800"} text-${subscriptionType === "monthly" ? "gray-900" : "neon"} font-bold border border-neon`}
            onClick={() => setSubscriptionType("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-r bg-${subscriptionType === "annual" ? "neon" : "gray-800"} text-${subscriptionType === "annual" ? "gray-900" : "neon"} font-bold border border-neon`}
            onClick={() => setSubscriptionType("annual")}
          >
            Annual
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => {
          let price = tier.price;
          if (tier.name !== "Free Ritual") {
            price = subscriptionType === "annual"
              ? (tier.name === "Legacy Tier" ? "R999/year" : "R9,999/year")
              : (tier.name === "Legacy Tier" ? "R99/month" : "R999/month");
          }
          return (
            <div
              key={tier.name}
              className={`rounded-xl p-8 shadow-lg border-2 ${tier.highlight ? "border-neon bg-black/70" : "border-gray-700 bg-black/40"} flex flex-col items-center animate-fade-in`}
            >
              <div className="text-2xl font-bold mb-2 text-neon">{tier.name}</div>
              <div className="text-3xl font-extrabold mb-4">{price}</div>
              <ul className="mb-6 text-left w-full">
                {tier.features.map(f => (
                  <li key={f} className="mb-2 flex items-center gap-2">
                    <span className="text-neon">•</span> <span>{f}</span>
                  </li>
                ))}
              </ul>
              {tier.name === "Free Ritual" ? (
                <Link href="/vault" className="mt-auto px-6 py-3 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition text-lg w-full text-center">
                  {tier.cta}
                </Link>
              ) : (
                <button
                  className="mt-auto px-6 py-3 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition text-lg w-full text-center"
                  onClick={() => handlePaystack(tier)}
                >
                  {tier.cta}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-10 text-center text-xs text-gray-400">All plans are spiritually aligned. Cancel anytime. Blessings included.</div>
      {status && <div className="mt-6 text-center text-neon-light">{status}</div>}
    </div>
  );
}

export const dynamic = "force-dynamic";

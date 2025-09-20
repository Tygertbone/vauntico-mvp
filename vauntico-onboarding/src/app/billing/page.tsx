
import { useSession } from "next-auth/react";
import { useContributorStatus } from "../../hooks/useContributorStatus";

export default function BillingPage() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email || undefined;
  const { status, loading, error } = useContributorStatus(contributorEmail);
  const subscriptionType = status?.subscriptionType;
  const renewalDate = status?.renewalDate ? new Date(status.renewalDate).toLocaleDateString() : "-";
  const paymentStatus = status?.onboardingStatus || "-";
  // Placeholder for payment history and Airtable sync
  const paymentHistory = [];
  const handleUpgrade = () => alert("Upgrade to annual coming soon");
  const handleBless = () => alert("Blessing requested! An admin will review your upgrade.");

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-2xl border-4 bg-gradient-to-br from-gray-900 to-gray-800 border-neon/30 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-neon text-center">Billing Dashboard</h1>
      {loading && <div className="text-neon animate-pulse text-center">Loading billing info...</div>}
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}
      {status && (
        <div className="mb-8">
          <div className="mb-2">Subscription Type: <span className="font-bold capitalize">{subscriptionType || "-"}</span></div>
          <div className="mb-2">Renewal Date: <span className="font-bold">{renewalDate}</span></div>
          <div className="mb-2">Payment Status: <span className="font-bold">{paymentStatus}</span></div>
          <div className="mb-2">Payment History:</div>
          <ul className="text-xs text-gray-300">
            {paymentHistory.length > 0 ? (
              paymentHistory.map((h: any, i: number) => (
                <li key={i}>{h}</li>
              ))
            ) : (
              <li>No payment history found.</li>
            )}
          </ul>
          <div className="flex gap-2 mt-4">
            {subscriptionType === "monthly" && (
              <button className="flex-1 py-2 rounded bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition" onClick={handleUpgrade}>Upgrade to Annual</button>
            )}
            <button className="flex-1 py-2 rounded bg-gray-800 text-xs text-white border border-gray-700 hover:bg-gray-700" onClick={() => alert("Downgrade flow coming soon")}>Downgrade</button>
            <button className="flex-1 py-2 rounded bg-gray-800 text-xs text-white border border-gray-700 hover:bg-gray-700" onClick={() => alert("Cancel flow coming soon")}>Cancel</button>
          </div>
        </div>
      )}
      <button className="w-full py-3 mt-4 rounded-lg bg-neon text-gray-900 font-bold shadow hover:bg-neon-light transition" onClick={handleBless}>
        Bless Me
      </button>
      <div className="mt-4 text-center text-neon-light">Airtable sync: <span className="font-bold">{status ? "✓" : "-"}</span></div>
    </div>
  );
}

export const dynamic = "force-dynamic";

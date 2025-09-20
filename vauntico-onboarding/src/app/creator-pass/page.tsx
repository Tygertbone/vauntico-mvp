import { useSession } from "next-auth/react";
import { useContributorStatus } from "../../hooks/useContributorStatus";

const tiers = [
  { name: "Monthly", price: "$12/mo", description: "Full access, billed monthly.", type: "monthly" },
  { name: "Annual", price: "$99/yr", description: "Best value, billed yearly.", type: "annual" },
];

export default function CreatorPass() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email || undefined;
  const { status } = useContributorStatus(contributorEmail);
  const paid = status?.onboardingStatus === "Paid" || status?.onboardingStatus === "Active";
  const subscriptionType = status?.subscriptionType;

  // Placeholder for Paystack modal trigger
  const handlePay = (type: string) => {
    alert(`Trigger Paystack modal for ${type} subscription`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="rounded-xl border border-indigo-500 bg-black/60 p-6 shadow-lg">
          <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">Unlock Your Creator Pass</h1>
          <p className="text-lg text-indigo-200 mb-4">Choose your tier. Unlock your Vault. Begin your ritual.</p>
          {!paid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {tiers.map((tier) => (
                <div key={tier.type} className="rounded-lg border border-indigo-700 bg-black/40 p-4 flex flex-col items-center">
                  <div className="text-2xl font-bold text-neon mb-2">{tier.name}</div>
                  <div className="text-xl mb-2">{tier.price}</div>
                  <div className="text-indigo-200 mb-4">{tier.description}</div>
                  <button className="px-6 py-2 bg-neon text-gray-900 font-bold rounded shadow hover:bg-neon-light transition" onClick={() => handlePay(tier.type)}>
                    Choose {tier.name}
                  </button>
                </div>
              ))}
            </div>
          )}
          {paid && (
            <div className="flex flex-col items-center gap-2 animate-glow mt-6">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-700 text-neon font-bold shadow-lg border-2 border-neon animate-pulse-glow">Vault Unlocked</span>
              <div className="text-neon-light text-base mt-2 animate-fade-in">Your Vault is unlocked. Your legacy begins now.</div>
              <div className="flex gap-4 mt-4">
                <a href="/vault" className="px-6 py-2 bg-neon text-gray-900 font-bold rounded shadow hover:bg-neon-light transition">Access Vault</a>
                <a href="/workshop" className="px-6 py-2 bg-indigo-600 text-white font-bold rounded shadow hover:bg-indigo-500 transition">Access Workshop</a>
              </div>
              {subscriptionType === "monthly" && (
                <a href="/billing" className="block mt-4 text-indigo-300 underline hover:text-neon">Upgrade to Annual</a>
              )}
            </div>
          )}
        </div>
      </div>
      <footer className="mt-16 text-indigo-300 text-sm space-x-4">
        <a href="/terms" className="hover:underline">Terms & Rituals</a>
        <a href="/contributor-code" className="hover:underline">Contributor Code</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </footer>
    </div>
  );
}

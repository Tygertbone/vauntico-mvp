import { useSession } from "next-auth/react";
import { useContributorStatus } from "../hooks/useContributorStatus";
import clsx from "clsx";

export default function Home() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email;
  const { status, loading, error } = useContributorStatus(contributorEmail);
  const paid = status?.onboardingStatus === "Paid" || status?.onboardingStatus === "Active";
  const renewalDate = status?.renewalDate ? new Date(status.renewalDate).toLocaleDateString() : null;
  const subscriptionType = status?.subscriptionType;
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold text-indigo-400 mb-2">Welcome, Contributor</h1>
        <p className="text-lg text-indigo-200 mb-4">Choose your tier. Unlock your Vault. Begin your ritual.</p>
        {paid ? (
          <>
            <div className="flex flex-col items-center gap-2 animate-glow">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-700 text-neon font-bold shadow-lg border-2 border-neon animate-pulse-glow">Vault Unlocked</span>
              {renewalDate && (
                <div className="text-indigo-200 text-sm">Renewal: <span className="font-bold">{renewalDate}</span> ({subscriptionType})</div>
              )}
              <div className="text-neon-light text-base mt-2 animate-fade-in">Your Vault is unlocked. Your legacy begins now.</div>
            </div>
            <a href="/vault" className="inline-block px-6 py-3 bg-neon hover:bg-indigo-500 text-gray-900 font-bold rounded-lg shadow transition mt-4">Access Your Vault</a>
          </>
        ) : (
          <a href="/pricing" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition">Get Creator Pass</a>
        )}
        {/* Optionally show Upgrade to Annual CTA if on monthly */}
        {paid && subscriptionType === "monthly" && (
          <a href="/billing" className="block mt-4 text-indigo-300 underline hover:text-neon">Upgrade to Annual</a>
        )}
        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
      </main>
      <footer className="mt-16 text-indigo-300 text-sm space-x-4">
        <a href="/terms" className="hover:underline">Terms & Rituals</a>
        <a href="/contributor-code" className="hover:underline">Contributor Code</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </footer>
    </div>
  );
}

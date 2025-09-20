import { useSession } from "next-auth/react";
import { useContributorStatus } from "../../hooks/useContributorStatus";

export default function Workshop() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email || undefined;
  const { status } = useContributorStatus(contributorEmail);
  const paid = status?.onboardingStatus === "Paid" || status?.onboardingStatus === "Active";
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">Join Workshop</h1>
        {paid ? (
          <>
            <div className="flex flex-col items-center gap-2 animate-glow">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-700 text-neon font-bold shadow-lg border-2 border-neon animate-pulse-glow">Workshop Unlocked</span>
              <div className="text-neon-light text-base mt-2 animate-fade-in">You’ve entered the Workshop. Your mastery begins now.</div>
            </div>
            <a href="/vault" className="inline-block px-6 py-3 bg-neon hover:bg-indigo-500 text-gray-900 font-bold rounded-lg shadow transition mt-4">Access Vault</a>
            <div className="mt-6 text-indigo-200">Full module access granted. Explore rituals, prompts, and legacy tools.</div>
          </>
        ) : (
          <>
            <p className="text-lg text-indigo-200 mb-4">Contribute, unlock your Vault, and begin your ritual. Your journey starts here.</p>
            <a href="/pricing" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition">Unlock Workshop</a>
            <div className="mt-6 text-indigo-400 italic">Unlock the Workshop to access all rituals and mastery modules.</div>
          </>
        )}
      </main>
      <footer className="mt-16 text-indigo-300 text-sm space-x-4">
        <a href="/terms" className="hover:underline">Terms & Rituals</a>
        <a href="/contributor-code" className="hover:underline">Contributor Code</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </footer>
    </div>
  );
}

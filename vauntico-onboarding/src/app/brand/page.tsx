import { useSession } from "next-auth/react";
import { useContributorStatus } from "../../hooks/useContributorStatus";

const testimonials = [
  {
    quote: "Vauntico awakened my creative spirit and gave my rituals new meaning.",
    name: "Ava L.",
  },
  {
    quote: "The Vault is more than prompts—it's a legacy.",
    name: "Jules R.",
  },
];

export default function Brand() {
  const { data: session } = useSession();
  const contributorEmail = session?.user?.email || undefined;
  const { status } = useContributorStatus(contributorEmail);
  const affirmation = status?.affirmation || "You are a Vauntico Creator";
  const testimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-indigo-950 text-white flex flex-col items-center justify-center p-8">
      <main className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-2">Explore Our Brand</h1>
        <div className="mb-4 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-700 text-neon font-bold shadow-lg border-2 border-neon animate-pulse-glow">{affirmation}</span>
        </div>
        <div className="mb-4 italic text-indigo-200 animate-fade-in-slow">“{testimonial.quote}”<br/><span className="text-xs text-indigo-400">— {testimonial.name}</span></div>
        <section className="bg-black/40 rounded-xl p-6 border border-indigo-800 shadow-lg space-y-2">
          <h2 className="text-xl font-bold text-neon mb-2">Brand Values in Action</h2>
          <ul className="text-indigo-200 text-left list-disc list-inside space-y-1">
            <li>✨ Rituals that honor your creative journey</li>
            <li>🔮 Vault access for legacy-building prompts</li>
            <li>🌱 Community of mindful contributors</li>
            <li>💎 Premium, spiritual experience</li>
          </ul>
        </section>
        <a href="/pricing" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow transition mt-4">View Tiers & Pricing</a>
      </main>
      <footer className="mt-16 text-indigo-300 text-sm space-x-4">
        <a href="/terms" className="hover:underline">Terms & Rituals</a>
        <a href="/contributor-code" className="hover:underline">Contributor Code</a>
        <a href="/contact" className="hover:underline">Contact</a>
      </footer>
    </div>
  );
}

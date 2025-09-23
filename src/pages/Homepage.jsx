import { Link } from 'react-router-dom';
import VaultCard from '../components/VaultCard';

export default function Homepage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-vauntico-gold">Awaken. Build. Transcend.</h1>
        <p className="mt-4 text-lg text-gray-300">Vauntico is where ideas become income.</p>
        <Link to="/creator-pass">
          <button className="mt-6 bg-vauntico-gold text-black px-6 py-3 rounded hover:bg-yellow-400 transition">
            Get Your Creator Pass
          </button>
        </Link>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <Link to="/vaults">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">Prompt Vaults</h3>
            <p className="text-gray-400">Store, share, and sell your best AI prompts. Organize them into branded collections.</p>
          </div>
        </Link>
        <Link to="/pricing">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">Creator Monetization</h3>
            <p className="text-gray-400">Turn your digital assets into income. Sell access, bundles, or subscriptions.</p>
          </div>
        </Link>
        <Link to="/creator-pass">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">Brand Vaults</h3>
            <p className="text-gray-400">Every creator gets a premium brand identity—logos, colors, and copy that convert.</p>
          </div>
        </Link>
        <Link to="/onboarding">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">Sprint Playbooks</h3>
            <p className="text-gray-400">Launch faster with guided sprints, execution clocks, and contributor onboarding.</p>
          </div>
        </Link>
        <Link to="/demo">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">System UX</h3>
            <p className="text-gray-400">Every page is designed to feel alive—clean, centered, and emotionally intelligent.</p>
          </div>
        </Link>
        <Link to="/delegation">
          <div className="bg-gray-900 p-6 rounded-lg hover:scale-105 transition-transform">
            <h3 className="text-xl font-bold text-white mb-2">AI Collaboration</h3>
            <p className="text-gray-400">Work with AI agents like teammates. Delegate tasks, orchestrate workflows, and scale.</p>
          </div>
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <VaultCard
          title="Creator’s Toolkit"
          price="$49"
          description="Prompts and templates for influencers, creators, and personal brands."
          buttonText="Unlock Vault"
        />
        <VaultCard
          title="Agency Arsenal"
          price="$99"
          description="Client-ready workflows, pitch decks, and automation templates."
          buttonText="Unlock Vault"
        />
        <VaultCard
          title="E-commerce Empire"
          price="$149"
          description="Product descriptions, ad copy, and branding kits for online stores."
          buttonText="Unlock Vault"
        />
      </section>
    </div>
  );
}
import VaultCard from '../components/VaultCard';
import PricingTable from '../components/PricingTable';
import CTAButton from '../components/CTAButton';

export default function PricingPage() {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-vauntico-gold">Vauntico Pricing</h1>
        <p className="mt-4 text-lg text-gray-300">Choose your path. Build your legacy.</p>
      </header>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-vauntico-gold mb-4">Creator Pass Membership</h2>
        <PricingTable />
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-vauntico-gold mb-4">Vault Bundles</h2>
        <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-vauntico-gold mb-4">Done-for-You Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <VaultCard
            title="Brand in a Box"
            price="$499"
            description="Logo, site, vault setup, and branding kit."
            buttonText="Request Build"
          />
          <VaultCard
            title="Workflow Setup"
            price="$999"
            description="Automation stack, AI delegation templates, and onboarding flow."
            buttonText="Request Build"
          />
          <VaultCard
            title="Vault Customization"
            price="$299"
            description="Tailored prompt library and branded vault delivery."
            buttonText="Request Build"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-vauntico-gold mb-4">Agency Licensing</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            Resell Vauntico’s tools under your own brand. Includes vault access, admin dashboard, and reseller rights.
          </p>
          <p className="text-xl font-bold text-vauntico-gold mb-4">$199/month per agency</p>
          <CTAButton text="Apply for License" />
        </div>
      </section>
    </div>
  );
}
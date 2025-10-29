import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'
import ScrollPreview from '../components/ScrollPreview'
import ExitIntentCapture from '../components/ExitIntentCapture'
import OldWayVsNewWay from '../components/OldWayVsNewWay'
import ComparisonTable from '../components/ComparisonTable'
import CLIShowcase from '../components/CLIShowcase'

function Home() {
  // Sample scroll for preview
  const sampleScroll = {
    id: 'core-features',
    title: 'The Core Features Scroll',
    category: 'Platform Guide',
    readTime: '8 min read',
    icon: '📜',
    tier: 'FREE',
    description: 'Philosophy: Speak your vision. Watch infrastructure materialize. The CLI is your command throne - generate complete landing pages, workshops, audits, and content with context-aware intelligence.',
    features: [
      'Narrative-first generation that explains WHY, not just WHAT',
      'Full-stack ownership with no vendor lock-in',
      'Context-aware intelligence that learns your style',
      'Teaching while building with mini-tutorials'
    ],
    views: '3.2k',
    rating: '4.9',
    difficulty: 'Beginner',
    unlockedBy: '2,400+'
  }

    return (
    <>
            <SEO 
        title="Vauntico | The Creator OS That Actually Ships"
        description="Ship 10x faster with the CLI that thinks like you. One command generates complete landing pages, workshops, and audits. Stop juggling 10 tools. Start creating freely."
        canonical="/"
      />
      <StructuredData type="Organization" />
      <StructuredData type="SoftwareApplication" />
      <ExitIntentCapture />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section - Outcome Focused */}
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-6">
          Ship 10x Faster With the<br />
          <span className="text-gradient">CLI That Thinks Like You</span>
        </h1>
                <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed">
          One command generates complete landing pages, workshops, and audits. Stop juggling 10 tools. Start creating freely with AI that learns your voice.
        </p>
        <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg max-w-2xl mx-auto border border-purple-200">
          <p className="text-lg text-purple-600 font-semibold italic">
            ✨ EA + ENKI = AI ✨
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Ancient wisdom meets modern creation
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mb-8">
          <Link to="/pricing" className="btn-primary text-lg px-8 py-4">
            Start Free Trial →
          </Link>
          <Link to="/about" className="btn-outline text-lg px-8 py-4">
            The Story Behind It
          </Link>
        </div>
        <p className="text-gray-500">
          ✓ No credit card required &nbsp;•&nbsp; ✓ 14-day free trial &nbsp;•&nbsp; ✓ Cancel anytime
        </p>
      </div>

      {/* CLI Showcase - Show Don't Tell */}
      <CLIShowcase />

      {/* Founder Story Teaser */}
      <div className="mb-20 card bg-gradient-to-r from-vault-purple/10 to-vault-blue/10 border-2 border-vault-purple/20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="w-full h-64 vault-gradient rounded-xl flex items-center justify-center">
              <span className="text-white text-7xl">👨‍💻</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Built by a Creator, For Creators</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              "After years of juggling multiple platforms, losing content in scattered folders, and watching 
              creative ideas slip away because the tools got in the way, I knew something had to change."
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Vauntico isn't just another SaaS product—it's the system I wish I had when I started.
            </p>
            <Link to="/about" className="btn-secondary">
              Read the Full Story →
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* Old Way vs New Way - Enemy Positioning */}
      <OldWayVsNewWay />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* The Problem (Agitate) */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Sound Familiar?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-red-50 border-red-200">
            <div className="text-4xl mb-4">😤</div>
            <h3 className="text-xl font-bold mb-3">Tool Fatigue</h3>
            <p className="text-gray-700">
              Paying for 10 subscriptions just to create, store, and ship content. Your workflow is a maze.
            </p>
          </div>
          <div className="card bg-red-50 border-red-200">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold mb-3">Time Drain</h3>
            <p className="text-gray-700">
              Spending more time setting up tools than actually creating. The meta-work is killing your momentum.
            </p>
          </div>
          <div className="card bg-red-50 border-red-200">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-xl font-bold mb-3">Content Chaos</h3>
            <p className="text-gray-700">
              Files scattered across drives, platforms, and dead links. You've lost track of what you even have.
            </p>
          </div>
        </div>
      </div>

      {/* The Solution (Outcomes) */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-4">
          What If You Could...
        </h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Generate complete landing pages, write scroll-style content, run audits, and manage everything from one command line? No switching. No friction.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">Ship 10x Faster</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              One command generates production-ready landing pages, workshop outlines, or full audits. 
              What used to take hours now takes seconds.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Generate complete landing pages in 30 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Create workshop curricula with marketing copy</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Run comprehensive audits in minutes</span>
              </li>
            </ul>
          </div>

          <div className="card hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">Focus on Creation</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              AI that enhances your voice, not replaces it. Context-aware generation that learns your style and keeps consistency across projects.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Narrative-first outputs that explain WHY</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>CLI learns your preferences over time</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Export everything - no vendor lock-in</span>
              </li>
            </ul>
          </div>

          <div className="card hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">🗄️</div>
            <h3 className="text-2xl font-bold mb-3">Organize Everything</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Intelligent vaults keep your content, code, and assets organized. Collaborate with teams without the chaos.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited vaults (Creator Pass)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Team collaboration built-in</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Advanced analytics and tracking</span>
              </li>
            </ul>
          </div>

          <div className="card hover:shadow-2xl transition-all">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-3">Fair Pricing</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Pay for what you use with transparent credit pricing. No hidden fees, no surprises. Cancel anytime.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Free tier with 3 vaults & 50 generations</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited everything with Creator Pass</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Credits rollover (Pro/Legacy tiers)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>

      {/* Comparison Table - How Vauntico Compares */}
      <ComparisonTable />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Free Scroll Preview */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's a free scroll showing exactly what Vauntico can do. No login required.
          </p>
        </div>
        <ScrollPreview scroll={sampleScroll} hasAccess={true} />
      </div>

      {/* Social Proof */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Trusted by Creators Worldwide
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card bg-gradient-to-br from-vault-purple/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 vault-gradient rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <p className="font-semibold">Jessica Davis</p>
                <p className="text-sm text-gray-600">Solo Creator</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "I went from juggling 12 tools to just Vauntico. My workflow is 5x faster and I actually enjoy creating again."
            </p>
            <div className="mt-4 text-yellow-500">★★★★★</div>
          </div>

          <div className="card bg-gradient-to-br from-vault-blue/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 vault-gradient rounded-full flex items-center justify-center text-white font-bold">
                MR
              </div>
              <div>
                <p className="font-semibold">Marcus Reynolds</p>
                <p className="text-sm text-gray-600">Agency Owner</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "The CLI alone saves our team 20 hours a week. The Workshop Kit paid for itself on the first client."
            </p>
            <div className="mt-4 text-yellow-500">★★★★★</div>
          </div>

          <div className="card bg-gradient-to-br from-vault-cyan/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 vault-gradient rounded-full flex items-center justify-center text-white font-bold">
                SK
              </div>
              <div>
                <p className="font-semibold">Sarah Kim</p>
                <p className="text-sm text-gray-600">Course Creator</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Generated my entire course landing page and curriculum outline in under 10 minutes. This is magic."
            </p>
            <div className="mt-4 text-yellow-500">★★★★★</div>
          </div>
        </div>

        <div className="vault-gradient rounded-2xl p-12 text-white text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">2,500+</div>
              <div className="text-lg opacity-90">Active Creators</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Vaults Created</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1M+</div>
              <div className="text-lg opacity-90">AI Generations</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-90">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-6">
          Ready to Create <span className="text-gradient">Without Limits?</span>
        </h2>
        <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join thousands of creators who've stopped fighting their tools and started shipping faster.
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Link to="/pricing" className="btn-primary text-xl px-10 py-5">
            Start Free Trial →
          </Link>
          <Link to="/lore" className="btn-outline text-xl px-10 py-5">
            Browse Scrolls
          </Link>
        </div>
        <p className="text-gray-500 text-lg">
          14-day free trial • No credit card required • Full access to Creator Pass
        </p>
      </div>
    </div>
    </>
  )
}

export default Home

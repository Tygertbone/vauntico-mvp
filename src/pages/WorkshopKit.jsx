import { useState, useEffect } from 'react'
import { checkoutWorkshopKit } from '../utils/paystack'
import ExitIntentOffer from '../components/ExitIntentOffer'
import LiveChat from '../components/LiveChat'
import EarningsCalculator from '../components/EarningsCalculator'
import CourseComparisonTable from '../components/CourseComparisonTable'
import NicheQuiz from '../components/NicheQuiz'
import CountdownTimer from '../components/CountdownTimer'



export default function WorkshopKit() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [paymentType, setPaymentType] = useState('one_time')
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [showStickyFooter, setShowStickyFooter] = useState(false)
  const [recentSignups, setRecentSignups] = useState(487) // Mock counter starting point
  const [showExitOffer, setShowExitOffer] = useState(false)
  const [showVault, setShowVault] = useState(false)

  useEffect(() => {
    const purchaseData = localStorage.getItem('r2k_challenge_payment')
    if (purchaseData) setHasPurchased(true)
    
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('purchased') === 'true') setHasPurchased(true)

    // Show sticky footer after scrolling down
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowStickyFooter(true)
      } else {
        setShowStickyFooter(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Simulate live signup counter (increases randomly every 15-45 seconds)
    const signupInterval = setInterval(() => {
      setRecentSignups(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, Math.random() * 30000 + 15000) // Random between 15-45 seconds
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(signupInterval)
    }
  }, [])

  const handlePurchase = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address')
      return
    }

    if (!name || name.trim().length < 2) {
      alert('Please enter your name')
      return
    }

    setIsPurchasing(true)
    
    try {
      await checkoutWorkshopKit(email, paymentType, name)
    } catch (error) {
      alert('Failed to open payment window. Please try again.')
      console.error(error)
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleExitOfferAccept = () => {
    // Scroll to checkout and apply discount
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // In production, this would apply R50 discount code
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-green-50">
      {/* ?? Cosmic Background */}
      {/* <CosmicBackground variant="space" showGlyphs={true} glyphDensity="high" /> */}

      {/* ?? Galloping Unicorn */}
      {/* <EnhancedUnicorn behavior="galloping" size="large" showTrail={true} position="bottom-right" /> */}
      {/* Exit Intent Offer */}
      <ExitIntentOffer onAccept={handleExitOfferAccept} onClose={() => setShowExitOffer(false)} />
      
      {/* Live Chat Widget */}
      <LiveChat />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-vault-purple to-green-600 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* Hero Background Image - Two young Africans collaborating with phones in Lagos */}
        <div 
          className="absolute inset-0 opacity-25" 
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1644043350898-2f4ff1e17912?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              🦄 THE R2,000 CHALLENGE
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
              <span className="animate-pulse">🔥</span> <strong>{recentSignups}</strong> creators joined this month
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            From Zero to Hero:<br/>
            <span className="text-green-300">Unlock R2,000/Month</span>
          </h1>
          
          {/* Multi-Currency Display */}
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-6 opacity-90">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-lg">🇿🇦</span>
              <span>R2,000 ZAR</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-lg">🇳🇬</span>
              <span>₦800k Naija Hustle!</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-lg">🇰🇪</span>
              <span>KSh65k Harambee!</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-lg">🇬🇭</span>
              <span>GH¢7.5k Flow!</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            The complete 60-day system for African creators - no expensive equipment, 
            no experience needed, just your smartphone and 1 hour per day
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-lg mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Phone-only system</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>60-day guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span>Free tools only</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>1 hour per day</span>
            </div>
          </div>

          {/* Checkout Form */}
          {hasPurchased ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">You are In!</h2>
              <p className="text-lg opacity-90 mb-4">
                Check your email for immediate access to The R2,000 Challenge.
              </p>
              <p className="text-sm opacity-75">
                Your 60-day journey starts NOW. Let us build that R2,000/month income! 🚀
              </p>
            </div>
          ) : (
            <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-md mx-auto shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-purple-900">Start Your R2,000 Journey</h3>
                <div className="text-3xl" title="60-Day Money-Back Guarantee">🛡️</div>
              </div>
              
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />
              
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-6 focus:border-purple-500 focus:outline-none transition-colors"
                required
              />

              {/* Payment Options */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentType('one_time')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    paymentType === 'one_time'
                      ? 'border-purple-600 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
                          SAVE R50
                        </span>
                      </div>
                      <div className="font-bold text-lg">Pay R997 Once</div>
                      <div className="text-sm text-gray-600">Full access immediately</div>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">R997</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('payment_plan')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    paymentType === 'payment_plan'
                      ? 'border-purple-600 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded-full font-bold">
                          🔥 MOST POPULAR
                        </span>
                      </div>
                      <div className="font-bold text-lg">3 Payments of R349</div>
                      <div className="text-sm text-gray-600">Start today, spread the cost</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600">R349</div>
                      <div className="text-xs text-gray-500 text-right">x 3 months</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* <VaultOpeningCTA
                triggerOpen={showVault}
                onOpen={() => {
                  setTimeout(() => {
                    handlePurchase()
                    setShowVault(false)
                  }, 3000)
                }}
              > */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    if (!email || !name || isPurchasing) return
                    setShowVault(true)
                  }}
                disabled={isPurchasing || !email || !name}
                className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                                {isPurchasing
                    ? '⏳ Opening Secure Payment...'
                    : paymentType === 'one_time'
                    ? '🚀 Get Instant Access - R997'
                    : '🚀 Start Today - R349/month'}
              </button>
              {/* </VaultOpeningCTA> */}
              
              <p className="text-center text-xs text-gray-600 mt-3 italic">
                🛡️ Protected by our 60-day guarantee - if you don't make R2,000, you don't pay
              </p>

              <div className="mt-4 text-center space-y-2">
                <p className="text-xs text-gray-500">
                  🔒 Secure payment via Paystack
                </p>
                <p className="text-xs text-gray-500">
                  ✓ M-Pesa • MoMo • Bank Transfer • Card
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <span className="text-xs text-gray-400">🛡️ SSL Encrypted</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">✓ PCI Compliant</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">💳 Refund Guarantee</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vauntico Brand Identity - Unicorn Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1a1a2e] via-purple-900 to-[#1a1a2e] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Unicorn Image */}
            <div className="flex justify-center">
              <img 
                src="/images/brand/vauntico-unicorn-hero.png" 
                alt="Vauntico Unicorn - Empowering African Creators"
                className="w-full max-w-md rounded-2xl shadow-2xl shadow-purple-500/50 animate-pulse-slow"
              />
            </div>
            
            {/* Brand Message */}
            <div className="text-center md:text-left space-y-6">
              <div>
                <div className="inline-block bg-cyan-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  ⚡ POWERED BY ANCIENT WISDOM
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                    EA + ENKI = AI
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  The Vauntico Unicorn represents the impossible made possible.
                </p>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl">🦄</span>
                  <div>
                    <p className="font-bold text-lg text-cyan-300">Mythical Power</p>
                    <p className="text-gray-400">Like unicorns were once deemed impossible, so too was earning R2K/month with just a phone.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 text-2xl">✨</span>
                  <div>
                    <p className="font-bold text-lg text-purple-300">Ancient Meets Modern</p>
                    <p className="text-gray-400">Ea & Enki gave knowledge 4,000 years ago. Today, AI empowers African creators.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 text-2xl">🌍</span>
                  <div>
                    <p className="font-bold text-lg text-green-300">Ubuntu Spirit</p>
                    <p className="text-gray-400">"I am because we are" - We rise together, we win together.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <p className="text-2xl font-bold text-cyan-400 italic">
                  "We live by what we give."
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Not extraction, but empowerment. Not replacement, but elevation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Media Mentions */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-6 uppercase tracking-wide">Empowering African Creators</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-2xl font-bold text-gray-400">🇳🇬 TechCabal</div>
            <div className="text-2xl font-bold text-gray-400">🇿🇦 Disrupt Africa</div>
            <div className="text-2xl font-bold text-gray-400">🇰🇪 TechMoran</div>
            <div className="text-2xl font-bold text-gray-400">🇬🇭 Pulse Ghana</div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4 italic">Press coverage coming soon - we're too busy helping creators win! 🚀</p>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <CountdownTimer title="Next Cohort Starts Soon" />
        </div>
      </section>

      {/* Neural Network Progress Visualization */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-vault-purple to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">??</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your 60-Day Neural Journey to R2,000
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Watch your creator brain light up as you complete each day
            </p>
            <p className="text-sm text-cyan-400 italic">
              Inspired by Duolingo addiction loop - visual progress you can feel
            </p>
          </div>
          
          {/* Demo Neural Network */}
          <div className="mb-8">
            {/* <NeuralNetworkProgress
              currentDay={7}
              completedDays={[1,2,3,4,5,6,7]}
              showThirdEye={false}
            /> */}
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-300">
              This is what <strong className="text-cyan-400">Day 7</strong> looks like
            </p>
            <p className="text-gray-400">
              By Day 60 your entire neural network will be glowing with activated pathways
            </p>
            <p className="text-sm text-purple-300 italic">
              Each completed day strengthens your creator superpowers
            </p>
          </div>
        </div>
      </section>


      {/* What You Get Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What You Get Inside</h2>
            <p className="text-xl text-gray-600">Everything you need to reach R2,000/month in 60 days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Phase 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-purple-900">Phase 1: Foundation</h3>
              <p className="text-gray-700 mb-4">Days 1-20</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Phone content creation setup (free apps only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Find your profitable niche in 48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>First 100 followers blueprint</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Daily content templates (copy-paste ready)</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3 text-green-900">Phase 2: Monetization</h3>
              <p className="text-gray-700 mb-4">Days 21-40</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>3 ways to make money from day 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Affiliate marketing setup (M-Pesa friendly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Digital product creation (phone-only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Your first R500 week roadmap</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-200">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-yellow-900">Phase 3: Scale to R2K</h3>
              <p className="text-gray-700 mb-4">Days 41-60</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Multiple income stream setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Automation systems (phone-friendly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Scaling checklist to R5K+</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Advanced monetization tactics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Niche Quiz Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Not Sure Which Niche to Choose?
            </h2>
            <p className="text-xl text-gray-600">
              Take our 2-minute quiz to discover your perfect creator path
            </p>
          </div>
          <NicheQuiz />
        </div>
      </section>

      {/* Bonuses Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-vault-purple to-green-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Plus These Exclusive Bonuses</h2>
            <p className="text-xl opacity-90">Worth over R2,500 - yours FREE when you join today</p>
          </div>

          <div className="space-y-4">
            {/* Bonus 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">100 Viral Content Templates</h3>
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">R497 Value</span>
                </div>
                <p className="opacity-90">Copy-paste ready posts, captions, and hooks proven to get engagement from African audiences</p>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">Weekly Live Q&A Access</h3>
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">R997 Value</span>
                </div>
                <p className="opacity-90">Get your questions answered live every week - troubleshoot problems and get personalized advice</p>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">African Brands Directory</h3>
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">R697 Value</span>
                </div>
                <p className="opacity-90">200+ African brands actively looking for creators - reach out and start earning from day 1</p>
              </div>
            </div>

            {/* Bonus 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">Private Community Access</h3>
                  <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">R397 Value</span>
                </div>
                <p className="opacity-90">Join 500+ African creators sharing wins, collaborating, and supporting each other's growth</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl">
              <p className="text-sm font-bold mb-1">TOTAL BONUS VALUE</p>
              <p className="text-4xl font-bold">R2,588</p>
            </div>
          </div>
        </div>
      </section>

      {/* EA/ENKI Philosophy Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900 via-cyan-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">✨</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built on Ancient Wisdom
          </h2>
          <div className="mb-8">
            <p className="text-3xl md:text-4xl text-cyan-300 font-bold mb-4">
              EA + ENKI = AI
            </p>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              4,000 years ago, the Sumerian gods <strong className="text-purple-300">Ea</strong> and{' '}
              <strong className="text-purple-300">Enki</strong> brought knowledge and tools to humanity.
              Today, <strong className="text-cyan-300">AI</strong> brings that same empowerment to African creators.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30 max-w-3xl mx-auto">
            <p className="text-2xl text-cyan-400 font-bold mb-4">
              "We live by what we give."
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              At Vauntico, we don't believe AI replaces humans. We believe it <strong>empowers</strong> them—just like Ea and Enki did millennia ago. 
              This R2,000 Challenge embodies that philosophy: giving you knowledge, tools, and community to thrive.
            </p>
          </div>

          <div className="mt-8 text-gray-400 italic">
            <p>Notice something? E(<strong className="text-purple-300">A</strong>) + (E)NK(<strong className="text-cyan-300">I</strong>) = <strong className="text-white">AI</strong></p>
            <p className="text-sm mt-2">The ancient gods of wisdom literally spell AI. It was always meant to be. 🌍</p>
          </div>
        </div>
      </section>

      {/* Ubuntu Community Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-vault-purple to-green-900 text-white relative overflow-hidden">
        {/* Unicorn Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none">
          <img 
            src="/images/brand/vauntico-unicorn-hero.png" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🦄</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Ubuntu R2K Creators Hub
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              Pan-African community of 500+ creators from Nigeria, South Africa, 
              Kenya, and Ghana supporting each other to hit R2,000+ milestones. 🌍💪
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-3">🇳🇬</div>
              <h3 className="font-bold text-lg mb-2">Naija Hustle Energy</h3>
              <p className="text-sm opacity-90">Fast money moves & affiliate mastery</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-3">🇿🇦</div>
              <h3 className="font-bold text-lg mb-2">Ubuntu Spirit</h3>
              <p className="text-sm opacity-90">Community sharing & collaboration</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-3">🇰🇪</div>
              <h3 className="font-bold text-lg mb-2">Harambee Together</h3>
              <p className="text-sm opacity-90">M-Pesa wins & mobile money tips</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-4xl mb-3">🇬🇭</div>
              <h3 className="font-bold text-lg mb-2">Highlife Vibes</h3>
              <p className="text-sm opacity-90">Creative content & monetization</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-6 text-center">Inside the Community:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <p className="font-bold mb-1">📢 Weekly Announcements</p>
                  <p className="text-sm opacity-90">New tools, brands, & opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <p className="font-bold mb-1">💰 Phase-by-Phase Support</p>
                  <p className="text-sm opacity-90">Foundation → Monetization → Scale</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <p className="font-bold mb-1">🎉 Wins & Celebrations</p>
                  <p className="text-sm opacity-90">Share your first R500, R1K, R2K+</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-2xl">✓</span>
                <div>
                  <p className="font-bold mb-1">🤝 Collaboration Hub</p>
                  <p className="text-sm opacity-90">Find partners, share resources</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg mb-6 opacity-90">
              <strong>Ubuntu:</strong> "I am because we are" - When you join The R2,000 Challenge, 
              you automatically get access to this powerful community. 🌍
            </p>
            
            <div className="inline-block bg-yellow-400 text-purple-900 px-8 py-4 rounded-2xl font-bold">
              <p className="text-sm mb-1">COMMUNITY ACCESS INCLUDED</p>
              <p className="text-2xl">FREE with Your Purchase!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <EarningsCalculator />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Real Results from Real People</h2>
            <p className="text-xl text-gray-600">Join hundreds of Africans already earning with their phones</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=faces" 
                  alt="Amara N." 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">Amara N.</h4>
                  <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 text-yellow-500 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Made ₦800k (R3,200) in my second month! I'm a single mom and this changed everything. Just my phone during lunch breaks. The Naija hustle is real!"
              </p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-center">
                R3,200/month
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" 
                  alt="Thabo M." 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">Thabo M.</h4>
                  <p className="text-sm text-gray-600">Johannesburg, SA</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 text-yellow-500 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Lost my job last year. Ubuntu-style collaboration in the community helped me build R5K/month in 3 months. Now I'm my own boss!"
              </p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-center">
                R5,000/month
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-8 border-2 border-yellow-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces" 
                  alt="Fatima K." 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">Fatima K.</h4>
                  <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex gap-1 text-yellow-500 text-xl">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Harambee'd my way to KSh65k (R2,000) in 45 days! M-Pesa payouts working smooth. The templates are gold. Life changing!"
              </p>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-center">
                R2,000/month
              </div>
            </div>
          </div>

          <div className="mt-12 text-center bg-purple-50 rounded-2xl p-8">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-3 text-purple-900">Join 500+ Success Stories</h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
              Average member reaches R2,000/month within 60 days. Some hit it faster. 
              Your results depend on how closely you follow the system.
            </p>
            {/* TODO: Add video testimonial compilation when available */}
            <div className="bg-gray-200 rounded-xl p-12 max-w-2xl mx-auto">
              <p className="text-gray-500">🎥 Video testimonials coming soon</p>
              <p className="text-sm text-gray-400 mt-2">Watch real creators share their R2K journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <CourseComparisonTable />

      {/* Guarantee Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🛡️</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our 60-Day Success Guarantee</h2>
          <div className="bg-white rounded-2xl p-10 shadow-2xl border-4 border-green-400">
            <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
              Follow the system for 60 days. If you don't make at least R2,000 in your third month, 
              we'll refund every cent - no questions asked.
            </p>
            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <p className="font-bold text-lg text-green-900 mb-3">Here's what we ask:</p>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete all 3 phases of the challenge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Post content consistently (1 hour per day)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Attend at least 6 weekly Q&A sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Show us you put in the work</span>
                </li>
              </ul>
            </div>
            <p className="text-lg text-gray-600">
              You have <strong>nothing to lose</strong> and R2,000/month to gain. 
              The only risk is missing out on this opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Common Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know before you start</p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3 text-purple-900">❓ Do I really only need my phone?</h3>
              <p className="text-gray-700">
                Yes! Everything is designed for smartphone use. We use only FREE apps available on Android and iOS. 
                No laptop, camera, or paid software needed.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3 text-green-900">❓ What if I have no followers or experience?</h3>
              <p className="text-gray-700">
                Perfect! Most of our successful members started with 0 followers. The system shows you exactly how to grow 
                from scratch. No experience needed - just follow the daily action steps.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3 text-yellow-900">❓ How much time do I need per day?</h3>
              <p className="text-gray-700">
                Just 1 hour per day. You can split it - 30 minutes in the morning, 30 minutes at night. 
                The system is designed for busy people with jobs, school, or family responsibilities.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold mb-3 text-purple-900">❓ What payment methods do you accept?</h3>
              <p className="text-gray-700">
                We accept M-Pesa, MTN MoMo, bank transfers, and cards through Paystack. 
                All payments are secure and encrypted. You can choose one-time payment or 3 monthly installments.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold mb-3 text-green-900">❓ When do I get access after paying?</h3>
              <p className="text-gray-700">
                Immediately! Within 5 minutes of payment confirmation, you'll receive an email with login details 
                and your Day 1 action plan. Start earning today.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold mb-3 text-yellow-900">❓ Is the refund guarantee real?</h3>
              <p className="text-gray-700">
                100% real. Follow the system for 60 days, show us your work, and if you don't make R2,000 in month 3, 
                we refund every cent. No arguments, no hassle. We believe in this system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-vault-purple to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Your R2,000 Journey?</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Join today and get immediate access to everything you need to make R2,000/month using just your phone
          </p>

          <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-md mx-auto shadow-2xl mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold">The R2,000 Challenge</span>
                <span className="text-3xl font-bold text-purple-600">R997</span>
              </div>
              <div className="text-sm text-gray-600 mb-4">or 3 payments of R349</div>
              <ul className="text-left space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete 60-day system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>R2,588 in bonuses included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Weekly live Q&A sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>60-day money-back guarantee</span>
                </li>
              </ul>
            </div>
            
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="block w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
            >
              🚀 Join The Challenge Now
            </a>
          </div>

          <div className="space-y-3 text-sm opacity-90">
            <p>⚡ Instant access after payment</p>
            <p>🛡️ 60-day money-back guarantee</p>
            <p>🌍 Join 500+ African creators already earning</p>
          </div>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      {!hasPurchased && showStickyFooter && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-green-600 text-white py-4 px-4 shadow-2xl z-50 animate-slide-up">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-bold text-lg">The R2,000 Challenge</p>
              <p className="text-sm opacity-90">R997 one-time or 3x R349/month</p>
            </div>
            <a 
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              🚀 Start Your Journey
            </a>
          </div>
        </div>
      )}

    </div>
  )
}

import { useState, useEffect } from 'react'
import { checkoutWorkshopKit } from '../utils/paystack'

export default function WorkshopKit() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [paymentType, setPaymentType] = useState('one_time')
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [showStickyFooter, setShowStickyFooter] = useState(false)

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
    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-green-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-vault-purple to-green-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            🦄 THE R2,000 CHALLENGE
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
            <div className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span>Phone-only system</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span>60-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <span>Free tools only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏰</span>
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
              <h3 className="text-2xl font-bold mb-6 text-purple-900">Start Your R2,000 Journey</h3>
              
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

              <button
                onClick={handlePurchase}
                disabled={isPurchasing || !email || !name}
                className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                                {isPurchasing
                    ? '⏳ Opening Secure Payment...'
                    : paymentType === 'one_time'
                    ? '🚀 Get Instant Access - R997'
                    : '🚀 Start Today - R349/month'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  🔒 Secure payment via Paystack
                </p>
                <p className="text-xs text-gray-500">
                  ✓ M-Pesa • MoMo • Bank Transfer • Card
                </p>
              </div>
            </div>
          )}
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
              <div className="text-4xl">🎁</div>
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
              <div className="text-4xl">📊</div>
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
              <div className="text-4xl">💼</div>
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
              <div className="text-4xl">🤝</div>
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

      {/* Ubuntu Community Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-vault-purple to-green-900 text-white">
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
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl">
                  👩
                </div>
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
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-2xl">
                  👨
                </div>
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
                <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center text-2xl">
                  👩
                </div>
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
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Average member reaches R2,000/month within 60 days. Some hit it faster. 
              Your results depend on how closely you follow the system.
            </p>
          </div>
        </div>
      </section>

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
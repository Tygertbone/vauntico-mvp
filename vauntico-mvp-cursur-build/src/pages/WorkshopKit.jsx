import { useState, useEffect } from 'react'
import { checkoutWorkshopKit } from '../utils/paystack'

export default function WorkshopKit() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [paymentType, setPaymentType] = useState('one_time')
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [hasPurchased, setHasPurchased] = useState(false)

  useEffect(() => {
    const purchaseData = localStorage.getItem('r2k_challenge_payment')
    if (purchaseData) setHasPurchased(true)
    
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('purchased') === 'true') setHasPurchased(true)
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
            ?? THE R2,000 CHALLENGE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Make R2,000/Month<br/>
            <span className="text-green-300">Using Only Your Phone</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
            The complete 60-day system for African creators - no expensive equipment, 
            no experience needed, just your smartphone and 1 hour per day
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-lg mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">?</span>
              <span>Phone-only system</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">?</span>
              <span>60-day guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">?</span>
              <span>Free tools only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">?</span>
              <span>1 hour per day</span>
            </div>
          </div>

          {/* Checkout Form */}
          {hasPurchased ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <div className="text-5xl mb-4">??</div>
              <h2 className="text-3xl font-bold mb-2">You are In!</h2>
              <p className="text-lg opacity-90 mb-4">
                Check your email for immediate access to The R2,000 Challenge.
              </p>
              <p className="text-sm opacity-75">
                Your 60-day journey starts NOW. Let us build that R2,000/month income! ??
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
                          ? MOST POPULAR
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
                  ? '? Opening Secure Payment...'
                  : paymentType === 'one_time'
                  ? '?? Get Instant Access - R997'
                  : '?? Start Today - R349/month'}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  ?? Secure payment via Paystack
                </p>
                <p className="text-xs text-gray-500">
                  ?? M-Pesa • MoMo • Bank Transfer • Card
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Placeholder for next sections - we will add these in Step 2 */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">More sections coming in Step 2...</h2>
          <p className="text-xl text-gray-600">Hero section complete! Test the form and payment options above.</p>
        </div>
      </section>

    </div>
  )
}
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export default function WorkshopKitSuccess() {
  const [searchParams] = useSearchParams()
  const [paymentData, setPaymentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get payment reference from URL
    const reference = searchParams.get('ref')
    
    // Get payment data from localStorage
    const storedData = localStorage.getItem('vauntico_workshop_kit_payment')
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setPaymentData(data)
      } catch (error) {
        console.error('Error parsing payment data:', error)
      }
    }
    
    setLoading(false)

    // Track success event
    if (window.VaunticoAnalytics && window.VaunticoAnalytics.trackEvent) {
      window.VaunticoAnalytics.trackEvent('r2000_challenge_success_page_viewed', {
        reference: reference
      })
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-xl text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const paymentType = paymentData?.payment_type
  const isPaymentPlan = paymentType === 'payment_plan'
  const reference = paymentData?.reference || searchParams.get('ref')

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-green-50">
      
      {/* Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🎉</div>
        <div className="absolute top-0 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
        <div className="absolute top-20 left-1/3 text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>⭐</div>
        <div className="absolute top-20 right-1/3 text-5xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>
      </div>

      {/* Success Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Success Icon */}
          <div className="mb-8 animate-pulse">
            <div className="inline-block bg-gradient-to-br from-green-400 to-green-600 rounded-full p-8 shadow-2xl">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
            Welcome to The R2,000 Challenge! 🎉
          </h1>
          
          {isPaymentPlan ? (
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Payment 1 of 3 confirmed (R349)! Your journey to R2,000/month starts NOW.
            </p>
          ) : (
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Payment confirmed (R997)! Your journey to R2,000/month starts NOW.
            </p>
          )}

          {/* Reference Number */}
          {reference && (
            <div className="bg-purple-50 rounded-lg p-4 mb-8 inline-block">
              <p className="text-sm text-gray-600 mb-1">Payment Reference</p>
              <p className="font-mono text-lg text-purple-900">{reference}</p>
            </div>
          )}

        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            What Happens Next? 🚀
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-900">Check Your Email</h3>
              <p className="text-gray-700 mb-4">
                Within 5 minutes, you'll receive:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Welcome email with login details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Day 1 action plan PDF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Free apps download list</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>WhatsApp community link</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3 text-green-900">Join The Community</h3>
              <p className="text-gray-700 mb-4">
                Connect with 500+ creators:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>WhatsApp group access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Weekly live Q&A sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Share wins and get support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Find collaboration partners</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 border-2 border-yellow-200">
              <div className="bg-yellow-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-yellow-900">Start Day 1 Today</h3>
              <p className="text-gray-700 mb-4">
                Your 60-day journey begins:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Download free apps (15 mins)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete niche quiz (10 mins)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Set up phone workspace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Post your first piece</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Your Dashboard */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-900 via-vault-purple to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Access Your Dashboard</h2>
          <p className="text-xl mb-8 opacity-90">
            Everything you need is in one place
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2">Full Course Access</h3>
              <p className="opacity-90">All 3 phases, videos, templates, and resources</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold mb-2">All Bonuses Unlocked</h3>
              <p className="opacity-90">R2,588 worth of templates, tools, and community</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
              <p className="opacity-90">Daily checklist and income tracker</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-xl font-bold mb-2">Weekly Q&A Sessions</h3>
              <p className="opacity-90">Get personalized help every week</p>
            </div>

          </div>

          <Link
            to="/r2000-challenge/dashboard"
            className="inline-block bg-white text-purple-600 hover:bg-purple-50 px-12 py-4 rounded-full font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Important Reminders */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Important Reminders 📌
          </h2>

          <div className="space-y-6">
            
            {isPaymentPlan && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💳</div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-900 mb-2">Payment Plan Active</h3>
                    <p className="text-gray-700">
                      Your next payment of R349 will be charged in 30 days. 
                      You'll receive a reminder email 3 days before.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">60-Day Guarantee Active</h3>
                  <p className="text-gray-700">
                    Complete all 3 phases and if you don't make R2,000 in month 3, 
                    we'll refund every cent. No questions asked.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📧</div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Check Your Spam Folder</h3>
                  <p className="text-gray-700">
                    If you don't see our welcome email in 5 minutes, check your spam/junk folder. 
                    Add <strong>hello@vauntico.com</strong> to your contacts.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-green-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Need Help?</h2>
          <p className="text-xl text-gray-700 mb-8">
            We're here to support you every step of the way
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <a
              href="mailto:support@vauntico.com"
              className="bg-white hover:bg-gray-50 rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">support@vauntico.com</p>
            </a>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm">Chat with us</p>
            </a>

            <Link
              to="/r2000-challenge/dashboard"
              className="bg-white hover:bg-gray-50 rounded-xl p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Dashboard</h3>
              <p className="text-gray-600 text-sm">Access resources</p>
            </Link>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-vault-purple to-green-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your R2,000 Journey Starts Now!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            The next 60 days will change your life. Let's do this! 💪
          </p>
          <Link
            to="/r2000-challenge/dashboard"
            className="inline-block bg-white text-purple-600 hover:bg-purple-50 px-12 py-4 rounded-full font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Day 1 Now →
          </Link>
        </div>
      </section>

    </div>
  )
}

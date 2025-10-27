
/**
 * Paystack Payment Integration for Vauntico
 * 
 * Handles all payment processing for South African market:
 * - Creator Pass subscriptions (3 tiers)
 * - Workshop Kit one-time purchase
 * - Supports ZAR and international currencies
 * 
 * Paystack Features:
 * - Local SA cards (1.5% + R1)
 * - International cards (3.8% + R1)
 * - Recurring subscriptions
 * - Mobile money
 * - Bank transfers
 */

import { trackSubscriptionSuccess, trackUpgradeClick } from './analytics'

// ============================================================================
// PAYSTACK CONFIGURATION
// ============================================================================

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_KEY_HERE'
const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY || 'sk_test_YOUR_KEY_HERE'

// Paystack Plan Codes (create these in Paystack Dashboard)
export const PAYSTACK_PLAN_CODES = {
  CREATOR_PASS: {
    starter: {
      monthly: 'PLN_starter_monthly',
      yearly: 'PLN_starter_yearly'
    },
    pro: {
      monthly: 'PLN_pro_monthly',
      yearly: 'PLN_pro_yearly'
    },
    legacy: {
      monthly: 'PLN_legacy_monthly',
      yearly: 'PLN_legacy_yearly'
    }
  }
}

// Pricing in kobo (Paystack uses smallest currency unit)
// 1 ZAR = 100 kobo, 1 USD = 100 cents
export const PAYSTACK_PRICING = {
  starter: {
    monthly: 29900, // R299
    yearly: 299000  // R2,990
  },
  pro: {
    monthly: 99900,  // R999
    yearly: 999000   // R9,990
  },
  legacy: {
    monthly: 299900,  // R2,999
    yearly: 2999000   // R29,990
  },
  workshop_kit: {
    one_time: 99700,  // R997 one-time (PREMIUM)
    payment_plan: 34900  // R349 x 3 monthly payments (R1,047 total)
  }
}

// ============================================================================
// PAYSTACK INITIALIZATION
// ============================================================================

let paystackInstance = null

/**
 * Load Paystack Inline JS from CDN
 */
export const loadPaystack = async () => {
  if (paystackInstance) return paystackInstance

  // Load Paystack.js from CDN if not already loaded
  if (!window.PaystackPop) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.onload = resolve
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  console.log('✅ Paystack initialized')
  return window.PaystackPop
}

// ============================================================================
// PAYMENT CHECKOUT FUNCTIONS
// ============================================================================

/**
 * Create Creator Pass checkout
 * @param {string} tier - starter, pro, or legacy
 * @param {string} billingCycle - monthly or yearly
 * @param {string} userEmail - User's email
 */
export const checkoutCreatorPass = async (tier, billingCycle = 'monthly', userEmail = '') => {
  try {
    // Track the upgrade click
    const prices = {
      starter: billingCycle === 'monthly' ? 299 : 2990,
      pro: billingCycle === 'monthly' ? 999 : 9990,
      legacy: billingCycle === 'monthly' ? 2999 : 29990
    }
    
    trackUpgradeClick(tier, billingCycle, prices[tier], 'ZAR')

    // Get amount in kobo
    const amount = PAYSTACK_PRICING[tier][billingCycle]
    const planCode = PAYSTACK_PLAN_CODES.CREATOR_PASS[tier][billingCycle]

    // Load Paystack
    const PaystackPop = await loadPaystack()

    // Open Paystack payment modal
    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: userEmail || 'customer@vauntico.com',
      amount: amount, // Amount in kobo
      currency: 'ZAR',
      plan: planCode !== 'PLN_' ? planCode : undefined, // Only use if set up
      metadata: {
        custom_fields: [
          {
            display_name: 'Tier',
            variable_name: 'tier',
            value: tier
          },
          {
            display_name: 'Billing Cycle',
            variable_name: 'billing_cycle',
            value: billingCycle
          },
          {
            display_name: 'Product',
            variable_name: 'product',
            value: 'creator_pass'
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        console.log('✅ Payment successful:', response.reference)
        
        // Verify payment on backend
        verifyPayment(response.reference, tier, billingCycle)
      },
      onClose: function() {
        console.log('Payment window closed')
      }
    })

    handler.openIframe()
  } catch (error) {
    console.error('Checkout error:', error)
    alert('Payment initialization failed. Please try again.')
  }
}

/**
 * Create R2,000 Challenge checkout (Premium)
 * @param {string} userEmail - User's email
 * @param {string} paymentType - 'one_time' (R997) or 'payment_plan' (3xR349)
 * @param {string} name - Customer name (optional)
 */
export const checkoutWorkshopKit = async (userEmail = '', paymentType = 'one_time', name = '') => {
  try {
    const amount = PAYSTACK_PRICING.workshop_kit[paymentType]
    
    if (!amount) {
      throw new Error(`Invalid payment type: ${paymentType}`)
    }

    const PaystackPop = await loadPaystack()
    
    // Generate unique reference
    const reference = `WK_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const handler = PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: userEmail || 'customer@vauntico.com',
      amount: amount,
      currency: 'ZAR',
      ref: reference,
      plan: paymentType === 'payment_plan' ? 'PLN_workshop_3x149' : undefined,
      metadata: {
        custom_fields: [
          {
            display_name: 'Product',
            variable_name: 'product',
            value: 'The R2,000 Challenge'
          },
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: name || 'Not provided'
          },
          {
            display_name: 'Payment Type',
            variable_name: 'payment_type',
            value: paymentType === 'one_time' ? 'R997 One-time' : '3x R349 Plan'
          }
        ]
      },
      callback: function(response) {
        console.log('✅ Payment successful:', response.reference)
        
        // Save payment locally
        const paymentData = {
          reference: response.reference,
          email: userEmail,
          amount: amount,
          currency: 'ZAR',
          product: 'r2000_challenge',
          payment_type: paymentType,
          timestamp: new Date().toISOString(),
          status: 'success'
        }
        
        localStorage.setItem('vauntico_workshop_kit_payment', JSON.stringify(paymentData))
        localStorage.setItem('vauntico_workshop_kit', 'true')
        
        // Track success
        if (window.VaunticoAnalytics && window.VaunticoAnalytics.trackEvent) {
          window.VaunticoAnalytics.trackEvent('r2000_challenge_purchased', {
            reference: response.reference,
            payment_type: paymentType,
            amount: amount / 100
          })
        }
        
        // Show success message
        const message = paymentType === 'one_time'
          ? '🎉 Welcome to The R2,000 Challenge! Check your email for immediate access.\n\nYour 60-day journey starts NOW!\n\nReference: ' + response.reference
          : '🎉 Payment 1/3 Complete (R349)! Check your email for immediate access.\n\nNext payment in 30 days. Let\'s make R2,000!\n\nReference: ' + response.reference
        
        alert(message)
        
        // Redirect to thank you page
        window.location.href = '/workshop-kit?purchased=true'
      },
      onClose: function() {
        console.log('Payment window closed')
      }
    })

    handler.openIframe()
  } catch (error) {
    console.error('Checkout error:', error)
    alert('Payment initialization failed. Please try again.')
  }
}

// ============================================================================
// PAYMENT VERIFICATION
// ============================================================================

/**
 * Verify payment with Paystack
 * @param {string} reference - Payment reference from Paystack
 * @param {string} tier - Product tier
 * @param {string} billingCycle - Billing cycle (optional)
 */
const verifyPayment = async (reference, tier, billingCycle = null) => {
  try {
    // Call your backend to verify payment
    const response = await fetch('/api/verify-paystack-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference })
    })

    const data = await response.json()

    if (data.status === 'success') {
      // Update local state
      if (tier === 'workshop_kit') {
        localStorage.setItem('vauntico_workshop_kit', 'true')
        alert('🎉 Workshop Kit purchased successfully!')
      } else {
        // Creator Pass subscription
        localStorage.setItem('vauntico_creator_pass', 'true')
        localStorage.setItem('vauntico_creator_pass_tier', tier)
        
        // Track success
        const prices = {
          starter: billingCycle === 'monthly' ? 299 : 2990,
          pro: billingCycle === 'monthly' ? 999 : 9990,
          legacy: billingCycle === 'monthly' ? 2999 : 29990
        }
        
        trackSubscriptionSuccess(tier, billingCycle, prices[tier], 'ZAR')
        
        alert(`🎉 Welcome to Creator Pass ${tier.toUpperCase()}! Your covenant has been sealed.`)
      }

      // Reload to update UI
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } else {
      alert('❌ Payment verification failed. Please contact support.')
    }
  } catch (error) {
    console.error('Verification error:', error)
    
    // Fallback: Update local state anyway (for testing)
    if (import.meta.env.DEV) {
      console.log('🧪 DEV MODE: Updating local state without verification')
      
      if (tier === 'workshop_kit') {
        localStorage.setItem('vauntico_workshop_kit', 'true')
      } else {
        localStorage.setItem('vauntico_creator_pass', 'true')
        localStorage.setItem('vauntico_creator_pass_tier', tier)
        
        const prices = {
          starter: billingCycle === 'monthly' ? 299 : 2990,
          pro: billingCycle === 'monthly' ? 999 : 9990,
          legacy: billingCycle === 'monthly' ? 2999 : 29990
        }
        
        trackSubscriptionSuccess(tier, billingCycle, prices[tier], 'ZAR')
      }
      
      alert('🧪 TEST MODE: Payment simulated successfully!')
      setTimeout(() => window.location.reload(), 1000)
    }
  }
}

// ============================================================================
// SUBSCRIPTION MANAGEMENT
// ============================================================================

/**
 * Check subscription status
 * @param {string} subscriptionCode - Paystack subscription code
 */
export const checkSubscriptionStatus = async (subscriptionCode) => {
  try {
    const response = await fetch(`/api/check-subscription?code=${subscriptionCode}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Subscription check error:', error)
    return null
  }
}

/**
 * Cancel subscription
 * @param {string} subscriptionCode - Paystack subscription code
 */
export const cancelSubscription = async (subscriptionCode) => {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: subscriptionCode })
    })

    const data = await response.json()
    
    if (data.status === 'success') {
      alert('Subscription cancelled successfully')
      return true
    }
    
    return false
  } catch (error) {
    console.error('Cancellation error:', error)
    alert('Failed to cancel subscription. Please contact support.')
    return false
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if Paystack is properly configured
 */
export const isPaystackConfigured = () => {
  return PAYSTACK_PUBLIC_KEY && !PAYSTACK_PUBLIC_KEY.includes('YOUR_KEY_HERE')
}

/**
 * Convert ZAR to kobo (for Paystack)
 * @param {number} amount - Amount in ZAR
 */
export const toKobo = (amount) => {
  return Math.round(amount * 100)
}

/**
 * Convert kobo to ZAR
 * @param {number} kobo - Amount in kobo
 */
export const fromKobo = (kobo) => {
  return kobo / 100
}

/**
 * Format ZAR amount
 * @param {number} amount - Amount in ZAR
 */
export const formatZAR = (amount) => {
  return `R${amount.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

// ============================================================================
// MOCK PAYMENT FLOW (FOR DEVELOPMENT/TESTING)
// ============================================================================

/**
 * Mock payment flow for testing without Paystack setup
 */
export const mockPaystackCheckout = async (tier, billingCycle = 'monthly') => {
  console.log('🧪 MOCK PAYSTACK CHECKOUT')
  console.log(`Tier: ${tier}`)
  console.log(`Billing: ${billingCycle}`)

  // Simulate payment delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Update local storage
  if (tier === 'workshop_kit') {
    localStorage.setItem('vauntico_workshop_kit', 'true')
  } else {
    localStorage.setItem('vauntico_creator_pass', 'true')
    localStorage.setItem('vauntico_creator_pass_tier', tier)
    
    const prices = {
      starter: billingCycle === 'monthly' ? 299 : 2990,
      pro: billingCycle === 'monthly' ? 999 : 9990,
      legacy: billingCycle === 'monthly' ? 2999 : 29990
    }
    
    trackSubscriptionSuccess(tier, billingCycle, prices[tier], 'ZAR')
  }

  alert('✅ Mock payment successful!')
  window.location.reload()
}

// ============================================================================
// DEV UTILITIES
// ============================================================================

export const PAYSTACK_DEV = {
  /**
   * Test checkout with mock or real Paystack
   */
  testCheckout: (tier = 'pro', billingCycle = 'monthly') => {
    console.log('🧪 Testing Paystack checkout...')
    if (isPaystackConfigured()) {
      console.log('✅ Paystack is configured')
      console.log('Opening real Paystack modal...')
      checkoutCreatorPass(tier, billingCycle, 'test@example.com')
    } else {
      console.log('⚠️ Paystack not configured - using mock')
      mockPaystackCheckout(tier, billingCycle)
    }
  },

  /**
   * Log Paystack configuration status
   */
  logStatus: () => {
    console.log('=== Paystack Configuration ===')
    console.log('Public Key:', isPaystackConfigured() ? '✅ Configured' : '❌ Not configured')
    console.log('Plan Codes:', PAYSTACK_PLAN_CODES)
    console.log('Pricing:', PAYSTACK_PRICING)
    console.log('============================')
  },

  /**
   * Test payment verification
   */
  testVerify: (reference = 'test_ref_123') => {
    console.log('🧪 Testing payment verification...')
    verifyPayment(reference, 'pro', 'monthly')
  }
}

// Expose dev utilities in development
if (import.meta.env.DEV) {
  window.VaunticoPaystack = PAYSTACK_DEV
  console.log('💳 Paystack Dev Utils: window.VaunticoPaystack')
  console.log('Test Card: 4084084084084081 (success), CVV: 408, Any future date')
}

// ============================================================================
// BACKEND API ENDPOINTS NEEDED
// ============================================================================

/**
 * You need to create these API endpoints:
 * 
 * POST /api/verify-paystack-payment
 * - Verifies payment with Paystack API
 * - Updates user subscription in database
 * - Returns success/failure
 * 
 * POST /api/paystack-webhook
 * - Handles Paystack webhook events
 * - Events: charge.success, subscription.create, etc.
 * - Updates user status automatically
 * 
 * GET /api/check-subscription?code=xxx
 * - Checks subscription status
 * - Returns active/cancelled/expired
 * 
 * POST /api/cancel-subscription
 * - Cancels a subscription via Paystack API
 * 
 * Example backend (Node.js):
 * 
 * const https = require('https');
 * 
 * // Verify payment
 * app.post('/api/verify-paystack-payment', async (req, res) => {
 *   const { reference } = req.body;
 *   
 *   const options = {
 *     hostname: 'api.paystack.co',
 *     port: 443,
 *     path: `/transaction/verify/${reference}`,
 *     method: 'GET',
 *     headers: {
 *       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
 *     }
 *   };
 *   
 *   // Make request to Paystack
 *   // Update user subscription
 *   // Return success
 * });
 * 
 * // Webhook handler
 * app.post('/api/paystack-webhook', (req, res) => {
 *   const hash = crypto.createHmac('sha512', secret)
 *     .update(JSON.stringify(req.body))
 *     .digest('hex');
 *   
 *   if (hash === req.headers['x-paystack-signature']) {
 *     const event = req.body;
 *     // Handle event types
 *   }
 *   
 *   res.sendStatus(200);
 * });
 */

export default {
  loadPaystack,
  checkoutCreatorPass,
  checkoutWorkshopKit,
  checkSubscriptionStatus,
  cancelSubscription,
  mockPaystackCheckout,
  isPaystackConfigured,
  toKobo,
  fromKobo,
  formatZAR
}

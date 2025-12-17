/**
 * Pricing Logic and Access Control Utilities
 * Section 2A: Pricing Logic Binding Implementation
 */

// ============================================================================
// PRICING METADATA
// ============================================================================

export const PRICING = {
  CREATOR_PASS: {
    price: 29, // Default price (kept for backwards compatibility)
    currency: 'USD', // Default currency
    localizedPrices: {
      USD: 29,
      ZAR: 499
    },
    period: 'month',
    features: [
      'Unlimited AI Generation',
      'Unlimited Vaults',
      'Team Collaboration',
      'Premium Templates',
      'Advanced Analytics',
      'Priority Support',
      'Workshop Kit Access',
      'All Add-ons Unlocked',
      'Automation Starter Pack',
      'Brand Builder Toolkit'
    ],
    // Three-tier covenant structure
    tiers: {
      starter: {
        name: 'Starter: The Apprentice Forge',
        icon: '⚔️',
        price: 299,
        localizedPrices: {
          USD: 17,
          ZAR: 299
        },
        yearlyPrice: 2990,
        localizedYearlyPrices: {
          USD: 170,
          ZAR: 2990
        },
        period: 'month',
        description: 'For the builder taking their first sacred steps.',
        features: [
          '500 credits/month',
          'CLI access (core commands)',
          '5 landing page generations',
          '2 Workshop Kit templates',
          'Community vault access',
          'Standard support (48-hour response)'
        ],
        idealFor: [
          'Solo creators launching their first digital product',
          'Side hustlers escaping the 9-to-5 matrix',
          'Coaches building foundational presence'
        ]
      },
      pro: {
        name: 'Pro: The Empire Builder',
        icon: '🏰',
        price: 999,
        localizedPrices: {
          USD: 59,
          ZAR: 999
        },
        yearlyPrice: 9990,
        localizedYearlyPrices: {
          USD: 590,
          ZAR: 9990
        },
        period: 'month',
        description: 'For the creator who has tasted freedom and wants dominion.',
        popular: true,
        features: [
          '2,500 credits/month (rollover up to 1,000)',
          'Full CLI suite (advanced commands)',
          'Unlimited landing pages & funnels',
          'Complete Workshop Kit library',
          '1 Audit-as-a-Service credit/month',
          'Priority support (12-hour response)',
          'White-label rights',
          'Early access to new scrolls'
        ],
        idealFor: [
          'Agencies managing multiple client empires',
          'Course creators scaling multi-product catalogs',
          'Consultants offering premium transformation services'
        ]
      },
      legacy: {
        name: 'Legacy: The Mythmaker',
        icon: '👑',
        price: 2999,
        localizedPrices: {
          USD: 170,
          ZAR: 2999
        },
        yearlyPrice: 29990,
        localizedYearlyPrices: {
          USD: 1700,
          ZAR: 29990
        },
        period: 'month',
        description: 'For the oracle who builds systems that outlive them.',
        features: [
          '10,000 credits/month (unlimited rollover)',
          'White-glove implementation support',
          'Custom scroll creation (quarterly)',
          'Unlimited audits & workshops',
          'API access for custom integrations',
          'Dedicated success architect (monthly rituals)',
          'Co-creation sessions with Tyrone (quarterly)',
          'Affiliate revenue share (15%)',
          'Your name inscribed in the Founder\'s Codex'
        ],
        idealFor: [
          'Agencies building Vauntico into their core stack',
          'Educators creating certification empires',
          'Visionaries launching movement-scale platforms'
        ]
      }
    }
  },
  
  WORKSHOP_KIT: {
    price: 499, // Default price
    currency: 'ZAR', // Default currency
    localizedPrices: {
      USD: 29,
      ZAR: 499
    },
    period: 'once-off',
    features: [
      'Brand Starter Pack',
      'Ritual Scrolls',
      'Creator Templates',
      'Vault Blueprints',
      'Quick Start Scripts',
      'Masterclass Access'
    ],
    unlockConditions: {
      creatorPass: true,
      oneTimePayment: true
    }
  },
  
  AUDIT_SERVICE: {
    price: 999, // Default price
    currency: 'ZAR', // Default currency
    localizedPrices: {
      USD: 59,
      ZAR: 999
    },
    period: 'month',
    plans: {
      starter: {
        price: 499,
        localizedPrices: {
          USD: 29,
          ZAR: 499
        },
        period: 'once-off',
        features: [
          'Basic git archaeology',
          'Deployment health check',
          'Module mapping',
          'PDF report',
          '2-day turnaround'
        ]
      },
      professional: {
        price: 999,
        localizedPrices: {
          USD: 59,
          ZAR: 999
        },
        period: 'month',
        features: [
          'Everything in Starter',
          'Weekly automated audits',
          'Performance metrics tracking',
          'Security vulnerability monitoring',
          'Priority support',
          'Monthly strategy call',
          'Custom recommendations'
        ]
      },
      enterprise: {
        price: 'custom',
        localizedPrices: {
          USD: 'custom',
          ZAR: 'custom'
        },
        period: 'contact',
        features: [
          'Everything in Professional',
          'Multi-repository audits',
          'Team collaboration features',
          'Dedicated account manager',
          'Custom CI/CD integration',
          'On-demand audits',
          'Slack/Teams integration'
        ]
      }
    },
    unlockConditions: {
      creatorPass: true,
      activeSubscription: true
    }
  },
  
  AUTOMATION_STARTER_PACK: {
    price: 0,
    currency: 'ZAR',
    localizedPrices: {
      USD: 0,
      ZAR: 0
    },
    period: 'included',
    unlockConditions: {
      creatorPass: true
    }
  },
  
  BRAND_BUILDER_TOOLKIT: {
    price: 0,
    currency: 'ZAR',
    localizedPrices: {
      USD: 0,
      ZAR: 0
    },
    period: 'included',
    unlockConditions: {
      creatorPass: true
    }
  }
}

// ============================================================================
// USER ACCESS STATE (Mock - Replace with actual auth/state management)
// ============================================================================

let mockUserState = {
  hasCreatorPass: false,
  hasWorkshopKit: false,
  auditSubscriptionStatus: null, // 'active', 'cancelled', 'expired', null
  auditSubscriptionPlan: null, // 'starter', 'professional', 'enterprise', null
  purchasedAddons: []
}

// For development/testing purposes
export const setMockUserState = (newState) => {
  mockUserState = { ...mockUserState, ...newState }
}

export const getMockUserState = () => mockUserState

// ============================================================================
// CORE ACCESS CONTROL FUNCTIONS
// ============================================================================

/**
 * Check if user has Creator Pass
 * @returns {boolean} True if user has active Creator Pass
 */
export const hasCreatorPass = () => {
  // TODO: Replace with actual API call/state check
  // For now, check localStorage for development
  const storedState = localStorage.getItem('vauntico_creator_pass')
  if (storedState !== null) {
    return storedState === 'true'
  }
  return mockUserState.hasCreatorPass
}

/**
 * Check if user has purchased Workshop Kit
 * @returns {boolean} True if user has Workshop Kit access
 */
export const hasWorkshopKit = () => {
  // TODO: Replace with actual API call/state check
  const storedState = localStorage.getItem('vauntico_workshop_kit')
  if (storedState !== null) {
    return storedState === 'true'
  }
  return mockUserState.hasWorkshopKit
}

/**
 * Get user's subscription status for Audit Service
 * @returns {Object} Subscription status object
 */
export const getUserSubscriptionStatus = () => {
  // TODO: Replace with actual API call/state check
  const storedStatus = localStorage.getItem('vauntico_audit_subscription')
  if (storedStatus) {
    try {
      return JSON.parse(storedStatus)
    } catch (e) {
      console.error('Error parsing subscription status:', e)
    }
  }
  
  return {
    status: mockUserState.auditSubscriptionStatus,
    plan: mockUserState.auditSubscriptionPlan,
    isActive: mockUserState.auditSubscriptionStatus === 'active'
  }
}

/**
 * Check if user has purchased a specific addon
 * @param {string} addonId - The addon identifier
 * @returns {boolean} True if user has purchased the addon
 */
export const hasPurchasedAddon = (addonId) => {
  // TODO: Replace with actual API call/state check
  const storedAddons = localStorage.getItem('vauntico_purchased_addons')
  if (storedAddons) {
    try {
      const addons = JSON.parse(storedAddons)
      return addons.includes(addonId)
    } catch (e) {
      console.error('Error parsing purchased addons:', e)
    }
  }
  return mockUserState.purchasedAddons.includes(addonId)
}

// ============================================================================
// PRODUCT-SPECIFIC ACCESS CHECKS
// ============================================================================

/**
 * Check if user has access to Workshop Kit
 * @returns {Object} Access status with reason
 */
export const canAccessWorkshopKit = () => {
  if (hasCreatorPass()) {
    return {
      hasAccess: true,
      reason: 'creator_pass',
      message: 'Access granted via Creator Pass'
    }
  }
  
  if (hasWorkshopKit()) {
    return {
      hasAccess: true,
      reason: 'purchased',
      message: 'Access granted via purchase'
    }
  }
  
  return {
    hasAccess: false,
    reason: 'no_access',
    message: 'Please purchase Workshop Kit or upgrade to Creator Pass',
    price: PRICING.WORKSHOP_KIT.price,
    currency: PRICING.WORKSHOP_KIT.currency
  }
}

/**
 * Check if user has access to Audit Service
 * @returns {Object} Access status with reason
 */
export const canAccessAuditService = () => {
  if (hasCreatorPass()) {
    return {
      hasAccess: true,
      reason: 'creator_pass',
      message: 'Access granted via Creator Pass',
      plan: 'professional'
    }
  }
  
  const subscription = getUserSubscriptionStatus()
  if (subscription.isActive) {
    return {
      hasAccess: true,
      reason: 'subscription',
      message: 'Access granted via subscription',
      plan: subscription.plan
    }
  }
  
  return {
    hasAccess: false,
    reason: 'no_subscription',
    message: 'Please subscribe to Audit Service or upgrade to Creator Pass',
    price: PRICING.AUDIT_SERVICE.price,
    currency: PRICING.AUDIT_SERVICE.currency
  }
}

/**
 * Check if user has access to premium add-ons
 * @param {string} addonId - The addon identifier
 * @returns {Object} Access status with discount info
 */
export const canAccessAddon = (addonId) => {
  const hasPass = hasCreatorPass()
  const isPurchased = hasPurchasedAddon(addonId)
  
  return {
    hasAccess: hasPass || isPurchased,
    hasDiscount: hasPass,
    discountPercentage: hasPass ? 20 : 0, // Default 20%, can vary per addon
    reason: isPurchased ? 'purchased' : (hasPass ? 'creator_pass' : 'no_access')
  }
}

/**
 * Check if user has access to automation features
 * @returns {Object} Access status
 */
export const canAccessAutomation = () => {
  if (hasCreatorPass()) {
    return {
      hasAccess: true,
      reason: 'creator_pass',
      message: 'Automation Starter Pack included with Creator Pass'
    }
  }
  
  return {
    hasAccess: false,
    reason: 'no_access',
    message: 'Upgrade to Creator Pass to unlock Automation features'
  }
}

/**
 * Check if user has access to brand builder tools
 * @returns {Object} Access status
 */
export const canAccessBrandBuilder = () => {
  if (hasCreatorPass()) {
    return {
      hasAccess: true,
      reason: 'creator_pass',
      message: 'Brand Builder Toolkit included with Creator Pass'
    }
  }
  
  return {
    hasAccess: false,
    reason: 'no_access',
    message: 'Upgrade to Creator Pass to unlock Brand Builder features'
  }
}

// ============================================================================
// PAYMENT ACTION HELPERS
// ============================================================================

/**
 * Initiate Workshop Kit purchase
 * @param {Function} onSuccess - Callback on successful purchase
 * @param {Function} onError - Callback on error
 */
export const purchaseWorkshopKit = async (onSuccess, onError) => {
  try {
    // TODO: Implement actual payment gateway integration
    console.log('Initiating Workshop Kit purchase...')
    
    // Mock payment flow
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local state (replace with actual API call)
    localStorage.setItem('vauntico_workshop_kit', 'true')
    mockUserState.hasWorkshopKit = true
    
    if (onSuccess) onSuccess()
  } catch (error) {
    console.error('Purchase failed:', error)
    if (onError) onError(error)
  }
}

/**
 * Initiate Audit Service subscription
 * @param {string} plan - The plan to subscribe to
 * @param {Function} onSuccess - Callback on successful subscription
 * @param {Function} onError - Callback on error
 */
export const subscribeToAuditService = async (plan, onSuccess, onError) => {
  try {
    // TODO: Implement actual payment gateway integration
    console.log(`Initiating Audit Service subscription: ${plan}`)
    
    // Mock subscription flow
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local state (replace with actual API call)
    const subscriptionData = {
      status: 'active',
      plan: plan,
      isActive: true
    }
    localStorage.setItem('vauntico_audit_subscription', JSON.stringify(subscriptionData))
    mockUserState.auditSubscriptionStatus = 'active'
    mockUserState.auditSubscriptionPlan = plan
    
    if (onSuccess) onSuccess()
  } catch (error) {
    console.error('Subscription failed:', error)
    if (onError) onError(error)
  }
}

/**
 * Initiate Creator Pass subscription
 * @param {Function} onSuccess - Callback on successful subscription
 * @param {Function} onError - Callback on error
 */
export const subscribeToCreatorPass = async (onSuccess, onError) => {
  try {
    // TODO: Implement actual payment gateway integration
    console.log('Initiating Creator Pass subscription...')
    
    // Mock subscription flow
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local state (replace with actual API call)
    localStorage.setItem('vauntico_creator_pass', 'true')
    mockUserState.hasCreatorPass = true
    
    if (onSuccess) onSuccess()
  } catch (error) {
    console.error('Subscription failed:', error)
    if (onError) onError(error)
  }
}

/**
 * Initiate Creator Pass tier subscription
 * @param {string} tier - The tier to subscribe to (starter, pro, legacy)
 * @param {string} billingCycle - The billing cycle (monthly, yearly)
 * @param {Function} onSuccess - Callback on successful subscription
 * @param {Function} onError - Callback on error
 */
export const subscribeToCreatorPassTier = async (tier, billingCycle, onSuccess, onError) => {
  try {
    // TODO: Implement actual payment gateway integration
    console.log(`Initiating Creator Pass ${tier} subscription (${billingCycle})...`)
    
    // Mock subscription flow
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update local state (replace with actual API call)
    const subscriptionData = {
      hasPass: true,
      tier: tier,
      billingCycle: billingCycle,
      subscribedAt: new Date().toISOString()
    }
    
    localStorage.setItem('vauntico_creator_pass', 'true')
    localStorage.setItem('vauntico_creator_pass_tier', JSON.stringify(subscriptionData))
    mockUserState.hasCreatorPass = true
    
    if (onSuccess) onSuccess(subscriptionData)
  } catch (error) {
    console.error('Subscription failed:', error)
    if (onError) onError(error)
  }
}

/**
 * Get user's current Creator Pass tier
 * @returns {Object|null} Tier information or null if no subscription
 */
export const getCreatorPassTier = () => {
  if (!hasCreatorPass()) return null
  
  const storedTier = localStorage.getItem('vauntico_creator_pass_tier')
  if (storedTier) {
    try {
      return JSON.parse(storedTier)
    } catch (e) {
      console.error('Error parsing tier data:', e)
    }
  }
  
  // Default to Pro if no tier specified (backwards compatibility)
  return {
    hasPass: true,
    tier: 'pro',
    billingCycle: 'monthly',
    subscribedAt: null
  }
}

// ============================================================================
// REGIONAL CURRENCY SUPPORT
// ============================================================================

/**
 * Get user's currency based on locale
 * Uses browser locale or mocked IP detection
 * @returns {string} Currency code (USD or ZAR)
 */
export const getUserCurrency = () => {
  // Check if locale is manually set via dev tools
  const manualLocale = localStorage.getItem('vauntico_locale')
  if (manualLocale) {
    return manualLocale
  }
  
  // Mock IP-based detection using browser locale
  // In production, this would be replaced with actual IP geolocation
  try {
    const locale = navigator.language || navigator.userLanguage
    
    // Check for South African locale indicators
    if (locale.toLowerCase().includes('za') || locale.toLowerCase().startsWith('af')) {
      return 'ZAR'
    }
    
    // Check browser timezone as additional hint
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timezone && timezone.includes('Africa/Johannesburg')) {
      return 'ZAR'
    }
  } catch (e) {
    console.warn('Unable to detect locale:', e)
  }
  
  // Default to USD
  return 'USD'
}

/**
 * Get localized price for a product
 * @param {Object} product - Product object from PRICING
 * @returns {Object} Object with price, currency, and formatted string
 */
export const getLocalizedPrice = (product) => {
  const userCurrency = getUserCurrency()
  
  // Handle custom pricing
  if (product.price === 'custom') {
    return {
      price: 'custom',
      currency: userCurrency,
      formatted: 'Custom Pricing',
      symbol: getCurrencySymbol(userCurrency)
    }
  }
  
  // Get localized price if available
  let price = product.price
  let currency = product.currency || 'USD'
  
  if (product.localizedPrices && product.localizedPrices[userCurrency]) {
    price = product.localizedPrices[userCurrency]
    currency = userCurrency
  }
  
  const symbol = getCurrencySymbol(currency)
  const formatted = formatPrice(price, currency)
  
  return {
    price,
    currency,
    formatted,
    symbol
  }
}

/**
 * Get currency symbol for a currency code
 * @param {string} currency - Currency code (ZAR, USD)
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (currency) => {
  const currencySymbols = {
    ZAR: 'R',
    USD: '$'
  }
  return currencySymbols[currency] || currency
}

/**
 * Get approximate price in secondary currency
 * Useful for showing "approx. $X" to international users
 * @param {number} price - Price in primary currency
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {Object} Converted price info
 */
export const getApproximatePrice = (price, fromCurrency, toCurrency) => {
  if (price === 'custom' || price === 0) {
    return null
  }
  
  // Simple conversion rates (mock - in production use real-time rates)
  const conversionRates = {
    'ZAR_TO_USD': 0.055,
    'USD_TO_ZAR': 18.5
  }
  
  const rateKey = `${fromCurrency}_TO_${toCurrency}`
  const rate = conversionRates[rateKey]
  
  if (!rate) return null
  
  const convertedPrice = Math.round(price * rate)
  const symbol = getCurrencySymbol(toCurrency)
  
  return {
    price: convertedPrice,
    currency: toCurrency,
    formatted: `${symbol}${convertedPrice}`,
    approximate: true
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format price with currency
 * @param {number|string} price - The price value
 * @param {string} currency - Currency code (ZAR, USD)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'ZAR') => {
  if (price === 'custom') return 'Custom Pricing'

  const symbol = getCurrencySymbol(currency)
  // Use consistent formatting with commas instead of locale-dependent separators
  return `${symbol}${price.toLocaleString('en-US')}`
}

/**
 * Get discount amount for addon
 * @param {number} price - Original price
 * @param {number} discountPercentage - Discount percentage
 * @returns {Object} Discount info
 */
export const calculateDiscount = (price, discountPercentage) => {
  const discountAmount = price * (discountPercentage / 100)
  const finalPrice = price - discountAmount
  
  return {
    originalPrice: price,
    discountPercentage,
    discountAmount,
    finalPrice,
    savings: discountAmount
  }
}

/**
 * Check if product is unlocked by Creator Pass
 * @param {string} productKey - The product key from PRICING
 * @returns {boolean} True if Creator Pass unlocks this product
 */
export const isUnlockedByCreatorPass = (productKey) => {
  const product = PRICING[productKey]
  if (!product || !product.unlockConditions) return false
  return product.unlockConditions.creatorPass === true
}

// ============================================================================
// TESTING UTILITIES (Development only)
// ============================================================================

export const DEV_UTILS = {
  /**
   * Toggle Creator Pass for testing
   */
  toggleCreatorPass: () => {
    const current = hasCreatorPass()
    localStorage.setItem('vauntico_creator_pass', (!current).toString())
    mockUserState.hasCreatorPass = !current
    window.dispatchEvent(new Event('vauntico_access_changed'))
    console.log('Creator Pass:', !current ? 'ENABLED' : 'DISABLED')
  },
  
  /**
   * Set Creator Pass tier for testing
   */
  setCreatorPassTier: (tier = 'pro', billingCycle = 'monthly') => {
    const validTiers = ['starter', 'pro', 'legacy']
    if (!validTiers.includes(tier)) {
      console.error('Invalid tier. Use: starter, pro, or legacy')
      return
    }
    
    const subscriptionData = {
      hasPass: true,
      tier: tier,
      billingCycle: billingCycle,
      subscribedAt: new Date().toISOString()
    }
    
    localStorage.setItem('vauntico_creator_pass', 'true')
    localStorage.setItem('vauntico_creator_pass_tier', JSON.stringify(subscriptionData))
    mockUserState.hasCreatorPass = true
    window.dispatchEvent(new Event('vauntico_access_changed'))
    console.log(`Creator Pass set to: ${tier} (${billingCycle})`)
  },
  
  /**
   * Toggle Workshop Kit for testing
   */
  toggleWorkshopKit: () => {
    const current = hasWorkshopKit()
    localStorage.setItem('vauntico_workshop_kit', (!current).toString())
    mockUserState.hasWorkshopKit = !current
    window.dispatchEvent(new Event('vauntico_access_changed'))
    console.log('Workshop Kit:', !current ? 'ENABLED' : 'DISABLED')
  },
  
  /**
   * Set audit subscription for testing
   */
  setAuditSubscription: (plan = 'professional') => {
    const subscriptionData = {
      status: 'active',
      plan: plan,
      isActive: true
    }
    localStorage.setItem('vauntico_audit_subscription', JSON.stringify(subscriptionData))
    mockUserState.auditSubscriptionStatus = 'active'
    mockUserState.auditSubscriptionPlan = plan
    window.dispatchEvent(new Event('vauntico_access_changed'))
    console.log('Audit Subscription:', plan)
  },
  
  /**
   * Set locale for testing regional pricing
   * @param {string} locale - 'USD' or 'ZAR'
   */
  setLocale: (locale) => {
    if (!['USD', 'ZAR'].includes(locale)) {
      console.error('Invalid locale. Use "USD" or "ZAR"')
      return
    }
    localStorage.setItem('vauntico_locale', locale)
    window.dispatchEvent(new Event('vauntico_locale_changed'))
    console.log(`💱 Locale set to: ${locale}`)
    console.log(`Detected currency: ${getUserCurrency()}`)
    console.log('🔄 Refresh the page to see updated prices')
  },
  
  /**
   * Clear locale override
   */
  clearLocale: () => {
    localStorage.removeItem('vauntico_locale')
    window.dispatchEvent(new Event('vauntico_locale_changed'))
    console.log('💱 Locale cleared, using auto-detection')
    console.log(`Detected currency: ${getUserCurrency()}`)
  },
  
  /**
   * Clear all access for testing
   */
  clearAll: () => {
    localStorage.removeItem('vauntico_creator_pass')
    localStorage.removeItem('vauntico_workshop_kit')
    localStorage.removeItem('vauntico_audit_subscription')
    localStorage.removeItem('vauntico_purchased_addons')
    localStorage.removeItem('vauntico_locale')
    mockUserState = {
      hasCreatorPass: false,
      hasWorkshopKit: false,
      auditSubscriptionStatus: null,
      auditSubscriptionPlan: null,
      purchasedAddons: []
    }
    window.dispatchEvent(new Event('vauntico_access_changed'))
    console.log('All access cleared')
  },
  
  /**
   * Log current access state
   */
  logState: () => {
    console.log('=== Current Access State ===')
    console.log('Creator Pass:', hasCreatorPass())
    console.log('Workshop Kit:', hasWorkshopKit())
    console.log('Audit Subscription:', getUserSubscriptionStatus())
    console.log('Workshop Kit Access:', canAccessWorkshopKit())
    console.log('Audit Service Access:', canAccessAuditService())
    console.log('Current Currency:', getUserCurrency())
    console.log('===========================')
  }
}

// Expose dev utilities to window in development only
if (import.meta.env.DEV) {
  window.VaunticoDev = DEV_UTILS
  console.log('🔧 Vauntico Dev Utilities available via window.VaunticoDev')
  console.log('Commands: toggleCreatorPass(), toggleWorkshopKit(), setAuditSubscription(), clearAll(), logState()')
  console.log('💱 Regional Pricing: setLocale("USD" | "ZAR"), clearLocale()')
  console.log(`💰 Current currency: ${getUserCurrency()}`)
} else {
  // Production: Dev utilities not available
  console.log('✨ Vauntico MVP - Production Mode')
}

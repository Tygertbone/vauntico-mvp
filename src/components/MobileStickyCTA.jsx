/**
 * MobileStickyCTA Component
 * 
 * Sticky call-to-action bar for mobile devices
 * Appears at bottom of screen for easy thumb access
 * 
 * Features:
 * - Auto-hide on scroll down
 * - Auto-show on scroll up
 * - Customizable CTA text and action
 * - Dismissible
 * 
 * Usage:
 * <MobileStickyCTA 
 *   text="Get Started Free"
 *   onClick={() => navigate('/creator-pass')}
 *   variant="primary"
 * />
 */

import { useState, useEffect } from 'react'

const MobileStickyCTA = ({
  text = 'Get Started',
  onClick,
  href,
  variant = 'primary', // 'primary', 'secondary', 'upgrade'
  icon = null,
  dismissible = true,
  autoHide = true, // Hide on scroll down, show on scroll up
  showAfterScroll = 200 // Show after scrolling X pixels
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('up')

  useEffect(() => {
    // Check if previously dismissed
    const dismissed = sessionStorage.getItem('vauntico_mobile_cta_dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)

      // Show/hide logic
      if (currentScrollY > showAfterScroll) {
        if (autoHide) {
          // Auto-hide on scroll down, show on scroll up
          setIsVisible(scrollDirection === 'up' || currentScrollY === 0)
        } else {
          // Always show after threshold
          setIsVisible(true)
        }
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, scrollDirection, autoHide, showAfterScroll])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem('vauntico_mobile_cta_dismissed', 'true')
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      window.location.href = href
    }
  }

  // Don't render if dismissed or on desktop
  if (isDismissed || window.innerWidth > 768) {
    return null
  }

  const variantStyles = {
    primary: 'bg-vault-purple text-white hover:bg-vault-purple/90',
    secondary: 'bg-vault-blue text-white hover:bg-vault-blue/90',
    upgrade: 'bg-gradient-to-r from-vault-purple to-vault-blue text-white',
    outline: 'bg-white text-vault-purple border-2 border-vault-purple hover:bg-vault-purple hover:text-white'
  }

  return (
    <div
      className={`mobile-sticky-cta ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'} transition-all duration-300 ease-in-out`}
      role="complementary"
      aria-label="Mobile call to action"
    >
      <div className="flex items-center gap-3">
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition-colors p-2"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          onClick={handleClick}
          className={`flex-1 ${variantStyles[variant]} font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg active:scale-95 flex items-center justify-center gap-2`}
        >
          {icon && <span className="text-xl">{icon}</span>}
          <span>{text}</span>
        </button>
      </div>
    </div>
  )
}

/**
 * Page-specific preset CTAs
 */

export const LoreVaultCTA = () => (
  <MobileStickyCTA
    text="Unlock All Scrolls"
    icon="🔓"
    href="/creator-pass"
    variant="upgrade"
  />
)

export const CreatorPassCTA = () => (
  <MobileStickyCTA
    text="Start Free Trial"
    icon="🚀"
    onClick={() => {
      // Scroll to pricing section
      document.querySelector('.pricing-grid')?.scrollIntoView({ behavior: 'smooth' })
    }}
    variant="primary"
  />
)

export const DashboardCTA = () => (
  <MobileStickyCTA
    text="Upgrade to Pro"
    icon="💎"
    href="/creator-pass"
    variant="upgrade"
    dismissible={true}
  />
)

export const ScrollLockedCTA = ({ scrollTitle }) => (
  <MobileStickyCTA
    text={`Unlock "${scrollTitle}"`}
    icon="🔓"
    href="/creator-pass"
    variant="primary"
    dismissible={false}
  />
)

export default MobileStickyCTA

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic Usage:
 * <MobileStickyCTA 
 *   text="Get Started" 
 *   onClick={() => console.log('Clicked!')}
 * />
 * 
 * 2. With Link:
 * <MobileStickyCTA 
 *   text="View Pricing" 
 *   href="/pricing"
 *   icon="💰"
 * />
 * 
 * 3. Preset CTAs:
 * import { LoreVaultCTA } from './MobileStickyCTA'
 * <LoreVaultCTA />
 * 
 * 4. Custom Variant:
 * <MobileStickyCTA 
 *   text="Upgrade Now"
 *   variant="upgrade"
 *   dismissible={false}
 * />
 */

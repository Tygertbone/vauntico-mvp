/**
 * SocialProof Component
 * 
 * Displays live social proof elements to build trust and urgency
 * 
 * TODO:
 * - Connect to real user activity feed
 * - Add geographic diversity (users from X countries)
 * - Implement real-time WebSocket updates
 * - Add trust badges (security, uptime, etc.)
 * 
 * Priority: HIGH - Critical for trust and conversion
 */

import { useState, useEffect } from 'react'

/**
 * LiveActivityFeed - Shows recent user actions
 */
export const LiveActivityFeed = ({ variant = 'compact' }) => {
  const [activities, setActivities] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // TODO: Replace with real WebSocket or API polling
  const mockActivities = [
    { user: 'Sarah from NYC', action: 'upgraded to Pro', time: '2 min ago', avatar: '👩‍💼' },
    { user: 'Marcus from London', action: 'unlocked Agency Scroll', time: '5 min ago', avatar: '👨‍💻' },
    { user: 'Zara from Mumbai', action: 'joined Legacy tier', time: '8 min ago', avatar: '👩‍🏫' },
    { user: 'Alex from Berlin', action: 'completed CLI Onboarding', time: '12 min ago', avatar: '👨‍🎨' },
    { user: 'Maya from Tokyo', action: 'generated 100th asset', time: '15 min ago', avatar: '👩‍🎤' },
  ]

  useEffect(() => {
    setActivities(mockActivities)
    
    // Rotate activities every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockActivities.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (variant === 'compact' && activities.length > 0) {
    const activity = activities[currentIndex]
    return (
      <div className="fixed bottom-6 left-6 bg-white rounded-lg shadow-xl p-4 max-w-sm animate-slide-up z-50 border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-vault-purple to-vault-blue rounded-full flex items-center justify-center text-xl">
            {activity.avatar}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              <span className="font-bold">{activity.user}</span> {activity.action}
            </p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
          <div className="text-vault-purple animate-pulse">✨</div>
        </div>
      </div>
    )
  }

  // Full list variant
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="animate-pulse mr-2">🔴</span>
        Live Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-vault-purple to-vault-blue rounded-full flex items-center justify-center text-lg">
              {activity.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{activity.user}</span>{' '}
                <span className="text-gray-600">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * UserCountBadge - Shows total user count with animation
 */
export const UserCountBadge = ({ count = 2500, label = 'creators' }) => {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    // Animate count up
    let start = 0
    const end = count
    const duration = 2000 // 2 seconds
    const increment = end / (duration / 16) // 60fps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setDisplayCount(end)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [count])

  return (
    <div className="inline-flex items-center space-x-2 bg-vault-purple/10 text-vault-purple px-4 py-2 rounded-full font-semibold">
      <span className="text-2xl">👥</span>
      <span>
        {displayCount.toLocaleString()}+ {label}
      </span>
    </div>
  )
}

/**
 * TrustBadges - Security and compliance badges
 */
export const TrustBadges = ({ layout = 'horizontal' }) => {
  const badges = [
    { icon: '🔒', label: 'SSL Encrypted', description: 'Bank-grade security' },
    { icon: '☁️', label: '99.9% Uptime', description: 'Always available' },
    { icon: '💳', label: 'PCI Compliant', description: 'Secure payments' },
    { icon: '🛡️', label: 'GDPR Ready', description: 'Privacy first' },
    { icon: '⚡', label: 'Fast Support', description: '< 12hr response' },
  ]

  if (layout === 'horizontal') {
    return (
      <div className="flex flex-wrap justify-center gap-6 py-8">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mb-2 group-hover:bg-vault-purple/10 transition-colors">
              {badge.icon}
            </div>
            <p className="text-sm font-semibold text-gray-900">{badge.label}</p>
            <p className="text-xs text-gray-500">{badge.description}</p>
          </div>
        ))}
      </div>
    )
  }

  // Vertical layout
  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-4">Trusted & Secure</h3>
      <div className="space-y-3">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              {badge.icon}
            </div>
            <div>
              <p className="font-semibold text-sm">{badge.label}</p>
              <p className="text-xs text-gray-500">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * StatsBar - Key platform metrics
 */
export const StatsBar = () => {
  const stats = [
    { label: 'Creators', value: '2,500+', icon: '👥' },
    { label: 'Scrolls Read', value: '50k+', icon: '📜' },
    { label: 'Assets Generated', value: '1M+', icon: '✨' },
    { label: 'Hours Saved', value: '100k+', icon: '⏰' },
  ]

  return (
    <div className="bg-gradient-to-r from-vault-purple via-vault-blue to-vault-cyan text-white py-8 px-6 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * ReviewStars - Aggregate review score
 */
export const ReviewStars = ({ rating = 4.8, reviewCount = 350 }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, idx) => {
          if (idx < fullStars) {
            return <span key={idx} className="text-yellow-400 text-xl">★</span>
          } else if (idx === fullStars && hasHalfStar) {
            return <span key={idx} className="text-yellow-400 text-xl">⯪</span>
          } else {
            return <span key={idx} className="text-gray-300 text-xl">★</span>
          }
        })}
      </div>
      <span className="font-bold text-lg">{rating}</span>
      <span className="text-gray-500 text-sm">({reviewCount} reviews)</span>
    </div>
  )
}

/**
 * MoneyBackGuarantee - Risk reversal badge
 */
export const MoneyBackGuarantee = ({ days = 14 }) => {
  return (
    <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 text-green-800 px-6 py-3 rounded-xl font-semibold">
      <span className="text-3xl">💚</span>
      <div>
        <p className="font-bold">{days}-Day Money-Back Guarantee</p>
        <p className="text-sm font-normal">No questions asked</p>
      </div>
    </div>
  )
}

/**
 * AsSeenOn - Media mentions/partnerships
 */
export const AsSeenOn = () => {
  // TODO: Replace with real logos
  const publications = [
    { name: 'TechCrunch', logo: '📰' },
    { name: 'Product Hunt', logo: '🚀' },
    { name: 'Indie Hackers', logo: '🛠️' },
    { name: 'The Hustle', logo: '💼' },
  ]

  return (
    <div className="text-center py-8">
      <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">As Featured On</p>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {publications.map((pub, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-gray-600 hover:text-vault-purple transition-colors">
            <span className="text-2xl">{pub.logo}</span>
            <span className="font-semibold">{pub.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default {
  LiveActivityFeed,
  UserCountBadge,
  TrustBadges,
  StatsBar,
  ReviewStars,
  MoneyBackGuarantee,
  AsSeenOn,
}

/**
 * AUDIT TODO LIST:
 * 
 * 1. DATA INTEGRATION
 *    - [ ] Connect to real-time user activity API
 *    - [ ] Implement WebSocket for live updates
 *    - [ ] Add geographic diversity tracking
 *    - [ ] Cache stats for performance
 * 
 * 2. ANALYTICS
 *    - [ ] Track which social proof elements drive conversions
 *    - [ ] A/B test live feed placement
 *    - [ ] Track trust badge hover/click rates
 *    - [ ] Monitor correlation between social proof and signup
 * 
 * 3. UX ENHANCEMENTS
 *    - [ ] Add close button for live feed
 *    - [ ] Make live feed non-intrusive (slide in/out)
 *    - [ ] Add animation polish
 *    - [ ] Test mobile placement
 * 
 * 4. CONTENT
 *    - [ ] Get real media logos/partnerships
 *    - [ ] Add verified review sources (G2, Capterra)
 *    - [ ] Create case study links from stats
 *    - [ ] Add video testimonial integration
 * 
 * 5. CONVERSION OPTIMIZATION
 *    - [ ] Test urgency elements (X spots left)
 *    - [ ] Add scarcity (limited early access)
 *    - [ ] Create FOMO with live activity
 *    - [ ] Test guarantee badge variations
 */

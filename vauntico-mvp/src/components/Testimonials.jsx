/**
 * Testimonials Component
 * 
 * TODO: Replace placeholder data with real testimonials
 * Priority: HIGH - Critical for social proof and conversion
 * 
 * Implementation Notes:
 * - Fetch from CMS or JSON file
 * - Add video testimonial support
 * - Implement carousel for mobile
 * - Add verified badge icons
 * - Track clicks to full testimonial pages
 */

import { useState } from 'react'

const Testimonials = ({ variant = 'carousel', limit = 3 }) => {
  // TODO: Replace with actual API call or CMS integration
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Solo Creator',
      tier: 'Pro',
      avatar: '👩‍💼',
      quote: 'Vauntico transformed my content workflow. I went from 2 posts a week to 10, without sacrificing quality.',
      metrics: { before: '2 posts/week', after: '10 posts/week' },
      verified: true,
      video: null, // TODO: Add video URL
      platform: 'Twitter',
      handle: '@sarahcreates',
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Agency Owner',
      tier: 'Legacy',
      avatar: '👨‍💻',
      quote: 'The CLI saved us 20+ hours per week. Our team can now serve 3x more clients with the same headcount.',
      metrics: { before: '5 clients', after: '15 clients' },
      verified: true,
      video: null, // TODO: Add video URL
      platform: 'LinkedIn',
      handle: 'marcusrodriguez',
    },
    {
      id: 3,
      name: 'Zara Patel',
      role: 'Course Creator',
      tier: 'Pro',
      avatar: '👩‍🏫',
      quote: 'I built and launched my entire course funnel in 7 days using Vauntico. ROI was positive by week 2.',
      metrics: { before: '$0 revenue', after: '$12k/mo' },
      verified: true,
      video: null, // TODO: Add video URL
      platform: 'YouTube',
      handle: 'zarapatelcourses',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    )
  }

  // Carousel variant
  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayedTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-2 mt-6">
        {displayedTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-vault-purple' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="card hover:shadow-2xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-vault-purple to-vault-blue rounded-full flex items-center justify-center text-2xl">
            {testimonial.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-lg">{testimonial.name}</h4>
              {testimonial.verified && (
                <span className="text-vault-purple text-sm" title="Verified User">
                  ✓
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-vault-purple/10 text-vault-purple rounded-full">
          {testimonial.tier}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 italic mb-4 text-lg leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Metrics (Before/After) */}
      {testimonial.metrics && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase mb-1">Before</p>
            <p className="font-bold text-gray-700">{testimonial.metrics.before}</p>
          </div>
          <div className="text-vault-purple text-2xl">→</div>
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase mb-1">After</p>
            <p className="font-bold text-vault-purple">{testimonial.metrics.after}</p>
          </div>
        </div>
      )}

      {/* Social Link */}
      <a
        href={`https://${testimonial.platform.toLowerCase()}.com/${testimonial.handle.replace('@', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-vault-purple transition-colors"
      >
        {testimonial.handle} on {testimonial.platform}
      </a>

      {/* TODO: Add video testimonial player if video URL exists */}
      {testimonial.video && (
        <div className="mt-4">
          <button className="btn-outline w-full text-sm">
            ▶ Watch Video Testimonial
          </button>
        </div>
      )}
    </div>
  )
}

export default Testimonials

/**
 * AUDIT TODO LIST:
 * 
 * 1. DATA INTEGRATION
 *    - [ ] Connect to testimonials API/CMS
 *    - [ ] Add testimonial submission form
 *    - [ ] Implement video upload/hosting
 *    - [ ] Add moderation workflow
 * 
 * 2. ANALYTICS
 *    - [ ] Track testimonial views
 *    - [ ] Track clicks to social profiles
 *    - [ ] Track video testimonial plays
 *    - [ ] A/B test placement (hero vs pricing vs dedicated page)
 * 
 * 3. UX ENHANCEMENTS
 *    - [ ] Add auto-play carousel (optional)
 *    - [ ] Add filter by tier/role
 *    - [ ] Add search functionality
 *    - [ ] Add pagination for large datasets
 * 
 * 4. SEO
 *    - [ ] Add schema.org Review markup
 *    - [ ] Create dedicated testimonials page
 *    - [ ] Add testimonial RSS feed
 * 
 * 5. CONVERSION OPTIMIZATION
 *    - [ ] Add "Join them" CTA after each testimonial
 *    - [ ] Link to specific tiers mentioned
 *    - [ ] Add urgency ("Join 2,500+ creators")
 *    - [ ] Test video vs text testimonials
 */

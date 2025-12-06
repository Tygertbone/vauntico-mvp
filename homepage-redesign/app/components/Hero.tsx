'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { Terminal } from './Terminal'

interface HeroProps {
  variant: 'A' | 'B' | 'C'
}

export function Hero({ variant }: HeroProps) {
  const [showTerminal, setShowTerminal] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Start terminal animation after hero loads
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const variants = {
    A: {
      headline: 'Build Your Creator Business',
      subheading: 'in Minutes, Not Months',
      description: 'CLI automation meets trust scoring. Ship landing pages, workshops, and payment flows—AI handles the code, you handle the vision.'
    },
    B: {
      headline: 'AI-Powered Creator Platform.',
      subheading: 'Terminal-Fast. Human-Enlightened.',
      description: 'Generate workshops, trust scores, and payment systems through your terminal. Built for creators who move fast.'
    },
    C: {
      headline: 'Ship Landing Pages, Workshops',
      subheading: '& Payment Flows—Through Your Terminal',
      description: 'AI automation for the creator economy. No code required. Deploy production-ready platforms in minutes.'
    }
  }

  return (
    <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32 px-6" id="main-content">
      <div className="max-w-7xl mx-auto">

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-6"
          >
            {variants[variant].headline}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-primaryHover">
              {variants[variant].subheading}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {variants[variant].description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button variant="primary" size="lg" href="#get-started">
              Start Building Free
            </Button>
            <Button variant="secondary" size="lg" href="#demo">
              Watch Demo (2 min)
            </Button>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm text-text-tertiary"
          >
            Used by 500+ creators · Trusted by agencies · Open source components
          </motion.div>

        </motion.div>

        {/* Terminal Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <div className="max-w-6xl mx-auto">

            {/* Split Layout: Terminal Left, Output Right */}
            <div className="grid md:grid-cols-2 gap-8 items-start">

              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {showTerminal && <Terminal />}
              </motion.div>

              {/* Output Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="bg-background-surface border border-border-default rounded-xl p-6 md:p-8 space-y-6"
              >
                <div className="text-sm text-text-tertiary font-medium">
                  Generated Output Preview
                </div>

                {/* Mockup of generated landing page */}
                <div className="bg-background-primary rounded-lg p-6 space-y-4 shadow-lg">

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-primaryHover rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">V</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-6 bg-background-elevated rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-border-default rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="h-8 bg-accent-primary/20 rounded w-3/4"></div>
                    <div className="h-4 bg-border-default rounded w-full"></div>
                    <div className="h-4 bg-border-default rounded w-4/5"></div>
                    <div className="h-4 bg-border-default rounded w-2/3"></div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <div className="h-12 bg-gradient-to-r from-accent-primary to-accent-primaryHover rounded-lg w-36"></div>
                  </div>

                </div>

                {/* Trust Score Widget */}
                <div className="bg-background-primary border border-border-default rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-text-secondary">Trust Score</span>
                    <span className="text-lg font-bold text-green-400">87/100</span>
                  </div>
                  <div className="h-2 bg-border-default rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="text-xs text-text-tertiary">
                    Generated by AI analysis
                  </div>
                </div>

                <div className="text-xs text-text-tertiary pt-2 border-t border-border-default">
                  Complete with trust scoring, payment flows, and email automation
                </div>
              </motion.div>

            </div>

          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-20 text-center"
        >
          <p className="text-text-tertiary mb-6">
            Ready to ship production-ready creator platforms?
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
            <span>Try Vauntico free for 14 days</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

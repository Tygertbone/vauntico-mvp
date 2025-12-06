'use client'

import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'

export default function HomePage() {
  const [currentVariant, setCurrentVariant] = useState<'A' | 'B' | 'C'>('A')

  const handleVariantChange = (variant: 'A' | 'B' | 'C') => {
    setCurrentVariant(variant)
  }

  return (
    <div className="min-h-screen bg-background-primary">
      <Navigation
        variant={currentVariant}
        onVariantChange={handleVariantChange}
      />
      <Hero variant={currentVariant} />

      {/* Placeholder for additional sections */}
      <section className="py-20 bg-background-surface/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6">More sections coming soon...</h2>
          <p className="text-text-secondary text-lg">
            Problem/Solution • How It Works • Features • Pricing • Footer
          </p>
        </div>
      </section>
    </div>
  )
}

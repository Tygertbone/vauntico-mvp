'use client'

import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { ProblemSolution } from './components/ProblemSolution'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { InteractiveDemo } from './components/InteractiveDemo'
import { Pricing } from './components/Pricing'
import { TechnicalCredibility } from './components/TechnicalCredibility'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

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
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <InteractiveDemo />
      <Pricing />
      <TechnicalCredibility />
      <FinalCTA />
      <Footer />
    </div>
  )
}

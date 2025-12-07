'use client'

import { motion } from 'framer-motion'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      color: 'accent-primary/20',
      icon: '🎯',
      title: 'Describe Your Vision',
      description: 'Tell our AI what you want to build. Workshop kit? Landing page? Audit report? We handle the rest.'
    },
    {
      number: '02',
      color: 'accent-warning/20',
      icon: '🚀',
      title: 'AI Generates Everything',
      description: 'Trust scores, payment flows, email sequences—production-ready in minutes, powered by Claude AI.'
    },
    {
      number: '03',
      color: 'accent-success/20',
      icon: '⚡',
      title: 'Launch & Monetize',
      description: 'Deploy instantly to Vercel. Stripe and PayStack integrated. Start earning from day one.'
    }
  ]

  return (
    <section className="py-20 md:py-32 px-6 bg-background-surface/50">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary">
            Three steps from idea to monetization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-background-primary border border-border-default rounded-xl p-8 hover:border-border-hover transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`text-5xl font-bold text-${step.color} mb-4 flex-shrink-0`}>
                  {step.number}
                </div>
                <div className={`text-4xl group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent-primary transition-colors">
                {step.title}
              </h3>

              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

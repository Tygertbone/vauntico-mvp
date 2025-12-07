'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from './ui/Button'

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Get started with the basics',
      features: [
        '3 projects',
        'Basic trust scoring',
        'Community support'
      ],
      limitations: [
        'Advanced AI features',
        'API access',
        'Priority support'
      ],
      popular: false,
      buttonText: 'Get Started',
      buttonHref: '#get-started'
    },
    {
      name: 'Pro',
      price: { monthly: 49, annual: 39 },
      description: 'Perfect for active creators',
      features: [
        'Unlimited projects',
        'Advanced trust scoring',
        'Priority support',
        'API access',
        'Custom integrations'
      ],
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonHref: '#trial'
    },
    {
      name: 'Enterprise',
      price: { monthly: null, annual: null },
      description: 'For agencies and teams',
      features: [
        'Everything in Pro',
        'White label options',
        'Dedicated account manager',
        'SLA guarantees'
      ],
      popular: false,
      buttonText: 'Contact Sales',
      buttonHref: '#contact'
    }
  ]

  const savings = billingCycle === 'annual' ? 20 : 0

  return (
    <section id="pricing" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-text-secondary">
            Start free. Scale when you're ready.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-background-surface border border-border-default rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-accent-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'annual'
                  ? 'bg-accent-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Annual <span className="text-xs text-accent-success ml-1">(Save {savings}%)</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-background-surface border rounded-xl p-8 hover:shadow-xl hover:shadow-accent-primary/10 transition-all ${
                plan.popular
                  ? 'border-accent-primary shadow-lg shadow-accent-primary/20'
                  : 'border-border-default hover:border-border-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2">
                  <span className="bg-accent-primary text-text-primary text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    {plan.price.monthly === null
                      ? 'Custom'
                      : `$${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}`
                    }
                  </span>
                  {plan.price.monthly !== null && plan.price.monthly > 0 && (
                    <span className="text-text-tertiary">/month</span>
                  )}
                </div>
                {plan.price.monthly !== null && plan.price.monthly > 0 && billingCycle === 'annual' && (
                  <p className="text-sm text-accent-success mt-1">Save ${plan.price.monthly - plan.price.annual}/month</p>
                )}
                <p className="text-text-secondary text-sm mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations?.map((limitation, limitationIndex) => (
                  <li key={`limitation-${limitationIndex}`} className="flex items-start gap-3">
                    <span className="w-5 h-5 text-text-tertiary mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-text-tertiary text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
                href={plan.buttonHref}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-background-surface border border-border-default rounded-lg p-6">
              <h4 className="font-semibold mb-2">Can I switch plans anytime?</h4>
              <p className="text-text-secondary text-sm">Yes, upgrade or downgrade at any time. Changes take effect in your next billing cycle.</p>
            </div>
            <div className="bg-background-surface border border-border-default rounded-lg p-6">
              <h4 className="font-semibold mb-2">Is there a setup fee?</h4>
              <p className="text-text-secondary text-sm">No setup fees. Start for free and scale when you're ready to monetize.</p>
            </div>
            <div className="bg-background-surface border border-border-default rounded-lg p-6">
              <h4 className="font-semibold mb-2">What's included in Enterprise?</h4>
              <p className="text-text-secondary text-sm">Custom integrations, dedicated support, and white-label options for agencies.</p>
            </div>
            <div className="bg-background-surface border border-border-default rounded-lg p-6">
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-text-secondary text-sm">14-day money-back guarantee on all paid plans. No questions asked.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        '3 Vaults',
        '50 AI generations/month',
        '1 GB storage',
        'Basic templates',
        'Community support',
        'Single user',
      ],
      cta: 'Get Started',
      popular: false,
      color: 'gray',
    },
    {
      name: 'Creator Pass',
      price: '29',
      description: 'For serious content creators',
      features: [
        'Unlimited Vaults',
        'Unlimited AI generations',
        '100 GB storage',
        'Premium templates',
        'Priority support',
        'Up to 10 team members',
        'Advanced analytics',
        'Custom branding',
      ],
      cta: 'Start Free Trial',
      popular: true,
      color: 'purple',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large teams and organizations',
      features: [
        'Everything in Creator Pass',
        'Unlimited storage',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Unlimited team members',
        'Advanced security',
        'Training & onboarding',
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'blue',
    },
  ]

  const faqs = [
    {
      question: 'Can I switch plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for Enterprise plans.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 14-day free trial of the Creator Pass with no credit card required. You can cancel anytime during the trial.',
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You\'ll have 30 days to export your data after cancellation. After that, data is permanently deleted for security reasons.',
    },
    {
      question: 'Do you offer educational or non-profit discounts?',
      answer: 'Yes! We offer special pricing for educational institutions and non-profit organizations. Contact our sales team for details.',
    },
    {
      question: 'What\'s included in priority support?',
      answer: 'Priority support includes 24/7 access to our support team, faster response times, and direct access to senior engineers.',
    },
  ]

  const getButtonClass = (color, popular) => {
    if (popular) return 'btn-primary w-full text-lg py-3'
    if (color === 'blue') return 'btn-secondary w-full text-lg py-3'
    return 'btn-outline w-full text-lg py-3'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Simple, <span className="text-gradient">Transparent Pricing</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your needs. All plans include core features with no hidden fees.
        </p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
          <button className="px-6 py-2 rounded-full bg-white shadow-sm font-medium">
            Monthly
          </button>
          <button className="px-6 py-2 rounded-full font-medium text-gray-600">
            Annual <span className="text-green-600 text-sm ml-1">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`card ${
              plan.popular 
                ? 'border-2 border-vault-purple shadow-2xl scale-105 relative' 
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-vault-purple text-white px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-end justify-center mb-2">
                {plan.price === 'Custom' ? (
                  <span className="text-4xl font-bold">{plan.price}</span>
                ) : (
                  <>
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-gray-600 ml-2 mb-2">/month</span>
                  </>
                )}
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className={getButtonClass(plan.color, plan.popular)}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Compare All Features</h2>
        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4 font-semibold">Feature</th>
                <th className="text-center py-4 px-4 font-semibold">Free</th>
                <th className="text-center py-4 px-4 font-semibold">Creator Pass</th>
                <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Vaults</td>
                <td className="text-center py-3 px-4">3</td>
                <td className="text-center py-3 px-4">Unlimited</td>
                <td className="text-center py-3 px-4">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">AI Generations</td>
                <td className="text-center py-3 px-4">50/month</td>
                <td className="text-center py-3 px-4">Unlimited</td>
                <td className="text-center py-3 px-4">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Storage</td>
                <td className="text-center py-3 px-4">1 GB</td>
                <td className="text-center py-3 px-4">100 GB</td>
                <td className="text-center py-3 px-4">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Team Members</td>
                <td className="text-center py-3 px-4">1</td>
                <td className="text-center py-3 px-4">10</td>
                <td className="text-center py-3 px-4">Unlimited</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Analytics</td>
                <td className="text-center py-3 px-4">Basic</td>
                <td className="text-center py-3 px-4">Advanced</td>
                <td className="text-center py-3 px-4">Advanced</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Support</td>
                <td className="text-center py-3 px-4">Community</td>
                <td className="text-center py-3 px-4">Priority</td>
                <td className="text-center py-3 px-4">Dedicated</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Custom Branding</td>
                <td className="text-center py-3 px-4">✗</td>
                <td className="text-center py-3 px-4 text-green-500">✓</td>
                <td className="text-center py-3 px-4 text-green-500">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4">API Access</td>
                <td className="text-center py-3 px-4">✗</td>
                <td className="text-center py-3 px-4">✗</td>
                <td className="text-center py-3 px-4 text-green-500">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center vault-gradient rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of creators already using Vauntico
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-white text-vault-purple hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
            Start Free Trial
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-vault-purple font-semibold py-3 px-8 rounded-lg transition-all duration-200">
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pricing

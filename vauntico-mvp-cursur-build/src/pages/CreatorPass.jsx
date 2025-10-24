function CreatorPass() {
  const benefits = [
    {
      icon: '🚀',
      title: 'Unlimited AI Generation',
      description: 'Generate unlimited content with our advanced AI models'
    },
    {
      icon: '🗄️',
      title: 'Unlimited Vaults',
      description: 'Create and manage unlimited content vaults'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Invite unlimited team members to collaborate'
    },
    {
      icon: '🎨',
      title: 'Premium Templates',
      description: 'Access exclusive templates and design assets'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Deep insights into content performance'
    },
    {
      icon: '🔒',
      title: 'Priority Support',
      description: '24/7 dedicated support for your team'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-block vault-gradient text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          CREATOR PASS
        </div>
        <h1 className="text-5xl font-bold mb-4">
          Unlock Your <span className="text-gradient">Creative Potential</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Get unlimited access to all premium features and take your content creation to the next level
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="btn-primary text-lg px-8 py-3">
            Get Creator Pass
          </button>
          <button className="btn-outline text-lg px-8 py-3">
            Learn More
          </button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="card group hover:border-vault-purple">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Card */}
      <div className="max-w-md mx-auto">
        <div className="card border-2 border-vault-purple">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Creator Pass</h3>
            <div className="flex items-end justify-center mb-4">
              <span className="text-5xl font-bold">$29</span>
              <span className="text-gray-600 ml-2 mb-2">/month</span>
            </div>
            <p className="text-gray-600">Billed monthly, cancel anytime</p>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unlimited AI content generation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unlimited vaults and storage</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Team collaboration tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Premium templates & assets</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Advanced analytics & insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Priority 24/7 support</span>
            </li>
          </ul>
          
          <button className="btn-primary w-full text-lg py-3">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">Yes! You can cancel your subscription at any time. You'll retain access until the end of your billing period.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">Yes! We offer a 14-day free trial with full access to all Creator Pass features.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards, PayPal, and various other payment methods.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatorPass

import React from "react";
import { Link } from "react-router-dom";

function Pricing({ plans, workshopKitPrice, workshopApprox, auditServicePrice, auditApprox, currentCurrency, faqs }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your creator journey. All plans include Trust Score calculation and platform connections.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`card ${plan.popular ? 'border-2 border-purple-500 shadow-2xl' : ''}`}
            >
              {plan.popular && (
                <div className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                  MOST POPULAR
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center mb-2">
                  {plan.price === "Custom" ? (
                    <span className="text-4xl font-bold">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold">
                        {plan.priceFormatted || `$${plan.price}`}
                      </span>
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

              <Link
                to={plan.cta === "Get Started" ? "/signup" : "/contact"}
                className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr>
                  <th className="border p-4 text-left font-bold bg-gray-50">Features</th>
                  <th className="border p-4 text-center font-bold bg-gray-50">Free</th>
                  <th className="border p-4 text-center font-bold bg-purple-50">Pro</th>
                  <th className="border p-4 text-center font-bold bg-yellow-50">Agency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-4 font-semibold">Trust Score Calculation</td>
                  <td className="border p-4 text-center text-green-600 font-bold">✓</td>
                  <td className="border p-4 text-center text-green-600 font-bold">✓</td>
                  <td className="border p-4 text-center text-green-600 font-bold">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-4 font-semibold">Platform Connections</td>
                  <td className="border p-4 text-center">3</td>
                  <td className="border p-4 text-center">Unlimited</td>
                  <td className="border p-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Score Sharing Tools</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-green-600">✓</td>
                  <td className="border p-4 text-center text-green-600">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-4 font-semibold">Analytics Depth</td>
                  <td className="border p-4 text-center">Basic</td>
                  <td className="border p-4 text-center">Detailed</td>
                  <td className="border p-4 text-center">Advanced</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">Team Features</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-green-600">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-4 font-semibold">White-label Reports</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="border p-4 font-semibold">API Access</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-gray-400">✗</td>
                  <td className="border p-4 text-center text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">
            Extend with <span className="text-gradient">Add-ons</span>
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Supercharge your experience with powerful add-ons. Available with any plan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Workshop Kit */}
            <div className="card text-center hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2">Workshop Kit</h3>
              <p className="text-gray-600 mb-4">Complete brand starter pack</p>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {workshopKitPrice?.formatted || "R499"}
              </div>
              {workshopApprox && (
                <div className="text-sm text-gray-400 mb-4">≈ {workshopApprox.formatted}</div>
              )}
              <Link to="/workshop-kit" className="btn-outline w-full inline-block">
                Learn More
              </Link>
            </div>

            {/* Audit Service */}
            <div className="card text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-purple-500">
              <div className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
                POPULAR
              </div>
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Audit Service</h3>
              <p className="text-gray-600 mb-4">Ongoing score monitoring</p>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {auditServicePrice?.formatted || "R999"}
                <span className="text-base text-gray-600">/mo</span>
              </div>
              {auditApprox && (
                <div className="text-sm text-gray-400 mb-4">≈ {auditApprox.formatted}/mo</div>
              )}
              <Link to="/audit-service" className="btn-primary w-full inline-block">
                Subscribe Now
              </Link>
            </div>

            {/* More Add-ons */}
            <div className="card text-center hover:shadow-xl transition-all hover:scale-105">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">More Add-ons</h3>
              <p className="text-gray-600 mb-4">Automation, analytics & more</p>
              <div className="text-3xl font-bold text-purple-600 mb-4">
                From {currentCurrency === "ZAR" ? "R199" : "$12"}
              </div>
              <Link to="/addons" className="btn-outline w-full inline-block">
                Browse All
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs && faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Boost Your Creator Credibility?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators tracking their Trust Score
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Get Your Trust Score →
            </Link>
            <Link
              to="/dashboard"
              className="bg-purple-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-purple-800 transition-all border-2 border-white"
            >
              View Demo Dashboard
            </Link>
          </div>
          <div className="mt-8 p-6 bg-white/10 rounded-xl inline-block">
            <p className="font-semibold text-lg">✅ 30-Day Money-Back Guarantee</p>
            <p className="text-sm opacity-75 mt-2">Try risk-free. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

import React from "react";
import { Link } from "react-router-dom";

function Pricing({ plans, workshopKitPrice, workshopApprox, auditServicePrice, auditApprox, currentCurrency, faqs }) {
  return (
    <>
      {/* Plan Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, idx) => (
          <div key={idx} className="card">
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

            <button className={plan.buttonClass || "btn-primary"}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
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
            <div className="text-3xl font-bold text-vault-purple mb-2">
              {workshopKitPrice.formatted}
            </div>
            {workshopApprox && (
              <div className="text-sm text-gray-400 mb-4">≈ {workshopApprox.formatted}</div>
            )}
            <a href="/workshop-kit" className="btn-outline w-full inline-block">
              Learn More
            </a>
          </div>

          {/* Audit Service */}
          <div className="card text-center hover:shadow-xl transition-all hover:scale-105 border-2 border-vault-purple">
            <div className="bg-vault-purple text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-3">
              POPULAR
            </div>
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Audit Service</h3>
            <p className="text-gray-600 mb-4">Ongoing code health monitoring</p>
            <div className="text-3xl font-bold text-vault-purple mb-2">
              {auditServicePrice.formatted}
              <span className="text-base text-gray-600">/mo</span>
            </div>
            {auditApprox && (
              <div className="text-sm text-gray-400 mb-4">≈ {auditApprox.formatted}/mo</div>
            )}
            <a href="/audit-service" className="btn-primary w-full inline-block">
              Subscribe Now
            </a>
          </div>

          {/* More Add-ons */}
          <div className="card text-center hover:shadow-xl transition-all hover:scale-105">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">More Add-ons</h3>
            <p className="text-gray-600 mb-4">Automation, analytics & more</p>
            <div className="text-3xl font-bold text-vault-purple mb-4">
              From {currentCurrency === "ZAR" ? "R199" : "$12"}
            </div>
            <a href="/addons" className="btn-outline w-full inline-block">
              Browse All
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Boost Your <span className="text-gradient">Creator Cred</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of creators already using Vauntico to prove their platform value
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link to="/signup" className="btn-primary text-xl px-10 py-4">
            Get Started Now
          </Link>
          <Link to="/demo" className="btn-outline text-xl px-10 py-4">
            Watch Demo
          </Link>
        </div>
      </div>
    </>
  );
}

export default Pricing;

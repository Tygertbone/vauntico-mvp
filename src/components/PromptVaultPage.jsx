import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Zap, Target, MessageSquare, Users } from 'lucide-react'
import vaunticoBanner from '../assets/vauntico_banner.webp'
import PaystackButton from './PaystackButton'

const PromptVaultPage = () => {
  const handleGumroadCheckout = () => {
    window.open('https://selldigital.gumroad.com/l/usyjwv', '_blank')
  }

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-[var(--vauntico-gold)]" />,
      title: "Brand Voice Generator",
      description: "Craft compelling, consistent messaging that converts. Includes prompts for tone, style, and audience targeting."
    },
    {
      icon: <Target className="w-6 h-6 text-[var(--vauntico-gold)]" />,
      title: "Funnel Builder",
      description: "Design high‑converting sales sequences from awareness to purchase. Includes prompts for landing pages, email sequences, and upsells."
    },
    {
      icon: <Zap className="w-6 h-6 text-[var(--vauntico-gold)]" />,
      title: "Content Engine",
      description: "Generate engaging posts, emails, and campaigns at scale. Includes prompts for social media, blogs, and ad copy."
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--vauntico-gold)]" />,
      title: "Customer Success",
      description: "Automate support, onboarding, and retention workflows. Includes prompts for FAQs, tutorials, and customer engagement."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src={vaunticoBanner} 
              alt="Vauntico Logo" 
              className="h-20 mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Vauntico Prompt Vault
            <span className="block text-2xl md:text-3xl font-normal text-gray-300 mt-2">
              Founders' Edition
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Welcome to the Vauntico Prompt Vault — your premium library of AI prompts designed to help you 
            <span className="text-[var(--vauntico-gold)] font-semibold"> launch faster, scale smarter, and monetize with precision</span>.
          </p>
          
          {/* Product Preview Placeholder */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
            <div className="text-gray-400 text-lg">
              📋 Product Preview Coming Soon
            </div>
            <p className="text-gray-500 mt-2">Interactive preview of the prompt vault contents</p>
          </div>
          
          {/* Checkout Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <PaystackButton 
              amount={97}
              className="vauntico-btn w-full md:w-auto"
            >
              Buy with Apple Pay
            </PaystackButton>
            
            <button 
              onClick={handleGumroadCheckout}
              className="vauntico-btn w-full md:w-auto"
            >
              Buy with Gumroad
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            Secure checkout • Instant access • Lifetime updates
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            What's Inside Your Vault
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-[var(--vauntico-gold)] transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Use these prompts as‑is or adapt them to your niche. 
              <span className="font-semibold text-[var(--vauntico-gold)]"> The more specific your inputs, the more powerful your outputs.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the founders who are already scaling with AI-powered prompts
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <PaystackButton 
              amount={97}
              className="vauntico-btn w-full md:w-auto"
            >
              Get Instant Access
            </PaystackButton>
            
            <button 
              onClick={handleGumroadCheckout}
              className="vauntico-btn w-full md:w-auto"
            >
              Buy with Gumroad
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PromptVaultPage


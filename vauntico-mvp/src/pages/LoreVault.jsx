import { useState, useEffect } from 'react'
import { useCreatorPass } from '../hooks/useAccess'
import { AccessBadge } from '../components/AccessGate'
import ScrollViewer from '../components/ScrollViewer'
import RoleSelector from '../components/RoleSelector'
import ScrollGallery from '../components/ScrollGallery'
import CLIOnboarding from '../components/CLIOnboarding'
import OnboardingProgress from '../components/OnboardingProgress'
import EmailCapture from '../components/EmailCapture'
import { LoreVaultCTA } from '../components/MobileStickyCTA'

function LoreVault() {
  const { hasPass, isLoading } = useCreatorPass()
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedScroll, setSelectedScroll] = useState(null)
  const [scrollContent, setScrollContent] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [hasFreeAccess, setHasFreeAccess] = useState(false)

  useEffect(() => {
    // Check if user already got free scroll access
    const freeAccess = localStorage.getItem('vauntico_free_scroll_access')
    setHasFreeAccess(!!freeAccess)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center space-x-3 mb-6">
          <div className="w-16 h-16 vault-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-3xl">📚</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold">
            The <span className="text-gradient">Lore Vault</span>
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Sacred Knowledge Repository of Vauntico
        </p>
        
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 italic">
          You are not merely reading documentation.<br/>
          You are <strong>accessing the source code of Vauntico's soul.</strong>
        </p>

        {hasPass && (
          <div className="flex justify-center mb-6">
            <AccessBadge hasAccess={hasPass} reason="creator_pass" />
          </div>
        )}
      </div>

      {/* Role Selector */}
      {!selectedRole && (
        <RoleSelector onSelectRole={setSelectedRole} />
      )}

      {/* Email Capture - Show if not subscribed and no pass */}
      {!hasPass && !hasFreeAccess && selectedRole && (
        <div className="mb-12">
          <EmailCapture 
            variant="inline"
            leadMagnet="Starter Scroll Pack"
            onSuccess={() => {
              setHasFreeAccess(true)
              // Could redirect to a specific free scroll
            }}
          />
        </div>
      )}

      {/* Scroll Gallery */}
      {selectedRole && !selectedScroll && (
        <>
          {/* Onboarding Progress Card */}
          <div className="mb-8">
            <OnboardingProgress 
              roleId={selectedRole.id}
              onStartOnboarding={() => setShowOnboarding(true)}
            />
          </div>

          <ScrollGallery 
            role={selectedRole}
            hasPass={hasPass || hasFreeAccess}
            onSelectScroll={setSelectedScroll}
            onBackToRoles={() => setSelectedRole(null)}
          />
        </>
      )}

      {/* Scroll Viewer */}
      {selectedScroll && (
        <ScrollViewer
          scroll={selectedScroll}
          onBack={() => setSelectedScroll(null)}
          hasPass={hasPass}
        />
      )}

      {/* CLI Onboarding Modal */}
      {showOnboarding && selectedRole && (
        <CLIOnboarding
          role={selectedRole}
          onComplete={() => {
            setShowOnboarding(false)
            // Award achievement
            const achievements = JSON.parse(localStorage.getItem('vauntico_achievements') || '[]')
            if (!achievements.includes('onboarding-complete')) {
              achievements.push('onboarding-complete')
              localStorage.setItem('vauntico_achievements', JSON.stringify(achievements))
            }
          }}
          onClose={() => setShowOnboarding(false)}
        />
      )}

      {/* Mobile Sticky CTA */}
      {!hasPass && <LoreVaultCTA />}

      {/* Vault Principles - Always Visible */}
      {!selectedRole && (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center border-2 border-transparent hover:border-vault-purple transition-all">
            <div className="text-4xl mb-3">🔮</div>
            <h3 className="font-bold text-lg mb-2">Mythic, Not Mystical</h3>
            <p className="text-gray-600 text-sm">Epic but grounded. Every scroll is proven. Every framework is tested.</p>
          </div>
          
          <div className="card text-center border-2 border-transparent hover:border-vault-blue transition-all">
            <div className="text-4xl mb-3">⚔️</div>
            <h3 className="font-bold text-lg mb-2">Empowering, Not Preachy</h3>
            <p className="text-gray-600 text-sm">We inspire, we don't lecture. These are tools, not commandments.</p>
          </div>
          
          <div className="card text-center border-2 border-transparent hover:border-vault-cyan transition-all">
            <div className="text-4xl mb-3">🏛️</div>
            <h3 className="font-bold text-lg mb-2">Legacy-Focused</h3>
            <p className="text-gray-600 text-sm">Build for generations. Would this survive 100 years?</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoreVault

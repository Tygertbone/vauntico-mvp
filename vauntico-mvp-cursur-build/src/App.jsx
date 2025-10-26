import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import CreatorPass from './pages/CreatorPass'
import Vaults from './pages/Vaults'
import DreamMover from './pages/DreamMover'
import Pricing from './pages/Pricing'
import WorkshopKit from './pages/WorkshopKit'
import AuditService from './pages/AuditService'
import Addons from './pages/Addons'
import LoreVault from './pages/LoreVault'
import Ascend from './pages/Ascend'
import About from './pages/About'
import Referrals from './pages/Referrals'

// Competitor Comparison Pages
import VsJasper from './pages/vs/VsJasper'
import VsChatGPT from './pages/vs/VsChatGPT'
import VsNotion from './pages/vs/VsNotion'
import VsCopyAI from './pages/vs/VsCopyAI'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

    return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
        {/* Skip to main content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-vault-purple text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                            <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2" aria-label="Vauntico home">
                  <div className="w-10 h-10 vault-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold text-gradient">Vauntico</span>
                </Link>
              </div>
              
                            <div className="hidden lg:flex items-center space-x-6">
                                <Link to="/" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Home
                </Link>
                <Link to="/creator-pass" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Creator Pass
                </Link>
                <Link to="/vaults" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Vaults
                </Link>
                                <div className="relative group">
                  <button 
                    className="text-gray-700 hover:text-vault-purple font-medium transition-colors flex items-center"
                    aria-label="Services menu"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setServicesOpen(false)
                      }
                    }}
                  >
                    Services
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                    role="menu"
                    aria-label="Services submenu"
                  >
                    <Link to="/workshop-kit" className="block px-4 py-3 text-gray-700 hover:bg-vault-purple hover:text-white rounded-t-lg transition-colors">
                      🎁 Workshop Kit
                    </Link>
                    <Link to="/audit-service" className="block px-4 py-3 text-gray-700 hover:bg-vault-purple hover:text-white transition-colors">
                      🔍 Audit Service
                    </Link>
                    <Link to="/addons" className="block px-4 py-3 text-gray-700 hover:bg-vault-purple hover:text-white rounded-b-lg transition-colors">
                      ⚡ Add-ons
                    </Link>
                  </div>
                </div>
                                                                <Link to="/pricing" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Pricing
                </Link>
                                                <Link to="/lore" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  📚 Lore
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  About
                </Link>
              </div>
              
                            {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Toggle mobile menu"
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Desktop CTA buttons */}
              <div className="hidden lg:flex items-center space-x-4">
                <button className="btn-outline text-sm" aria-label="Sign in to your account">
                  Sign In
                </button>
                <button className="btn-primary text-sm" aria-label="Get started with Vauntico">
                  Get Started
                </button>
              </div>
                        </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white" role="dialog" aria-label="Mobile navigation menu">
              <div className="px-4 py-6 space-y-4">
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/creator-pass" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Creator Pass
                </Link>
                <Link 
                  to="/vaults" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vaults
                </Link>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-500 mb-2">Services</p>
                  <Link 
                    to="/workshop-kit" 
                    className="block text-gray-700 hover:text-vault-purple transition-colors py-2 pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🎁 Workshop Kit
                  </Link>
                  <Link 
                    to="/audit-service" 
                    className="block text-gray-700 hover:text-vault-purple transition-colors py-2 pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🔍 Audit Service
                  </Link>
                  <Link 
                    to="/addons" 
                    className="block text-gray-700 hover:text-vault-purple transition-colors py-2 pl-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⚡ Add-ons
                  </Link>
                </div>
                
                <Link 
                  to="/pricing" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/lore" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📚 Lore
                </Link>
                <Link 
                  to="/about" 
                  className="block text-gray-700 hover:text-vault-purple font-medium transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <button className="btn-outline w-full" aria-label="Sign in to your account">
                    Sign In
                  </button>
                  <button className="btn-primary w-full" aria-label="Get started with Vauntico">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main id="main-content" className="animate-fade-in">
                    <Routes>
                        <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/creator-pass" element={<CreatorPass />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="/dream-mover" element={<DreamMover />} />
            <Route path="/workshop-kit" element={<WorkshopKit />} />
            <Route path="/audit-service" element={<AuditService />} />
            <Route path="/addons" element={<Addons />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/lore" element={<LoreVault />} />
                        <Route path="/ascend" element={<Ascend />} />
            <Route path="/about" element={<About />} />
            <Route path="/referrals" element={<Referrals />} />
            
                        {/* Competitor Comparison Pages */}
            <Route path="/vs/jasper" element={<VsJasper />} />
            <Route path="/vs/chatgpt" element={<VsChatGPT />} />
            <Route path="/vs/notion" element={<VsNotion />} />
            <Route path="/vs/copyai" element={<VsCopyAI />} />
            
            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

                {/* Footer */}
        <footer className="bg-vault-dark text-white mt-20" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 vault-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold">Vauntico</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  AI-powered content creation platform. Create, collaborate, and monetize your content with intelligent vault technology.
                </p>
              </div>
              
                            <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/creator-pass" className="hover:text-white transition-colors">Creator Pass</Link></li>
                  <li><Link to="/vaults" className="hover:text-white transition-colors">Vaults</Link></li>
                  <li><Link to="/dream-mover" className="hover:text-white transition-colors">Dream Mover</Link></li>
                                    <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/lore" className="hover:text-white transition-colors">📚 Lore Vault</Link></li>
                  <li><Link to="/ascend" className="hover:text-white transition-colors">🏔️ Ascend</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/workshop-kit" className="hover:text-white transition-colors">Workshop Kit</Link></li>
                  <li><Link to="/audit-service" className="hover:text-white transition-colors">Audit Service</Link></li>
                  <li><Link to="/addons" className="hover:text-white transition-colors">Add-ons</Link></li>
                </ul>
              </div>
              
                            <div>
                                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><a href="mailto:hello@vauntico.com" className="hover:text-white transition-colors">Contact</a></li>
                  <li><Link to="/ascend" className="hover:text-white transition-colors">🏔️ Ascend</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Vauntico. All rights reserved.</p>
            </div>
          </div>
                </footer>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App

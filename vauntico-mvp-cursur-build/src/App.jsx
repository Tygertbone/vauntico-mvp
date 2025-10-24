import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreatorPass from './pages/CreatorPass'
import Vaults from './pages/Vaults'
import DreamMover from './pages/DreamMover'
import Pricing from './pages/Pricing'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 vault-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <span className="text-2xl font-bold text-gradient">Vauntico</span>
                </Link>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/creator-pass" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Creator Pass
                </Link>
                <Link to="/vaults" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Vaults
                </Link>
                <Link to="/dream-mover" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Dream Mover
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-vault-purple font-medium transition-colors">
                  Pricing
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="btn-outline text-sm">
                  Sign In
                </button>
                <button className="btn-primary text-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/creator-pass" element={<CreatorPass />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="/dream-mover" element={<DreamMover />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-vault-dark text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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
  )
}

export default App

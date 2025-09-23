import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PromptVaultPage from './components/PromptVaultPage'
import VaultsPage from './components/VaultsPage'
import Homepage from './pages/Homepage'
import PricingPage from './pages/PricingPage'
import CreatorPassPage from './components/CreatorPassPage'
import VaultSuccessPage from './components/VaultSuccessPage'
import OnboardingPage from './pages/OnboardingPage'
import { Sidebar, SidebarProvider, SidebarInset } from './components/ui/sidebar'
import DemoPage from './pages/DemoPage'
import DelegationPage from './pages/DelegationPage'
import './App.css'

function App() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Router>
          <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/prompt-vault" element={<PromptVaultPage />} />
  <Route path="/pricing" element={<PricingPage />} />
  <Route path="/vaults" element={<VaultsPage />} />
  <Route path="/creator-pass" element={<CreatorPassPage />} />
  <Route path="/vault-success" element={<VaultSuccessPage />} />
  <Route path="/onboarding" element={<OnboardingPage />} />
  <Route path="/demo" element={<DemoPage />} />
</Routes>

        </Router>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App

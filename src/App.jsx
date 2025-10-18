import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PromptVaultPage from './components/PromptVaultPage'
import VaultsPage from './components/VaultsPage'
import CreatorPassPage from './components/CreatorPassPage'
import VaultSuccessPage from './components/VaultSuccessPage'
import VaultDashboard from './components/VaultDashboard'
import WorkshopPage from './pages/WorkshopPage'
import AuditServicePage from './pages/AuditServicePage'
import { Sidebar, SidebarProvider, SidebarInset } from './components/ui/sidebar'
import './App.css'

function App() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<PromptVaultPage />} />
              <Route path="/prompt-vault" element={<PromptVaultPage />} />
              <Route path="/vaults" element={<VaultsPage />} />
              <Route path="/creator-pass" element={<CreatorPassPage />} />
              <Route path="/vault-success" element={<VaultSuccessPage />} />
              <Route path="/dashboard" element={<VaultDashboard />} />
              <Route path="/workshop" element={<WorkshopPage />} />
              <Route path="/audit-service" element={<AuditServicePage />} />
            </Routes>
          </div>
        </Router>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
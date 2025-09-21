import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PromptVaultPage from './components/PromptVaultPage'
import VaultsPage from './components/VaultsPage'
import CreatorPassPage from './components/CreatorPassPage'
import VaultSuccessPage from './components/VaultSuccessPage'
import { Sidebar, SidebarProvider, SidebarInset } from './components/ui/sidebar'
import './App.css'

function App() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Router>
          <Routes>
            <Route path="/prompt-vault" element={<PromptVaultPage />} />
            <Route path="/vaults" element={<VaultsPage />} />
            <Route path="/creator-pass" element={<CreatorPassPage />} />
            <Route path="/vault-success" element={<VaultSuccessPage />} />
          </Routes>
        </Router>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App

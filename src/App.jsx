import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PromptVaultPage from './components/PromptVaultPage'
import VaultSuccessPage from './components/VaultSuccessPage'
import VaultsPage from './components/VaultsPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/prompt-vault" element={<PromptVaultPage />} />
          <Route path="/vault-success" element={<VaultSuccessPage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/" element={<PromptVaultPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


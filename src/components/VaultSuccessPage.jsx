import React from 'react'

const VaultSuccessPage = () => {
  return (
    <div className="bg-background text-foreground py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-vauntico-gold mb-4">Vault Created Successfully</h1>
      <p className="text-lg text-muted max-w-2xl mx-auto mb-6">
        Your vault is now live and ready to share. You’ve just taken a step toward legacy and income.
      </p>
      <a href="/vaults" className="vauntico-btn">View All Vaults</a>
    </div>
  )
}

export default VaultSuccessPage

import React from 'react'

const VaultsPage = () => {
  return (
    <div className="bg-background text-foreground py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-vauntico-gold mb-4">Explore the Vaults</h1>
      <p className="text-lg text-muted max-w-2xl mx-auto mb-6">
        Discover curated prompt collections, creator bundles, and premium digital assets. Each vault is a gateway to monetization and mastery.
      </p>
      <a href="/prompt-vault" className="vauntico-btn">Browse Prompt Vault</a>
    </div>
  )
}

export default VaultsPage

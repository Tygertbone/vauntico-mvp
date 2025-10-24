import { useState } from 'react'

function Vaults() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  const vaults = [
    { 
      id: 1, 
      name: 'Marketing Campaign 2024', 
      type: 'Brand', 
      items: 45, 
      collaborators: 5,
      updated: '2 hours ago',
      color: 'purple'
    },
    { 
      id: 2, 
      name: 'Product Launch Assets', 
      type: 'Content', 
      items: 32, 
      collaborators: 3,
      updated: '5 hours ago',
      color: 'blue'
    },
    { 
      id: 3, 
      name: 'Social Media Library', 
      type: 'Media', 
      items: 128, 
      collaborators: 8,
      updated: '1 day ago',
      color: 'cyan'
    },
    { 
      id: 4, 
      name: 'Brand Guidelines', 
      type: 'Brand', 
      items: 18, 
      collaborators: 12,
      updated: '2 days ago',
      color: 'purple'
    },
    { 
      id: 5, 
      name: 'Video Production', 
      type: 'Media', 
      items: 64, 
      collaborators: 4,
      updated: '3 days ago',
      color: 'blue'
    },
    { 
      id: 6, 
      name: 'Blog Posts Archive', 
      type: 'Content', 
      items: 89, 
      collaborators: 6,
      updated: '1 week ago',
      color: 'cyan'
    },
  ]

  const filters = [
    { id: 'all', label: 'All Vaults' },
    { id: 'brand', label: 'Brand' },
    { id: 'content', label: 'Content' },
    { id: 'media', label: 'Media' },
  ]

  const filteredVaults = selectedFilter === 'all' 
    ? vaults 
    : vaults.filter(v => v.type.toLowerCase() === selectedFilter)

  const getColorClass = (color) => {
    const colors = {
      purple: 'from-purple-500 to-purple-600',
      blue: 'from-blue-500 to-blue-600',
      cyan: 'from-cyan-500 to-cyan-600',
    }
    return colors[color] || colors.purple
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Your Vaults</h1>
          <p className="text-gray-600 text-lg">Organize and manage your content collections</p>
        </div>
        <button className="btn-primary">
          + Create New Vault
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedFilter === filter.id
                ? 'bg-vault-purple text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Vaults</p>
              <p className="text-3xl font-bold">{vaults.length}</p>
            </div>
            <div className="text-4xl">🗄️</div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Items</p>
              <p className="text-3xl font-bold">{vaults.reduce((sum, v) => sum + v.items, 0)}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Collaborators</p>
              <p className="text-3xl font-bold">{Math.max(...vaults.map(v => v.collaborators))}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaults.map((vault) => (
          <div key={vault.id} className="card hover:border-vault-purple cursor-pointer group">
            <div className={`h-32 bg-gradient-to-br ${getColorClass(vault.color)} rounded-lg mb-4 flex items-center justify-center`}>
              <span className="text-6xl">📦</span>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1 group-hover:text-vault-purple transition-colors">
                {vault.name}
              </h3>
              <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {vault.type}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <span>📄</span>
                <span>{vault.items} items</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>👥</span>
                <span>{vault.collaborators}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 border-t pt-3">
              Updated {vault.updated}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredVaults.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🗄️</div>
          <h3 className="text-2xl font-semibold mb-2">No vaults found</h3>
          <p className="text-gray-600 mb-6">Create your first vault to get started</p>
          <button className="btn-primary">
            + Create New Vault
          </button>
        </div>
      )}
    </div>
  )
}

export default Vaults

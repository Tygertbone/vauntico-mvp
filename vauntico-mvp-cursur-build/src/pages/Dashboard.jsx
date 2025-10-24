import { Link } from 'react-router-dom'

function Dashboard() {
  const stats = [
    { label: 'Active Vaults', value: '12', change: '+3 this month' },
    { label: 'Total Content', value: '248', change: '+45 this week' },
    { label: 'Collaborators', value: '8', change: '+2 new' },
    { label: 'Revenue', value: '$2,450', change: '+15% this month' },
  ]

  const recentVaults = [
    { id: 1, name: 'Marketing Campaign 2024', type: 'Brand', items: 45, updated: '2 hours ago' },
    { id: 2, name: 'Product Launch Assets', type: 'Content', items: 32, updated: '5 hours ago' },
    { id: 3, name: 'Social Media Library', type: 'Media', items: 128, updated: '1 day ago' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600 text-lg">Here's what's happening with your vaults today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-600 font-medium">{stat.label}</h3>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/vaults" className="card hover:border-vault-purple cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-vault-purple/10 rounded-lg flex items-center justify-center group-hover:bg-vault-purple/20 transition-colors">
              <span className="text-2xl">🗄️</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Create Vault</h3>
              <p className="text-gray-600 text-sm">Start organizing content</p>
            </div>
          </div>
        </Link>

        <Link to="/dream-mover" className="card hover:border-vault-blue cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-vault-blue/10 rounded-lg flex items-center justify-center group-hover:bg-vault-blue/20 transition-colors">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Dream Mover</h3>
              <p className="text-gray-600 text-sm">AI content generation</p>
            </div>
          </div>
        </Link>

        <Link to="/creator-pass" className="card hover:border-vault-cyan cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-vault-cyan/10 rounded-lg flex items-center justify-center group-hover:bg-vault-cyan/20 transition-colors">
              <span className="text-2xl">🎫</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Creator Pass</h3>
              <p className="text-gray-600 text-sm">Unlock premium features</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Vaults */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Vaults</h2>
          <Link to="/vaults" className="text-vault-purple hover:text-vault-purple/80 font-medium">
            View All →
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentVaults.map((vault) => (
            <div key={vault.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 vault-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold">{vault.name}</h3>
                  <p className="text-sm text-gray-600">{vault.type} • {vault.items} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{vault.updated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

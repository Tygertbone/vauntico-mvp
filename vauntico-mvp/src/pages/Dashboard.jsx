/**
 * Dashboard Component
 * 
 * AUDIT NOTES:
 * - TODO: Add personalized welcome message with user's name
 * - TODO: Integrate real vault data from API
 * - TODO: Add onboarding checklist for new users
 * - TODO: Show recommended scrolls based on user tier
 * - TODO: Add activity feed (recent actions, team activity)
 * - TODO: Implement quick stats analytics (track engagement)
 * - TODO: Add upsell banner for free users
 * - TODO: Create "Getting Started" widget for first-time visitors
 * 
 * CONVERSION OPPORTUNITIES:
 * - Show value of upgrade (locked features preview)
 * - Display usage metrics vs. tier limits
 * - Add testimonial widget
 * - Surface most popular scrolls
 */

import { Link } from 'react-router-dom'
import { UserCountBadge, StatsBar, ReviewStars } from '../components/SocialProof'
import Testimonials from '../components/Testimonials'

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
      {/* TODO: Personalize greeting with user's first name */}
      {/* TODO: Add contextual CTA based on user tier (upgrade prompt for free users) */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-gray-600 text-lg">Here's what's happening with your vaults today.</p>
          </div>
          <UserCountBadge count={2500} label="creators" />
        </div>
        {/* TODO: Add quick action shortcuts or onboarding progress bar here */}
      </div>

      {/* Stats Grid */}
      {/* TODO: Replace mock data with real user stats from API */}
      {/* TODO: Make stats clickable (link to detailed views) */}
      {/* TODO: Add trend indicators (up/down arrows with percentages) */}
      {/* TODO: Track clicks on stats cards for engagement metrics */}
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
      {/* TODO: Personalize quick actions based on user role (Solo/Agency/Team) */}
      {/* TODO: Add "Continue where you left off" section */}
      {/* TODO: Track which quick actions are most clicked */}
      {/* TODO: A/B test different quick action layouts */}
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
      {/* TODO: Replace mock data with user's actual vaults */}
      {/* TODO: Add filters (All, Shared, Recent, Favorites) */}
      {/* TODO: Add search functionality */}
      {/* TODO: Add "Create New Vault" CTA within this section */}
      {/* TODO: Show collaboration indicators (who else is working on vault) */}
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

      {/* Platform Stats */}
      <div className="mt-12">
        <StatsBar />
      </div>

      {/* What Creators Are Saying */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">What Creators Are Saying</h2>
          <ReviewStars rating={4.8} reviewCount={350} />
        </div>
        <Testimonials variant="grid" limit={3} />
      </div>
    </div>
  )
}

export default Dashboard

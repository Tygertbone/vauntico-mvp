import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function BadgeDisplay({ compact = false, showProgress = true }) {
  const { user } = useAuth();
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [availableBadges, setAvailableBadges] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchBadgeData();
  }, []);

  const fetchBadgeData = async () => {
    try {
      setIsLoading(true);
      const [userResponse, availableResponse] = await Promise.all([
        fetch(`/api/badges/user?userId=${user?.id || 1}`),
        fetch(`/api/badges/available?userId=${user?.id || 1}`)
      ]);

      const userData = await userResponse.json();
      const availableData = await availableResponse.json();

      if (userData.success) {
        setEarnedBadges(userData.badges);
      }

      if (availableData.success) {
        setAvailableBadges(availableData.badges);
      }
    } catch (error) {
      console.error('Failed to fetch badge data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'common': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'legendary': return '👑';
      case 'epic': return '💎';
      case 'rare': return '⭐';
      case 'common': return '🏅';
      default: return '🎖️';
    }
  };

  const categories = ['all', 'score', 'connections', 'consistency', 'growth'];

  const getFilteredBadges = () => {
    if (activeCategory === 'all') return earnedBadges;

    const uncategorizedEarned = earnedBadges.filter(badge => badge.category === activeCategory);
    return uncategorizedEarned;
  };

  const getCategoryProgress = (category) => {
    if (category === 'all' || !availableBadges[category]) return null;

    const availableInCategory = availableBadges[category]?.length || 0;
    const earnedInCategory = availableBadges[category]?.filter(b => b.isEarned).length || 0;

    return {
      earned: earnedInCategory,
      total: availableInCategory,
      percentage: Math.round((earnedInCategory / availableInCategory) * 100) || 0
    };
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vault-purple mr-2"></div>
          Loading achievements...
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-semibold text-gray-900">
                {earnedBadges.length} Badges Earned
              </div>
              <div className="text-sm text-gray-600">
                {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)} achievement points
              </div>
            </div>
          </div>
          <button className="btn-secondary text-sm">
            View All →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">🏆 Creator Achievements</h2>
          <p className="text-gray-600">Your journey to creator mastery</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-vault-purple">
            {earnedBadges.length}
          </div>
          <div className="text-sm text-gray-600">Badges Earned</div>
          <div className="text-sm text-gray-600">
            {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)} points
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => {
          const progress = getCategoryProgress(category);

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-vault-purple text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="capitalize">{category}</span>
              {progress && (
                <span className="ml-1 text-xs opacity-75">
                  ({progress.earned}/{progress.total})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {getFilteredBadges().map(badge => (
          <div
            key={badge.id}
            className="relative bg-white rounded-xl border-2 border-gray-200 hover:border-vault-purple transition-all p-4 group"
          >
            {/* Badge Icon */}
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="text-xs text-gray-500 flex items-center justify-center">
                <span className="mr-1">{getRarityIcon(badge.rarity)}</span>
                {badge.rarity.toUpperCase()}
              </div>
            </div>

            {/* Badge Details */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{badge.description}</p>
              <div className="text-xs text-vault-purple font-semibold">
                +{badge.points} points
              </div>
            </div>

            {/* Earned Date (if recent) */}
            {badge.earnedAt && new Date(badge.earnedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </div>
            )}

            {/* Hover tooltip with earned date */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
              Earned {new Date(badge.earnedAt).toLocaleDateString()}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Unlocked Badges Coming Soon */}
      {Object.keys(availableBadges).length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold mb-4">🌟 Upcoming Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(availableBadges).slice(0, activeCategory === 'all' ? 4 : 2).map(([category, badges]) => {
              const unearnedBadges = badges.filter(b => !b.isEarned);
              if (unearnedBadges.length === 0) return null;

              const nextBadge = unearnedBadges.sort((a, b) => b.points - a.points)[0];

              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700 capitalize">
                      {category} Category
                    </div>
                    <div className="text-xs text-gray-500">
                      {unearnedBadges.length} remaining
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl opacity-60">{nextBadge.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{nextBadge.name}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">{nextBadge.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievement Progress Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-vault-purple/5 to-vault-blue/5 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-vault-purple">{earnedBadges.length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-vault-purple">
              {earnedBadges.reduce((sum, badge) => sum + badge.points, 0)}
            </div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-vault-purple">
              {Object.values(availableBadges).flat().filter(b => b.isEarned).length}
            </div>
            <div className="text-sm text-gray-600">Total Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-vault-purple">
              {Math.round((earnedBadges.length / Object.values(availableBadges).flat().length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}

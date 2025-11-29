import { useState, useEffect } from 'react';
import { useTrustScore } from '../hooks/useTrustScore';
import LoadingSpinner from './LoadingSpinner';

export default function Leaderboard({ limit = 20, showCurrentUser = true }) {
  const { fetchLeaderboard } = useTrustScore();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [limit]);

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);
      const data = await fetchLeaderboard(limit);
      if (data) {
        setLeaderboard(data);

        // Find current user's position (simplified for MVP)
        // In production, this would authenticate and find the actual user
        const currentUserScore = data.find(item => item.isCurrentUser);
        if (currentUserScore) {
          setCurrentUserRank(currentUserScore.rank);
        }
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    if (rank <= 10) return '🏆';
    return '👤';
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case 'Elite Creator': return 'bg-purple-100 text-purple-800';
      case 'Rising Star': return 'bg-blue-100 text-blue-800';
      case 'Growing Creator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
          <span className="ml-2 text-gray-600">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">🏆 Creator Leaderboard</h2>
          <p className="text-gray-600">See how you rank among other creators</p>
        </div>
        <button
          onClick={loadLeaderboard}
          className="btn-secondary text-sm"
          disabled={isLoading}
        >
          Refresh
        </button>
      </div>

      {currentUserRank && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎯</div>
              <div>
                <div className="font-semibold text-purple-900">You're ranked #{currentUserRank}</div>
                <div className="text-sm text-purple-700">Keep creating to climb higher!</div>
              </div>
            </div>
            <button className="btn-primary text-sm">View Details</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {leaderboard.map((entry, index) => {
          // Skip current user from leaderboard if showCurrentUser is false
          // (they see their special card above)
          if (!showCurrentUser && entry.isCurrentUser) return null;

          return (
            <div
              key={entry.rank}
              className={`p-4 rounded-lg border transition-all ${
                entry.isCurrentUser
                  ? 'bg-purple-50 border-purple-300 shadow-sm'
                  : index < 3
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank & Icon */}
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">{getRankIcon(entry.rank)}</div>
                    <div className="text-xl font-bold text-gray-500 w-8 text-center">
                      #{entry.rank}
                    </div>
                  </div>

                  {/* Creator Info (Anonymized) */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                        {entry.displayName ? entry.displayName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <div className="font-medium">{entry.displayName || 'Anonymous Creator'}</div>
                        <div className={`inline-block px-2 py-1 text-xs rounded-full ${getLevelBadge(entry.level)}`}>
                          {entry.level}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className={`inline-block px-3 py-2 rounded-full text-sm font-bold ${getScoreColor(entry.score)}`}>
                      {Math.round(entry.score)}
                    </div>
                  </div>

                  {/* Connected Platforms */}
                  <div className="text-right text-sm text-gray-500">
                    {entry.platformsConnected || 0} platforms
                  </div>
                </div>
              </div>

              {/* Component Breakdown (Collapsible) */}
              <details className="mt-3 group">
                <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 flex items-center">
                  <span>View score breakdown</span>
                  <svg className="ml-1 w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 grid grid-cols-5 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-gray-600">Consistency</div>
                    <div className="font-semibold text-purple-600">{Math.round(entry.components?.consistency || 0)}/20</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Engagement</div>
                    <div className="font-semibold text-green-600">{Math.round(entry.components?.engagement || 0)}/30</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Revenue</div>
                    <div className="font-semibold text-blue-600">{Math.round(entry.components?.revenue || 0)}/15</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Health</div>
                    <div className="font-semibold text-yellow-600">{Math.round(entry.components?.platformHealth || 0)}/20</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-600">Legacy</div>
                    <div className="font-semibold text-indigo-600">{Math.round(entry.components?.legacy || 0)}/15</div>
                  </div>
                </div>
              </details>
            </div>
          );
        })}
      </div>

      {leaderboard.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-3">🏆</div>
          <div className="text-lg mb-2">Leaderboard Coming Soon</div>
          <div className="text-sm">Be among the first creators to see your ranking!</div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">ℹ️</div>
          <div>
            <div className="font-semibold text-blue-900 mb-1">Privacy Protected</div>
            <div className="text-sm text-blue-700">
              Creator information is anonymized to protect privacy while celebrating achievements.
              Leaderboard updates every 24 hours based on recent Trust Score calculations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        </div>
      </div>
    </div>
  );
}

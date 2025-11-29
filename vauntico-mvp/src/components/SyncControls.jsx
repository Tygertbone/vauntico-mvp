import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SyncControls({ showTitle = true, compact = false }) {
  const { user } = useAuth();
  const [platforms, setPlatforms] = useState([]);
  const [syncingProperties, setSyncingProperties] = useState(new Set());
  const [lastSyncResults, setLastSyncResults] = useState({});

  useEffect(() => {
    fetchPlatformConnections();
  }, []);

  const fetchPlatformConnections = async () => {
    try {
      const response = await fetch(`/api/oauth/connections?userId=${user?.id || 1}`);
      const data = await response.json();
      if (data.connections) {
        setPlatforms(data.connections);
      }
    } catch (error) {
      console.error('Failed to fetch platform connections:', error);
    }
  };

  const handleManualSync = async (platform) => {
    if (syncingProperties.has(platform)) return; // Prevent multiple syncs

    try {
      setSyncingProperties(prev => new Set([...prev, platform]));
      setLastSyncResults(prev => ({ ...prev, [platform]: { status: 'syncing' } }));

      const response = await fetch(`/api/oauth/sync/${platform}?userId=${user?.id || 1}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (result.success) {
        setLastSyncResults(prev => ({
          ...prev,
          [platform]: {
            status: 'success',
            message: result.message,
            timestamp: new Date().toISOString(),
            syncedAt: result.syncedAt
          }
        }));

        // Refresh platform data after successful sync
        setTimeout(fetchPlatformConnections, 1000);

      } else {
        setLastSyncResults(prev => ({
          ...prev,
          [platform]: {
            status: 'error',
            message: result.error || 'Sync failed',
            timestamp: new Date().toISOString()
          }
        }));
      }

    } catch (error) {
      console.error('Sync failed:', error);
      setLastSyncResults(prev => ({
        ...prev,
        [platform]: {
          status: 'error',
          message: 'Network error - please try again',
          timestamp: new Date().toISOString()
        }
      }));
    } finally {
      setSyncingProperties(prev => {
        const newSet = new Set(prev);
        newSet.delete(platform);
        return newSet;
      });
    }
  };

  const formatPlatformName = (provider) => {
    return provider.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatLastSyncTime = (timestamp) => {
    if (!timestamp) return 'Never';

    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffMs = now - syncTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return syncTime.toLocaleDateString();
    }
  };

  const getSyncStatusIcon = (platform) => {
    const result = lastSyncResults[platform];

    if (!result) return '🔄'; // Default sync icon

    switch (result.status) {
      case 'syncing':
        return '⏳';
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '🔄';
    }
  };

  const getPlatformIcon = (provider) => {
    switch (provider) {
      case 'google_analytics':
        return '📊';
      case 'youtube':
        return '📺';
      case 'stripe':
        return '💳';
      case 'substack':
        return '✍️';
      default:
        return '🔗';
    }
  };

  const getPlatformColor = (provider) => {
    switch (provider) {
      case 'google_analytics':
        return 'bg-blue-50 border-blue-200 hover:border-blue-300';
      case 'youtube':
        return 'bg-red-50 border-red-200 hover:border-red-300';
      case 'stripe':
        return 'bg-purple-50 border-purple-200 hover:border-purple-300';
      case 'substack':
        return 'bg-green-50 border-green-200 hover:border-green-300';
      default:
        return 'bg-gray-50 border-gray-200 hover:border-gray-300';
    }
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="text-lg">🔄</div>
            <div className="text-sm font-medium">Data Sync</div>
          </div>
          <button
            onClick={fetchPlatformConnections}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Refresh
          </button>
        </div>

        {platforms.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            Connect platforms to enable manual sync
          </div>
        ) : (
          <div className="space-y-2">
            {platforms.slice(0, 3).map(platform => (
              <div key={platform.provider} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>{getPlatformIcon(platform.provider)}</span>
                  <span className="text-xs text-gray-600">
                    {formatPlatformName(platform.provider)}
                  </span>
                </div>
                <button
                  onClick={() => handleManualSync(platform.provider)}
                  disabled={syncingProperties.has(platform.provider)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                >
                  {syncingProperties.has(platform.provider) ? 'Syncing...' : 'Sync'}
                </button>
              </div>
            ))}
            {platforms.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{platforms.length - 3} more platforms
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      {showTitle && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">🔄 Data Synchronization</h2>
          <p className="text-gray-600">Keep your platform data fresh with manual sync</p>
        </div>
      )}

      {platforms.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-xl font-semibold mb-2">No Platforms Connected</h3>
          <p className="text-gray-600 mb-6">
            Connect your creator platforms above to enable data synchronization
          </p>
          <button className="btn-primary">
            Connect Platforms →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {platforms.map(platform => {
            const isSyncing = syncingProperties.has(platform.provider);
            const lastResult = lastSyncResults[platform.provider];

            return (
              <div
                key={platform.provider}
                className={`p-4 rounded-lg border transition-all ${getPlatformColor(platform.provider)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getPlatformIcon(platform.provider)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {formatPlatformName(platform.provider)}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>
                          Connected {new Date(platform.connectedAt).toLocaleDateString()}
                        </span>
                        <span>
                          Last sync: {formatLastSyncTime(platform.lastSyncedAt)}
                        </span>
                      </div>

                      {/* Sync Status Message */}
                      {lastResult && (
                        <div className={`mt-2 text-sm ${
                          lastResult.status === 'success' ? 'text-green-600' :
                          lastResult.status === 'error' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <span>{getSyncStatusIcon(platform.provider)}</span>
                            <span>
                              {lastResult.status === 'syncing' ? 'Syncing data...' :
                               lastResult.status === 'success' ? lastResult.message :
                               lastResult.message}
                            </span>
                          </div>
                          {lastResult.timestamp && (
                            <div className="text-xs opacity-75 mt-1">
                              {formatLastSyncTime(lastResult.timestamp)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => handleManualSync(platform.provider)}
                      disabled={isSyncing}
                      className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
                        isSyncing
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-vault-purple text-white hover:bg-vault-purple/90 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isSyncing ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Syncing...</span>
                        </div>
                      ) : (
                        'Sync Now'
                      )}
                    </button>

                    {/* Additional sync options */}
                    <div className="text-xs text-gray-500 text-center">
                      Manual sync • Real-time
                    </div>
                  </div>
                </div>

                {/* Progress indicator for long-running syncs */}
                {isSyncing && (
                  <div className="mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-vault-purple h-2 rounded-full animate-pulse"
                             style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-xs text-gray-600">60%</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      Fetching latest data from {formatPlatformName(platform.provider)}
                    </div>
                  </div>
                )}

                {/* Retry suggestion for failed syncs */}
                {lastResult?.status === 'error' && !isSyncing && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm text-red-700 mb-2">
                      ❌ Sync failed - this can happen due to API rate limits or temporary issues
                    </div>
                    <button
                      onClick={() => handleManualSync(platform.provider)}
                      className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
                    >
                      Retry Sync
                    </button>
                  </div>
                )}

                {/* Success feedback */}
                {lastResult?.status === 'success' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-700 mb-2">
                      ✅ Data successfully synced! Your Trust Score may update soon.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Auto-sync information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <div className="font-semibold text-blue-900 mb-1">Automatic Sync</div>
            <div className="text-sm text-blue-700">
              Platforms are normally synced automatically every 24 hours, but you can use
              manual sync above for immediate updates or when you notice stale data.
              <br />
              <strong className="text-blue-600">Pro tip:</strong> Sync after publishing new content
              to see immediate impact on your Trust Score!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

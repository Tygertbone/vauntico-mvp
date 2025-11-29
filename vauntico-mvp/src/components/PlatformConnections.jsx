import { useOAuthConnections } from '../hooks/useTrustScore';
import LoadingSpinner from './LoadingSpinner';

export default function PlatformConnections({ compact = false }) {
  const {
    connections,
    isLoading,
    connectPlatform,
    disconnectPlatform,
    syncGoogleAnalytics
  } = useOAuthConnections();

  const handleConnect = async (provider) => {
    try {
      await connectPlatform(provider);
    } catch (error) {
      alert(`Failed to connect ${provider}: ${error.message}`);
    }
  };

  const handleDisconnect = async (provider) => {
    if (confirm(`Disconnect ${provider}? This will stop data syncing.`)) {
      try {
        await disconnectPlatform(provider);
        alert(`${provider} disconnected successfully`);
      } catch (error) {
        alert(`Failed to disconnect ${provider}: ${error.message}`);
      }
    }
  };

  const handleSync = async (provider) => {
    if (provider === 'google_analytics') {
      const propertyId = prompt('Enter your Google Analytics Property ID (e.g., 123456789):');
      if (!propertyId) return;

      try {
        const result = await syncGoogleAnalytics(propertyId);
        alert(`Synced ${result.processedContent} content items and ${result.createdMetrics} metrics`);
      } catch (error) {
        alert(`Sync failed: ${error.message}`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
          <span className="ml-2 text-gray-600">Loading connections...</span>
        </div>
      </div>
    );
  }

  const platforms = [
    {
      id: 'google_analytics',
      name: 'Google Analytics',
      description: 'Website traffic and user engagement data',
      icon: '📊',
      connected: connections.some(c => c.provider === 'google_analytics' && c.isActive),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Channel analytics and video metrics',
      icon: '🎥',
      comingSoon: true,
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Revenue and transaction data',
      icon: '💳',
      comingSoon: true,
    },
    {
      id: 'substack',
      name: 'Substack',
      description: 'Newsletter subscriber analytics',
      icon: '📧',
      comingSoon: true,
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Platform Connections</h2>
          <p className="text-sm text-gray-600">Connect your accounts for accurate Trust Scores</p>
        </div>
        <div className="text-sm text-gray-500">
          {connections.length} connected
        </div>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => {
          const connected = platform.connected;

          return (
            <div key={platform.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{platform.icon}</div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  <p className="text-sm text-gray-600">{platform.description}</p>
                  {connected && (
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Connected</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {platform.comingSoon ? (
                  <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                ) : connected ? (
                  <>
                    <button
                      onClick={() => handleSync(platform.id)}
                      className="btn-secondary text-xs py-1 px-3"
                    >
                      Sync Data
                    </button>
                    <button
                      onClick={() => handleDisconnect(platform.id)}
                      className="text-red-600 hover:text-red-800 text-sm underline"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(platform.id)}
                    className="btn-primary text-sm"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-blue-500 text-xl">ℹ️</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Why Connect Platforms?</h4>
              <p className="text-sm text-blue-700">
                Your Trust Score automatically improves with connected platforms. More data = more accurate scoring. Your data is securely encrypted and only used for score calculation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

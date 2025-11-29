import { useState, useEffect, useCallback } from 'react';
import { useAuthenticatedApi } from '../context/AuthContext';

export function useTrustScore() {
  const { apiRequest, isAuthenticated } = useAuthenticatedApi();
  const [trustScore, setTrustScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current user's Trust Score
  const fetchTrustScore = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiRequest('/trust-score');
      setTrustScore(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch trust score:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiRequest, isAuthenticated]);

  // Calculate/update Trust Score manually
  const calculateTrustScore = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiRequest('/trust-score/calculate', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      // Update the current score
      await fetchTrustScore();

      return data;
    } catch (err) {
      setError(err.message);
      console.error('Failed to calculate trust score:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiRequest, isAuthenticated, fetchTrustScore]);

  // Get Trust Score history
  const fetchTrustScoreHistory = useCallback(async (limit = 30, offset = 0) => {
    if (!isAuthenticated) return null;

    try {
      const data = await apiRequest(`/trust-score/history?limit=${limit}&offset=${offset}`);
      return data.history;
    } catch (err) {
      console.error('Failed to fetch trust score history:', err);
      return null;
    }
  }, [apiRequest, isAuthenticated]);

  // Fetch leaderboard
  const fetchLeaderboard = useCallback(async (limit = 50, offset = 0) => {
    try {
      const data = await apiRequest(`/trust-score/leaderboard?limit=${limit}&offset=${offset}`);
      return data.leaderboard;
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      return null;
    }
  }, [apiRequest, isAuthenticated]);

  // Auto-fetch on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchTrustScore();
    }
  }, [isAuthenticated, fetchTrustScore]);

  return {
    trustScore,
    isLoading,
    error,
    fetchTrustScore,
    calculateTrustScore,
    fetchTrustScoreHistory,
    fetchLeaderboard,
    refresh: fetchTrustScore,
  };
}

export function useOAuthConnections() {
  const { apiRequest, isAuthenticated } = useAuthenticatedApi();
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get user's OAuth connections
  const fetchConnections = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);

    try {
      const data = await apiRequest('/oauth/connections');
      setConnections(data.connections || []);
    } catch (err) {
      console.error('Failed to fetch OAuth connections:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiRequest, isAuthenticated]);

  // Initiate OAuth connection
  const connectPlatform = useCallback(async (provider) => {
    try {
      const data = await apiRequest(`/oauth/${provider}/connect`);

      if (data.authorizationUrl) {
        // Open OAuth consent screen in new tab
        const oauthWindow = window.open(
          data.authorizationUrl,
          `oauth-${provider}`,
          'width=600,height=700'
        );

        // Poll for OAuth callback completion
        const checkCallback = setInterval(() => {
          if (oauthWindow && oauthWindow.closed) {
            clearInterval(checkCallback);
            // Refresh connections after OAuth flow
            fetchConnections();
          }
        }, 1000);
      }

      return data;
    } catch (err) {
      console.error(`Failed to initiate ${provider} OAuth:`, err);
      throw err;
    }
  }, [apiRequest, isAuthenticated, fetchConnections]);

  // Disconnect OAuth platform
  const disconnectPlatform = useCallback(async (provider) => {
    try {
      await apiRequest(`/oauth/${provider}/disconnect`, {
        method: 'DELETE',
      });

      // Refresh connections list
      await fetchConnections();
    } catch (err) {
      console.error(`Failed to disconnect ${provider}:`, err);
      throw err;
    }
  }, [apiRequest, isAuthenticated, fetchConnections]);

  // Sync data for Google Analytics
  const syncGoogleAnalytics = useCallback(async (propertyId) => {
    try {
      const data = await apiRequest('/oauth/google_analytics/sync', {
        method: 'POST',
        body: JSON.stringify({ propertyId }),
      });

      // Refresh trust score after data sync
      return data;
    } catch (err) {
      console.error('Failed to sync Google Analytics data:', err);
      throw err;
    }
  }, [apiRequest, isAuthenticated]);

  // Auto-fetch on authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetchConnections();
    }
  }, [isAuthenticated, fetchConnections]);

  return {
    connections,
    isLoading,
    fetchConnections,
    connectPlatform,
    disconnectPlatform,
    syncGoogleAnalytics,
  };
}

// Helper hook for Trust Score color/theme based on score
export function useTrustScoreColor(score) {
  if (!score || score < 40) return 'text-red-600 bg-red-100';
  if (score < 60) return 'text-orange-600 bg-orange-100';
  if (score < 80) return 'text-yellow-600 bg-yellow-100';
  return 'text-green-600 bg-green-100';
}

// Helper hook for score interpretation
export function useScoreInterpretation(score) {
  if (!score) return null;
  if (score >= 85) return { level: 'Excellent', description: 'Elite creator with proven track record' };
  if (score >= 70) return { level: 'Very Good', description: 'Consistent performer with strong metrics' };
  if (score >= 55) return { level: 'Good', description: 'Solid foundation with room for improvement' };
  if (score >= 40) return { level: 'Fair', description: 'Developing creator with potential' };
  return { level: 'Needs Work', description: 'Focus on consistency and audience engagement' };
}

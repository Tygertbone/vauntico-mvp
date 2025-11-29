import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:3001/api'; // Update for production

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setIsLoading(true);

    // Check if we have a stored user ID from previous session
    const storedUserId = localStorage.getItem('vauntico_user_id');
    const storedUser = localStorage.getItem('vauntico_user');

    if (storedUserId && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  };

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data and authentication state
      const userData = {
        id: data.user.id,
        email: data.user.email,
        displayName: data.user.displayName,
        role: data.user.role,
        timezone: data.user.timezone,
        createdAt: data.user.createdAt,
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem('vauntico_user_id', userData.id);
      localStorage.setItem('vauntico_user', JSON.stringify(userData));

      return { success: true, user: userData };

    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store user data and authentication state
      const userData = {
        id: data.user.id,
        email: data.user.email,
        displayName: data.user.displayName,
        role: data.user.role,
        timezone: data.user.timezone,
        createdAt: data.user.createdAt,
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem('vauntico_user_id', userData.id);
      localStorage.setItem('vauntico_user', JSON.stringify(userData));

      return { success: true, user: userData };

    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      // Call logout API if you want to invalidate server-side tokens
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vauntico_access_token')}` // If using Bearer tokens
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('vauntico_refresh_token') }),
      });

      // Clear local storage regardless of API call success
      localStorage.removeItem('vauntico_user_id');
      localStorage.removeItem('vauntico_user');
      localStorage.removeItem('vauntico_access_token');
      localStorage.removeItem('vauntico_refresh_token');

      // Reset state
      setUser(null);
      setIsAuthenticated(false);

      return { success: true };

    } catch (error) {
      console.error('Logout error:', error);

      // Still clear local state even if API call fails
      localStorage.removeItem('vauntico_user_id');
      localStorage.removeItem('vauntico_user');
      setUser(null);
      setIsAuthenticated(false);

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for getting user ID from query params (for development/demo)
export function useUserId() {
  return new URLSearchParams(window.location.search).get('userId') || null;
}

// API utility function for authenticated requests
export function useAuthenticatedApi() {
  const { user, isAuthenticated } = useAuth();

  const apiRequest = async (endpoint, options = {}) => {
    if (!isAuthenticated || !user) {
      throw new Error('Not authenticated');
    }

    // For MVP, use userId query param instead of Bearer tokens
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.set('userId', user.id);

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  };

  return { apiRequest, isAuthenticated };
}

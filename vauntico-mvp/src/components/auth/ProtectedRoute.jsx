import { useAuth } from './AuthProvider'
import LoadingSpinner from '../LoadingSpinner'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="purple" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // User not authenticated, redirect to login
    window.location.href = '/login'
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" color="purple" />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return children
}

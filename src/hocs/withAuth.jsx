import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function withAuth(Component) {
  function WithAuth(props) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <main className="page-shell">Loading...</main>
    if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />

    return <Component {...props} />
  }

  WithAuth.displayName = `WithAuth(${Component.displayName || Component.name || 'Component'})`
  return WithAuth
}

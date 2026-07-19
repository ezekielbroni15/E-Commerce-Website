import { AuthContext } from './AuthContext'
import { useAuthProviderValue } from '../hooks/useAuth'

export function AuthProvider({ children }) {
  const value = useAuthProviderValue()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

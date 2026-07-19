import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ email: 'rimel@example.com', displayName: 'Md Rimel' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const signUp = async ({ name, email }) => {
    setLoading(true)
    setError('')
    await Promise.resolve()
    setUser(null)
    setLoading(false)
    return { name, email }
  }

  const logIn = async ({ email }) => {
    setLoading(true)
    setError('')
    await Promise.resolve()
    setUser({ email, displayName: email.split('@')[0] || 'Customer' })
    setLoading(false)
  }

  const logOut = async () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, signUp, logIn, logOut, loading, error }),
    [user, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

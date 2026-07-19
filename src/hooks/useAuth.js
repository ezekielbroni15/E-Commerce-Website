import { useContext, useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { AuthContext } from '../contexts/AuthContext'
import { auth, firebaseReady } from '../services/firebase'

function authErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Email is already in use',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/invalid-email': 'Enter a valid email address',
    'auth/weak-password': 'Password should be at least 6 characters',
  }
  return messages[error?.code] || error?.message || 'Authentication failed'
}

function ensureFirebaseReady() {
  if (!firebaseReady) {
    throw new Error('Firebase environment variables are not configured')
  }
}

export function useAuthProviderValue() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false)
      setError('Firebase environment variables are not configured')
      return undefined
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const signUp = async ({ name, email, password }) => {
    setLoading(true)
    setError('')
    try {
      ensureFirebaseReady()
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: name })
      await signOut(auth)
      setUser(null)
      return credential.user
    } catch (authError) {
      const message = authErrorMessage(authError)
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logIn = async ({ email, password }) => {
    setLoading(true)
    setError('')
    try {
      ensureFirebaseReady()
      const credential = await signInWithEmailAndPassword(auth, email, password)
      setUser(credential.user)
      return credential.user
    } catch (authError) {
      const message = authErrorMessage(authError)
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    if (!firebaseReady) return
    setError('')
    await signOut(auth)
  }

  return useMemo(
    () => ({ user, signUp, logIn, logOut, loading, error }),
    [user, loading, error],
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

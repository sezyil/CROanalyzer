import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/analysisService'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password)
      if (result.success) {
        setIsAuthenticated(true)
        navigate('/dashboard')
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }, [navigate])

  const signup = useCallback(async (email: string, password: string, companyName: string) => {
    try {
      const result = await authService.signup(email, password, companyName)
      if (result.success) {
        setIsAuthenticated(true)
        navigate('/dashboard')
        return true
      }
      return false
    } catch (error) {
      console.error('Signup error:', error)
      return false
    }
  }, [navigate])

  const logout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
    navigate('/login')
  }, [navigate])

  return {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
  }
}

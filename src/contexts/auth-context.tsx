'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'manager' | 'staff' | 'auditor' | 'member' | 'volunteer' | 'user'
  isEmailVerified: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  isManager: boolean
  isStaff: boolean
  isAuditor: boolean
  isMember: boolean
  isVolunteer: boolean
  hasAdminAccess: boolean
  getDashboardPath: () => string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(parsedUser)
      } catch (error) {
        console.error('Failed to parse user:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // Add axios interceptor to handle 401 errors (token expiration)
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && user) {
          // Only handle 401 if user is currently logged in
          // This prevents redirect loops on public pages
          console.log('Token expired or invalid, logging out...')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          delete api.defaults.headers.common['Authorization']
          setUser(null)
          
          // Only redirect if not already on auth pages
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
            router.push('/auth/login?expired=true')
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(interceptor)
    }
  }, [router, user])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      setUser(userData)

      // Redirect based on role
      const dashboardPath = (() => {
        switch (userData.role) {
          case 'admin':
            return '/admin'
          case 'manager':
            return '/manager'
          case 'staff':
            return '/staff'
          case 'auditor':
            return '/auditor'
          case 'volunteer':
            return '/volunteer'
          case 'member':
            return '/dashboard'
          default:
            return '/dashboard'
        }
      })()
      
      router.push(dashboardPath)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    router.push('/')
  }

  const getDashboardPath = () => {
    if (!user) return '/dashboard'
    
    switch (user.role) {
      case 'admin':
        return '/admin'
      case 'manager':
        return '/manager'
      case 'staff':
        return '/staff'
      case 'auditor':
        return '/auditor'
      case 'volunteer':
        return '/volunteer'
      case 'member':
        return '/dashboard'
      default:
        return '/dashboard'
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isStaff: user?.role === 'staff',
    isAuditor: user?.role === 'auditor',
    isMember: user?.role === 'member',
    isVolunteer: user?.role === 'volunteer',
    hasAdminAccess: user?.role === 'admin' || user?.role === 'manager',
    getDashboardPath,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

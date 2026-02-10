'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  requireMember?: boolean
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, requireAdmin = false, requireMember = false, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, isAdmin, isMember, getDashboardPath } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - redirect to login
        router.push('/auth/login')
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User role not in allowed roles - redirect to their dashboard
        router.push(getDashboardPath())
      } else if (requireAdmin && !isAdmin) {
        // Requires admin but user is not admin
        router.push('/dashboard')
      } else if (requireMember && !isMember) {
        // Requires member but user is not member
        router.push('/dashboard')
      }
    }
  }, [user, loading, isAdmin, isMember, requireAdmin, requireMember, allowedRoles, router, getDashboardPath])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null
  }

  if (requireAdmin && !isAdmin) {
    return null
  }

  if (requireMember && !isMember) {
    return null
  }

  return <>{children}</>
}

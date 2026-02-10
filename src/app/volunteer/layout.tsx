'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['volunteer']}>
      {children}
    </ProtectedRoute>
  )
}

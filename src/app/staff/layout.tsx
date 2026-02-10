'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['staff']}>
      {children}
    </ProtectedRoute>
  )
}

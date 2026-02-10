'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'

export default function AuditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedRoles={['auditor']}>
      {children}
    </ProtectedRoute>
  )
}

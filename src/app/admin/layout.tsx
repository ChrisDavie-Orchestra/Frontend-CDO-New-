'use client'

import { AdminSidebar } from '@/components/admin/sidebar'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Hide header and footer in admin area
  useEffect(() => {
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    
    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'
    
    return () => {
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto pb-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

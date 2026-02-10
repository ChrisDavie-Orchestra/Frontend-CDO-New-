'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  User, 
  Ticket, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LogOut,
  Crown,
  Calendar,
  CreditCard
} from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout, isMember } = useAuth()

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/dashboard/profile', icon: User },
    { name: 'My Tickets', href: '/dashboard/tickets', icon: Ticket },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'My Donations', href: '/dashboard/donations', icon: Heart },
    ...(isMember ? [
      { name: 'Membership', href: '/dashboard/membership', icon: Crown },
    ] : []),
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl z-40">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="font-serif text-xl font-bold">CD</span>
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg">CDO</h2>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="font-bold text-lg">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            {isMember && (
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-primary-600 rounded-full text-xs">
                <Crown className="h-3 w-3" />
                Member
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                active
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

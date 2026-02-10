'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingBag, 
  Users, 
  FileText, 
  Image, 
  Heart,
  Music,
  Settings,
  LogOut,
  Home
} from 'lucide-react'

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'News', href: '/admin/news', icon: FileText },
    { name: 'Media', href: '/admin/media', icon: Image },
    { name: 'Donations', href: '/admin/donations', icon: Heart },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Music className="h-8 w-8 text-primary-400" />
          <div>
            <h1 className="font-serif text-xl font-bold">CDO Admin</h1>
            <p className="text-xs text-gray-400">Orchestra Management</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        {/* User Info */}
        {user && (
          <div className="px-4 py-2 bg-gray-800 rounded mb-3">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        )}

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </Link>
        
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Exit Admin</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

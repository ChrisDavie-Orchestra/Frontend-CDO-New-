'use client'

import { Users, Calendar, ShoppingBag, Heart, FileText, Image as ImageIcon, TrendingUp, DollarSign, Ticket } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%', trend: 'up', href: '/admin/users' },
    { label: 'Events', value: '45', icon: Calendar, change: '+5', trend: 'up', href: '/admin/events' },
    { label: 'Products', value: '128', icon: ShoppingBag, change: '+8', trend: 'up', href: '/admin/products' },
    { label: 'Total Revenue', value: '$24,580', icon: DollarSign, change: '+18%', trend: 'up', href: '/admin/donations' },
    { label: 'Tickets Sold', value: '892', icon: Ticket, change: '+15%', trend: 'up', href: '/admin/events' },
    { label: 'Donations', value: '$12,450', icon: Heart, change: '+23%', trend: 'up', href: '/admin/donations' },
  ]

  const recentActivity = [
    { type: 'user', message: 'New user registered: john@example.com', time: '5 min ago', color: 'bg-blue-100 text-blue-600' },
    { type: 'order', message: 'New order #1234 placed', time: '12 min ago', color: 'bg-green-100 text-green-600' },
    { type: 'event', message: 'Event "Summer Concert" published', time: '1 hour ago', color: 'bg-purple-100 text-purple-600' },
    { type: 'donation', message: 'New donation received: $100', time: '2 hours ago', color: 'bg-pink-100 text-pink-600' },
    { type: 'ticket', message: '5 tickets sold for Spring Concert', time: '3 hours ago', color: 'bg-yellow-100 text-yellow-600' },
  ]

  const topProducts = [
    { name: 'Orchestra T-Shirt', sales: 45, revenue: '$1,125' },
    { name: 'Spring Concert Recording', sales: 32, revenue: '$480' },
    { name: 'Orchestra Hoodie', sales: 28, revenue: '$1,260' },
  ]

  const upcomingEvents = [
    { title: 'Spring Concert 2026', date: 'Mar 15, 2026', tickets: '150/200' },
    { title: 'Summer Gala', date: 'Jun 20, 2026', tickets: '120/150' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="font-serif text-xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                    <div className="w-2 h-2 bg-current rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-serif text-xl font-bold mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-bold text-primary-600">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/admin/events/new" className="btn-primary w-full text-sm">
                Create Event
              </Link>
              <Link href="/admin/products/new" className="btn-outline w-full text-sm">
                Add Product
              </Link>
              <Link href="/admin/news/new" className="btn-outline w-full text-sm">
                Write Article
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="pb-3 border-b last:border-0">
                  <p className="font-medium text-sm">{event.title}</p>
                  <p className="text-xs text-gray-600">{event.date}</p>
                  <p className="text-xs text-primary-600 mt-1">{event.tickets} sold</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-green-50">
            <h3 className="font-semibold mb-3">System Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 font-semibold">●  Healthy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">API</span>
                <span className="text-green-600 font-semibold">● Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="text-gray-600">45% Used</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

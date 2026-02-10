'use client'

import { useAuth } from '@/contexts/auth-context'
import { LayoutDashboard, Users, Calendar, Package, DollarSign, FileText, BarChart3, Settings } from 'lucide-react'

export default function ManagerDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Users', value: '0', icon: Users, color: 'bg-blue-500' },
    { label: 'Events', value: '0', icon: Calendar, color: 'bg-green-500' },
    { label: 'Products', value: '0', icon: Package, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$0', icon: DollarSign, color: 'bg-yellow-500' },
  ]

  const managerSections = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      link: '/manager/users',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Event Management',
      description: 'Full control over events and tickets',
      icon: Calendar,
      link: '/manager/events',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Product Management',
      description: 'Manage products, inventory, and orders',
      icon: Package,
      link: '/manager/products',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Content Management',
      description: 'Manage news, media, and website content',
      icon: FileText,
      link: '/manager/content',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Analytics & Reports',
      description: 'View detailed analytics and generate reports',
      icon: BarChart3,
      link: '/manager/analytics',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'System Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      link: '/manager/settings',
      color: 'bg-red-50 text-red-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-8 w-8 text-primary-600" />
            <h1 className="font-serif text-3xl font-bold">Manager Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! You have full management access to the system.
          </p>
          <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-800">
              <strong>🎯 Manager Access:</strong> You can manage events, users, content, and view all analytics.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Manager Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managerSections.map((section) => (
              <a
                key={section.title}
                href={section.link}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/manager/users/new" className="btn-primary text-center">
              Create New User
            </a>
            <a href="/manager/events/new" className="btn-primary text-center">
              Create New Event
            </a>
            <a href="/manager/products/new" className="btn-primary text-center">
              Add New Product
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

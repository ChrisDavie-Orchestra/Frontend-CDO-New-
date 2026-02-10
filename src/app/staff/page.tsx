'use client'

import { useAuth } from '@/contexts/auth-context'
import { Settings, Calendar, Users, Package, FileText, Mail } from 'lucide-react'

export default function StaffDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Events', value: '0', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Tickets Sold', value: '0', icon: Users, color: 'bg-green-500' },
    { label: 'Products', value: '0', icon: Package, color: 'bg-purple-500' },
    { label: 'Messages', value: '0', icon: Mail, color: 'bg-yellow-500' },
  ]

  const staffSections = [
    {
      title: 'Event Management',
      description: 'Create and manage events, view ticket sales',
      icon: Calendar,
      link: '/staff/events',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Content Management',
      description: 'Manage news articles and media content',
      icon: FileText,
      link: '/staff/content',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Product Management',
      description: 'Manage products and view orders',
      icon: Package,
      link: '/staff/products',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Contact Messages',
      description: 'View and respond to contact inquiries',
      icon: Mail,
      link: '/staff/messages',
      color: 'bg-yellow-50 text-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-8 w-8 text-primary-600" />
            <h1 className="font-serif text-3xl font-bold">Staff Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! Manage content and operations.
          </p>
          <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-800">
              <strong>⚙️ Staff Access:</strong> You have access to content management, events, and customer support features.
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

        {/* Staff Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Staff Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffSections.map((section) => (
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

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="card">
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useAuth } from '@/contexts/auth-context'
import { BarChart3, Users, Calendar, Package, DollarSign, FileText, Eye } from 'lucide-react'

export default function AuditorDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Users', value: '0', icon: Users, color: 'bg-blue-500' },
    { label: 'Events', value: '0', icon: Calendar, color: 'bg-green-500' },
    { label: 'Products', value: '0', icon: Package, color: 'bg-purple-500' },
    { label: 'Revenue', value: '$0', icon: DollarSign, color: 'bg-yellow-500' },
  ]

  const auditSections = [
    {
      title: 'User Management',
      description: 'View all users, roles, and activity logs',
      icon: Users,
      link: '/auditor/users',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Events & Tickets',
      description: 'Audit event data and ticket sales',
      icon: Calendar,
      link: '/auditor/events',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Products & Orders',
      description: 'Review product inventory and order history',
      icon: Package,
      link: '/auditor/products',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Financial Reports',
      description: 'Access financial data and transaction logs',
      icon: DollarSign,
      link: '/auditor/reports',
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Content Audit',
      description: 'Review news articles, media, and content',
      icon: FileText,
      link: '/auditor/content',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'System Logs',
      description: 'View system activity and audit trails',
      icon: BarChart3,
      link: '/auditor/logs',
      color: 'bg-red-50 text-red-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-8 w-8 text-primary-600" />
            <h1 className="font-serif text-3xl font-bold">Auditor Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! You have read-only access to all system data.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>🔒 Read-Only Access:</strong> As an auditor, you can view all data but cannot make changes.
              Your access is logged for compliance and security purposes.
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

        {/* Audit Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Audit Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditSections.map((section) => (
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
          <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
          <div className="card">
            <p className="text-gray-500 text-center py-8">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  )
}

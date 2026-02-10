'use client'

import { useQuery } from '@tanstack/react-query'
import { Activity, Search, Shield, Clock } from 'lucide-react'
import { api } from '@/lib/api'
import { useState } from 'react'

export default function AuditorActivityPage() {
  const [search, setSearch] = useState('')

  // Mock activity data - replace with actual API call when backend is ready
  const activities = [
    {
      id: '1',
      action: 'User Created',
      user: 'admin@example.com',
      target: 'john.doe@example.com',
      timestamp: new Date().toISOString(),
      details: 'New user account created with role: member',
    },
    {
      id: '2',
      action: 'Product Updated',
      user: 'staff@example.com',
      target: 'Classical Favorites Album',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      details: 'Price updated from $29.99 to $24.99',
    },
    {
      id: '3',
      action: 'Event Published',
      user: 'manager@example.com',
      target: 'Summer Concert Series',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      details: 'Event published and made visible to public',
    },
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Activity className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold">Activity Logs</h1>
            <p className="text-gray-600">System-wide activity and audit trail</p>
          </div>
        </div>

        {/* Read-only Notice */}
        <div className="card mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Read-Only Access</h3>
              <p className="text-sm text-yellow-800">
                As an auditor, you can view activity logs but cannot make any modifications.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activity logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{activity.action}</h3>
                      <p className="text-sm text-gray-600">
                        by <span className="font-medium">{activity.user}</span> on{' '}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {activity.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {activities.length === 0 && (
          <div className="card text-center py-12">
            <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No activity logs found</p>
          </div>
        )}
      </div>
    </div>
  )
}

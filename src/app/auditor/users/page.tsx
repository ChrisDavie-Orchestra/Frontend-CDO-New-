'use client'

import { useQuery } from '@tanstack/react-query'
import { Users, Search, Eye, Shield } from 'lucide-react'
import { api } from '@/lib/api'
import { useState } from 'react'

export default function AuditorUsersPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['auditor-users', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/users${params}`)
      return response.data
    },
  })

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-red-100 text-red-700',
      manager: 'bg-purple-100 text-purple-700',
      staff: 'bg-blue-100 text-blue-700',
      auditor: 'bg-yellow-100 text-yellow-700',
      volunteer: 'bg-green-100 text-green-700',
      member: 'bg-indigo-100 text-indigo-700',
      user: 'bg-gray-100 text-gray-700',
    }
    return colors[role] || colors.user
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold">User Audit</h1>
            <p className="text-gray-600">Read-only view of all system users</p>
          </div>
        </div>

        {/* Read-only Notice */}
        <div className="card mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Read-Only Access</h3>
              <p className="text-sm text-yellow-800">
                As an auditor, you can view user data but cannot make any modifications.
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
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : data && data.length > 0 ? (
                data.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.phone || 'No phone'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.isEmailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Summary */}
        {data && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Total Users</div>
              <div className="text-2xl font-bold">{data.length}</div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Verified</div>
              <div className="text-2xl font-bold text-green-600">
                {data.filter((u: any) => u.isEmailVerified).length}
              </div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Admins</div>
              <div className="text-2xl font-bold text-red-600">
                {data.filter((u: any) => u.role === 'admin').length}
              </div>
            </div>
            <div className="card">
              <div className="text-sm text-gray-600 mb-1">Members</div>
              <div className="text-2xl font-bold text-indigo-600">
                {data.filter((u: any) => u.role === 'member' || u.role === 'user').length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, Search, Edit, Trash2, Shield, Plus, AlertCircle, MoreVertical } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const [deleteUserName, setDeleteUserName] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const [resultType, setResultType] = useState<'success' | 'error'>('success')
  const router = useRouter()
  const { isAuthenticated, isAdmin, loading: authLoading, user } = useAuth()

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/admin/users')
    } else if (!authLoading && !isAdmin) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isAdmin, authLoading, router])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-users', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/users${params}`)
      return response.data
    },
    enabled: isAuthenticated && isAdmin, // Only run query if authenticated and admin
    retry: false,
  })

  const handleDeleteUser = async () => {
    if (!deleteUserId) return
    
    try {
      await api.delete(`/users/${deleteUserId}`, {
        data: { deletedBy: user?.id }
      })
      setResultMessage(`User ${deleteUserName} has been deleted successfully.`)
      setResultType('success')
      setShowDeleteModal(false)
      setShowResultModal(true)
      refetch() // Refresh the users list
    } catch (error: any) {
      setResultMessage(error.response?.data?.message || 'Failed to delete user')
      setResultType('error')
      setShowDeleteModal(false)
      setShowResultModal(true)
    } finally {
      setDeleteUserId(null)
      setDeleteUserName('')
    }
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  // Show error state
  if (error) {
    return (
      <div className="p-8">
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">Error Loading Users</h3>
              <p className="text-sm">Unable to fetch users. Please try refreshing the page.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      manager: 'bg-indigo-100 text-indigo-700',
      staff: 'bg-purple-100 text-purple-700',
      auditor: 'bg-blue-100 text-blue-700',
      member: 'bg-primary-100 text-primary-700',
      volunteer: 'bg-green-100 text-green-700',
      user: 'bg-gray-100 text-gray-700',
    }
    return colors[role as keyof typeof colors] || colors.user
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Manage Users</h1>
          <p className="text-gray-600">View and manage user accounts</p>
        </div>
        <Link href="/admin/users/new" className="btn-primary">
          <Users className="h-5 w-5 mr-2" />
          Create User
        </Link>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : data?.length > 0 ? (
                data.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-700">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{user.firstName} {user.lastName}</div>
                          {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.isEmailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        
                        {openMenuId === user.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    router.push(`/admin/users/${user.id}/edit`)
                                    setOpenMenuId(null)
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit User
                                </button>
                                <button
                                  onClick={() => {
                                    router.push(`/admin/users/${user.id}/roles`)
                                    setOpenMenuId(null)
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Shield className="h-4 w-4" />
                                  Manage Roles
                                </button>
                                <hr className="my-1" />
                                <button
                                  onClick={() => {
                                    setDeleteUserId(user.id)
                                    setDeleteUserName(`${user.firstName} ${user.lastName}`)
                                    setShowDeleteModal(true)
                                    setOpenMenuId(null)
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete User
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
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
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slideUp">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete User</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  Are you sure you want to delete <strong>{deleteUserName}</strong>? 
                  This will permanently remove the user and all associated data.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeleteUserId(null)
                    setDeleteUserName('')
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      <ConfirmationModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={resultType === 'success' ? 'User Deleted' : 'Error'}
        message={resultMessage}
        type={resultType}
      />
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, User as UserIcon } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`)
        const user = response.data
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'user',
        })
      } catch (error: any) {
        setModalMessage(error.response?.data?.message || 'Failed to load user')
        setModalType('error')
        setShowModal(true)
      } finally {
        setFetchLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.put(`/users/${userId}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      })
      setModalMessage(`User ${formData.firstName} ${formData.lastName} updated successfully!`)
      setModalType('success')
      setShowModal(true)
      setTimeout(() => {
        router.push('/admin/users')
      }, 2000)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to update user')
      setModalType('error')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Users
      </button>

      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <UserIcon className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="font-serif text-3xl font-bold">Edit User</h1>
            <p className="text-gray-600">Update user information and role</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="input"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input"
                  placeholder="+1234567890"
                />
              </div>
            </div>
          </div>

          {/* Role Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Role Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="input"
                >
                  <option value="user">User - Regular customer/attendee</option>
                  <option value="member">Member - Orchestra member</option>
                  <option value="volunteer">Volunteer - Event volunteer access</option>
                  <option value="staff">Staff - Limited administrative access</option>
                  <option value="manager">Manager - Manage events, users, content</option>
                  <option value="auditor">Auditor - Read-only access to all data</option>
                  <option value="admin">Admin - Full system access</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.role === 'admin' && '✓ Full system access - can manage everything'}
                  {formData.role === 'manager' && '✓ Can manage events, users, and content'}
                  {formData.role === 'staff' && '✓ Limited administrative access to specific areas'}
                  {formData.role === 'auditor' && '✓ Read-only access to all data for auditing'}
                  {formData.role === 'member' && '✓ Orchestra member with exclusive content access'}
                  {formData.role === 'volunteer' && '✓ Access to volunteer management features'}
                  {formData.role === 'user' && '✓ Basic access to public features'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Updating User...' : 'Update User'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'success' ? 'User Updated' : 'Error'}
        message={modalMessage}
        type={modalType}
      />
    </div>
  )
}

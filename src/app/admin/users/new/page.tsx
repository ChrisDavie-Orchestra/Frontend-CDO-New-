'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, UserPlus } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function NewUserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/users', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
      })
      setModalMessage(`User ${formData.firstName} ${formData.lastName} created successfully! Login credentials have been sent to ${formData.email}.`)
      setShowModal(true)
      // Redirect after modal closes
      setTimeout(() => {
        router.push('/admin/users')
      }, 3500)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to create user')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
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
          <UserPlus className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="font-serif text-3xl font-bold">Create New User</h1>
            <p className="text-gray-600">Add a new user to the system</p>
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

          {/* Account Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>🔐 Password Generation:</strong> A secure random password will be automatically generated and sent to the user's email address. They can change it after their first login.
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
              {loading ? 'Creating User...' : 'Create User'}
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
        title={modalMessage.includes('successfully') ? 'User Created' : 'Error'}
        message={modalMessage}
        type={modalMessage.includes('successfully') ? 'success' : 'error'}
      />
    </div>
  )
}

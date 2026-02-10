'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Camera, Upload } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { api } from '@/lib/api'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
  })

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }

    setUploading(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)

      // Upload to server
      const response = await api.post('/upload/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Set the uploaded image URL
      setProfileImage(response.data.url)
      alert('Profile image updated successfully!')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      await api.patch('/users/me', formData)
      alert('Profile updated successfully!')
      setIsEditing(false)
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update profile')
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
    })
    setIsEditing(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">View and manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white mx-auto overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div>
              <button
                onClick={handleImageClick}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                title="Upload profile image"
              >
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              <Shield className="h-4 w-4" />
              {user?.role === 'admin' ? 'Administrator' : user?.role === 'member' ? 'Member' : 'User'}
            </div>

            <div className="pt-6 border-t text-left space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-semibold">January 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Email Status</p>
                  <p className="font-semibold">
                    {user?.isEmailVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-outline flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-outline flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{user?.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{user?.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{user?.email}</p>
                    {user?.isEmailVerified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                        Verified
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                    placeholder="+1234567890"
                  />
                ) : (
                  <p className="text-lg font-semibold">{formData.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="card mt-6">
            <h2 className="text-2xl font-bold mb-6">Account Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-1">Password</h3>
                  <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                </div>
                <button className="btn-outline">Change Password</button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <button className="btn-outline">Enable</button>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="card mt-6">
            <h2 className="text-2xl font-bold mb-6">Activity Summary</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">12</p>
                <p className="text-sm text-gray-600 mt-1">Events Attended</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600 mt-1">Orders Placed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">$250</p>
                <p className="text-sm text-gray-600 mt-1">Total Donated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

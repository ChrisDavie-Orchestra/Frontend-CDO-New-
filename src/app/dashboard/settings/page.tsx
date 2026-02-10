'use client'

import { useState } from 'react'
import { User, Mail, Phone, Lock, Bell, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Member',
    email: 'member@example.com',
    phone: '+1234567890',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notifications, setNotifications] = useState({
    emailEvents: true,
    emailNews: true,
    emailOrders: true,
    emailDonations: false,
  })

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call
    console.log('Update profile:', formData)
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // TODO: Implement API call
    console.log('Change password')
    alert('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleNotificationUpdate = () => {
    // TODO: Implement API call
    console.log('Update notifications:', notifications)
    alert('Notification preferences updated!')
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <User className="h-6 w-6 text-primary-600" />
              <h2 className="font-serif text-2xl font-bold">Profile Information</h2>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input pl-10"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-primary-600" />
              <h2 className="font-serif text-2xl font-bold">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="input"
                  required
                  minLength={8}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Update Password
              </button>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-primary-600" />
              <h2 className="font-serif text-2xl font-bold">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium">Event Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive updates about upcoming concerts and events
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailEvents}
                  onChange={(e) => setNotifications({ ...notifications, emailEvents: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium">News & Updates</p>
                  <p className="text-sm text-gray-600">
                    Get the latest news and announcements
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailNews}
                  onChange={(e) => setNotifications({ ...notifications, emailNews: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-sm text-gray-600">
                    Notifications about your orders and shipments
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailOrders}
                  onChange={(e) => setNotifications({ ...notifications, emailOrders: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium">Donation Receipts</p>
                  <p className="text-sm text-gray-600">
                    Email receipts for your donations
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailDonations}
                  onChange={(e) => setNotifications({ ...notifications, emailDonations: e.target.checked })}
                  className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
              </label>

              <button onClick={handleNotificationUpdate} className="btn-primary">
                Save Preferences
              </button>
            </div>
          </div>

          {/* Membership & Billing */}
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="h-6 w-6 text-primary-600" />
              <h2 className="font-serif text-2xl font-bold">Membership & Billing</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium">Current Membership</p>
                  <p className="text-sm text-gray-600">Gold Member</p>
                </div>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="font-medium">Renewal Date</p>
                  <p className="text-sm text-gray-600">January 19, 2027</p>
                </div>
                <span className="text-sm text-gray-600">Auto-renewal enabled</span>
              </div>

              <div className="flex gap-3">
                <button className="btn-outline">
                  Upgrade Membership
                </button>
                <button className="btn-outline">
                  Manage Billing
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-2 border-red-200">
            <h2 className="font-serif text-2xl font-bold mb-4 text-red-600">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

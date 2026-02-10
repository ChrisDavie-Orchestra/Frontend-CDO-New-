'use client'

import { useState } from 'react'
import { Save, Settings as SettingsIcon } from 'lucide-react'

/**
 * Admin Settings Page
 * Manage application settings
 */
export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Chris Davies Orchestra',
    siteUrl: 'https://chrisdaviesorchestra.com',
    contactEmail: 'info@chrisdaviesorchestra.com',
    supportEmail: 'support@chrisdaviesorchestra.com',
    phone: '+1234567890',
    address: '123 Orchestra Street, Music City',
    socialMedia: {
      facebook: 'https://facebook.com/chrisdaviesorchestra',
      twitter: 'https://twitter.com/cdorchestra',
      instagram: 'https://instagram.com/chrisdaviesorchestra',
      youtube: 'https://youtube.com/chrisdaviesorchestra',
    },
    emailSettings: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
    },
    paymentSettings: {
      paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      paystackSecretKey: '',
      currency: 'NGN',
    },
    maintenanceMode: false,
    allowRegistration: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // TODO: Implement API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const handleChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof typeof prev] === 'object' 
        ? { ...(prev[section as keyof typeof prev] as any), [field]: value }
        : value
    }))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage application settings and configurations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            General Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Site URL</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Social Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                value={settings.socialMedia.facebook}
                onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)}
                className="input"
                placeholder="https://facebook.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <input
                type="url"
                value={settings.socialMedia.twitter}
                onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)}
                className="input"
                placeholder="https://twitter.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="url"
                value={settings.socialMedia.instagram}
                onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)}
                className="input"
                placeholder="https://instagram.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="url"
                value={settings.socialMedia.youtube}
                onChange={(e) => handleChange('socialMedia', 'youtube', e.target.value)}
                className="input"
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Email Settings (SMTP)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">SMTP Host</label>
              <input
                type="text"
                value={settings.emailSettings.smtpHost}
                onChange={(e) => handleChange('emailSettings', 'smtpHost', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">SMTP Port</label>
              <input
                type="text"
                value={settings.emailSettings.smtpPort}
                onChange={(e) => handleChange('emailSettings', 'smtpPort', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">SMTP User</label>
              <input
                type="text"
                value={settings.emailSettings.smtpUser}
                onChange={(e) => handleChange('emailSettings', 'smtpUser', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">SMTP Password</label>
              <input
                type="password"
                value={settings.emailSettings.smtpPassword}
                onChange={(e) => handleChange('emailSettings', 'smtpPassword', e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Payment Settings (Paystack)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Public Key</label>
              <input
                type="text"
                value={settings.paymentSettings.paystackPublicKey}
                onChange={(e) => handleChange('paymentSettings', 'paystackPublicKey', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Secret Key</label>
              <input
                type="password"
                value={settings.paymentSettings.paystackSecretKey}
                onChange={(e) => handleChange('paymentSettings', 'paystackSecretKey', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={settings.paymentSettings.currency}
                onChange={(e) => handleChange('paymentSettings', 'currency', e.target.value)}
                className="input"
              >
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">System Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Maintenance Mode</label>
                <p className="text-sm text-gray-600">Disable public access to the site</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Allow Registration</label>
                <p className="text-sm text-gray-600">Allow new users to register</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="h-5 w-5" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}

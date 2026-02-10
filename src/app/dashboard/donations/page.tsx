'use client'

import { Heart, Download } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function MyDonationsPage() {
  // Mock data - replace with actual API call
  const donations = [
    {
      id: '1',
      amount: 100,
      date: '2026-01-15T10:00:00',
      type: 'one-time',
      purpose: 'General Support',
      receiptNumber: 'DON-2026-001',
      taxDeductible: true,
    },
    {
      id: '2',
      amount: 50,
      date: '2026-01-01T10:00:00',
      type: 'recurring',
      purpose: 'Music Education Program',
      receiptNumber: 'DON-2026-002',
      taxDeductible: true,
    },
    {
      id: '3',
      amount: 100,
      date: '2025-12-01T10:00:00',
      type: 'recurring',
      purpose: 'Music Education Program',
      receiptNumber: 'DON-2025-012',
      taxDeductible: true,
    },
  ]

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)
  const recurringDonations = donations.filter(d => d.type === 'recurring')

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">My Donations</h1>
          <p className="text-gray-600">Thank you for your generous support!</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Total Donated</p>
            <p className="text-3xl font-bold text-primary-600">{formatCurrency(totalDonated)}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Total Donations</p>
            <p className="text-3xl font-bold text-primary-600">{donations.length}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm mb-1">Recurring Donations</p>
            <p className="text-3xl font-bold text-primary-600">{recurringDonations.length}</p>
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="card text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Donations Yet</h2>
            <p className="text-gray-600 mb-6">Support our mission with a donation today!</p>
            <a href="/donate" className="btn-primary">
              Make a Donation
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <h2 className="font-serif text-2xl font-bold mb-6">Donation History</h2>
              <div className="space-y-4">
                {donations.map((donation) => (
                  <div key={donation.id} className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b last:border-0">
                    <div className="flex items-start gap-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">
                          {formatCurrency(donation.amount)}
                        </p>
                        <p className="text-sm text-gray-600">{donation.purpose}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(donation.date)} • {donation.type === 'recurring' ? 'Monthly' : 'One-time'}
                        </p>
                        {donation.taxDeductible && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            Tax Deductible
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm text-gray-600">
                        Receipt: <span className="font-mono">{donation.receiptNumber}</span>
                      </p>
                      <button className="btn-outline btn-sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {recurringDonations.length > 0 && (
              <div className="card bg-primary-50">
                <h3 className="font-serif text-xl font-bold mb-4">Recurring Donations</h3>
                <p className="text-gray-600 mb-4">
                  You have {recurringDonations.length} active recurring donation{recurringDonations.length !== 1 ? 's' : ''}.
                  Thank you for your continued support!
                </p>
                <button className="btn-outline">
                  Manage Recurring Donations
                </button>
              </div>
            )}

            <div className="card">
              <h3 className="font-serif text-xl font-bold mb-4">Tax Information</h3>
              <p className="text-gray-600 mb-4">
                All donations are tax-deductible to the fullest extent allowed by law.
                Our Tax ID: 12-3456789
              </p>
              <p className="text-sm text-gray-500">
                Please consult with your tax advisor for specific guidance on your donations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

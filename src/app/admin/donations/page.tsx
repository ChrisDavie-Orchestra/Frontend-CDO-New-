'use client'

import { useQuery } from '@tanstack/react-query'
import { Heart, Download } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AdminDonationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-donations'],
    queryFn: async () => {
      const response = await api.get('/donations')
      return response.data
    },
  })

  const totalDonations = data?.data?.reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0) || 0

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Donations</h1>
        <p className="text-gray-600">Manage and track donations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total Donations</p>
          <p className="text-3xl font-bold text-primary-600">{formatCurrency(totalDonations)}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">Total Count</p>
          <p className="text-3xl font-bold">{data?.data?.length || 0}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-green-600">+23%</p>
        </div>
      </div>

      {/* Donations Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading donations...
                  </td>
                </tr>
              ) : data?.data?.length > 0 ? (
                data.data.map((donation: any) => (
                  <tr key={donation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">
                          {donation.isAnonymous ? 'Anonymous' : `${donation.user?.firstName} ${donation.user?.lastName}`}
                        </div>
                        {!donation.isAnonymous && (
                          <div className="text-sm text-gray-500">{donation.user?.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary-600">{formatCurrency(donation.amount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        donation.isRecurring ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {donation.isRecurring ? 'Recurring' : 'One-time'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{donation.purpose || 'General'}</td>
                    <td className="px-6 py-4 text-sm">{formatDate(donation.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded" title="Download receipt">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No donations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

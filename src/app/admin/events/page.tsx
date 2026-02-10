'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Calendar, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AdminEventsPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-events', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/events${params}`)
      return response.data
    },
  })

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Manage Events</h1>
            <p className="text-gray-600">Create and manage concert events</p>
          </div>
          <Link href="/admin/events/new" className="btn-primary">
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Link>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
        </div>

        {/* Events Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      Loading events...
                    </td>
                  </tr>
                ) : data?.data?.length > 0 ? (
                  data.data.map((event: any) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.type}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">{formatDate(event.startDate)}</td>
                      <td className="px-6 py-4 text-sm">{event.venue}</td>
                      <td className="px-6 py-4 text-sm">
                        {event.isFree ? 'Free' : formatCurrency(event.ticketPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {event.availableSeats}/{event.totalSeats}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {event.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

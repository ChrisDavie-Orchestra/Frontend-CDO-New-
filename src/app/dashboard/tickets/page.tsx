'use client'

import { Ticket, Calendar, MapPin, Download } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function MyTicketsPage() {
  // Mock data - replace with actual API call
  const tickets = [
    {
      id: '1',
      eventTitle: 'Spring Concert 2026',
      eventDate: '2026-03-15T19:00:00',
      venue: 'Symphony Hall',
      venueAddress: '123 Music Street, City',
      quantity: 2,
      totalPrice: 100,
      status: 'confirmed',
      bookingReference: 'CDO-2026-001',
    },
    {
      id: '2',
      eventTitle: 'Summer Gala Concert',
      eventDate: '2026-06-20T20:00:00',
      venue: 'Grand Theater',
      venueAddress: '456 Performance Ave, City',
      quantity: 1,
      totalPrice: 75,
      status: 'confirmed',
      bookingReference: 'CDO-2026-002',
    },
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">My Tickets</h1>
          <p className="text-gray-600">View and manage your event tickets</p>
        </div>

        {tickets.length === 0 ? (
          <div className="card text-center py-12">
            <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Tickets Yet</h2>
            <p className="text-gray-600 mb-6">Book your first concert ticket today!</p>
            <a href="/concerts" className="btn-primary">
              Browse Concerts
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="card">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-2xl font-bold mb-2">
                          {ticket.eventTitle}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-3" />
                        <span>{formatDate(ticket.eventDate)}</span>
                      </div>
                      <div className="flex items-start text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900">{ticket.venue}</p>
                          <p className="text-sm">{ticket.venueAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Ticket className="h-5 w-5 mr-3" />
                        <span>{ticket.quantity} {ticket.quantity === 1 ? 'Ticket' : 'Tickets'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 flex flex-col justify-between">
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                      <p className="font-mono font-semibold">{ticket.bookingReference}</p>
                      <p className="text-sm text-gray-600 mt-3 mb-1">Total Paid</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {formatCurrency(ticket.totalPrice)}
                      </p>
                    </div>
                    <button className="btn-primary w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

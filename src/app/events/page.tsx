'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Ticket, Filter, Search } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  const { data, isLoading } = useQuery({
    queryKey: ['events', search, filter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filter === 'upcoming') params.append('upcoming', 'true')
      if (filter === 'past') params.append('past', 'true')
      
      const url = `/events${params.toString() ? `?${params.toString()}` : ''}`
      const response = await api.get(url)
      return response.data
    },
  })

  const getEventDate = (startDate: string) => {
    const date = new Date(startDate)
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4">Concerts & Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience world-class orchestral performances and special events. Book your tickets today!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  filter === 'upcoming' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  filter === 'past' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.map((event: any) => {
              const eventDate = getEventDate(event.startDate)
              const isPast = new Date(event.startDate) < new Date()
              
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="card group hover:shadow-xl transition-all"
                >
                  {/* Event Image */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg mb-4 overflow-hidden">
                    {event.imageUrl ? (
                      <img 
                        src={event.imageUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Calendar className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center">
                      <p className="text-3xl font-bold text-primary-600">{eventDate.day}</p>
                      <p className="text-xs font-semibold text-gray-600 uppercase">{eventDate.month}</p>
                    </div>

                    {/* Status Badge */}
                    {isPast && (
                      <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Past Event
                      </div>
                    )}
                    {event.isFeatured && !isPast && (
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary-600" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary-600" />
                        <span>{eventDate.time}</span>
                      </div>
                      {!event.isFree && (
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-primary-600" />
                          <span>From {formatCurrency(event.ticketPrice)}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {event.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>
                    )}

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      {event.isFree ? (
                        <span className="text-green-600 font-semibold">Free Event</span>
                      ) : (
                        <span className="font-semibold text-primary-600">
                          {formatCurrency(event.ticketPrice)}
                        </span>
                      )}
                      <span className="text-primary-600 font-semibold group-hover:gap-2 flex items-center transition-all">
                        {isPast ? 'View Details' : 'Book Tickets'}
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                    
                    {/* Availability indicator */}
                    {!isPast && (
                      <div className="mt-3 text-sm">
                        {event.availableSeats > 0 ? (
                          <span className="text-green-600">
                            ✓ {event.availableSeats || event.totalSeats} seats available
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">Sold Out</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Found</h3>
            <p className="text-gray-500">
              {search ? 'Try adjusting your search terms' : 'Check back soon for upcoming events!'}
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white mt-16">
          <div className="text-center py-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about upcoming concerts and exclusive member offers.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 text-gray-900"
              />
              <button className="btn bg-white text-primary-600 hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

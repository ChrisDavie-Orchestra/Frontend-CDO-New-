'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Ticket, Music, Video } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export function ComingUp() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['coming-up'],
    queryFn: async () => {
      const response = await api.get('/events/coming-up?limit=6')
      return response.data
    },
  })

  const getEventDate = (startDate: string) => {
    const date = new Date(startDate)
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    }
  }

  const getTicketStatusBadge = (event: any) => {
    if (!event.requiresTicket) {
      return { text: 'No Ticket Required', color: 'bg-green-600' }
    }
    if (event.ticketStatus === 'Limited Tickets') {
      return { text: 'Limited Tickets', color: 'bg-orange-600' }
    }
    if (event.availableSeats === 0) {
      return { text: 'Sold Out', color: 'bg-red-600' }
    }
    return { text: 'Book Tickets', color: 'bg-primary-600' }
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-serif text-4xl font-bold mb-12 text-center">Coming Up</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card">
                <div className="animate-pulse">
                  {/* Image skeleton */}
                  <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 bg-[length:200%_100%] animate-shimmer"></div>
                  
                  {/* Title skeleton */}
                  <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3 w-4/5 bg-[length:200%_100%] animate-shimmer"></div>
                  
                  {/* Conductor skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mb-3 w-2/3 bg-[length:200%_100%] animate-shimmer"></div>
                  
                  {/* Details skeleton */}
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full bg-[length:200%_100%] animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 bg-[length:200%_100%] animate-shimmer"></div>
                  </div>
                  
                  {/* Button skeleton */}
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full w-32 bg-[length:200%_100%] animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-serif text-5xl font-bold mb-4">Coming Up</h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our upcoming concerts and events. From classical masterpieces to contemporary works, 
            experience the finest orchestral performances.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any) => {
            const eventDate = getEventDate(event.startDate)
            const ticketStatus = getTicketStatusBadge(event)

            return (
              <Link
                key={event.id}
                href={`/concerts/${event.id}`}
                className="group block"
              >
                {/* Event Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg mb-4 overflow-hidden">
                  {event.featuredImage ? (
                    <img 
                      src={event.featuredImage} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Music className="h-20 w-20 text-white opacity-30" />
                    </div>
                  )}
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 text-center min-w-[70px]">
                    <p className="text-3xl font-bold text-primary-600 leading-none">{eventDate.day}</p>
                    <p className="text-xs font-semibold text-gray-600 uppercase mt-1">{eventDate.month}</p>
                  </div>

                  {/* Series Badge */}
                  {event.series && (
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {event.series}
                    </div>
                  )}

                  {/* Streaming Badge */}
                  {event.isStreaming && (
                    <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      Streaming Available
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div>
                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Conductor/Artist */}
                  {event.conductor && (
                    <p className="text-sm font-semibold text-primary-600 mb-2">
                      {event.conductor}
                    </p>
                  )}

                  {/* Event Info */}
                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-600 flex-shrink-0" />
                      <span>{formatDate(event.startDate)} • {eventDate.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary-600 flex-shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Program Preview */}
                  {event.program && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 italic">
                      {event.program}
                    </p>
                  )}

                  {/* Ticket Status */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className={`${ticketStatus.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {ticketStatus.text}
                    </span>
                    {!event.isFree && event.requiresTicket && (
                      <span className="text-sm text-gray-600">
                        From {formatCurrency(event.ticketPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            href="/concerts" 
            className="btn btn-primary inline-flex items-center gap-2"
          >
            View Full Calendar
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

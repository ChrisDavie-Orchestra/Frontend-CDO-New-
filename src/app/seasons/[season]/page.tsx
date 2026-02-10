'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Music } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function SeasonDetailPage() {
  const params = useParams()
  const season = decodeURIComponent(params.season as string)

  const { data: events, isLoading } = useQuery({
    queryKey: ['season', season],
    queryFn: async () => {
      const response = await api.get(`/events/season/${encodeURIComponent(season)}`)
      return response.data
    },
  })

  const getEventDate = (startDate: string) => {
    const date = new Date(startDate)
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <Link href="/seasons" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Seasons
          </Link>
          <h1 className="font-serif text-5xl font-bold mb-4">{season}</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            All concerts and events from the {season}
          </p>
        </div>

        {/* Events List */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : events && events.length > 0 ? (
          <div className="space-y-6">
            {events.map((event: any) => {
              const eventDate = getEventDate(event.startDate)
              const isPast = new Date(event.startDate) < new Date()

              return (
                <Link
                  key={event.id}
                  href={`/concerts/${event.id}`}
                  className="card group hover:shadow-xl transition-all block"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Event Image */}
                    <div className="relative w-full md:w-64 aspect-video md:aspect-auto md:h-40 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg overflow-hidden flex-shrink-0">
                      {event.featuredImage ? (
                        <img 
                          src={event.featuredImage} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Music className="h-12 w-12 text-white opacity-30" />
                        </div>
                      )}
                      
                      {/* Date Badge */}
                      <div className="absolute top-3 left-3 bg-white rounded-lg shadow-lg p-2 text-center min-w-[60px]">
                        <p className="text-2xl font-bold text-primary-600 leading-none">{eventDate.day}</p>
                        <p className="text-xs font-semibold text-gray-600 uppercase">{eventDate.month}</p>
                      </div>

                      {isPast && (
                        <div className="absolute top-3 right-3 bg-gray-900/80 text-white px-2 py-1 rounded text-xs font-semibold">
                          Past
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                        {event.title}
                      </h3>

                      {event.conductor && (
                        <p className="text-sm font-semibold text-primary-600 mb-3">
                          {event.conductor}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary-600 flex-shrink-0" />
                          <span>{formatDate(event.startDate)} • {eventDate.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary-600 flex-shrink-0" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {event.program && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 italic">
                          {event.program}
                        </p>
                      )}

                      <div className="flex items-center gap-4 pt-3 border-t">
                        {event.series && (
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {event.series}
                          </span>
                        )}
                        {!isPast && !event.isFree && (
                          <span className="text-sm font-semibold text-primary-600">
                            From {formatCurrency(event.ticketPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Events Found</h3>
            <p className="text-gray-500">No events scheduled for this season yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Video, Calendar, Clock, Play } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function StreamingPage() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['streaming-events'],
    queryFn: async () => {
      const response = await api.get('/events/streaming')
      return response.data
    },
  })

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
            <Video className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="font-serif text-5xl font-bold mb-4">Streaming & Online</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch and listen to the Chris Davies Orchestra from the comfort of your home. 
            Experience our concerts live or on-demand.
          </p>
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
        ) : events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <Link
                key={event.id}
                href={event.streamingUrl || `/concerts/${event.id}`}
                className="card group hover:shadow-xl transition-all"
                target={event.streamingUrl ? '_blank' : '_self'}
              >
                {/* Event Image */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg mb-4 overflow-hidden">
                  {event.featuredImage ? (
                    <img 
                      src={event.featuredImage} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Video className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="h-8 w-8 text-purple-600 ml-1" />
                    </div>
                  </div>

                  {/* Live Badge */}
                  {new Date(event.startDate) > new Date() && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      UPCOMING LIVE
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  {event.conductor && (
                    <p className="text-sm font-semibold text-purple-600 mb-2">
                      {event.conductor}
                    </p>
                  )}

                  <div className="space-y-1 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    {event.startDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span>{new Date(event.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>

                  {event.program && (
                    <p className="text-sm text-gray-600 line-clamp-2 italic">
                      {event.program}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Video className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Streaming Events Available</h3>
            <p className="text-gray-500">Check back soon for upcoming streaming concerts!</p>
          </div>
        )}

        {/* Info Section */}
        <div className="card bg-gradient-to-r from-purple-600 to-purple-700 text-white mt-16">
          <div className="py-12 px-8">
            <h2 className="font-serif text-3xl font-bold mb-4">How to Watch</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold mb-2">Browse Events</h3>
                <p className="text-purple-100">Find streaming concerts that interest you</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold mb-2">Get Access</h3>
                <p className="text-purple-100">Some events are free, others require tickets</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold mb-2">Enjoy</h3>
                <p className="text-purple-100">Watch live or on-demand from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatDateTime, formatCurrency } from '@/lib/utils'

/**
 * Concert detail page
 * Shows full details of a specific concert
 */
export default function ConcertDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await api.get(`/events/${id}`)
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Concert not found</h1>
          <button onClick={() => router.push('/concerts')} className="btn-primary">
            Back to Concerts
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-primary-600"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>

      {/* Hero Image */}
      {event.featuredImage ? (
        <div className="w-full h-96 bg-gray-200">
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="font-serif text-4xl font-bold mb-6">{event.title}</h1>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-600">{event.description}</p>
              </div>

              {event.program && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-4">Program</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <pre className="whitespace-pre-wrap text-gray-700">{event.program}</pre>
                  </div>
                </div>
              )}

              {event.performers && event.performers.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-4">Featured Performers</h2>
                  <div className="space-y-2">
                    {event.performers.map((performer: string, index: number) => (
                      <p key={index} className="text-gray-700">• {performer}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="card sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-4">Event Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-gray-600">{formatDateTime(event.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Venue</p>
                      <p className="text-gray-600">{event.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-gray-600">{event.duration || 'TBA'}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-semibold">Availability</p>
                      <p className="text-gray-600">
                        {event.availableSeats > 0
                          ? `${event.availableSeats} seats available`
                          : 'Sold out'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price</span>
                    <span className="font-serif text-2xl font-bold text-primary-600">
                      {event.isFree ? 'Free' : formatCurrency(event.ticketPrice)}
                    </span>
                  </div>
                </div>

                {event.availableSeats > 0 ? (
                  <button className="btn-primary w-full">
                    Book Tickets
                  </button>
                ) : (
                  <button className="btn w-full bg-gray-300 text-gray-600 cursor-not-allowed" disabled>
                    Sold Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

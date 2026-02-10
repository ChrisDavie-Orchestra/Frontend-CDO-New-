'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  ArrowLeft,
  Users,
  DollarSign,
  CheckCircle,
  Minus,
  Plus
} from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [ticketQuantity, setTicketQuantity] = useState(1)

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', params.id],
    queryFn: async () => {
      const response = await api.get(`/events/${params.id}`)
      return response.data
    },
  })

  const bookTicketMutation = useMutation({
    mutationFn: async (data: { eventId: string; quantity: number }) => {
      const response = await api.post('/tickets', data)
      return response.data
    },
    onSuccess: () => {
      alert('Tickets booked successfully!')
      router.push('/dashboard/tickets')
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to book tickets')
    },
  })

  const handleBookTickets = () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (ticketQuantity < 1) {
      alert('Please select at least 1 ticket')
      return
    }

    bookTicketMutation.mutate({
      eventId: params.id as string,
      quantity: ticketQuantity,
    })
  }

  const incrementQuantity = () => {
    if (ticketQuantity < (event?.availableSeats || 10)) {
      setTicketQuantity(ticketQuantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-gray-50">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen py-16 bg-gray-50">
        <div className="container text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const eventDate = new Date(event.startDate)
  const isPast = eventDate < new Date()
  const availableSeats = event.totalSeats - (event.bookedSeats || 0)
  const totalPrice = event.isFree ? 0 : event.ticketPrice * ticketQuantity

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Back Button */}
        <Link 
          href="/events"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative aspect-video bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg mb-8 overflow-hidden">
              {event.imageUrl ? (
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Calendar className="h-24 w-24 text-white opacity-50" />
                </div>
              )}
              
              {isPast && (
                <div className="absolute top-4 right-4 bg-gray-900/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Past Event
                </div>
              )}
              {event.isFeatured && !isPast && (
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured Event
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="card">
              <h1 className="font-serif text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">{formatDate(event.startDate)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold">
                      {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-semibold">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Seats</p>
                    <p className="font-semibold">{availableSeats} / {event.totalSeats}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.description || 'Join us for an unforgettable evening of classical music performed by the Chris Davies Orchestra.'}
                </p>
              </div>

              {/* Venue Address */}
              {event.venueAddress && (
                <div className="pt-6 border-t mt-6">
                  <h2 className="text-2xl font-bold mb-4">Location</h2>
                  <p className="text-gray-700">{event.venueAddress}</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Book Tickets</h2>

              {isPast ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">This event has already passed</p>
                  <Link href="/events" className="btn-outline w-full">
                    View Upcoming Events
                  </Link>
                </div>
              ) : availableSeats === 0 ? (
                <div className="text-center py-8">
                  <p className="text-red-600 font-semibold mb-4">Sold Out</p>
                  <p className="text-gray-600 text-sm">All tickets for this event have been sold</p>
                </div>
              ) : (
                <>
                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">Price per ticket</p>
                    {event.isFree ? (
                      <p className="text-3xl font-bold text-green-600">FREE</p>
                    ) : (
                      <p className="text-3xl font-bold text-primary-600">
                        {formatCurrency(event.ticketPrice)}
                      </p>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Tickets
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={decrementQuantity}
                        disabled={ticketQuantity <= 1}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">{ticketQuantity}</span>
                      <button
                        onClick={incrementQuantity}
                        disabled={ticketQuantity >= availableSeats}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {availableSeats} tickets available
                    </p>
                  </div>

                  {/* Total */}
                  {!event.isFree && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total</span>
                        <span className="text-2xl font-bold text-primary-600">
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Book Button */}
                  <button
                    onClick={handleBookTickets}
                    disabled={bookTicketMutation.isPending}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {bookTicketMutation.isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <Ticket className="h-5 w-5" />
                        {event.isFree ? 'Reserve Tickets' : 'Book Now'}
                      </>
                    )}
                  </button>

                  {!isAuthenticated && (
                    <p className="text-xs text-gray-500 text-center mt-4">
                      You will be redirected to login
                    </p>
                  )}

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Mobile tickets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Free cancellation up to 24h</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

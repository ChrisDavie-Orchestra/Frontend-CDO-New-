'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, formatCurrency } from '@/lib/utils'

/**
 * Featured Events component
 * Displays featured upcoming concerts
 */
export function FeaturedEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-events'],
    queryFn: async () => {
      const response = await api.get('/events/featured')
      return response.data
    },
  })

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Featured Concerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="font-serif text-3xl font-bold text-center mb-12">
          Featured Concerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.map((event: any) => (
            <Link
              key={event.id}
              href={`/concerts/${event.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              {event.featuredImage && (
                <img
                  src={event.featuredImage}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="font-serif text-xl font-bold mb-2">{event.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-primary-600">
                  {event.isFree ? 'Free' : `From ${formatCurrency(event.ticketPrice)}`}
                </span>
                <ArrowRight className="h-5 w-5 text-primary-600" />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/concerts" className="btn-primary">
            View All Concerts
          </Link>
        </div>
      </div>
    </section>
  )
}

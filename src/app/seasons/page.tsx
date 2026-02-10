'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Calendar, Music } from 'lucide-react'
import { api } from '@/lib/api'

export default function SeasonsPage() {
  const { data: seasons, isLoading } = useQuery({
    queryKey: ['seasons'],
    queryFn: async () => {
      const response = await api.get('/events/meta/seasons')
      return response.data
    },
  })

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <Calendar className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="font-serif text-5xl font-bold mb-4">Our Seasons</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our concert seasons featuring world-class performances, renowned conductors, 
            and extraordinary musical experiences throughout the year.
          </p>
        </div>

        {/* Seasons Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : seasons && seasons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seasons.map((season: string) => (
              <Link
                key={season}
                href={`/seasons/${encodeURIComponent(season)}`}
                className="card group hover:shadow-xl transition-all"
              >
                {/* Season Image */}
                <div className="relative aspect-video bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg mb-4 overflow-hidden">
                  <div className="flex items-center justify-center h-full">
                    <Music className="h-20 w-20 text-white opacity-30" />
                  </div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>
                </div>

                {/* Season Details */}
                <div>
                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                    {season}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    Explore all concerts and events from the {season}
                  </p>

                  <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                    View Season
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Seasons Available</h3>
            <p className="text-gray-500">Check back soon for upcoming seasons!</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white mt-16">
          <div className="text-center py-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Subscribe to Our Season</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Get priority booking, exclusive benefits, and save on tickets when you subscribe to our full season.
            </p>
            <Link href="/memberships" className="btn bg-white text-primary-600 hover:bg-gray-100">
              View Membership Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

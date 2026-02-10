'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Music, Video, Heart, Users } from 'lucide-react'
import { api } from '@/lib/api'

export function Highlights() {
  const { data: series } = useQuery({
    queryKey: ['event-series'],
    queryFn: async () => {
      const response = await api.get('/events/meta/series')
      return response.data
    },
  })

  const { data: streaming } = useQuery({
    queryKey: ['streaming-events'],
    queryFn: async () => {
      const response = await api.get('/events/streaming')
      return response.data
    },
  })

  const highlights = [
    {
      title: 'CDO Discovery',
      description: 'Educational programs and community engagement initiatives bringing music to everyone',
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      link: '/discovery',
    },
    {
      title: 'Streaming & Online',
      description: 'Watch and listen to our concerts from the comfort of your home',
      icon: Video,
      color: 'from-purple-600 to-purple-700',
      link: '/streaming',
      count: streaming?.length || 0,
    },
    {
      title: 'Support Us',
      description: 'Help us continue to inspire hearts and minds through extraordinary music-making',
      icon: Heart,
      color: 'from-red-600 to-red-700',
      link: '/donate',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <h2 className="font-serif text-4xl font-bold mb-12 text-center">Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight) => {
            const Icon = highlight.icon
            return (
              <Link
                key={highlight.title}
                href={highlight.link}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${highlight.color} rounded-xl p-8 text-white h-full hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="h-12 w-12" />
                      {highlight.count !== undefined && highlight.count > 0 && (
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                          {highlight.count} Available
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-2xl font-bold mb-3">
                      {highlight.title}
                    </h3>
                    
                    <p className="text-white/90 mb-4">
                      {highlight.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn More
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

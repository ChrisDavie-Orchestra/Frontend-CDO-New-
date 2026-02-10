'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Users, Music, GraduationCap, Heart, Calendar } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function DiscoveryPage() {
  const { data: freeEvents, isLoading } = useQuery({
    queryKey: ['free-events'],
    queryFn: async () => {
      const response = await api.get('/events/free')
      return response.data
    },
  })

  const programs = [
    {
      title: 'Free Friday Lunchtime Concerts',
      description: 'Informal, bite-size concerts featuring CDO and guest musicians. Perfect for your lunch break!',
      icon: Music,
      color: 'from-blue-600 to-blue-700',
      schedule: 'Every Friday at 12:30pm',
    },
    {
      title: 'Youth Programs',
      description: 'Inspiring the next generation of musicians through workshops, masterclasses, and youth orchestra programs.',
      icon: GraduationCap,
      color: 'from-green-600 to-green-700',
      schedule: 'Year-round programs',
    },
    {
      title: 'Community Engagement',
      description: 'Bringing music to underserved communities through outreach concerts and educational initiatives.',
      icon: Heart,
      color: 'from-red-600 to-red-700',
      schedule: 'Monthly events',
    },
    {
      title: 'School Partnerships',
      description: 'Collaborative programs with local schools to enhance music education and provide performance opportunities.',
      icon: Users,
      color: 'from-purple-600 to-purple-700',
      schedule: 'Academic year',
    },
  ]

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Users className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="font-serif text-5xl font-bold mb-4">CDO Discovery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Educational programs and community engagement initiatives bringing the joy of orchestral music to everyone. 
            We believe music has the power to inspire, educate, and transform lives.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <div
                  key={program.title}
                  className={`relative bg-gradient-to-br ${program.color} rounded-xl p-8 text-white hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <Icon className="h-12 w-12 mb-4" />
                    
                    <h3 className="font-serif text-2xl font-bold mb-3">
                      {program.title}
                    </h3>
                    
                    <p className="text-white/90 mb-4">
                      {program.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Calendar className="h-4 w-4" />
                      {program.schedule}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Free Events Section */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Free Events</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : freeEvents && freeEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeEvents.slice(0, 6).map((event: any) => (
                <Link
                  key={event.id}
                  href={`/concerts/${event.id}`}
                  className="card group hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-4 overflow-hidden">
                    {event.featuredImage ? (
                      <img 
                        src={event.featuredImage} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Music className="h-16 w-16 text-white opacity-30" />
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      FREE
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(event.startDate)}
                  </p>
                  
                  <p className="text-sm text-gray-600">
                    {event.venue}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Music className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No free events scheduled at the moment. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Impact Section */}
        <div className="card bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="py-12 px-8">
            <h2 className="font-serif text-4xl font-bold mb-8 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10,000+</div>
                <p className="text-blue-100">Students Reached Annually</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <p className="text-blue-100">Free Community Concerts</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">25+</div>
                <p className="text-blue-100">School Partnerships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Get Involved CTA */}
        <div className="text-center mt-16">
          <h2 className="font-serif text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Support our educational programs and help us bring music to more communities
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/donate" className="btn btn-primary">
              Support Discovery Programs
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

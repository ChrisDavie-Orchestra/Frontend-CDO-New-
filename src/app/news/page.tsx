'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Search, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, truncate } from '@/lib/utils'

/**
 * News page
 * List of all news articles
 */
export default function NewsPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['news', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/news${params}`)
      return response.data
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            News & Updates
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Stay up to date with the latest news, announcements, and stories from the orchestra
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : data?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.data.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  {article.featuredImage && (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-xl font-bold mb-2">{article.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{formatDate(article.publishedAt)}</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {truncate(article.excerpt || article.content, 120)}
                  </p>
                  <div className="flex items-center text-primary-600 font-semibold">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

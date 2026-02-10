'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Calendar, ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate, truncate } from '@/lib/utils'

/**
 * Latest News component
 * Displays recent news articles
 */
export function LatestNews() {
  const { data, isLoading } = useQuery({
    queryKey: ['latest-news'],
    queryFn: async () => {
      const response = await api.get('/news/featured')
      return response.data
    },
  })

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
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
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.slice(0, 3).map((article: any) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="card hover:shadow-lg transition-shadow"
            >
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
        <div className="text-center mt-12">
          <Link href="/news" className="btn-primary">
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}

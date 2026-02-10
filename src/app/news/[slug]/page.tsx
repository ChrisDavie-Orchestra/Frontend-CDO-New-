'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const { data: article, isLoading } = useQuery({
    queryKey: ['news', slug],
    queryFn: async () => {
      const response = await api.get(`/news/${slug}`)
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <button onClick={() => router.push('/news')} className="btn-primary">
            Back to News
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary-600 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to News
          </button>

          {/* Article Header */}
          <article>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
              </div>
              {article.author && (
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <span>{article.author.firstName} {article.author.lastName}</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <div className="text-xl text-gray-600 mb-8 pb-8 border-b">
                {article.excerpt}
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-5 w-5 text-gray-400" />
                  {article.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">More News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for related articles */}
              <div className="card">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Related Article</h3>
                <p className="text-sm text-gray-600">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

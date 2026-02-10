'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FileText, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

export default function AdminNewsPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-news', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/news${params}`)
      return response.data
    },
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">News & Articles</h1>
          <p className="text-gray-600">Manage news content</p>
        </div>
        <Link href="/admin/news/new" className="btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Write Article
        </Link>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />
      </div>

      {/* News Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Loading articles...
                  </td>
                </tr>
              ) : data?.data?.length > 0 ? (
                data.data.map((article: any) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{article.title}</div>
                      {article.excerpt && (
                        <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm">{formatDate(article.publishedAt || article.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        article.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {article.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/news/${article.slug}`} className="p-2 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

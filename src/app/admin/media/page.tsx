'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Image as ImageIcon, Video, Plus, Edit, Trash2, Filter } from 'lucide-react'
import { api } from '@/lib/api'

export default function AdminMediaPage() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')

  const { data, isLoading } = useQuery({
    queryKey: ['admin-media', filter],
    queryFn: async () => {
      const params = filter !== 'all' ? `?type=${filter}` : ''
      const response = await api.get(`/media${params}`)
      return response.data
    },
  })

  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">Media Gallery</h1>
          <p className="text-gray-600">Manage photos and videos</p>
        </div>
        <Link href="/admin/media/new" className="btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Upload Media
        </Link>
      </div>

      {/* Filter */}
      <div className="card mb-6">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              filter === 'image' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              filter === 'video' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Videos
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : data?.data?.length > 0 ? (
          data.data.map((item: any) => (
            <div key={item.id} className="card group relative">
              <div className="aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center overflow-hidden relative">
                {item.type === 'image' ? (
                  item.url ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  )
                ) : item.youtubeId ? (
                  <>
                    <img 
                      src={getYouTubeThumbnail(item.youtubeId)} 
                      alt={item.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Video className="h-12 w-12 text-white" />
                    </div>
                  </>
                ) : (
                  <Video className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
              <p className="text-xs text-gray-600 capitalize">{item.type}</p>
              
              {/* Actions Overlay */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-50">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow hover:bg-red-50 text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No media found</p>
          </div>
        )}
      </div>
    </div>
  )
}

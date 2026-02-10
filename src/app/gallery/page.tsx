'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Image as ImageIcon, Video, Play, Youtube, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { api } from '@/lib/api'

/**
 * Gallery page
 * Photos and videos from performances
 */
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'youtube'>('image')
  const [youtubePage, setYoutubePage] = useState(1)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const videosPerPage = 9

  const { data, isLoading } = useQuery({
    queryKey: ['media', activeTab, youtubePage],
    queryFn: async () => {
      if (activeTab === 'youtube') {
        const response = await api.get(`/youtube/videos?maxResults=50`)
        return response.data
      }
      const response = await api.get(`/media?type=${activeTab}`)
      return response.data
    },
  })

  // Paginate YouTube videos on frontend
  const paginatedYoutubeVideos = () => {
    if (!data?.data) return []
    const startIndex = (youtubePage - 1) * videosPerPage
    const endIndex = startIndex + videosPerPage
    return data.data.slice(startIndex, endIndex)
  }

  const totalYoutubePages = data?.data ? Math.ceil(data.data.length / videosPerPage) : 0

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <ImageIcon className="h-16 w-16 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Media Gallery
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Explore photos and videos from our performances, rehearsals, and special events
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b">
        <div className="container">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === 'image'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="h-5 w-5" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === 'video'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Video className="h-5 w-5" />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === 'youtube'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Youtube className="h-5 w-5" />
              YouTube Channel
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container">
          {activeTab === 'youtube' ? (
            <div>
              <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl font-bold mb-4">Our YouTube Channel</h2>
                <p className="text-gray-600 mb-4">
                  Subscribe to our channel for more performances, behind-the-scenes content, and updates
                </p>
                <a
                  href="https://www.youtube.com/@chrisdaviesorchestra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  Visit Our YouTube Channel
                </a>
              </div>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="card">
                      <div className="aspect-video bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : data?.data && data.data.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {paginatedYoutubeVideos().map((video: any) => (
                      <div 
                        key={video.id} 
                        className="card cursor-pointer hover:shadow-xl transition-shadow group"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-all">
                            <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                              <Play className="h-8 w-8 text-white fill-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                        {video.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalYoutubePages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setYoutubePage(prev => Math.max(1, prev - 1))}
                        disabled={youtubePage === 1}
                        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalYoutubePages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setYoutubePage(page)}
                            className={`px-4 py-2 rounded transition-colors ${
                              page === youtubePage
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setYoutubePage(prev => Math.min(totalYoutubePages, prev + 1))}
                        disabled={youtubePage === totalYoutubePages}
                        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Youtube className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-4">No videos added yet</p>
                  <p className="text-gray-400 text-sm">
                    Visit our YouTube channel to see all our videos
                  </p>
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : data?.data?.length > 0 ? (
            activeTab === 'image' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.data.map((item: any) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    {item.url ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.data.map((item: any) => (
                  <div key={item.id} className="card">
                    {item.youtubeId ? (
                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                        <iframe
                          src={getYouTubeEmbedUrl(item.youtubeId)}
                          title={item.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : item.url ? (
                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                        <video
                          src={item.url}
                          controls
                          className="w-full h-full"
                          poster={item.thumbnailUrl}
                        />
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                        <Play className="h-16 w-16 text-white" />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              {activeTab === 'image' ? (
                <>
                  <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No photos available</p>
                </>
              ) : (
                <>
                  <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No videos available</p>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`${getYouTubeEmbedUrl(selectedVideo.videoId)}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="mt-4 bg-white rounded-lg p-6">
              <h2 className="font-serif text-2xl font-bold mb-2">{selectedVideo.title}</h2>
              {selectedVideo.description && (
                <p className="text-gray-600">{selectedVideo.description}</p>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>{new Date(selectedVideo.publishedAt).toLocaleDateString()}</span>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline inline-flex items-center gap-1"
                >
                  <Youtube className="h-4 w-4" />
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

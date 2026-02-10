'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function NewNewsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    isPublished: false,
    isFeatured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newsData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      }

      await api.post('/news', newsData)
      setModalMessage(`Article "${formData.title}" created successfully!`)
      setShowModal(true)
      setTimeout(() => {
        router.push('/admin/news')
      }, 3500)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to create article')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to News
      </button>

      <div className="max-w-4xl">
        <h1 className="font-serif text-3xl font-bold mb-8">Write New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Article Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="Enter article title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="input"
                  placeholder="Brief summary of the article..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  A short description that appears in article listings
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Content *
              </label>
              <textarea
                required
                rows={15}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input font-mono text-sm"
                placeholder="Write your article content here... (HTML supported)"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use HTML tags for formatting
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Metadata</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="input"
                placeholder="concerts, announcements, community"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Publish article (make it visible to public)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Feature this article on homepage
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessage.includes('successfully') ? 'Article Created' : 'Error'}
        message={modalMessage}
        type={modalMessage.includes('successfully') ? 'success' : 'error'}
      />
    </div>
  )
}

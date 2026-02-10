'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, Image as ImageIcon, FileText, Music, Video } from 'lucide-react'
import { api } from '@/lib/api'

export default function NewMediaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image',
    url: '',
    file: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, file })
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('type', formData.type)
      
      if (formData.file) {
        submitData.append('file', formData.file)
      } else if (formData.url) {
        submitData.append('url', formData.url)
      }

      await api.post('/media', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      router.push('/admin/media')
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to upload media')
    } finally {
      setLoading(false)
    }
  }

  const getMediaIcon = () => {
    switch (formData.type) {
      case 'image': return <ImageIcon className="h-8 w-8 text-primary-600" />
      case 'video': return <Video className="h-8 w-8 text-primary-600" />
      case 'audio': return <Music className="h-8 w-8 text-primary-600" />
      case 'document': return <FileText className="h-8 w-8 text-primary-600" />
      default: return <Upload className="h-8 w-8 text-primary-600" />
    }
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Media
      </button>

      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          {getMediaIcon()}
          <div>
            <h1 className="font-serif text-3xl font-bold">Upload Media</h1>
            <p className="text-gray-600">Add images, videos, or documents</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Type */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Media Type</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: 'image', label: 'Image', icon: ImageIcon },
                { value: 'video', label: 'Video', icon: Video },
                { value: 'audio', label: 'Audio', icon: Music },
                { value: 'document', label: 'Document', icon: FileText },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    formData.type === type.value
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`h-6 w-6 ${
                    formData.type === type.value ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    formData.type === type.value ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Media Details */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Media Details</h2>
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
                  placeholder="Enter media title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                  placeholder="Enter media description"
                />
              </div>
            </div>
          </div>

          {/* Upload Method */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Upload Method</h2>
            <div className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept={
                      formData.type === 'image' ? 'image/*' :
                      formData.type === 'video' ? 'video/*' :
                      formData.type === 'audio' ? 'audio/*' :
                      '.pdf,.doc,.docx'
                    }
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.type === 'image' && 'PNG, JPG, GIF up to 10MB'}
                      {formData.type === 'video' && 'MP4, MOV up to 100MB'}
                      {formData.type === 'audio' && 'MP3, WAV up to 50MB'}
                      {formData.type === 'document' && 'PDF, DOC, DOCX up to 10MB'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Preview */}
              {previewUrl && formData.type === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded"
                    />
                  </div>
                </div>
              )}

              {/* OR Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="input"
                  placeholder="https://example.com/media.jpg"
                  disabled={!!formData.file}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a direct URL to the media file
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || (!formData.file && !formData.url)}
              className="btn-primary"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Uploading...' : 'Upload Media'}
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
    </div>
  )
}

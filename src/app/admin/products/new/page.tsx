'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'physical',
    category: 'merchandise',
    price: '',
    compareAtPrice: '',
    stock: '',
    sku: '',
    weight: '',
    sizes: '',
    colors: '',
    downloadUrl: '',
    isPublished: false,
    isFeatured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        stock: parseInt(formData.stock) || 0,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : null,
        colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : null,
      }

      await api.post('/products', productData)
      setModalMessage(`Product "${formData.name}" created successfully!`)
      setShowModal(true)
      setTimeout(() => {
        router.push('/admin/products')
      }, 3500)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to create product')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container max-w-4xl">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="card">
          <h1 className="font-serif text-3xl font-bold mb-6">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="Orchestra T-Shirt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input"
                    placeholder="Describe your product..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Type *
                    </label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="input"
                    >
                      <option value="physical">Physical</option>
                      <option value="digital">Digital</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input"
                    >
                      <option value="apparel">Apparel</option>
                      <option value="accessories">Accessories</option>
                      <option value="music">Music</option>
                      <option value="merchandise">Merchandise</option>
                      <option value="digital_content">Digital Content</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="input pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare at Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.compareAtPrice}
                      onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                      className="input pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Inventory</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input"
                    placeholder="CDO-PROD-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Variants (Physical Products) */}
            {formData.type === 'physical' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Variants</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sizes (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      className="input"
                      placeholder="S, M, L, XL, XXL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Colors (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.colors}
                      onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                      className="input"
                      placeholder="Black, Navy, White"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="input"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Digital Product */}
            {formData.type === 'digital' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Digital Product</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Download URL
                  </label>
                  <input
                    type="url"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    className="input"
                    placeholder="https://example.com/downloads/file"
                  />
                </div>
              </div>
            )}

            {/* Publishing */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Publishing</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Publish product (make it visible in store)
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
                    Feature this product
                  </span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                <Save className="h-5 w-5 mr-2" />
                {loading ? 'Creating...' : 'Create Product'}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessage.includes('successfully') ? 'Product Created' : 'Error'}
        message={modalMessage}
        type={modalMessage.includes('successfully') ? 'success' : 'error'}
      />
    </div>
  )
}

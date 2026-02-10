'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, ShoppingBag } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`)
        const product = response.data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          type: product.type || 'physical',
          category: product.category || 'merchandise',
          price: product.price?.toString() || '',
          compareAtPrice: product.compareAtPrice?.toString() || '',
          stock: product.stock?.toString() || '',
          sku: product.sku || '',
          weight: product.weight?.toString() || '',
          sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
          colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
          downloadUrl: product.downloadUrl || '',
          isPublished: product.isPublished || false,
          isFeatured: product.isFeatured || false,
        })
      } catch (error: any) {
        setModalMessage(error.response?.data?.message || 'Failed to load product')
        setModalType('error')
        setShowModal(true)
      } finally {
        setFetchLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

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

      await api.put(`/products/${productId}`, productData)
      setModalMessage(`Product "${formData.name}" updated successfully!`)
      setModalType('success')
      setShowModal(true)
      setTimeout(() => {
        router.push('/admin/products')
      }, 2000)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to update product')
      setModalType('error')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="card animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold">Edit Product</h1>
              <p className="text-gray-600">Update product information</p>
            </div>
          </div>

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
                    placeholder="Detailed product description..."
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
                      <option value="merchandise">Merchandise</option>
                      <option value="music">Music</option>
                      <option value="tickets">Tickets</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input"
                    placeholder="29.99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare at Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                    className="input"
                    placeholder="39.99"
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
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input"
                    placeholder="TS-001"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="space-y-4">
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
                    placeholder="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="input"
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Colors (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    className="input"
                    placeholder="Black, White, Navy"
                  />
                </div>

                {formData.type === 'digital' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Download URL
                    </label>
                    <input
                      type="url"
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                      className="input"
                      placeholder="https://example.com/download/file.zip"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Publishing Options */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Publish this product (make it visible to customers)
                  </span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Feature this product on homepage
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? (
                  'Updating...'
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'success' ? 'Product Updated' : 'Error'}
        message={modalMessage}
        type={modalType}
      />
    </div>
  )
}

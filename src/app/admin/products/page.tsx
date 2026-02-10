'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Plus, Edit, Trash2, Eye, MoreVertical, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function AdminProductsPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [deleteProductName, setDeleteProductName] = useState('')
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultMessage, setResultMessage] = useState('')
  const [resultType, setResultType] = useState<'success' | 'error'>('success')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-products', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/products${params}`)
      return response.data
    },
  })

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return

    try {
      await api.delete(`/products/${deleteProductId}`)
      setShowDeleteModal(false)
      setResultMessage('Product deleted successfully')
      setResultType('success')
      setShowResultModal(true)
      refetch()
    } catch (error: any) {
      setShowDeleteModal(false)
      setResultMessage(error.response?.data?.message || 'Failed to delete product')
      setResultType('error')
      setShowResultModal(true)
    }
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Manage Products</h1>
            <p className="text-gray-600">Manage store inventory and products</p>
          </div>
          <Link href="/admin/products/new" className="btn-primary">
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Link>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))
          ) : data?.data?.length > 0 ? (
            data.data.map((product: any) => (
              <div key={product.id} className="card group">
                <div className="relative mb-4">
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                        className="p-2 bg-white rounded-lg shadow hover:bg-gray-50"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openMenuId === product.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            <button
                              onClick={() => {
                                router.push(`/products/${product.slug}`)
                                setOpenMenuId(null)
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Product
                            </button>
                            <button
                              onClick={() => {
                                router.push(`/admin/products/${product.id}/edit`)
                                setOpenMenuId(null)
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit Product
                            </button>
                            <button
                              onClick={() => {
                                setDeleteProductId(product.id)
                                setDeleteProductName(product.name)
                                setShowDeleteModal(true)
                                setOpenMenuId(null)
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Product
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary-600">{formatCurrency(product.price)}</span>
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {product.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slideUp">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  Are you sure you want to delete <strong>{deleteProductName}</strong>? 
                  This will permanently remove the product from your store.
                </p>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setDeleteProductId(null)
                    setDeleteProductName('')
                  }}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      <ConfirmationModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={resultType === 'success' ? 'Product Deleted' : 'Error'}
        message={resultMessage}
        type={resultType}
      />
    </div>
  )
}

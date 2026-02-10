'use client'

import { useQuery } from '@tanstack/react-query'
import { Package, Search, Eye, Shield } from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

export default function AuditorProductsPage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['auditor-products', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/products${params}`)
      return response.data
    },
  })

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="font-serif text-4xl font-bold">Products Audit</h1>
            <p className="text-gray-600">Read-only view of all products and inventory</p>
          </div>
        </div>

        {/* Read-only Notice */}
        <div className="card mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Read-Only Access</h3>
              <p className="text-sm text-yellow-800">
                As an auditor, you can view product data but cannot make any modifications.
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
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
              <div key={product.id} className="card">
                <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary-600">{formatCurrency(product.price)}</span>
                  <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {product.type}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1 text-sm">
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

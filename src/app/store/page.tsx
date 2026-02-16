'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Search, ShoppingCart } from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'

/**
 * Store page
 * Orchestra merchandise and products
 */
export default function StorePage() {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const params = search ? `?search=${search}` : ''
      const response = await api.get(`/products${params}`)
      return response.data
    },
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <ShoppingCart className="h-16 w-16 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Orchestra Store
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Shop our exclusive collection of merchandise, recordings, and memorabilia
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              View Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : data?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.data.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/store/${product.slug}`}
                  className="card hover:shadow-lg transition-shadow"
                >
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <ShoppingCart className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">
                      {formatCurrency(product.price)}
                    </span>
                    {product.stock > 0 ? (
                      <span className="text-sm text-green-600">In Stock</span>
                    ) : (
                      <span className="text-sm text-red-600">Out of Stock</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

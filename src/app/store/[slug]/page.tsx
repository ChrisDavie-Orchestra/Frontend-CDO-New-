'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'

/**
 * Product detail page
 * Individual product information and purchase
 */
export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { addItem } = useCart()
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await api.get(`/products/${slug}`)
      return response.data
    },
  })

  const handleAddToCart = () => {
    if (!product) return
    
    // Validate size selection if sizes are available
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size')
      return
    }
    
    // Validate color selection if colors are available
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color')
      return
    }
    
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0],
      type: product.type || 'physical',
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    })
    
    // Show toast notification
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
    
    // Reset selections
    setQuantity(1)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen py-16">
        <div className="container text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => router.push('/store')} className="btn-primary">
            Back to Store
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        {/* Top Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-primary-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Store
          </button>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-2 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            View Cart
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary-600">
                {formatCurrency(product.price)}
              </span>
              {product.stock > 0 ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4 mb-8">
              {product.type && (
                <div className="flex items-center">
                  <span className="font-semibold w-32">Type:</span>
                  <span className="text-gray-600 capitalize">{product.type}</span>
                </div>
              )}
              {product.category && (
                <div className="flex items-center">
                  <span className="font-semibold w-32">Category:</span>
                  <span className="text-gray-600 capitalize">{product.category.replace('_', ' ')}</span>
                </div>
              )}
              {product.sku && (
                <div className="flex items-center">
                  <span className="font-semibold w-32">SKU:</span>
                  <span className="text-gray-600">{product.sku}</span>
                </div>
              )}
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-3">Size: {selectedSize && <span className="text-primary-600">({selectedSize})</span>}</label>
                <div className="flex gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                        selectedSize === size
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 hover:border-primary-600 hover:text-primary-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold mb-3">Color: {selectedColor && <span className="text-primary-600 capitalize">({selectedColor})</span>}</label>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg transition-colors capitalize ${
                        selectedColor === color
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : 'border-gray-300 hover:border-primary-600 hover:text-primary-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-600 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-600 ml-2">({product.stock} available)</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Toast Notification */}
            {showToast && (
              <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
                <Check className="h-5 w-5" />
                <span className="font-semibold">Added to cart!</span>
              </div>
            )}

            {/* Features */}
            {product.type === 'digital' && (
              <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-semibold mb-3">Digital Product Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Instant download after purchase</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">High-quality audio format</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Lifetime access</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

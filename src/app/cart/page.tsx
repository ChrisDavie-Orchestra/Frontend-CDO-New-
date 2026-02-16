'use client'

import Link from 'next/link'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/contexts/cart-context'

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, subtotal } = useCart()

  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + shipping

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link href="/store" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="card flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    {item.size && (
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-600">Color: {item.color}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {item.type === 'digital' ? 'Digital Product' : 'Physical Product'}
                    </p>
                    <p className="font-bold text-primary-600 mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-600 hover:text-red-700"
                      title="Remove from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 rounded border hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 rounded border hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500">
                      Free shipping on orders over $50
                    </p>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary-600">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="btn-primary w-full mb-3 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </Link>
                <Link href="/store" className="btn-outline w-full">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

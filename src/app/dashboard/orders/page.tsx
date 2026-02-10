'use client'

import { Package, Truck, CheckCircle } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function MyOrdersPage() {
  // Mock data - replace with actual API call
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      date: '2026-01-15T10:00:00',
      status: 'shipped',
      total: 70,
      items: [
        { name: 'Orchestra T-Shirt', quantity: 2, price: 25 },
        { name: 'Orchestra Mug', quantity: 1, price: 12 },
      ],
      trackingNumber: 'TRK123456789',
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      date: '2026-01-10T14:30:00',
      status: 'delivered',
      total: 45,
      items: [
        { name: 'Orchestra Hoodie', quantity: 1, price: 45 },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700'
      case 'shipped':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">Start shopping for orchestra merchandise!</p>
            <a href="/store" className="btn-primary">
              Visit Store
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Order {order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Total</p>
                    <p className="text-2xl font-bold text-primary-600">
                      {formatCurrency(order.total)}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-600 mt-2">
                        Tracking: <span className="font-mono">{order.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                  <button className="btn-outline">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { DollarSign, TrendingUp, TrendingDown, Download, Shield, Calendar, CreditCard, ShoppingCart, Ticket } from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

export default function AuditorReportsPage() {
  const [dateRange, setDateRange] = useState('30')

  // Mock financial data - replace with actual API calls when backend is ready
  const financialStats = {
    totalRevenue: 125430.50,
    donations: 45200.00,
    ticketSales: 52130.50,
    productSales: 28100.00,
    revenueChange: 12.5,
    transactionCount: 1247,
    averageTransaction: 100.58,
  }

  const recentTransactions = [
    {
      id: '1',
      type: 'Ticket Sale',
      amount: 150.00,
      user: 'john.doe@example.com',
      date: new Date().toISOString(),
      status: 'completed',
      reference: 'TKT-2024-001',
    },
    {
      id: '2',
      type: 'Product Sale',
      amount: 45.99,
      user: 'jane.smith@example.com',
      date: new Date(Date.now() - 3600000).toISOString(),
      status: 'completed',
      reference: 'ORD-2024-045',
    },
    {
      id: '3',
      type: 'Donation',
      amount: 500.00,
      user: 'donor@example.com',
      date: new Date(Date.now() - 7200000).toISOString(),
      status: 'completed',
      reference: 'DON-2024-123',
    },
    {
      id: '4',
      type: 'Membership',
      amount: 120.00,
      user: 'member@example.com',
      date: new Date(Date.now() - 10800000).toISOString(),
      status: 'pending',
      reference: 'MEM-2024-089',
    },
  ]

  const revenueByCategory = [
    { category: 'Ticket Sales', amount: 52130.50, percentage: 41.6, color: 'bg-blue-500' },
    { category: 'Donations', amount: 45200.00, percentage: 36.0, color: 'bg-green-500' },
    { category: 'Product Sales', amount: 28100.00, percentage: 22.4, color: 'bg-purple-500' },
  ]

  const handleExportReport = () => {
    alert('Export functionality will be implemented with backend integration')
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold">Financial Reports</h1>
              <p className="text-gray-600">Revenue, transactions, and financial analytics</p>
            </div>
          </div>
          <button
            onClick={handleExportReport}
            className="btn-outline flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </button>
        </div>

        {/* Read-only Notice */}
        <div className="card mb-6 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900">Read-Only Access</h3>
              <p className="text-sm text-yellow-800">
                As an auditor, you can view financial data but cannot make any modifications.
              </p>
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input max-w-xs"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(financialStats.totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">
                +{financialStats.revenueChange}%
              </span>
              <span className="text-gray-500">vs last period</span>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Transactions</span>
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {financialStats.transactionCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Avg: {formatCurrency(financialStats.averageTransaction)}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Ticket Sales</span>
              <Ticket className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(financialStats.ticketSales)}
            </div>
            <div className="text-sm text-gray-500">
              {((financialStats.ticketSales / financialStats.totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Product Sales</span>
              <ShoppingCart className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(financialStats.productSales)}
            </div>
            <div className="text-sm text-gray-500">
              {((financialStats.productSales / financialStats.totalRevenue) * 100).toFixed(1)}% of total
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-6">Revenue by Category</h2>
          <div className="space-y-4">
            {revenueByCategory.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-bold">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total revenue</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">{transaction.reference}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{transaction.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{transaction.user}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="card bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Ticket className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Ticket Revenue</h3>
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">
              {formatCurrency(financialStats.ticketSales)}
            </div>
            <p className="text-sm text-blue-700">From event ticket sales</p>
          </div>

          <div className="card bg-green-50 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-green-900">Donations</h3>
            </div>
            <div className="text-2xl font-bold text-green-900 mb-1">
              {formatCurrency(financialStats.donations)}
            </div>
            <p className="text-sm text-green-700">From generous donors</p>
          </div>

          <div className="card bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Store Revenue</h3>
            </div>
            <div className="text-2xl font-bold text-purple-900 mb-1">
              {formatCurrency(financialStats.productSales)}
            </div>
            <p className="text-sm text-purple-700">From merchandise sales</p>
          </div>
        </div>
      </div>
    </div>
  )
}

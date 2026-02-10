'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { 
  User, 
  Ticket, 
  ShoppingBag, 
  Heart, 
  Calendar,
  Clock,
  Award,
  ArrowRight
} from 'lucide-react'
import { api } from '@/lib/api'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'

export default function DashboardPage() {
  const { user, isMember } = useAuth()

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/users/me/stats')
      return response.data
    },
  })

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const response = await api.get('/users/me/activity')
      return response.data
    },
  })

  const { data: upcomingEvents } = useQuery({
    queryKey: ['my-upcoming-events'],
    queryFn: async () => {
      const response = await api.get('/users/me/events')
      return response.data
    },
  })

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-50 to-white border-primary-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Profile</h3>
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <p className="text-3xl font-bold text-primary-600">{stats?.profile?.completeness || 0}%</p>
          <p className="text-sm text-gray-600 mt-1">Complete</p>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${stats?.profile?.completeness || 0}%` }}
            />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Tickets</h3>
            <Ticket className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats?.tickets || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Active Tickets</p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-white border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Orders</h3>
            <ShoppingBag className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats?.orders || 0}</p>
          <p className="text-sm text-gray-600 mt-1">Total Orders</p>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-white border-red-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Donations</h3>
            <Heart className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(stats?.donations || 0)}</p>
          <p className="text-sm text-gray-600 mt-1">Total Given</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary-600" />
                Upcoming Events
              </h2>
              <Link href="/dashboard/tickets" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {upcomingEvents?.data?.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.data.slice(0, 3).map((event: any) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-16 h-16 bg-primary-600 rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-2xl font-bold">
                        {new Date(event.startDate).getDate()}
                      </span>
                      <span className="text-xs">
                        {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.venue}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.startDate).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <Link 
                      href={`/events/${event.id}`}
                      className="btn-outline py-2 px-4"
                    >
                      Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>No upcoming events</p>
                <Link href="/events" className="btn-primary mt-4 inline-flex">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary-600" />
            Recent Activity
          </h2>

          {recentActivity?.data?.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.data.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'ticket' ? 'bg-blue-500' :
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'donation' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Member Benefits (if member) */}
      {isMember && (
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white mt-8">
          <div className="flex items-center gap-4">
            <Award className="h-16 w-16" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Member Benefits</h2>
              <p className="text-primary-100">
                You're enjoying exclusive member perks! Get priority booking, special discounts, and more.
              </p>
            </div>
            <Link href="/dashboard/membership" className="btn bg-white text-primary-600 hover:bg-gray-100">
              View Benefits
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card mt-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/events" className="btn-primary text-center flex items-center justify-center gap-2">
            <Calendar className="h-5 w-5" />
            Browse Events
          </Link>
          <Link href="/shop" className="btn-outline text-center flex items-center justify-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Visit Shop
          </Link>
          <Link href="/donate" className="btn-outline text-center flex items-center justify-center gap-2">
            <Heart className="h-5 w-5" />
            Make Donation
          </Link>
          <Link href="/dashboard/settings" className="btn-outline text-center flex items-center justify-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

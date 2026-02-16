'use client'

import { useAuth } from '@/contexts/auth-context'
import { Crown, Check, Star, Gift, Calendar, Percent } from 'lucide-react'
import Link from 'next/link'

export default function MembershipPage() {
  const { user, isMember } = useAuth()

  const benefits = [
    {
      icon: Calendar,
      title: 'Priority Booking',
      description: 'Get early access to event tickets before general public',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Percent,
      title: 'Exclusive Discounts',
      description: '15% off all merchandise and 10% off event tickets',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Gift,
      title: 'Member-Only Events',
      description: 'Access to special rehearsals and meet-and-greet sessions',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Star,
      title: 'VIP Treatment',
      description: 'Preferred seating and complimentary refreshments',
      color: 'text-primary-600',
      bg: 'bg-primary-50'
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2">Membership</h1>
        <p className="text-gray-600">Manage your membership and view exclusive benefits</p>
      </div>

      {isMember ? (
        <>
          {/* Membership Status Card */}
          <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Crown className="h-12 w-12" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">Active Member</h2>
                <p className="text-primary-100 mb-4">
                  Thank you for being a valued member of the ChrisDavies Orchestra community!
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-primary-200">Member Since</p>
                    <p className="font-semibold">January 2026</p>
                  </div>
                  <div>
                    <p className="text-primary-200">Membership ID</p>
                    <p className="font-semibold">{user?.id?.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-primary-200">Status</p>
                    <p className="font-semibold">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Your Member Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="card hover:shadow-lg transition-shadow">
                    <div className={`w-12 h-12 ${benefit.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Membership Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Events Attended</p>
                <p className="text-3xl font-bold text-primary-600">12</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Savings</p>
                <p className="text-3xl font-bold text-green-600">$156</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Rewards Points</p>
                <p className="text-3xl font-bold text-purple-600">450</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Non-Member CTA */}
          <div className="card bg-gradient-to-r from-gray-50 to-white border-2 border-primary-200 mb-8">
            <div className="text-center py-8">
              <Crown className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Become a Member Today!</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our exclusive community and enjoy premium benefits, priority access, and special discounts on all events and merchandise.
              </p>
              <Link href="/memberships" className="btn-primary inline-flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Explore Membership Plans
              </Link>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Member Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="card opacity-75">
                    <div className={`w-12 h-12 ${benefit.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

'use client'

import Link from 'next/link'
import { User, LogIn, UserPlus, Music, Heart, ShoppingBag, Ticket } from 'lucide-react'

export default function AccountPage() {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
            <User className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="font-serif text-5xl font-bold mb-4">My Account</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access your account to manage tickets, memberships, donations, and more
          </p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Login Card */}
          <Link
            href="/auth/login"
            className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-600"
          >
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-600 transition-colors">
                <LogIn className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                Login
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to your existing account to access your dashboard, tickets, and more
              </p>
              <div className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                Sign In
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Register Card */}
          <Link
            href="/auth/register"
            className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-600"
          >
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:bg-green-600 transition-colors">
                <UserPlus className="h-8 w-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="font-serif text-3xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                Register
              </h2>
              <p className="text-gray-600 mb-6">
                Create a new account to book tickets, become a member, and support the orchestra
              </p>
              <div className="inline-flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                Create Account
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="py-10 px-8">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Benefits of Having an Account
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  <Ticket className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Easy Booking</h3>
                <p className="text-primary-100 text-sm">
                  Quick checkout and ticket management
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  <Music className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Member Benefits</h3>
                <p className="text-primary-100 text-sm">
                  Exclusive access and discounts
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Track Donations</h3>
                <p className="text-primary-100 text-sm">
                  View your contribution history
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">Order History</h3>
                <p className="text-primary-100 text-sm">
                  Access past purchases and receipts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help? Contact our support team
          </p>
          <Link 
            href="/contact" 
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Get Support →
          </Link>
        </div>
      </div>
    </div>
  )
}

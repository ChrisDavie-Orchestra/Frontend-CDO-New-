'use client'

import { useState } from 'react'
import { Heart, Check } from 'lucide-react'

/**
 * Donate page
 * Donation form and information
 */
export default function DonatePage() {
  const [amount, setAmount] = useState<number | string>('')
  const [customAmount, setCustomAmount] = useState(false)
  const [recurring, setRecurring] = useState(false)

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Support Our Mission
            </h1>
            <p className="text-xl text-primary-100">
              Your generous donation helps us continue bringing world-class orchestral music
              to our community and supporting the next generation of musicians.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="font-serif text-2xl font-bold mb-6">Make a Donation</h2>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {presetAmounts.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => {
                            setAmount(preset)
                            setCustomAmount(false)
                          }}
                          className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                            amount === preset && !customAmount
                              ? 'border-primary-600 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-primary-300'
                          }`}
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setCustomAmount(true)
                        setAmount('')
                      }}
                      className={`w-full py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                        customAmount
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-primary-300'
                      }`}
                    >
                      Custom Amount
                    </button>
                    {customAmount && (
                      <div className="mt-4">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="input pl-8"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recurring Option */}
                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) => setRecurring(e.target.checked)}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Make this a monthly recurring donation
                      </span>
                    </label>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-lg">Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input type="text" required className="input" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input type="text" required className="input" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input type="email" required className="input" />
                    </div>

                    <div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-3 text-gray-700 text-sm">
                          Make my donation anonymous
                        </span>
                      </label>
                    </div>
                  </div>

                  <button className="btn-primary w-full">
                    Proceed to Payment
                  </button>
                </div>
              </div>

              {/* Impact Info */}
              <div className="space-y-6">
                <div className="card bg-primary-50">
                  <h3 className="font-serif text-xl font-bold mb-4">Your Impact</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Support free community concerts
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Fund music education programs
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Commission new musical works
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">
                        Provide scholarships for young musicians
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">Tax Deductible</h3>
                  <p className="text-sm text-gray-600">
                    Your donation is tax-deductible to the fullest extent allowed by law.
                    Tax ID: 12-3456789
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-semibold mb-2">Questions?</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Contact our development team:
                  </p>
                  <a href="mailto:giving@chrisdaviesorchestra.com" className="text-sm text-primary-600 hover:underline">
                    giving@chrisdaviesorchestra.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { api } from '@/lib/api'

/**
 * Newsletter component
 * Newsletter subscription form
 */
export function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      await api.post('/newsletter/subscribe', { email })
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-primary-100 mb-8">
            Subscribe to our newsletter for exclusive updates, concert announcements,
            and special offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn bg-white text-primary-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <p className={`mt-4 ${message.includes('Thank') ? 'text-green-200' : 'text-red-200'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

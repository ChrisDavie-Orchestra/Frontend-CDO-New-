'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { api } from '@/lib/api'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'

export default function NewEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'concert',
    venue: '',
    venueAddress: '',
    startDate: '',
    endDate: '',
    ticketPrice: '',
    totalSeats: '',
    isFree: false,
    isPublished: false,
    isFeatured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const eventData = {
        ...formData,
        ticketPrice: formData.isFree ? 0 : parseFloat(formData.ticketPrice),
        totalSeats: parseInt(formData.totalSeats),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      }

      await api.post('/events', eventData)
      setModalMessage(`Event "${formData.title}" created successfully!`)
      setShowModal(true)
      setTimeout(() => {
        router.push('/admin/events')
      }, 3500)
    } catch (error: any) {
      setModalMessage(error.response?.data?.message || 'Failed to create event')
      setShowModal(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Events
      </button>

      <div className="max-w-4xl">
        <h1 className="font-serif text-3xl font-bold mb-8">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="Spring Concert 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  placeholder="Describe your event..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input"
                >
                  <option value="concert">Concert</option>
                  <option value="rehearsal">Rehearsal</option>
                  <option value="workshop">Workshop</option>
                  <option value="gala">Gala</option>
                  <option value="fundraiser">Fundraiser</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="input"
                  placeholder="Symphony Hall"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  className="input"
                  placeholder="123 Music Street, City, State"
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Ticketing */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Ticketing</h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  This is a free event
                </span>
              </label>

              {!formData.isFree && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required={!formData.isFree}
                      value={formData.ticketPrice}
                      onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                      className="input pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Seats *
                </label>
                <input
                  type="number"
                  required
                  value={formData.totalSeats}
                  onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                  className="input"
                  placeholder="200"
                />
              </div>
            </div>
          </div>

          {/* Publishing */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Publish event (make it visible to public)
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Feature this event on homepage
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Creating...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMessage.includes('successfully') ? 'Event Created' : 'Error'}
        message={modalMessage}
        type={modalMessage.includes('successfully') ? 'success' : 'error'}
      />
    </div>
  )
}

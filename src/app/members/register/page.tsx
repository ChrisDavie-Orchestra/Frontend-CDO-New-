'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, CheckCircle, Upload } from 'lucide-react'
import { api } from '@/lib/api'

/**
 * Member Registration Form
 * Form for musicians to register as members of ChrisDavies Orchestra
 */
export default function MemberRegistrationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    
    // Musical Background
    primaryInstrument: '',
    secondaryInstrument: '',
    yearsOfExperience: '',
    musicalEducation: '',
    previousEnsembles: '',
    
    // Availability
    availability: [] as string[],
    commitmentLevel: '',
    
    // Additional Information
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: '',
    specialRequirements: '',
    howDidYouHear: '',
    motivation: '',
  })
  
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const instruments = [
    'Violin', 'Viola', 'Cello', 'Double Bass',
    'Flute', 'Oboe', 'Clarinet', 'Bassoon',
    'Trumpet', 'French Horn', 'Trombone', 'Tuba',
    'Percussion', 'Piano', 'Harp', 'Voice',
    'Other'
  ]

  const availabilityOptions = [
    'Weekday Evenings',
    'Weekend Mornings',
    'Weekend Afternoons',
    'Weekend Evenings',
  ]

  const handleAvailabilityChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(a => a !== option)
        : [...prev.availability, option]
    }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create FormData for file upload
      const submitData = new FormData()
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else {
          submitData.append(key, value)
        }
      })
      
      // Append photo if exists
      if (profilePhoto) {
        submitData.append('profilePhoto', profilePhoto)
      }

      // Submit to backend
      await api.post('/members/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit registration. Please try again.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
          <div className="container">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Registration Submitted!
            </h1>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold mb-4">Thank You for Registering!</h2>
              <p className="text-gray-600 mb-6">
                We have received your member registration and will review it shortly. 
                Our team will contact you within 3-5 business days to discuss the next steps 
                and schedule an audition if required.
              </p>
              <div className="bg-primary-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-lg mb-3">What Happens Next?</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">1.</span>
                    <span>Our team reviews your application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">2.</span>
                    <span>We&apos;ll contact you to schedule an audition (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">3.</span>
                    <span>You&apos;ll receive information about rehearsal schedules</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">4.</span>
                    <span>Welcome to the ChrisDavies Orchestra family!</span>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button onClick={() => router.push('/')} className="btn-primary">
                  Return to Home
                </button>
                <button onClick={() => router.push('/about')} className="btn-outline">
                  Learn More About Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Member Registration
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Join ChrisDavies Orchestra and be part of our musical journey. Fill out the form below to register as a member.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        required
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="input"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="btn-outline cursor-pointer inline-flex items-center gap-2">
                          <Upload className="h-5 w-5" />
                          Choose Photo
                          <input
                            type="file"
                            id="profilePhoto"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                        {profilePhoto && (
                          <span className="text-sm text-gray-600">{profilePhoto.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Musical Background */}
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">Musical Background</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="primaryInstrument" className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Instrument *
                      </label>
                      <select
                        id="primaryInstrument"
                        required
                        value={formData.primaryInstrument}
                        onChange={(e) => setFormData({ ...formData, primaryInstrument: e.target.value })}
                        className="input"
                      >
                        <option value="">Select instrument</option>
                        {instruments.map(inst => (
                          <option key={inst} value={inst}>{inst}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="secondaryInstrument" className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Instrument (Optional)
                      </label>
                      <select
                        id="secondaryInstrument"
                        value={formData.secondaryInstrument}
                        onChange={(e) => setFormData({ ...formData, secondaryInstrument: e.target.value })}
                        className="input"
                      >
                        <option value="">Select instrument</option>
                        {instruments.map(inst => (
                          <option key={inst} value={inst}>{inst}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        id="yearsOfExperience"
                        required
                        min="0"
                        value={formData.yearsOfExperience}
                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="musicalEducation" className="block text-sm font-medium text-gray-700 mb-2">
                        Musical Education *
                      </label>
                      <select
                        id="musicalEducation"
                        required
                        value={formData.musicalEducation}
                        onChange={(e) => setFormData({ ...formData, musicalEducation: e.target.value })}
                        className="input"
                      >
                        <option value="">Select level</option>
                        <option value="self_taught">Self-Taught</option>
                        <option value="private_lessons">Private Lessons</option>
                        <option value="music_school">Music School</option>
                        <option value="conservatory">Conservatory</option>
                        <option value="university_degree">University Degree</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="previousEnsembles" className="block text-sm font-medium text-gray-700 mb-2">
                        Previous Ensembles/Orchestras
                      </label>
                      <textarea
                        id="previousEnsembles"
                        rows={3}
                        value={formData.previousEnsembles}
                        onChange={(e) => setFormData({ ...formData, previousEnsembles: e.target.value })}
                        className="input"
                        placeholder="List any orchestras, bands, or ensembles you've performed with..."
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">Availability</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        When are you available for rehearsals? *
                      </label>
                      <div className="space-y-2">
                        {availabilityOptions.map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.availability.includes(option)}
                              onChange={() => handleAvailabilityChange(option)}
                              className="mr-2"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="commitmentLevel" className="block text-sm font-medium text-gray-700 mb-2">
                        Commitment Level *
                      </label>
                      <select
                        id="commitmentLevel"
                        required
                        value={formData.commitmentLevel}
                        onChange={(e) => setFormData({ ...formData, commitmentLevel: e.target.value })}
                        className="input"
                      >
                        <option value="">Select commitment level</option>
                        <option value="full_time">Full-Time (All rehearsals and performances)</option>
                        <option value="part_time">Part-Time (Most rehearsals and performances)</option>
                        <option value="occasional">Occasional (Selected performances)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">Emergency Contact</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        id="emergencyContactName"
                        required
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        id="emergencyContactPhone"
                        required
                        value={formData.emergencyContactPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                        className="input"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-2">
                        Medical Conditions or Allergies
                      </label>
                      <textarea
                        id="medicalConditions"
                        rows={2}
                        value={formData.medicalConditions}
                        onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                        className="input"
                        placeholder="Please list any medical conditions or allergies we should be aware of..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requirements
                      </label>
                      <textarea
                        id="specialRequirements"
                        rows={2}
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                        className="input"
                        placeholder="Any special accommodations or requirements..."
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-6">Additional Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="howDidYouHear"
                        value={formData.howDidYouHear}
                        onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                        className="input"
                      >
                        <option value="">Select an option</option>
                        <option value="website">Website</option>
                        <option value="social_media">Social Media</option>
                        <option value="concert">Attended a Concert</option>
                        <option value="referral">Referral from Friend/Member</option>
                        <option value="school">School/University</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                        Why do you want to join ChrisDavies Orchestra? *
                      </label>
                      <textarea
                        id="motivation"
                        required
                        rows={4}
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        className="input"
                        placeholder="Tell us about your passion for music and why you'd like to be part of our orchestra..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary disabled:opacity-50 flex-1"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/about')}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to be contacted by ChrisDavies Orchestra regarding your membership application.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

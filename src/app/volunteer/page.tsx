'use client'

import { useAuth } from '@/contexts/auth-context'
import { Calendar, Users, CheckSquare, Clock, Heart, Award } from 'lucide-react'

export default function VolunteerDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Upcoming Events', value: '0', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Hours Logged', value: '0', icon: Clock, color: 'bg-green-500' },
    { label: 'Tasks Completed', value: '0', icon: CheckSquare, color: 'bg-purple-500' },
    { label: 'Impact Points', value: '0', icon: Award, color: 'bg-yellow-500' },
  ]

  const volunteerSections = [
    {
      title: 'My Events',
      description: 'View and manage events you\'re volunteering for',
      icon: Calendar,
      link: '/volunteer/events',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Available Opportunities',
      description: 'Browse and sign up for volunteer opportunities',
      icon: Heart,
      link: '/volunteer/opportunities',
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'My Tasks',
      description: 'View your assigned tasks and responsibilities',
      icon: CheckSquare,
      link: '/volunteer/tasks',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Time Tracking',
      description: 'Log your volunteer hours and activities',
      icon: Clock,
      link: '/volunteer/hours',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Team Directory',
      description: 'Connect with other volunteers and coordinators',
      icon: Users,
      link: '/volunteer/team',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'My Profile',
      description: 'Update your skills, availability, and preferences',
      icon: Award,
      link: '/volunteer/profile',
      color: 'bg-yellow-50 text-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="h-8 w-8 text-primary-600" />
            <h1 className="font-serif text-3xl font-bold">Volunteer Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Welcome back, {user?.firstName}! Thank you for your dedication to Chris Davies Orchestra.
          </p>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>🌟 Volunteer Hub:</strong> Manage your volunteer activities, track hours, and stay connected with the team.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteer Sections */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Volunteer Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerSections.map((section) => (
              <a
                key={section.title}
                href={section.link}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="card">
            <p className="text-gray-500 text-center py-8">No upcoming events assigned</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Executive Team | Chris Davies Orchestra',
  description: 'Meet the leadership team of the Chris Davies Orchestra',
}

/**
 * Executives page
 * Leadership and board members
 */
export default function ExecutivesPage() {
  const executives = [
    {
      name: 'Chris Davies',
      position: 'Music Director & Conductor',
      bio: 'Chris Davies is an internationally acclaimed conductor with over 30 years of experience leading orchestras across Europe, Asia, and North America.',
      image: '',
    },
    {
      name: 'Margaret Thompson',
      position: 'Executive Director',
      bio: 'Margaret brings over 20 years of arts administration experience, having previously served as Managing Director of the City Symphony Orchestra.',
      image: '',
    },
    {
      name: 'Dr. James Richardson',
      position: 'Artistic Administrator',
      bio: 'Dr. Richardson holds a doctorate in musicology and oversees all artistic programming and musician relations for the orchestra.',
      image: '',
    },
    {
      name: 'Susan Martinez',
      position: 'Development Director',
      bio: 'Susan leads our fundraising efforts and donor relations, ensuring the financial sustainability of our programs and performances.',
      image: '',
    },
  ]

  const board = [
    { name: 'Dr. Robert Chen', position: 'Board Chair' },
    { name: 'Elizabeth Foster', position: 'Vice Chair' },
    { name: 'Michael Stevens', position: 'Treasurer' },
    { name: 'Patricia Williams', position: 'Secretary' },
    { name: 'David Anderson', position: 'Board Member' },
    { name: 'Jennifer Lee', position: 'Board Member' },
    { name: 'Thomas Brown', position: 'Board Member' },
    { name: 'Sarah Johnson', position: 'Board Member' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <Users className="h-16 w-16 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Executive Team
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Meet the dedicated leaders who guide our organization and ensure the continued
            excellence of the Chris Davies Orchestra.
          </p>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Leadership Team
          </h2>
          <div className="space-y-12">
            {executives.map((exec) => (
              <div key={exec.name} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                  <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <Users className="h-24 w-24 text-gray-400" />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <h3 className="font-serif text-2xl font-bold mb-2">{exec.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">{exec.position}</p>
                  <p className="text-gray-600 leading-relaxed">{exec.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Board of Directors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {board.map((member) => (
              <div key={member.name} className="card text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

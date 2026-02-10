import { Metadata } from 'next'
import { Music2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Musicians | Chris Davies Orchestra',
  description: 'Meet the talented musicians of the Chris Davies Orchestra',
}

/**
 * Musicians page
 * Showcase of orchestra members
 */
export default function MusiciansPage() {
  // Placeholder data - replace with actual musician data from API
  const sections = [
    {
      name: 'Strings',
      musicians: [
        { name: 'John Smith', position: 'Concertmaster', image: '' },
        { name: 'Sarah Johnson', position: 'Principal Second Violin', image: '' },
        { name: 'Michael Brown', position: 'Principal Viola', image: '' },
        { name: 'Emily Davis', position: 'Principal Cello', image: '' },
      ],
    },
    {
      name: 'Woodwinds',
      musicians: [
        { name: 'David Wilson', position: 'Principal Flute', image: '' },
        { name: 'Lisa Anderson', position: 'Principal Oboe', image: '' },
        { name: 'James Taylor', position: 'Principal Clarinet', image: '' },
        { name: 'Maria Garcia', position: 'Principal Bassoon', image: '' },
      ],
    },
    {
      name: 'Brass',
      musicians: [
        { name: 'Robert Martinez', position: 'Principal Horn', image: '' },
        { name: 'Jennifer Lee', position: 'Principal Trumpet', image: '' },
        { name: 'William Thomas', position: 'Principal Trombone', image: '' },
        { name: 'Patricia White', position: 'Principal Tuba', image: '' },
      ],
    },
    {
      name: 'Percussion',
      musicians: [
        { name: 'Christopher Harris', position: 'Principal Timpani', image: '' },
        { name: 'Amanda Clark', position: 'Principal Percussion', image: '' },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <Music2 className="h-16 w-16 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Our Musicians
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Meet the talented artists who bring our performances to life. Our musicians are drawn
            from the finest conservatories and have performed with leading orchestras worldwide.
          </p>
        </div>
      </section>

      {/* Musicians by Section */}
      <section className="py-16">
        <div className="container">
          {sections.map((section) => (
            <div key={section.name} className="mb-16">
              <h2 className="font-serif text-3xl font-bold mb-8 text-center">
                {section.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {section.musicians.map((musician) => (
                  <div key={musician.name} className="card text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <Music2 className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-2">{musician.name}</h3>
                    <p className="text-primary-600 font-semibold">{musician.position}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">Join Our Orchestra</h2>
            <p className="text-gray-600 mb-8">
              We are always looking for talented musicians to join our ensemble. If you are
              interested in auditioning, please contact us for more information.
            </p>
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

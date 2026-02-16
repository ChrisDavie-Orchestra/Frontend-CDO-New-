'use client';

import { Music2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Image from 'next/image';

interface Musician {
  id: string;
  name: string;
  role: string;
  section?: string;
  imageUrl?: string;
  title?: {
    name: string;
  };
}

/**
 * Musicians page
 * Showcase of orchestra members
 */
export default function MusiciansPage() {
  const { data: musicians = [], isLoading } = useQuery({
    queryKey: ['musicians'],
    queryFn: () => api.get('/team/musicians').then(res => res.data),
  });

  // Group musicians by section
  const musiciansBySection: Record<string, Musician[]> = musicians.reduce((acc: Record<string, Musician[]>, musician: Musician) => {
    const section = musician.section || 'Other';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(musician);
    return acc;
  }, {} as Record<string, Musician[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
          {Object.keys(musiciansBySection).length === 0 ? (
            <div className="text-center py-12">
              <Music2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No musicians listed at this time.</p>
            </div>
          ) : (
            Object.entries(musiciansBySection).map(([sectionName, sectionMusicians]) => (
              <div key={sectionName} className="mb-16">
                <h2 className="font-serif text-3xl font-bold mb-8 text-center">
                  {sectionName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {sectionMusicians.map((musician: Musician) => (
                    <div key={musician.id} className="card text-center">
                      {musician.imageUrl ? (
                        <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                          <Image
                            src={musician.imageUrl}
                            alt={musician.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                          <Music2 className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <h3 className="font-serif text-xl font-bold mb-2">{musician.name}</h3>
                      <p className="text-primary-600 font-semibold">{musician.role}</p>
                      {musician.title && (
                        <p className="text-sm text-gray-500 mt-1">{musician.title.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
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

'use client';

import { Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Image from 'next/image';

interface Executive {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl?: string;
  title?: {
    name: string;
  };
}

interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  title?: {
    name: string;
  };
}

/**
 * Executives page
 * Leadership and board members
 */
export default function ExecutivesPage() {
  const { data: executives = [], isLoading: executivesLoading } = useQuery({
    queryKey: ['executives'],
    queryFn: () => api.get('/team/executives').then(res => res.data),
  });

  const { data: boardMembers = [], isLoading: boardLoading } = useQuery({
    queryKey: ['board-members'],
    queryFn: () => api.get('/team/board-members').then(res => res.data),
  });

  if (executivesLoading || boardLoading) {
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
          <Users className="h-16 w-16 mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Executive Team
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Meet the dedicated leaders who guide our organization and ensure the continued
            excellence of the ChrisDavies Orchestra.
          </p>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Leadership Team
          </h2>
          {executives.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No executives listed at this time.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {executives.map((exec: Executive) => (
                <div key={exec.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1">
                    {exec.imageUrl ? (
                      <div className="w-64 h-64 mx-auto relative rounded-lg overflow-hidden">
                        <Image
                          src={exec.imageUrl}
                          alt={exec.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                        <Users className="h-24 w-24 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="font-serif text-2xl font-bold mb-2">{exec.name}</h3>
                    <p className="text-primary-600 font-semibold mb-4">{exec.role}</p>
                    {exec.title && (
                      <p className="text-sm text-gray-500 mb-2">{exec.title.name}</p>
                    )}
                    <p className="text-gray-600 leading-relaxed">
                      {exec.description || 'No description available.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">
            Board of Directors
          </h2>
          {boardMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No board members listed at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {boardMembers.map((member: BoardMember) => (
                <div key={member.id} className="card text-center">
                  {member.imageUrl ? (
                    <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  {member.title && (
                    <p className="text-xs text-gray-500 mt-1">{member.title.name}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { Calendar, Ticket } from 'lucide-react'

/**
 * Hero component
 * Main hero section on homepage
 */
export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-black to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Experience the Magic of Live Orchestra
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Join us for unforgettable performances featuring world-class musicians
            and timeless classical masterpieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/concerts" className="btn bg-white text-primary-700 hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-2" />
              View Concerts
            </Link>
            <Link href="/memberships" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700">
              <Ticket className="h-5 w-5 mr-2" />
              Become a Member
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

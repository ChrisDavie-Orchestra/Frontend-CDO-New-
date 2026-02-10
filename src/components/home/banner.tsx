'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Banner carousel component
 * Rotating banner images for the orchestra with touch/swipe support
 */
export function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Placeholder banner data - replace with actual images
  const banners = [
    {
      id: 1,
      title: 'Experience World-Class Performances',
      subtitle: 'Join us for an unforgettable journey through exceptional classical music',
      image: 'https://www.cdorchestra.org/cdo_image/WhatsApp%20Image%202023-08-18%20at%2018.47.467%20(1).jpg',
      bgColor: 'from-primary-900 to-primary-700',
      primaryLink: '/concerts',
      primaryText: 'View Concerts',
      secondaryLink: '/about',
      secondaryText: 'Learn More',
    },
    {
      id: 2,
      title: 'Meet Our Talented Musicians',
      subtitle: 'Discover the artists behind the magic',
      image: 'https://www.cdorchestra.org/cdo_image/WhatsApp%20Image%202023-08-18%20at%2018.47.53.jpg',
      bgColor: 'from-gray-900 to-gray-700',
      primaryLink: '/about/musicians',
      primaryText: 'Meet Our Members',
      secondaryLink: '/about',
      secondaryText: 'Learn More',
    },
    {
      id: 3,
      title: 'Join Our Musical Journey',
      subtitle: 'Book your tickets for our exciting 2026 season',
      image: 'https://www.cdorchestra.org/cdo_image/WhatsApp%20Image%202023-08-18%20at%2018.47.29.jpg',
      bgColor: 'from-primary-800 to-primary-600',
      primaryLink: '/memberships',
      primaryText: 'Become a Member',
      secondaryLink: '/concerts',
      secondaryText: 'View Concerts',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [banners.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    // Reset
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div 
      ref={carouselRef}
      className="relative h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background with gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`}>
            {/* Background Image */}
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center z-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl text-white">
                <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {banner.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
                  {banner.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-delay-2 relative z-30">
                  <Link 
                    href={banner.primaryLink} 
                    className="inline-flex items-center justify-center rounded px-6 py-3 text-sm font-semibold transition-colors bg-white text-primary-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    {banner.primaryText}
                  </Link>
                  <Link 
                    href={banner.secondaryLink} 
                    className="inline-flex items-center justify-center rounded px-6 py-3 text-sm font-semibold transition-colors border-2 border-white text-white hover:bg-white hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  >
                    {banner.secondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

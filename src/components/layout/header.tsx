'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, User, LogOut, ShoppingBag, Heart } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import Image from 'next/image'


export function Header() {
  const { user, isAuthenticated, isAdmin, logout, getDashboardPath } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [discoverDropdownOpen, setDiscoverDropdownOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const aboutLinks = [
    { name: 'Our Story', href: '/about' },
    { name: 'Musicians', href: '/about/musicians' },
    { name: 'Executives', href: '/about/executives' },
    // { name: 'Our Conductor', href: '/about/conductor' },
  ]

  const discoverLinks = [
    { name: 'All Concerts', href: '/concerts', description: 'View our full calendar of events' },
    { name: 'Our Seasons', href: '/seasons', description: 'Explore our concert seasons' },
    { name: 'Streaming & Online', href: '/streaming', description: 'Watch from home' },
    { name: 'Free Events', href: '/discovery', description: 'No ticket required' },
    { name: 'Educational Programs', href: '/discovery', description: 'Community & youth initiatives' },
  ]

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-10 gap-6">
            <Link 
              href={isAuthenticated ? getDashboardPath() : "/account"}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              <User className="h-4 w-4" />
              My Account
            </Link>

            <Link 
              href="/store" 
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop
            </Link>

            <Link 
              href="/donate" 
              className="btn-primary text-sm px-4 py-1.5 flex items-center gap-1.5"
            >
              <Heart className="h-4 w-4" />
              Donate
            </Link>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="flex justify-between items-center min-h-[1rem] py-2"> 
          <Link href="/" className="flex items-center space-x-2">
            <Image src="https://www.cdorchestra.org/cdo_image/cd-logo transparent.png" alt="ChrisDavies Orchestra" width={130} height={130} />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>

            <div
              className="relative group"
              onMouseEnter={() => setDiscoverDropdownOpen(true)}
              onMouseLeave={() => setDiscoverDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors py-2 font-semibold">
                Discover
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {discoverDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-lg shadow-xl py-3 z-50 border border-gray-100">
                  {discoverLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-5 py-3 hover:bg-primary-50 transition-colors group/item"
                    >
                      <div className="font-semibold text-gray-900 group-hover/item:text-primary-600 mb-1">
                        {link.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {link.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-primary-600 transition-colors py-2">
                About
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/news" className="text-gray-700 hover:text-primary-600 transition-colors">
              Stories
            </Link>
            <Link href="/memberships" className="text-gray-700 hover:text-primary-600 transition-colors">
              Memberships
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary-600 transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div className="py-2">
              <p className="font-semibold text-gray-900 mb-2">Discover</p>
              <div className="pl-4 space-y-2">
                {discoverLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-1 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="py-2">
              <p className="font-semibold text-gray-900 mb-2">About</p>
              <div className="pl-4 space-y-2">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-1 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/news"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/memberships"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Memberships
            </Link>
            <Link
              href="/gallery"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Utility Links in Mobile */}
            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/store"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop
              </Link>
              <Link
                href="/donate"
                className="flex items-center gap-2 py-2 text-primary-600 font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                Donate
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 py-2 text-red-600 w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block py-2 pl-6 text-gray-600 hover:text-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

import Link from 'next/link'
import { Music, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'
import { Tiktok } from '@/components/icons/tiktok'

/**
 * Footer component
 * Site footer with links and social media
 */
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
               <Image src="https://www.cdorchestra.org/cdo_image/cd-logo transparent.png" alt="ChrisDavies Orchestra" width={130} height={130} />
            </div>
            <p className="text-gray-400 mb-4">
              Experience world-class orchestral performances that inspire and delight
              audiences of all ages.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/chrisdaviesorchestra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/chrisdaviesorch" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/chrisdaviesorchestra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@chrisdaviesorchestra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com/@chrisdaviesorchestra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Tiktok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/concerts" className="text-gray-400 hover:text-white">
                  Concerts
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  News
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/memberships" className="text-gray-400 hover:text-white">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-gray-400 hover:text-white">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ChrisDavies Orchestra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

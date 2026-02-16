import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AuthProvider } from '@/contexts/auth-context'
import { CartProvider } from '@/contexts/cart-context'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'ChrisDavies Orchestra - #1 Orchestra in Nigeria | World-Class Classical Music',
  description: 'Experience world-class orchestral performances in Nigeria. ChrisDavies Orchestra is the premier classical music destination, featuring exceptional musicians and unforgettable concerts.',
  keywords: [
    'orchestra in Nigeria',
    'number one orchestra in Nigeria', 
    'best orchestra Nigeria',
    'classical music Nigeria',
    'symphony orchestra Nigeria',
    'orchestral performances Nigeria',
    'ChrisDavies Orchestra',
    'Nigerian orchestra',
    'classical concerts Nigeria',
    'live orchestra music',
    'cultural performances Nigeria',
    'musical events Lagos',
    'symphony concerts',
    'orchestra tickets Nigeria'
  ],
  authors: [{ name: 'ChrisDavies Orchestra' }],
  creator: 'ChrisDavies Orchestra',
  publisher: 'ChrisDavies Orchestra',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cdorchestra.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ChrisDavies Orchestra - #1 Orchestra in Nigeria',
    description: 'Experience world-class orchestral performances in Nigeria. Premier classical music destination with exceptional musicians.',
    url: 'https://cdorchestra.org',
    siteName: 'ChrisDavies Orchestra',
    images: [
      {
        url: 'https://www.cdorchestra.org/cdo_image/cd-logo transparent.png',
        width: 1200,
        height: 630,
        alt: 'ChrisDavies Orchestra - #1 Orchestra in Nigeria',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChrisDavies Orchestra - #1 Orchestra in Nigeria',
    description: 'Experience world-class orchestral performances in Nigeria. Premier classical music destination.',
    images: ['https://www.cdorchestra.org/cdo_image/cd-logo transparent.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}

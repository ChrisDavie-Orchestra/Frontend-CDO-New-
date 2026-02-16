import { Banner } from '@/components/home/banner'
import { ComingUp } from '@/components/home/coming-up'
import { Highlights } from '@/components/home/highlights'
import { About } from '@/components/home/about'
import { LatestNews } from '@/components/home/latest-news'
import { Newsletter } from '@/components/home/newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ChrisDavies Orchestra - #1 Orchestra in Nigeria | World-Class Classical Music',
  description: 'Experience world-class orchestral performances in Nigeria. ChrisDavies Orchestra is the premier classical music destination, featuring exceptional musicians and unforgettable concerts. Book your tickets today!',
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
    'orchestra tickets Nigeria',
    'Ensemble orchestra',
    'Chamber Orchestra'
  ],
}

/**
 * Home page
 * Main landing page with banner carousel
 */
export default function Home() {
  return (
    <main>
      <Banner />
      <ComingUp />
      <Highlights />
      <About />
      <LatestNews />
      <Newsletter />
    </main>
  )
}

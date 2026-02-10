import { Banner } from '@/components/home/banner'
import { ComingUp } from '@/components/home/coming-up'
import { Highlights } from '@/components/home/highlights'
import { About } from '@/components/home/about'
import { LatestNews } from '@/components/home/latest-news'
import { Newsletter } from '@/components/home/newsletter'

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

import Link from 'next/link'
import { Award, Users, Music2 } from 'lucide-react'

/**
 * About component
 * Brief about section on homepage
 */
export function About() {
  const stats = [
    { icon: Award, label: 'Years of Excellence', value: '5+' },
    { icon: Users, label: 'Young Musicians Trained', value: '120+' },
    { icon: Music2, label: 'Performances Delivered', value: '20+' },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">
              About ChrisDavies Orchestra
            </h2>
            <p className="text-gray-600 mb-4">
              Since 2020, ChrisDavies Orchestra has been a beacon of musical excellence and
              youth empowerment in Nigeria. We combine classical excellence with African creativity,
              nurturing the next generation of classical musicians through world-class training,
              performances, and community engagement.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to inspire peace, focus, and excellence through music, while providing
              sustainable pathways for talent development. We&apos;ve trained over 120 young musicians
              and delivered 20+ performances, transforming lives through the power of orchestral music.
            </p>
            <Link href="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="font-serif text-3xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

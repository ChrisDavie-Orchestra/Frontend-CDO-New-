import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | ChrisDavies Orchestra',
  description: 'Learn about ChrisDavies Orchestra - inspiring peace, focus, and excellence through music while nurturing the next generation of classical musicians in Nigeria.',
}

/**
 * About page
 * Information about the orchestra
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            About ChrisDavies Orchestra
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            A beacon of musical excellence and youth empowerment, nurturing the next generation of classical musicians in Nigeria since 2020
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, ChrisDavies Orchestra has earned recognition for its artistry, discipline, 
                and youth-centered mentorship model. We combine classical excellence with African creativity, 
                making orchestral music accessible, enjoyable, and life-changing.
              </p>
              <p className="text-gray-600 mb-4">
                Through world-class performances, structured training, and community engagement, CDO has 
                transformed young talents into confident, skilled musicians—empowering them to reach audiences 
                locally and internationally. We have trained over 120 young musicians (ages 10–25) and delivered 
                20+ performances within and outside Lagos.
              </p>
              <p className="text-gray-600">
                Our mission is simple yet profound: to inspire peace, focus, and excellence through music, 
                while providing sustainable pathways for talent development and professional growth. We partner 
                with schools, NGOs, and faith-based organizations to bring the transformative power of music to 
                communities across Nigeria.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500">Orchestra Image Placeholder</p>
            </div>
          </div>

          {/* Core Programmes */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">Our Core Programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card border-l-4 border-primary-600">
                <h3 className="font-serif text-xl font-bold mb-3">CD Orchestra</h3>
                <p className="text-gray-600">
                  Professional training for young instrumentalists and vocalists, providing structured 
                  mentorship and world-class instruction to develop exceptional musical talent.
                </p>
              </div>
              <div className="card border-l-4 border-primary-600">
                <h3 className="font-serif text-xl font-bold mb-3">CDO Performances</h3>
                <p className="text-gray-600">
                  Seasonal concerts, collaborations, and outreach tours that showcase our musicians&apos; 
                  talents and bring classical music to diverse audiences across Nigeria and beyond.
                </p>
              </div>
              <div className="card border-l-4 border-primary-600">
                <h3 className="font-serif text-xl font-bold mb-3">Community Music Projects</h3>
                <p className="text-gray-600">
                  Free training programs in underserved communities, making music education accessible 
                  to all and discovering hidden talents across Nigeria.
                </p>
              </div>
              <div className="card border-l-4 border-primary-600">
                <h3 className="font-serif text-xl font-bold mb-3">Peace Through Music Initiative</h3>
                <p className="text-gray-600">
                  Using orchestral performances to promote unity, patriotism, and focus among youth, 
                  demonstrating that music is a powerful force for positive social change.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card">
              <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To inspire peace, focus, and excellence through music, while providing sustainable 
                pathways for talent development and professional growth. We nurture young musicians 
                through world-class training, performances, and community engagement.
              </p>
            </div>
            <div className="card">
              <h3 className="font-serif text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become the leading orchestra group in Nigeria and West Africa, recognized for 
                nurturing exceptional talent, promoting cultural heritage, and using music as a 
                force for peace, unity, and social transformation.
              </p>
            </div>
          </div>

          {/* Founder Section */}
          <div className="mb-16 bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Our Founder
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="font-serif text-2xl font-bold mb-2">Chris Davies</h3>
                <p className="text-primary-600 font-semibold mb-6">Founder & Music Director</p>
                <div className="space-y-4 text-gray-600">
                  <p>
                    In 2001, Chris Davies founded the Chris Davies Orchestra with a bold vision: 
                    to create an ensemble that would bridge the gap between classical tradition 
                    and contemporary innovation, making orchestral music accessible and relevant 
                    to modern audiences.
                  </p>
                  <p>
                    With a deep passion for music education and community engagement, Chris 
                    established the orchestra not just as a performance ensemble, but as a 
                    cultural institution dedicated to nurturing the next generation of musicians 
                    and music lovers.
                  </p>
                  <p>
                    Under his visionary leadership, the orchestra has grown from a small chamber 
                    ensemble to a full symphony orchestra of over 80 talented musicians, performing 
                    more than 50 concerts annually and reaching audiences of thousands.
                  </p>
                  <p className="font-semibold text-primary-700">
                    &quot;Music has the power to transform lives and bring communities together. 
                    That&apos;s why I founded this orchestra – to share that transformative power 
                    with as many people as possible.&quot;
                  </p>
                </div>
                <div className="mt-6">
                  <a href="/about/conductor" className="btn-primary">
                    Read Full Biography
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gray-200 rounded-xl h-[500px] flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg mb-2">Founder Image</p>
                    <p className="text-gray-400 text-sm">Add founder photo here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conductor Section */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Meet Our Conductor
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-500">Conductor Image Placeholder</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold mb-4">Chris Davies</h3>
                <p className="text-primary-600 font-semibold mb-4">Music Director & Conductor</p>
                <p className="text-gray-600 mb-4">
                  Chris Davies is an internationally acclaimed conductor known for his dynamic
                  interpretations and innovative programming. With over 30 years of experience,
                  he has led orchestras across Europe, Asia, and North America.
                </p>
                <p className="text-gray-600 mb-4">
                  A graduate of the Royal Academy of Music, Chris has received numerous awards
                  for his contributions to classical music, including the prestigious Conductor
                  of the Year award in 2018.
                </p>
                <p className="text-gray-600">
                  Under his leadership, the orchestra has commissioned over 50 new works and
                  has become known for its commitment to contemporary composers while maintaining
                  a deep respect for the classical repertoire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

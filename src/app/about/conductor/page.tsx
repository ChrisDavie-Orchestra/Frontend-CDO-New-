import { Metadata } from 'next'
import { Award, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Conductor | Chris Davies Orchestra',
  description: 'Learn about Chris Davies, our Music Director and Conductor',
}

/**
 * Conductor page
 * Detailed profile of the conductor
 */
export default function ConductorPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Chris Davies
          </h1>
          <p className="text-xl text-primary-100">
            Music Director & Conductor
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center sticky top-24">
                <Music className="h-32 w-32 text-gray-400" />
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Biography</h2>
                <div className="prose max-w-none text-gray-600 space-y-4">
                  <p>
                    Chris Davies is an internationally acclaimed conductor known for his dynamic
                    interpretations and innovative programming. With over 30 years of experience,
                    he has led orchestras across Europe, Asia, and North America, earning praise
                    from critics and audiences alike.
                  </p>
                  <p>
                    A graduate of the Royal Academy of Music in London, Chris studied under the
                    legendary conductor Sir Colin Davis. His early career saw him serve as
                    assistant conductor for the London Philharmonic Orchestra before taking on
                    principal conducting positions with several regional orchestras.
                  </p>
                  <p>
                    In 2001, Chris founded the Chris Davies Orchestra with a vision to create an
                    ensemble that would bridge the gap between traditional classical repertoire
                    and contemporary works. Under his leadership, the orchestra has commissioned
                    over 50 new compositions and has become known for its adventurous programming
                    and commitment to music education.
                  </p>
                  <p>
                    Chris is particularly passionate about making classical music accessible to
                    younger audiences. He has developed numerous educational programs and
                    regularly conducts family concerts and school workshops. His innovative
                    approach to audience engagement has been recognized with several awards,
                    including the National Arts Education Award in 2019.
                  </p>
                </div>
              </div>

              {/* Awards & Recognition */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 flex items-center">
                  <Award className="h-8 w-8 text-primary-600 mr-3" />
                  Awards & Recognition
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-24 flex-shrink-0 text-primary-600 font-semibold">2018</div>
                    <div className="text-gray-600">Conductor of the Year, International Classical Music Awards</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 flex-shrink-0 text-primary-600 font-semibold">2019</div>
                    <div className="text-gray-600">National Arts Education Award</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 flex-shrink-0 text-primary-600 font-semibold">2020</div>
                    <div className="text-gray-600">Honorary Doctorate, Royal Academy of Music</div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-24 flex-shrink-0 text-primary-600 font-semibold">2022</div>
                    <div className="text-gray-600">Lifetime Achievement Award, Classical Music Association</div>
                  </div>
                </div>
              </div>

              {/* Notable Performances */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Notable Performances</h2>
                <div className="space-y-3 text-gray-600">
                  <p>• Carnegie Hall debut with Mahler Symphony No. 5 (2015)</p>
                  <p>• Royal Albert Hall Proms appearance (2017)</p>
                  <p>• Sydney Opera House residency (2019)</p>
                  <p>• Berlin Philharmonie guest conductor (2021)</p>
                  <p>• Vienna Musikverein New Year Concert (2023)</p>
                </div>
              </div>

              {/* Recordings */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Selected Recordings</h2>
                <div className="space-y-3 text-gray-600">
                  <p>• Beethoven: Complete Symphonies (2016)</p>
                  <p>• Contemporary American Composers (2018)</p>
                  <p>• Brahms: Symphonies 1-4 (2020)</p>
                  <p>• New Voices: 21st Century Orchestra Works (2022)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

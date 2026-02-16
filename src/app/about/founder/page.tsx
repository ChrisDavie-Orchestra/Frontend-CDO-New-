import { Metadata } from 'next'
import { Award } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Conductor | ChrisDavies Orchestra',
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
            Christopher Davies
          </h1>
          <p className="text-xl text-primary-100">
            Founder 
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
                <Image src="https://www.cdorchestra.org/cdo_image/ChristopherDavies.JPG" alt="Chris Davies" width={600} height={600} />
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Biography</h2>
                <div className="prose max-w-none text-gray-600 space-y-4">
                  <p>
                    Christopher Davies is a visionary Nigerian conductor celebrated for blending the rigor of
                    classical tradition with the vibrant storytelling of African music. Across three 
                    decades on the podium he has led ensembles throughout Europe, Africa, Asia, and North 
                    America, consistently winning accolades for his imaginative interpretations.
                  </p>
                  <p>
                    Trained at the Royal Academy of Music in London, Christopher Davies studied under the legendary Sir
                    Colin Davis before serving as assistant conductor with the London Philharmonic 
                    Orchestra. Those formative seasons refined his craft and opened doors to principal 
                    conducting posts with regional orchestras on two continents.
                  </p>
                  <p>
                    In 2020 he founded the ChrisDavies Orchestra to bridge traditional repertoire with
                    contemporary African voices. Under his leadership the ensemble has commissioned more 
                    than 50 new works, premiered cross-genre collaborations, and established a mentorship 
                    pipeline that now supports over 120 young musicians.
                  </p>
                  <p>
                    Christopher Davies remains passionate about making classical music accessible. He curates family 
                    concerts, designs school residencies, and speaks frequently about the power of music to
                    inspire peace, focus, and excellence. That commitment to education has earned multiple 
                    honors, including the National Arts Education Award (2019).
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

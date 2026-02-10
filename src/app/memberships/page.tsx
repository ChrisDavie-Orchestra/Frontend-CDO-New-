import { Check, Star } from 'lucide-react'

/**
 * Memberships page
 * Patronage tiers and benefits for ChrisDavies Orchestra
 */
export default function MembershipsPage() {
  const tiers = [
    {
      name: 'Friend of the Orchestra',
      price: '₦250,000 - ₦999,999',
      period: '1 year',
      description: 'Support our mission and join our community',
      features: [
        'Recognition on website',
        'Invitations to performances',
        'Quarterly updates',
        'Community access',
      ],
      color: 'gray',
      popular: false,
    },
    {
      name: 'Supporting Patron/Matron',
      price: '₦1,000,000 - ₦1,999,999',
      period: '2 years',
      description: 'Enhanced recognition and access',
      features: [
        'All Friend benefits',
        'Logo on concert programmes',
        'Backstage access to performances',
        'VIP seating at concerts',
        'Recognition in promotional materials',
      ],
      color: 'gray',
      popular: false,
    },
    {
      name: 'Patron/Matron',
      price: '₦2,000,000 - ₦4,999,999',
      period: '3 years',
      description: 'Premier partnership tier',
      features: [
        'All Supporting Patron benefits',
        'VIP access to all performances',
        'Media recognition and brand exposure',
        'Private recital invitations',
        'Meet & greet with musicians',
        'Exclusive donor events',
      ],
      color: 'primary',
      popular: true,
    },
    {
      name: 'Grand Patron',
      price: '₦5,000,000+',
      period: 'Lifetime',
      description: 'Ultimate legacy partnership',
      features: [
        'All Patron/Matron benefits',
        'Naming rights for performances/workshops',
        'Lifetime recognition',
        'Cultural legacy establishment',
        'Elite audience brand exposure',
        'Permanent feature in all materials',
        'Exclusive partnership opportunities',
      ],
      color: 'primary',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="h-16 w-16 mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Become a Patron or Matron
            </h1>
            <p className="text-xl text-primary-100">
              Partner with us in sustaining musical excellence, expanding our reach, and enriching Nigeria&apos;s cultural heritage. Your patronage shapes futures and strengthens communities.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`card relative flex flex-col ${
                  tier.popular ? 'ring-2 ring-primary-600 shadow-xl' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  <div className="mb-2">
                    <span className="font-serif text-2xl font-bold text-primary-600">
                      {tier.price}
                    </span>
                    <div className="text-gray-600 text-sm mt-1">
                      Recognition: {tier.period}
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full ${
                    tier.popular ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  Become a Patron
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Why Become a Patron or Matron?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Recognition & Prestige</h3>
                <p className="text-gray-600 text-sm">
                  Your name featured on concert programmes, banners, website, and promotional materials
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Cultural Legacy</h3>
                <p className="text-gray-600 text-sm">
                  Sponsor performances or workshops named in your honour and build a lasting legacy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold mb-2">Empower Youth</h3>
                <p className="text-gray-600 text-sm">
                  Help us acquire instruments, fund scholarships, and support talented young musicians
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Registration Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Are You a Musician?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join ChrisDavies Orchestra as a performing member! We welcome talented musicians 
              who share our passion for classical music and youth empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/members/register" className="btn bg-white text-primary-700 hover:bg-gray-100 inline-flex items-center justify-center">
                Register as a Member
              </a>
              <a href="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-700 inline-flex items-center justify-center">
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Donation Information */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">
              Ready to Make a Difference?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    <strong>Email:</strong><br />
                    samson.abidoye@cdorchestra.org
                  </p>
                  <p>
                    <strong>Phone:</strong><br />
                    +234 (706) 517 7271
                  </p>
                  <p>
                    <strong>Website:</strong><br />
                    www.cdorchestra.org
                  </p>
                </div>
              </div>
              <div className="card bg-primary-50">
                <h3 className="font-semibold text-xl mb-4">Donation Account</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Account Name:</strong><br />
                    ChrisDavies Orchestra
                  </p>
                  <p>
                    <strong>Account Number:</strong><br />
                    6354050282
                  </p>
                  <p>
                    <strong>Bank:</strong><br />
                    Moniepoint MFB
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Flexible instalment and in-kind sponsorship options are available.
              </p>
              <p className="text-sm text-gray-500">
                Let&apos;s make history together—one performance at a time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import React from 'react';
import Image from 'next/image';

export default function OurFarms() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/farms-hero.jpg"
            alt="Our Organic Farms"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Nature Meets Innovation
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Explore our sustainable farming locations across the country
            </p>
            <div className="grid grid-cols-3 gap-6 py-8 border-t border-white/20">
              {[
                { value: '12+', label: 'Farm Locations' },
                { value: '5000+', label: 'Acres Cultivated' },
                { value: '100%', label: 'Organic Certified' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-green-400">{stat.value}</p>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farms Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Farm Locations</h2>
            <p className="text-gray-600">
              Each farm is carefully selected and maintained to ensure the highest quality organic produce
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((farm) => (
              <div key={farm} className="group relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={`/farm-${farm}.jpg`}
                    alt={`Farm Location ${farm}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Green Valley Farm {farm}</h3>
                  <p className="text-gray-200 text-sm mb-4">California, USA</p>
                  <div className="flex gap-4">
                    {['Organic Crops', 'Sustainable'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                State-of-the-Art Farming
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Advanced Irrigation', description: 'Smart water management systems' },
                  { title: 'Solar Powered', description: '100% renewable energy usage' },
                  { title: 'Crop Rotation', description: 'Sustainable soil management' },
                ].map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/farming-tech.jpg"
                alt="Farming Technology"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Want to Visit Our Farms?
          </h2>
          <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium 
                           hover:bg-green-50 transition-colors">
            Schedule a Tour
          </button>
        </div>
      </section>
    </main>
  );
}

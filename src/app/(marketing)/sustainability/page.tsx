import React from 'react';
import Image from 'next/image';

export default function Sustainability() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-b from-green-900 to-green-800">
        <div className="absolute inset-0">
          <Image
            src="/sustainability-hero.jpg"
            alt="Sustainable Farming"
            fill
            className="object-cover mix-blend-overlay opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Cultivating a 
              <span className="text-green-400">Sustainable</span> Future
            </h1>
            <p className="text-xl text-green-50 mb-8">
              Our commitment to environmental stewardship and sustainable agricultural practices
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-green-500 text-white rounded-xl font-medium 
                               hover:bg-green-400 transition-colors">
                Learn More
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl 
                               font-medium hover:bg-white/20 transition-colors">
                View Impact Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '80%', label: 'Carbon Reduction' },
              { value: '100%', label: 'Organic Materials' },
              { value: '50K+', label: 'Trees Planted' },
              { value: '0%', label: 'Chemical Waste' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Initiatives</h2>
            <p className="text-gray-600">
              Discover how we're making a difference through sustainable practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Zero Waste Production',
                icon: '♻️',
                description: 'Converting 100% of organic waste into valuable fertilizer'
              },
              {
                title: 'Renewable Energy',
                icon: '⚡',
                description: 'Powered by solar and wind energy across all facilities'
              },
              {
                title: 'Water Conservation',
                icon: '💧',
                description: 'Advanced irrigation systems reducing water usage by 60%'
              }
            ].map((initiative) => (
              <div key={initiative.title} 
                   className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl 
                            transition-all duration-300">
                <span className="text-4xl mb-6 block">{initiative.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 
                             transition-colors">
                  {initiative.title}
                </h3>
                <p className="text-gray-600">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Sustainable Process
              </h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Organic Waste Collection' },
                  { step: '02', title: 'Natural Decomposition' },
                  { step: '03', title: 'Quality Testing' },
                  { step: '04', title: 'Eco-Friendly Packaging' },
                ].map((process) => (
                  <div key={process.step} className="flex gap-4 items-start">
                    <span className="text-4xl font-bold text-green-200">{process.step}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600">
                        Implementing sustainable practices at every step of our production process.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/sustainable-process.jpg"
                alt="Our Sustainable Process"
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
            Join Us in Our Sustainable Journey
          </h2>
          <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium 
                           hover:bg-green-50 transition-colors">
            Download Sustainability Report
          </button>
        </div>
      </section>
    </main>
  );
}

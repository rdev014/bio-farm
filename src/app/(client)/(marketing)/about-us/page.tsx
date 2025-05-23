import React from 'react';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/50 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-100/50 rounded-full blur-[128px] animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nurturing the Earth, 
              <span className="block text-green-600">Growing the Future</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              At Bio-Farms, we're committed to revolutionizing agriculture through 
              sustainable practices and organic solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/mission-image.jpg"
                alt="Sustainable Farming"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To provide sustainable, organic fertilizer solutions that enhance soil health, 
                  maximize crop yields, and protect our environment for future generations.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To lead the global transition to sustainable agriculture by making organic 
                  fertilizers the standard choice for farmers worldwide.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-3xl font-bold text-green-600">15K+</p>
                  <p className="text-gray-600">Happy Farmers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">30K+</p>
                  <p className="text-gray-600">Acres Improved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              The principles that guide us in creating sustainable agricultural solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'Committed to environmental preservation and sustainable practices.'
              },
              {
                icon: '🔬',
                title: 'Innovation',
                description: 'Continuous research and development for better solutions.'
              },
              {
                icon: '🤝',
                title: 'Partnership',
                description: 'Building strong relationships with farmers and communities.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              Dedicated professionals working towards a sustainable future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="group relative">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={`/team-member-${member}.jpg`}
                    alt={`Team Member ${member}`}
                    width={400}
                    height={400}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Team Member Name</h3>
                <p className="text-green-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join Us in Growing a Sustainable Future
          </h2>
          <button className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium 
                           hover:shadow-xl transition-all duration-300">
            Contact Us Today
          </button>
        </div>
      </section>
    </main>
  );
}

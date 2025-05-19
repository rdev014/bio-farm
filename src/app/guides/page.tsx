import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GuidesPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/50 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-100/50 rounded-full blur-[128px] animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Farming Guides & Resources
            </h1>
            <p className="text-lg text-gray-600">
              Expert tips and comprehensive guides to help you achieve the best results
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-200 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-600 
                               rounded-lg text-white hover:bg-green-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Soil Management', icon: '🌱', count: '15 Guides' },
              { title: 'Organic Farming', icon: '🌾', count: '12 Guides' },
              { title: 'Pest Control', icon: '🐛', count: '8 Guides' },
              { title: 'Water Management', icon: '💧', count: '10 Guides' },
              { title: 'Crop Rotation', icon: '🔄', count: '6 Guides' },
              { title: 'Fertilizer Usage', icon: '🌿', count: '14 Guides' },
            ].map((category) => (
              <Link
                key={category.title}
                href={`/guides/${category.title.toLowerCase().replace(' ', '-')}`}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-green-50 
                         transition-colors duration-300"
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 
                             transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((guide) => (
              <div
                key={guide}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm 
                         hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={`/guide-${guide}.jpg`}
                    alt={`Guide ${guide}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Beginner
                    </span>
                    <span className="text-gray-500 text-sm">5 min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Getting Started with Organic Farming
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn the fundamentals of organic farming and how to transition from traditional methods.
                  </p>
                  <Link
                    href={`/guides/guide-${guide}`}
                    className="text-green-600 font-medium hover:text-green-700 
                             flex items-center gap-2"
                  >
                    Read More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-green-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Guides
          </h2>
          <p className="text-green-50 mb-8">
            Get our latest farming guides and tips delivered straight to your inbox
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm 
                       text-white placeholder:text-white/70 focus:outline-none 
                       focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium 
                             hover:bg-green-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PressMedia() {
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
              Press & Media Center
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest news and developments fromArkin
            </p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={`/news-${item}.jpg`}
                    alt="News Image"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <span className="text-sm text-green-600 font-medium">May 20, 2024</span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                   Arkin Launches New Organic Fertilizer Line
                  </h3>
                  <p className="text-gray-600">
                    Introducing our latest innovation in sustainable farming solutions...
                  </p>
                  <Link href="#" className="inline-flex items-center text-green-600 font-medium hover:text-green-700">
                    Read More 
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Kit Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Kit</h2>
            <p className="text-gray-600">
              Download officialArkin media resources
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Brand Assets', icon: '🎨', description: 'Logos, color guides, and brand guidelines' },
              { title: 'Media Pack', icon: '📸', description: 'High-resolution photos and videos' },
              { title: 'Fact Sheet', icon: '📄', description: 'Company information and statistics' },
              { title: 'Press Releases', icon: '📰', description: 'Archive of official announcements' },
            ].map((item) => (
              <div key={item.title} 
                   className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow 
                            flex items-start gap-6">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button className="text-green-600 font-medium hover:text-green-700 flex items-center gap-2">
                    Download
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Media Contact</h2>
            <div className="inline-flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/press-contact.jpg"
                  alt="Press Contact"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                <p className="text-gray-600">Head of Communications</p>
                <a href="mailto:press@biofarms.com" 
                   className="text-green-600 hover:text-green-700">press@biofarms.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

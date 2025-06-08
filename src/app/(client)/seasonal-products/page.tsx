import React from 'react';

export default function SeasonalProducts() {
  // SVG for a subtle, professional background texture
  const SubtleOrganicPatternSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-8" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="organic-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="1" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </defs>
      <rect width="100" height="100" fill="#F8FDF9" filter="url(#organic-noise)" /> {/* Very light greenish-white */}
    </svg>
  );

  // SVG for a product image placeholder
  const ProductImagePlaceholderSVG = () => (
    <svg className="h-full w-full text-gray-200" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  );

  return (
    <main className="overflow-hidden bg-gray-50 font-sans antialiased text-gray-900">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-b from-green-50 to-white">
        <SubtleOrganicPatternSVG />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              Seasonal Soil Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Discover our expertly formulated organic fertilizers, perfectly optimized for every growing season.
            </p>
          </div>

          {/* Seasonal Selection Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
              <button
                key={season}
                className="group flex flex-col items-center justify-center p-6 md:p-8 rounded-xl 
                           bg-white/70 backdrop-blur-sm shadow-md border border-gray-100
                           hover:bg-green-50 hover:shadow-lg hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="text-4xl md:text-5xl mb-3 block group-hover:scale-110 transition-transform">
                  {season === 'Spring' ? '🌱' : 
                   season === 'Summer' ? '☀️' : 
                   season === 'Autumn' ? '🍂' : '❄️'}
                </span>
                <span className="font-semibold text-lg md:text-xl text-gray-800 group-hover:text-green-700 transition-colors">
                  {season}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Seasonal Fertilizer Collection
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3, 4, 5, 6].map((product) => (
              <div 
                key={product} 
                className="group bg-white rounded-2xl p-6 shadow-md border border-gray-100 
                           hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                  {/* Using placeholder SVG for images */}
                  <ProductImagePlaceholderSVG />
                  {/* If you have actual images, replace the above with: */}
                  {/* <Image
                    src={`/path-to-your-seasonal-fertilizer-images/product-${product}.png`} // Use .png for transparent backgrounds if possible
                    alt={`Seasonal Organic Fertilizer ${product}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  /> */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full shadow-sm">
                      Spring Formula
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Bio-Growth Organic Formula {product}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  A balanced blend for robust early season growth, enhancing root development and plant vigor.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-green-700">$29.99</span>
                  <button className="px-5 py-2 bg-green-700 text-white rounded-lg font-medium 
                                     hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      ---

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Arkin Seasonal Fertilizers?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: (
                  <svg className="h-12 w-12 text-green-700 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h.01M17 11h.01M7 16h.01M17 16h.01M10 16h.01M12 21h.01M15 21h.01M17 21h.01M7 21h.01M10 21h.01M12 3v18h2V3M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                  </svg>
                ),
                title: 'Precision Formulated',
                description: 'Each blend is scientifically developed to meet the specific needs of plants in different seasons.'
              },
              {
                icon: (
                  <svg className="h-12 w-12 text-blue-700 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: 'Enhanced Bio-Activity',
                description: 'Our organic ingredients boost beneficial soil microbes, improving nutrient uptake and plant resilience.'
              },
              {
                icon: (
                  <svg className="h-12 w-12 text-teal-700 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
                title: 'Sustainable Growth',
                description: 'Committed to eco-friendly practices, our products support healthy ecosystems and future harvests.'
              }
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg hover:border-green-200 transform hover:-translate-y-1">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      ---

      {/* CTA Section: Professional & Engaging */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Stay Ahead of the Season
              </h2>
              <p className="text-green-100 text-lg">
                Receive exclusive updates on seasonal products and expert gardening tips directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-3 rounded-xl bg-white/15 backdrop-blur-sm text-white placeholder:text-white/70 
                           border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
              />
              <button className="px-8 py-3 bg-white text-green-700 rounded-xl font-semibold 
                                 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
import React from 'react';
import Image from 'next/image';

export default function ProductsPage() {
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
              Our Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover our range of organic fertilizers and soil enhancement solutions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All Products', 'Fertilizers', 'Soil Enhancers', 'Plant Growth'].map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-xl bg-white shadow-sm hover:shadow-md
                         transition-all duration-300 text-gray-700 hover:text-green-600
                         hover:scale-105"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((product) => (
              <div 
                key={product}
                className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all
                         duration-300 border border-gray-100"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
                  <Image
                    src={`/product-${product}.jpg`}
                    alt={`Product ${product}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                      Best Seller
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      Bio-Growth Formula
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600">
                    Premium organic fertilizer for optimal plant growth
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-green-600">$29.99</span>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg
                                   hover:bg-green-500 transition-colors">
                      Add to Cart
                    </button>
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
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🌱', title: 'Organic', text: '100% Natural Ingredients' },
              { icon: '🌍', title: 'Eco-Friendly', text: 'Sustainable Production' },
              { icon: '📦', title: 'Free Shipping', text: 'Orders over $50' },
              { icon: '💪', title: 'Guaranteed', text: 'Money-back Promise' },
            ].map((feature) => (
              <div 
                key={feature.title}
                className="text-center p-6 bg-white rounded-xl hover:shadow-lg
                         transition-shadow duration-300"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Stay Updated</h2>
              <p className="text-green-50">Get notified about new products and special offers</p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white
                         placeholder:text-white/70 focus:outline-none focus:ring-2
                         focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium
                               hover:bg-green-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

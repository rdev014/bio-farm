'use client';

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-tr from-green-50 via-white to-yellow-50 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/50 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-100/50 rounded-full blur-[128px] animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-50/30 rounded-full blur-[96px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200">
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-800 font-medium text-sm tracking-wider">Eco-Friendly Solutions</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  Nature's Best
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                    Organic Fertilizer
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600/90 max-w-xl">
                  Transform your garden with our premium organic fertilizers. 
                  Made from 100% recycled food waste, supporting both your plants 
                  and our planet's future.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 
                                 text-white rounded-xl font-medium shadow-lg shadow-green-500/25
                                 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 
                                 flex items-center gap-2 overflow-hidden">
                  <span className="relative z-10">Shop Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                       className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10" 
                       viewBox="0 0 20 20" 
                       fill="currentColor">
                    <path fillRule="evenodd" 
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 
                                transform scale-x-0 group-hover:scale-x-100 transition-transform 
                                origin-left duration-300"></div>
                </button>
                
                <button className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-xl 
                                 font-medium hover:bg-gray-800 hover:text-white transition-all
                                 duration-300 hover:shadow-xl">
                  Learn More
                </button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">15K+</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Happy Customers</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">100%</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Organic</p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">4.9/5</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* Enhanced Right Content */}
            <div className="relative lg:h-[600px]">
              <div className="relative h-full rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                              group-hover:from-black/30 transition-all duration-300"></div>
                <img
                  src="https://media.istockphoto.com/id/684977254/photo/farmer-hand-giving-plant-organic-humus-fertilizer-to-plant.jpg?s=612x612&w=0&k=20&c=SjD1diUDXEBmXRF1My6lDdwV9BGpPTD1yWUCwz8235U="
                  alt="Organic Fertilizer Product"
                  className="object-cover w-full h-full rounded-2xl transform 
                           group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Enhanced Feature Cards */}
                <div className="absolute -right-4 top-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl 
                              shadow-xl hover:shadow-2xl transition-all duration-300 transform 
                              hover:scale-105 hover:-translate-x-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🌱</span>
                    <div>
                      <p className="font-semibold text-gray-900">100% Organic</p>
                      <p className="text-sm text-gray-600">Eco-certified</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-6 bottom-10 bg-white/90 backdrop-blur-sm p-4 
                              rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                              transform hover:scale-105 hover:translate-x-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">♻️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Zero Waste</p>
                      <p className="text-sm text-gray-600">100% Recycled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Organic Fertilizer?
            </h2>
            <p className="text-lg text-gray-600">
              Discover the benefits of our sustainable and eco-friendly fertilizer solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Sustainable', 'Nutrient Rich', 'Cost Effective'].map((title, i) => (
              <div 
                key={i} 
                className="group p-6 bg-green-50 rounded-2xl hover:bg-green-100 
                           transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center 
                              text-white mb-4 group-hover:rotate-6 transition-transform">
                  {i === 0 && '🌱'}
                  {i === 1 && '🌿'}
                  {i === 2 && '💰'}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">
                  Experience the power of nature with our premium organic solutions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Premium Products
            </h2>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 
                             transition-colors flex items-center gap-2">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                                       transition-all duration-300">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <img
                    // src={`/product-${item}.jpg`}
                    src="https://media.istockphoto.com/id/684977254/photo/farmer-hand-giving-plant-organic-humus-fertilizer-to-plant.jpg?s=612x612&w=0&k=20&c=SjD1diUDXEBmXRF1My6lDdwV9BGpPTD1yWUCwz8235U="
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Fertilizer {item}</h3>
                  <p className="text-gray-600 mb-4">Perfect for garden and indoor plants</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-semibold">$29.99</span>
                    <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 
                                     hover:bg-green-600 hover:text-white transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers who trust our organic solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-8 bg-green-50 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-200 rounded-full overflow-hidden">
                    <img
                      src={`/avatar-${item}.jpg`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Customer Name</h4>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Amazing results with this organic fertilizer! My plants have never looked better."
                </p>
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Green Community
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Subscribe to receive gardening tips and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 
                         focus:ring-green-400"
              />
              <button className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 
                               transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

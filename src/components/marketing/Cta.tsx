import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-500 py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse delay-300"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ready to Transform Your 
              <span className="block">Agricultural Practice?</span>
            </h2>
            <p className="text-green-50 text-lg">
              Join thousands of farmers who have already switched to sustainable organic farming with Bio-Farms solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-medium 
                         hover:bg-green-50 transition-colors duration-300 shadow-lg 
                         shadow-green-700/20"
              >
                Get Started
              </Link>
              <Link 
                href="/products"
                className="px-8 py-4 bg-green-700/20 text-white rounded-xl font-medium 
                         hover:bg-green-700/30 transition-colors duration-300 
                         backdrop-blur-sm"
              >
                View Products
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-green-50 mb-4">Trusted by leading agricultural companies</p>
              <div className="flex flex-wrap gap-8 items-center">
                {[1, 2, 3].map((partner) => (
                  <div 
                    key={partner}
                    className="w-24 h-12 bg-white/10 rounded-lg backdrop-blur-sm 
                             flex items-center justify-center"
                  >
                    <Image
                      src={`/partner-${partner}.png`}
                      alt={`Partner ${partner}`}
                      width={64}
                      height={32}
                      className="opacity-70"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '50K+', label: 'Farmers Served' },
              { value: '30+', label: 'Countries' },
              { value: '100%', label: 'Organic Products' }
            ].map((stat) => (
              <div 
                key={stat.label}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 
                         transition-colors duration-300"
              >
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-green-50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

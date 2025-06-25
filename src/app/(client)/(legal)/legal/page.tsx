import React from 'react';
import Link from 'next/link';

export default function LegalPage() {
  const legalDocs = [
    {
      title: 'Terms of Service',
      description: 'Our terms and conditions for using Arkin services and products',
      lastUpdated: 'May 15, 2025',
      icon: '📋'
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      lastUpdated: 'June 25, 2025',
      icon: '🔒'
    },
    {
      title: 'Cookie Policy',
      description: 'Information about how we use cookies and similar technologies',
      lastUpdated: 'April 30, 2025',
      icon: '🍪'
    },
    {
      title: 'Shipping Policy',
      description: 'Details about our shipping methods, timeframes, and costs',
      lastUpdated: 'May 1, 2025',
      icon: '🚚'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[128px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Legal Information
          </h1>
          <p className="text-lg text-gray-600">
            Important documents and policies regarding our services
          </p>
        </div>

        {/* Legal Documents Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {legalDocs.map((doc) => (
            <Link
              href={`/legal/${doc.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={doc.title}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <span className="text-4xl">{doc.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {doc.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{doc.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Last updated: {doc.lastUpdated}
                    </span>
                    <span className="text-green-600 flex items-center gap-2">
                      Read More
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-green-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Need Legal Assistance?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about our legal documents or policies, 
              our legal team is here to help.
            </p>
            <a 
              href="mailto:support@arkin.com"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 
                         text-white rounded-xl font-medium shadow-lg 
                         shadow-green-500/25 hover:shadow-xl 
                         hover:shadow-green-500/40 transition-all duration-300"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
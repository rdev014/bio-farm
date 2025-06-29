import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Help & Support | Arkin Organics",
  description: "Need assistance? Visit Arkin Organics Help Center for answers to frequently asked questions, support resources, and customer service contact information.",
};

// SVG for a subtle background pattern in the hero section
const SubtleWavesSVG = () => (
  <svg className="absolute inset-0 w-full h-full object-cover opacity-8" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="wave-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.005 0.001" numOctaves="1" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend mode="multiply" in="SourceGraphic" />
      </filter>
    </defs>
    <rect width="100" height="100" fill="#F8FDF9" filter="url(#wave-grain)" />
  </svg>
);

// SVG for a generic article placeholder icon
const ArticleIconSVG = () => (
  <svg className="h-6 w-6 text-green-600 group-hover:text-green-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// SVG for a generic category icon
const CategoryIconSVG = () => (
  <svg className="h-8 w-8 text-green-700 mb-3 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const App = () => {
  // Placeholder data for popular articles
  const popularArticles = [
    { id: 1, title: 'Getting Started with Arkin Organic Fertilizers', snippet: 'A comprehensive guide to help you begin your journey with our sustainable products.' },
    { id: 2, title: 'Understanding Soil Health & Nutrients', snippet: 'Learn how Arkin products contribute to a thriving soil microbiome.' },
    { id: 3, title: 'Seasonal Application Guide for Fertilizers', snippet: 'Best practices for applying our organic fertilizers throughout the year.' },
    { id: 4, title: 'Troubleshooting Common Plant Growth Issues', snippet: 'Solutions for enhancing plant vigor and overcoming growth challenges.' },
  ];

  // Placeholder data for support categories
  const categories = [
    { id: 1, name: 'Product Usage', description: 'Guides on how to use Arkin fertilizers effectively.' },
    { id: 2, name: 'Order & Shipping', description: 'Information regarding your purchases and delivery.' },
    { id: 3, name: 'Account Management', description: 'Help with your Arkin account settings and preferences.' },
    { id: 4, name: 'Sustainability & Values', description: 'Learn about our commitment to eco-friendly practices.' },
    { id: 5, name: 'Technical Support', description: 'Assistance with website or app functionalities.' },
    { id: 6, name: 'Partnerships & Wholesale', description: 'Information for businesses and bulk orders.' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900">
      {/* Hero Section: Search & Welcome */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white py-28 md:py-36">
        <SubtleWavesSVG />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-10">
            Find answers to your questions, explore guides, and get the support you need.
          </p>
          <div className="relative max-w-xl mx-auto shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <input
              type="text"
              placeholder="Search for articles or topics..."
              className="w-full pl-6 pr-16 py-4 text-lg rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            />
            <button className="absolute right-0 top-0 h-full w-16 bg-green-600 text-white flex items-center justify-center rounded-r-xl
                               hover:bg-green-700 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Popular Articles Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Popular Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10">
            {popularArticles.map((article) => (
              <a 
                key={article.id} 
                href="#" // Placeholder link
                className="group flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-100 
                           hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <ArticleIconSVG />
                  <h3 className="text-xl font-semibold text-gray-900 ml-3 group-hover:text-green-700 transition-colors">
                    {article.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  {article.snippet}
                </p>
                <span className="text-green-600 mt-4 self-start text-sm font-medium flex items-center gap-1 group-hover:underline">
                  Read More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((category) => (
              <a 
                key={category.id} 
                href="#" // Placeholder link
                className="group p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center
                           hover:shadow-xl hover:border-green-200 hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <CategoryIconSVG />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  {category.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-green-700 to-emerald-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Still Need Assistance?
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8">
            Our dedicated support team is here to help. Reach out directly for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#" // Placeholder link for contact page
              className="px-8 py-4 bg-white text-green-700 rounded-xl font-semibold shadow-lg
                         hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300
                         transition-colors duration-300 transform hover:-translate-y-1"
            >
              Contact Our Support
            </a>
            <a 
              href="#" // Placeholder link for FAQs or knowledge base
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold shadow-lg
                         hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white
                         transition-colors duration-300 transform hover:-translate-y-1"
            >
              Visit Our Knowledge Base
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;

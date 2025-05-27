'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems: FaqItem[] = [
    // Product Information
    {
      category: 'Products',
      question: 'What certifications do your organic fertilizers have?',
      answer: 'Our fertilizers are certified by USDA Organic, OMRI (Organic Materials Review Institute), and various international organic certification bodies. Each product undergoes rigorous testing to ensure it meets or exceeds organic farming standards.'
    },
    {
      category: 'Products',
      question: 'What makes your fertilizers organic?',
      answer: 'Our fertilizers are made from 100% natural ingredients, including composted plant matter, mineral rock powders, and beneficial microorganisms. We never use synthetic chemicals, GMOs, or artificial additives. Each batch is tested and certified by independent laboratories.'
    },
    {
      category: 'Products',
      question: 'How long do your products last?',
      answer: 'Our organic fertilizers have a shelf life of 2-3 years when stored properly in a cool, dry place away from direct sunlight. For optimal results, check the expiration date printed on each package. Once opened, we recommend using the product within 12 months.'
    },
    // Application & Usage
    {
      category: 'Usage',
      question: 'How should I apply your organic fertilizers?',
      answer: 'Application methods vary by product and crop type. Generally, our fertilizers can be applied directly to soil, used in drip irrigation systems, or as foliar sprays. Detailed application instructions are provided on each product label and in our comprehensive usage guides.'
    },
    {
      category: 'Usage',
      question: 'Can I use your products for indoor plants?',
      answer: 'Yes, many of our products are specifically formulated for indoor use. Our Indoor Plant Collection is designed to be odor-free and safe for home use, while providing optimal nutrition for houseplants.'
    },
    // Shipping & Delivery
    {
      category: 'Shipping',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times typically range from 5-15 business days depending on location. All international orders include tracking and insurance. Custom duties and taxes may apply based on your country.'
    },
    {
      category: 'Shipping',
      question: 'How do you handle bulk orders?',
      answer: 'For bulk orders exceeding 500kg, we offer special pricing and dedicated shipping arrangements. Please contact our bulk sales team for personalized quotes and logistics planning.'
    },
    // Technical Support
    {
      category: 'Support',
      question: 'How can I get technical support?',
      answer: 'Our agricultural experts are available Monday through Friday, 9am-5pm PST via email, phone, or live chat. For complex inquiries, we offer free consultation sessions with our certified agronomists.'
    },
    {
      category: 'Support',
      question: 'Do you provide soil testing services?',
      answer: 'Yes, we partner with accredited laboratories to offer comprehensive soil testing services. Our analysis includes nutrient levels, pH, organic matter content, and specific recommendations for our products.'
    },
    // Returns & Guarantees
    {
      category: 'Returns',
      question: 'What is your satisfaction guarantee?',
      answer: 'We offer a 30-day satisfaction guarantee on all products. If you\'re not completely satisfied, we\'ll provide a full refund or replacement. For commercial growers, we also offer performance guarantees based on soil test results.'
    },
    // Environment & Sustainability
    {
      category: 'Sustainability',
      question: 'How do your products impact the environment?',
      answer: 'Our products are designed with environmental sustainability in mind. We use biodegradable packaging, source ingredients locally where possible, and maintain carbon-neutral manufacturing processes. Our facilities run on 100% renewable energy.'
    },
    {
      category: 'Sustainability',
      question: 'Are your packaging materials recyclable?',
      answer: 'Yes, all our packaging is either recyclable or biodegradable. Our bags are made from post-consumer recycled materials, and we\'re transitioning to 100% compostable packaging by 2026.'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqItems.map(item => item.category)))];

  const filteredFaqs = faqItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => 
      searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[128px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find detailed answers to common questions about our organic products and services
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl transition-all duration-300
                ${activeCategory === category
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-green-600"
                  >
                    ▼
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: activeQuestion === index ? 'auto' : 0,
                    opacity: activeQuestion === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="/contact-us"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white 
                     rounded-xl font-medium shadow-lg shadow-green-500/25 
                     hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
          >
            Contact Our Experts
          </a>
        </motion.div>
      </div>
    </main>
  );
}

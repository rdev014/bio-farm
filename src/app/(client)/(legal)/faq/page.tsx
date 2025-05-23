'use client'
import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      category: 'Products',
      question: 'What makes your fertilizers organic?',
      answer: 'Our fertilizers are made from 100% natural ingredients, certified organic materials, and contain no synthetic chemicals. Each batch is tested and certified by independent laboratories.'
    },
    {
      category: 'Products',
      question: 'How long do your products last?',
      answer: 'Our organic fertilizers typically have a shelf life of 2 years when stored in a cool, dry place. We recommend checking the expiration date on the package for specific guidance.'
    },
    {
      category: 'Shipping',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping times and costs vary by location. You can calculate shipping costs at checkout.'
    },
    {
      category: 'Support',
      question: 'How can I get technical support?',
      answer: 'Our technical support team is available Monday through Friday, 9am-5pm PST. You can reach us via email, phone, or live chat on our website.'
    },
    {
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day satisfaction guarantee. If you are not completely satisfied with your purchase, you can return it for a full refund.'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqItems.map(item => item.category)))];

  const filteredFaqs = activeCategory === 'All' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[128px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform duration-300 
                  ${activeQuestion === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden
                  ${activeQuestion === index ? 'pb-6 max-h-40' : 'max-h-0'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white 
                         rounded-xl font-medium shadow-lg shadow-green-500/25 
                         hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
}

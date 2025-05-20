'use client';
import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 
                           bg-clip-text text-transparent">Bio-Farms</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            {['About', 'Products', 'FAQ', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-green-600 font-medium 
                         transition-colors duration-300 text-sm relative group"
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 scale-x-0 
                               group-hover:scale-x-100 transition-transform duration-300 
                               origin-left"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-2 px-4 py-2 
                             bg-gradient-to-r from-green-600 to-green-500 text-white 
                             rounded-lg hover:shadow-lg hover:shadow-green-500/25 
                             transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span>Cart (0)</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex items-center justify-center relative">
                <span className={`transform transition-all duration-300 flex w-5 h-0.5 bg-gray-600 absolute ${
                  isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                }`}></span>
                <span className={`transform transition-all duration-300 flex w-5 h-0.5 bg-gray-600 absolute ${
                  isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="flex flex-col space-y-4 px-2 pb-4">
            {['About', 'Products', 'FAQ', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-green-600 font-medium py-2 
                         transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <button className="flex items-center justify-center space-x-2 px-4 py-2 
                             bg-gradient-to-r from-green-600 to-green-500 text-white 
                             rounded-lg hover:shadow-lg transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span>Cart (0)</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

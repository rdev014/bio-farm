import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaLeaf } from 'react-icons/fa';

export default function Footer() {
    return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white px-6 py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-400 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-500 to-green-400 p-2.5 rounded-xl">
                <FaLeaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 
                             bg-clip-text text-transparent">Bio-Farms</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming agriculture through sustainable and organic solutions. 
              Join us in nurturing the earth for future generations.
            </p>
            <div className="flex gap-4">
              {[FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center 
                                             justify-center text-gray-400 hover:bg-green-500 
                                             hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Products', 'Sustainability', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors 
                                       duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 
                                   group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <p className="text-gray-400 flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>336 East Shewrapara,<br />Mirpur, Dhaka</span>
              </p>
              <p className="text-gray-400 flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contact@bio-farms.com</span>
              </p>
              <p className="text-gray-400 flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (234) 567-8900</span>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest news and offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 
                         text-gray-300 placeholder-gray-500 focus:outline-none 
                         focus:border-green-500 transition-colors"
              />
              <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 
                               to-green-500 text-white font-medium hover:shadow-lg 
                               hover:shadow-green-500/25 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row 
                       justify-between items-center gap-6 text-gray-400">
          <p>© {new Date().getFullYear()} Bio-Farms. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" 
                 className="hover:text-green-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

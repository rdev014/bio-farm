import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaLeaf,
} from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Our Farms", href: "/our-farms" },
    { name: "Sustainability", href: "/sustainability" },
  ];
  const knowMore = [
    { name: "Blog", href: "/blogs" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" },
    { name: "Contact Us", href: "/contact-us" },
  ];
  const legalLinks = [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Support", href: "/support" },
  ];

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
              <span
                className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-300 
                             bg-clip-text text-transparent"
              >
                Arkin
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming agriculture through sustainable and organic
              solutions. Join us in nurturing the earth for future generations.
            </p>
            <div className="flex gap-4">
              {[FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center 
                                             justify-center text-gray-400 hover:bg-green-500 
                                             hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors 
                             duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 
                                   group-hover:opacity-100 transition-opacity"
                    ></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
         <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Know More
            </h4>
            <ul className="space-y-4">
              {knowMore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors 
                             duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-0 
                                   group-hover:opacity-100 transition-opacity"
                    ></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Newsletter
            </h4>
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
              <button
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 
                               to-green-500 text-white font-medium hover:shadow-lg 
                               hover:shadow-green-500/25 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row 
                       justify-between items-center gap-6 text-gray-400"
        >
          <p>© {new Date().getFullYear()} Arkin-\Organics. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
export default function Footer() {
    return (
    <footer className="bg-black text-white px-6 py-10 md:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo and Navigation */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            {/* Logo placeholder */}
            <div className="bg-white text-black rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 4L3 14h7v6l10-10h-7V4z" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-gray-400 mb-3 font-medium">Social Media</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-gray-400 mb-3 font-medium">Contact Info</h4>
          <p className="text-sm text-gray-300 mb-2">+88032423423423523</p>
          <p className="text-sm text-gray-300">hello@fibostudio.com</p>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-gray-400 mb-3 font-medium">Address</h4>
          <p className="text-sm text-gray-300">
            336 East Shewrapara, Mirpur,<br />
            Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="mt-16 text-center">
        <h1 className="text-[10vw] sm:text-[7vw] md:text-[5vw] font-bold text-gray-800 tracking-tight">
          Eco-Friendly Fertilizer
        </h1>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <p>2025 Bio-Farms, All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Services</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

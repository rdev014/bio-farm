import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
export default function Footer() {
    return (
    <footer className="bg-white text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* BioFarm Logo and Tagline */}
        <div>
          <h1 className="text-2xl font-bold">Bio-Farm</h1>
          <p className="mt-2 text-sm text-gray-700">
            Natural. Sustainable. Global.  
            Premium organic fertilizers for the modern farm.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-black hover:underline">Home</a></li>
            <li><a href="#" className="hover:text-black hover:underline">About Us</a></li>
            <li><a href="#" className="hover:text-black hover:underline">Products</a></li>
            <li><a href="#" className="hover:text-black hover:underline">Blog</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p className="text-sm text-gray-700">Email: support@biofarm.com</p>
          <p className="text-sm text-gray-700">Phone: +91 98765 43210</p>
          <p className="text-sm text-gray-700">Kangra, Himachal Pradesh, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 mt-2 text-gray-700">
            <a href="#" aria-label="Facebook" className="hover:text-black"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-black"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-black"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-black"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} BioFarm. All rights reserved.
      </div>
    </footer>
  );
}

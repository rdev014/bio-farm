'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-green-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/plant.png"
            alt="404 Illustration"
            width={200}
            height={200}
            className="mx-auto mb-8 drop-shadow-xl"
            priority
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for seems to have wandered off to greener pastures.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 
                     text-white font-medium rounded-xl hover:from-green-700 hover:to-emerald-700 
                     transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Homepage
          </Link>

          <div className="mt-12 grid grid-cols-2 gap-6 text-center">
            <Link 
              href="/products"
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 
                       border border-gray-100 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Browse Products
              </h3>
              <p className="text-gray-600">Explore our organic farming products</p>
            </Link>

            <Link 
              href="/blogs"
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 
                       border border-gray-100 group"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Read Our Blog
              </h3>
              <p className="text-gray-600">Learn about sustainable farming</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
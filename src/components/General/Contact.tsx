'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  const supportEmail = 'support@arkinorganics.com'; 

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
            <Mail className="w-10 h-10" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
        >
          Need Assistance?
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-700 mb-10 max-w-md mx-auto leading-relaxed"
        >
          For direct inquiries and support, please reach out to us via email. We&apos;re here to help.
        </motion.p>

        <motion.a
          variants={itemVariants}
          href={`mailto:${supportEmail}`}
          className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold text-xl
                     shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40
                     transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label={`Email us at ${supportEmail}`}
        >
          <Mail className="w-6 h-6 mr-3" />
          {supportEmail}
        </motion.a>

        <motion.p
          variants={itemVariants}
          className="text-center mt-10 text-sm text-gray-500"
        >
          Our team typically responds within 1-2 business days.
        </motion.p>
      </motion.div>
    </main>
  );
}
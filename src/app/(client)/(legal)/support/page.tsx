'use client';

import React from "react";
import Link from "next/link";
import { FaQuestionCircle, FaEnvelope, FaBookOpen, FaUsers, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Keeping motion for subtle, modern animations

// SVG Illustration Component (Example - replace with your actual SVG imports)
// For a real project, you'd have these in a dedicated SVG or Assets folder
const SupportIllustration = () => (
  <svg
    className="w-full h-auto max-w-lg mx-auto"
    viewBox="0 0 500 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Simplified abstract shapes representing communication/support */}
    <motion.path
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M50 150 C 150 50, 350 50, 450 150"
      stroke="#4CAF50"
      strokeWidth="10"
      strokeLinecap="round"
      strokeDasharray="0 1" // For pathLength animation
    />
    <motion.circle
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      cx="100"
      cy="150"
      r="40"
      fill="#81C784"
    />
    <motion.circle
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
      cx="400"
      cy="150"
      r="40"
      fill="#66BB6A"
    />
    <motion.rect
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
      x="175"
      y="100"
      width="150"
      height="100"
      rx="20"
      ry="20"
      fill="#388E3C"
    />
    {/* Mail icon inside the rectangle */}
    <motion.path
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      d="M200 125 L250 160 L300 125 M200 125 L200 175 L300 175 L300 125"
      stroke="#E8F5E9"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


export default function SupportPage() {
  const supportOptions = [
    {
      icon: FaQuestionCircle,
      title: "FAQs",
      description: "Find quick answers to common questions.",
      link: "/faqs",
    },
    {
      icon: FaBookOpen,
      title: "Knowledge Base",
      description: "Explore our extensive library of articles.",
      link: "/kb",
    },
    {
      icon: FaUsers,
      title: "Community Forum",
      description: "Connect with fellow users and experts.",
      link: "/community",
    },
  ];

  // Animation variants for section titles and main content
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex flex-col items-center overflow-x-hidden">

      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 text-center relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#d4d4d4" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <motion.div
          className="max-w-4xl mx-auto px-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          {/* Subtle Brand Integration */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6 opacity-80">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center shadow-md">
              {/* Using a simple div for a clean leaf shape, or you could import an SVG leaf */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.0827 21.8741 10.187 21.6293 9.32427C21.603 9.24354 21.5765 9.16386 21.55 9.0837C21.5033 8.94071 21.4552 8.79815 21.4063 8.65609C21.3653 8.53503 21.3235 8.41434 21.2809 8.29402C21.2263 8.14083 21.1706 7.98808 21.1141 7.83582C21.0772 7.73484 21.0396 7.63406 21.0013 7.53351C20.9419 7.37568 20.8811 7.21808 20.8197 7.06076C20.7719 6.93774 20.7234 6.81489 20.6744 6.6922C20.6212 6.56067 20.5674 6.42929 20.513 6.29809C20.4678 6.18606 20.4221 6.07412 20.3759 5.96229C20.3195 5.82348 20.2625 5.68481 20.2049 5.54629C20.1601 5.43719 20.1147 5.32815 20.0688 5.21921C20.0076 5.08053 19.9458 4.94196 19.8835 4.80351C19.8329 4.68962 19.7818 4.57582 19.7303 4.46215C19.6644 4.31682 19.598 4.17158 19.531 4.02646C19.4856 3.92138 19.4398 3.81636 19.3936 3.71141C19.3308 3.57018 19.2674 3.42903 19.2035 3.28797C19.1481 3.17849 19.0922 3.06909 19.0359 2.95977C18.9719 2.83517 18.9075 2.71066 18.8425 2.58623C18.7909 2.49303 18.739 2.39991 18.6865 2.30687C18.6272 2.20144 18.5674 2.09608 18.5071 1.99081C18.4552 1.9016 18.403 1.81248 18.3503 1.72344C18.2917 1.62187 18.2325 1.52037 18.1729 1.41897C18.1257 1.33649 18.0782 1.25408 18.0302 1.17175C17.9622 1.05608 17.8938 0.940523 17.8249 0.825081C17.769 0.732952 17.7126 0.640899 17.6559 0.548924C17.5932 0.448578 17.5301 0.348278 17.4667 0.248025L17.4667 0.248025C17.3822 0.117188 17.2974 0.00762939 17.2122 0.00762939C17.1517 0.00762939 17.0911 0.00762939 17.0305 0.00762939C16.9406 0.00762939 16.8507 0.00762939 16.7607 0.00762939C16.6976 0.00762939 16.6346 0.00762939 16.5715 0.00762939C16.4862 0.00762939 16.4009 0.00762939 16.3156 0.00762939C16.2731 0.00762939 16.2306 0.00762939 16.1881 0.00762939C16.1264 0.00762939 16.0647 0.00762939 16.003 0.00762939C15.9085 0.00762939 15.814 0.00762939 15.7196 0.00762939C15.658 0.00762939 15.5964 0.00762939 15.5348 0.00762939C15.4495 0.00762939 15.3643 0.00762939 15.279 0.00762939C15.2365 0.00762939 15.194 0.00762939 15.1515 0.00762939C15.0899 0.00762939 15.0284 0.00762939 14.9668 0.00762939C14.8816 0.00762939 14.7963 0.00762939 14.7111 0.00762939C14.6496 0.00762939 14.5881 0.00762939 14.5266 0.00762939C14.4414 0.00762939 14.3562 0.00762939 14.271 0.00762939C14.2285 0.00762939 14.186 0.00762939 14.1435 0.00762939C14.082 0.00762939 14.0205 0.00762939 13.959 0.00762939C13.8738 0.00762939 13.7886 0.00762939 13.7034 0.00762939C13.6419 0.00762939 13.5804 0.00762939 13.5189 0.00762939C13.4337 0.00762939 13.3485 0.00762939 13.2633 0.00762939C13.2208 0.00762939 13.1783 0.00762939 13.1358 0.00762939C13.0743 0.00762939 13.0128 0.00762939 12.9513 0.00762939C12.8661 0.00762939 12.7809 0.00762939 12.6957 0.00762939C12.6342 0.00762939 12.5727 0.00762939 12.5112 0.00762939C12.426 0.00762939 12.3408 0.00762939 12.2556 0.00762939C12.1941 0.00762939 12.1326 0.00762939 12.0711 0.00762939C11.9859 0.00762939 11.9007 0.00762939 11.8155 0.00762939C11.754 0.00762939 11.6925 0.00762939 11.631 0.00762939C11.5458 0.00762939 11.4606 0.00762939 11.3754 0.00762939C11.3329 0.00762939 11.2904 0.00762939 11.2479 0.00762939C11.1864 0.00762939 11.1249 0.00762939 11.0634 0.00762939C10.9782 0.00762939 10.893 0.00762939 10.8078 0.00762939C10.7463 0.00762939 10.6848 0.00762939 10.6233 0.00762939C10.5381 0.00762939 10.4529 0.00762939 10.3677 0.00762939C10.3252 0.00762939 10.2827 0.00762939 10.2402 0.00762939C10.1787 0.00762939 10.1172 0.00762939 10.0557 0.00762939C9.9705 0.00762939 9.8853 0.00762939 9.8001 0.00762939C9.7386 0.00762939 9.6771 0.00762939 9.6156 0.00762939C9.5304 0.00762939 9.4452 0.00762939 9.36 0.00762939C9.3175 0.00762939 9.275 0.00762939 9.2325 0.00762939C9.171 0.00762939 9.1095 0.00762939 9.048 0.00762939C8.9628 0.00762939 8.8776 0.00762939 8.7924 0.00762939C8.7309 0.00762939 8.6694 0.00762939 8.6079 0.00762939C8.5227 0.00762939 8.4375 0.00762939 8.3523 0.00762939C8.3117 0.00762939 8.2711 0.00762939 8.2305 0.00762939C8.169 0.00762939 8.1075 0.00762939 8.046 0.00762939C7.9608 0.00762939 7.8756 0.00762939 7.7904 0.00762939C7.7289 0.00762939 7.6674 0.00762939 7.6059 0.00762939C7.5207 0.00762939 7.4355 0.00762939 7.3503 0.00762939C7.3078 0.00762939 7.2653 0.00762939 7.2228 0.00762939C7.1613 0.00762939 7.0998 0.00762939 7.0383 0.00762939C6.9531 0.00762939 6.8679 0.00762939 6.7827 0.00762939C6.7212 0.00762939 6.6597 0.00762939 6.5982 0.00762939C6.513 0.00762939 6.4278 0.00762939 6.3426 0.00762939C6.3001 0.00762939 6.2576 0.00762939 6.2151 0.00762939C6.1536 0.00762939 6.0921 0.00762939 6.0306 0.00762939C5.9454 0.00762939 5.8602 0.00762939 5.775 0.00762939C5.7135 0.00762939 5.652 0.00762939 5.5905 0.00762939C5.5053 0.00762939 5.4201 0.00762939 5.3349 0.00762939C5.2924 0.00762939 5.2499 0.00762939 5.2074 0.00762939C5.1459 0.00762939 5.0844 0.00762939 5.0229 0.00762939C4.9377 0.00762939 4.8525 0.00762939 4.7673 0.00762939C4.7058 0.00762939 4.6443 0.00762939 4.5828 0.00762939C4.4976 0.00762939 4.4124 0.00762939 4.3272 0.00762939C4.2847 0.00762939 4.2422 0.00762939 4.1997 0.00762939C4.1382 0.00762939 4.0767 0.00762939 4.0152 0.00762939C3.9299 0.00762939 3.8447 0.00762939 3.7595 0.00762939C3.698 0.00762939 3.6365 0.00762939 3.575 0.00762939C3.4898 0.00762939 3.4046 0.00762939 3.3194 0.00762939C3.2769 0.00762939 3.2344 0.00762939 3.1919 0.00762939C3.1304 0.00762939 3.0689 0.00762939 3.0074 0.00762939C2.9222 0.00762939 2.837 0.00762939 2.7518 0.00762939C2.6903 0.00762939 2.6288 0.00762939 2.5673 0.00762939C2.4821 0.00762939 2.3969 0.00762939 2.3117 0.00762939C2.2692 0.00762939 2.2267 0.00762939 2.1842 0.00762939C2.1227 0.00762939 2.0612 0.00762939 1.9997 0.00762939C1.9145 0.00762939 1.8293 0.00762939 1.7441 0.00762939C1.6826 0.00762939 1.6211 0.00762939 1.5596 0.00762939C1.4744 0.00762939 1.3892 0.00762939 1.304 0.00762939C1.2615 0.00762939 1.219 0.00762939 1.1765 0.00762939C1.115 0.00762939 1.0535 0.00762939 0.992 0.00762939C0.9068 0.00762939 0.8216 0.00762939 0.7364 0.00762939C0.6749 0.00762939 0.6134 0.00762939 0.5519 0.00762939C0.4667 0.00762939 0.3815 0.00762939 0.2963 0.00762939C0.2538 0.00762939 0.2113 0.00762939 0.1688 0.00762939C0.1073 0.00762939 0.0458 0.00762939 0.0033 0.00762939C0.0011 0.00762939 0 0.00762939 0 0.00762939Z" fill="white"/>
              </svg>
            </div>
            <span className="text-gray-700 text-xl font-bold tracking-tight">Arkin</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5 drop-shadow-sm"
          >
            Need Help? We&apos;re Here.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Find quick answers, explore our resources, or reach out directly to our dedicated support team.
          </motion.p>
          <motion.div variants={itemVariants}>
            <a
              href="#email-contact"
              className="inline-flex items-center px-10 py-4 rounded-full bg-green-600 text-white font-semibold text-lg
                        shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Contact Support <FaArrowRight className="ml-3 text-white/90" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Support Options Section */}
      <section className="w-full py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gray-50 border-t border-gray-100">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14"
          >
            Explore Our Comprehensive Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {supportOptions.map((option, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={option.link}
                  className="group bg-white rounded-xl p-7 flex flex-col items-center text-center space-y-4
                             border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-green-300"
                >
                  <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                    <option.icon className="text-green-600 text-3xl group-hover:text-green-700 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-800 group-hover:text-green-800 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-base">{option.description}</p>
                  <FaArrowRight className="text-green-500 group-hover:text-green-700 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Direct Email Contact Section (Replaces the form) */}
      <section id="email-contact" className="w-full bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 border-t border-gray-100">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <SupportIllustration /> {/* Custom SVG illustration */}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Reach Out Directly
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            For any specific inquiries, feedback, or assistance, our support team is ready to help.
            Feel free to send us an email, and we&apos;ll get back to you promptly.
          </motion.p>

          <motion.a
            variants={itemVariants}
            href="mailto:support@arkin.com" // Replace with your actual email
            className="inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-xl
                       shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40
                       transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaEnvelope className="mr-4 text-white text-2xl" />
            support@arkin.com
          </motion.a>

          <motion.p
            variants={itemVariants}
            className="text-center mt-12 text-sm text-gray-500"
          >
            Our team typically responds within 1-2 business days.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
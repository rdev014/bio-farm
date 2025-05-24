"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.97]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.7 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
    },
  };
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-tr from-green-50 via-white to-yellow-50 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/50 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-100/50 rounded-full blur-[128px] animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-50/30 rounded-full blur-[96px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200">
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-800 font-medium text-sm tracking-wider">
                  Eco-Friendly Solutions
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  Nature's Best
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                    Organic Fertilizer
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600/90 max-w-xl">
                  Transform your garden with our premium organic fertilizers.
                  Made from 100% recycled food waste, supporting both your
                  plants and our planet's future.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 
                                 text-white rounded-xl font-medium shadow-lg shadow-green-500/25
                                 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 
                                 flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">Shop Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    />
                  </svg>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 
                                transform scale-x-0 group-hover:scale-x-100 transition-transform 
                                origin-left duration-300"
                  ></div>
                </button>

                <button
                  className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-xl 
                                 font-medium hover:bg-gray-800 hover:text-white transition-all
                                 duration-300 hover:shadow-xl"
                >
                  Learn More
                </button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    15K+
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Happy Customers
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    100%
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Organic
                  </p>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    4.9/5
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Customer Rating
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Right Content */}
            <div className="relative lg:h-[600px]">
              <div className="relative h-full rounded-2xl overflow-hidden group">
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                              group-hover:from-black/30 transition-all duration-300"
                ></div>
                <img
                  src="https://media.istockphoto.com/id/684977254/photo/farmer-hand-giving-plant-organic-humus-fertilizer-to-plant.jpg?s=612x612&w=0&k=20&c=SjD1diUDXEBmXRF1My6lDdwV9BGpPTD1yWUCwz8235U="
                  alt="Organic Fertilizer Product"
                  className="object-cover w-full h-full rounded-2xl transform 
                           group-hover:scale-105 transition-transform duration-700"
                />

                {/* Enhanced Feature Cards */}
                <div
                  className="absolute -right-4 top-10 bg-white/90 backdrop-blur-sm p-4 rounded-xl 
                              shadow-xl hover:shadow-2xl transition-all duration-300 transform 
                              hover:scale-105 hover:-translate-x-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🌱</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        100% Organic
                      </p>
                      <p className="text-sm text-gray-600">Eco-certified</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -left-6 bottom-10 bg-white/90 backdrop-blur-sm p-4 
                              rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                              transform hover:scale-105 hover:translate-x-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">♻️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Zero Waste</p>
                      <p className="text-sm text-gray-600">100% Recycled</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">
              Sustainable Growth, Naturally
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Combining eco-conscious practices with innovative solutions for
              thriving gardens.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                title: "Eco-Friendly Farming",
                icon: "🌱",
                description: "Sustainable practices that nurture the earth.",
              },
              {
                title: "Innovative Technology",
                icon: "🔬",
                description: "Advanced solutions for optimal growth.",
              },
              {
                title: "Premium Quality",
                icon: "✨",
                description: "Rigorous testing for top-tier results.",
              },
              {
                title: "Zero Waste",
                icon: "♻️",
                description: "Closed-loop systems for sustainability.",
              },
              {
                title: "Community Support",
                icon: "🌍",
                description: "Empowering farmers globally.",
              },
              {
                title: "Research-Driven",
                icon: "📊",
                description: "Innovating through science.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 16px rgba(0, 128, 64, 0.1)",
                }}
                className="p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 group transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-lg sm:text-xl mb-3 sm:mb-4 text-emerald-600"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16"
          >
            <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">
              From Soil to Success
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              A seamless, eco-friendly journey from cultivation to your garden.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-200 transform -translate-y-1/2 hidden lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {[
                {
                  step: "01",
                  title: "Sustainable Sourcing",
                  description: "Organic materials, responsibly sourced.",
                  icon: "🌾",
                },
                {
                  step: "02",
                  title: "Quality Assurance",
                  description: "Rigorous testing for excellence.",
                  icon: "🔍",
                },
                {
                  step: "03",
                  title: "Eco Packaging",
                  description: "Biodegradable, sustainable packaging.",
                  icon: "📦",
                },
                {
                  step: "04",
                  title: "Swift Delivery",
                  description: "Fast, eco-conscious delivery.",
                  icon: "🚚",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md border border-gray-100">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-lg sm:text-xl text-white mb-3 sm:mb-4"
                    >
                      {step.icon}
                    </motion.div>
                    <span className="text-3xl sm:text-4xl font-bold text-emerald-100 absolute top-4 right-4">
                      {step.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-emerald-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16"
          >
            <div>
              <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">
                Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2 tracking-tight">
                Eco-Friendly Solutions
              </h2>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {["all", "organic", "new"].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-emerald-600 text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              {
                name: "Premium Organic Fertilizer",
                price: 29.99,
                original: 39.99,
                image: "/products/product-1.jpg",
                tag: "New Arrival",
              },
              {
                name: "Eco-Grow Compost",
                price: 24.99,
                original: 34.99,
                image: "/products/product-2.jpg",
                tag: "Best Seller",
              },
              {
                name: "Natural Soil Enhancer",
                price: 34.99,
                original: 44.99,
                image: "/products/product-3.jpg",
                tag: "Organic",
              },
            ]
              .filter(
                (item) =>
                  activeFilter === "all" ||
                  item.tag.toLowerCase().includes(activeFilter)
              )
              .map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 16px rgba(0, 128, 64, 0.1)",
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
                >
                  <div className="relative h-48 sm:h-60 lg:h-72">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"
                      initial={{ opacity: 0.2 }}
                      whileHover={{ opacity: 0.4 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 sm:px-3 py-1 bg-emerald-600 text-white text-xs sm:text-sm rounded-full font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs sm:text-sm text-emerald-600 font-medium">
                        Organic
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-xs sm:text-sm text-gray-600">
                        In Stock
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4">
                      Enhanced with natural minerals for optimal plant growth.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          ${item.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 ml-2 line-through">
                          ${item.original}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        Add to Cart
                        <svg
                          className="w-4 sm:w-5 h-4 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">
                Greening the Future
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our sustainable practices empower communities and transform
                agriculture for a healthier planet.
              </p>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
              >
                {[
                  { number: "2M+", label: "Trees Planted" },
                  { number: "100K+", label: "Farmers Supported" },
                  { number: "100%", label: "Organic Certified" },
                  { number: "50+", label: "Countries Reached" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 sm:p-6 bg-emerald-50 rounded-2xl"
                  >
                    <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                      {stat.number}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
            >
              {/* <Image
                src="/impact.jpg"
                alt="Our Impact"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              /> */}              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              >
                <source src="https://videos.pexels.com/video-files/30876559/13202358_1920_1080_24fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"
                initial={{ opacity: 0.3 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 bg-white/90 backdrop-blur-sm rounded-xl"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  Sustainability First
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Every purchase supports a greener planet.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied customers who trust our organic
              solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-8 bg-green-50 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-200 rounded-full overflow-hidden">
                    <img
                      src={`/avatar-${item}.jpg`}
                      alt="Customer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Customer Name
                    </h4>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Amazing results with this organic fertilizer! My plants have
                  never looked better."
                </p>
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Green Community
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Subscribe to receive gardening tips and exclusive offers
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 
                         focus:ring-green-400"
              />
              <button
                className="px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 
                               transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

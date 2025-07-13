"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Sun, Recycle, Wind, TreePine, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface Initiative {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface Process {
  step: string;
  title: string;
  description: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Sustainability() {
  const stats: Stat[] = [
    { value: '80%', label: 'Carbon Reduction', icon: <Recycle className="w-8 h-8" /> },
    { value: '100%', label: 'Organic Materials', icon: <Leaf className="w-8 h-8" /> },
    { value: '50K+', label: 'Trees Planted', icon: <TreePine className="w-8 h-8" /> },
    { value: '0%', label: 'Chemical Waste', icon: <Wind className="w-8 h-8" /> }
  ];

  const initiatives: Initiative[] = [
    {
      title: 'Zero Waste Production',
      icon: <Recycle className="w-8 h-8" />,
      description: 'Converting 100% of organic waste into valuable fertilizer',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Renewable Energy',
      icon: <Sun className="w-8 h-8" />,
      description: 'Powered by solar and wind energy across all facilities',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Water Conservation',
      icon: <Droplet className="w-8 h-8" />,
      description: 'Advanced irrigation systems reducing water usage by 60%',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const processes: Process[] = [
    {
      step: '01',
      title: 'Organic Waste Collection',
      description: 'Systematic collection and sorting of organic materials'
    },
    {
      step: '02',
      title: 'Natural Decomposition',
      description: 'Controlled environment for optimal decomposition'
    },
    {
      step: '03',
      title: 'Quality Testing',
      description: 'Rigorous testing to ensure highest quality standards'
    },
    {
      step: '04',
      title: 'Eco-Friendly Packaging',
      description: 'Sustainable packaging solutions for minimal impact'
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-900 via-emerald-900 to-green-800">
        <div className="absolute inset-0">
          <Image
            src="/organic.png"
            alt="Sustainable Farming"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/80 to-emerald-900/90"></div>
          {/* Animated SVG Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="eco-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M0,5 Q2.5,2.5 5,5 T10,5" stroke="currentColor" fill="none" className="text-white"/>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#eco-pattern)"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Eco-Friendly Farming</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Cultivating a</span>
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
                Sustainable Future
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-200 mb-12 leading-relaxed"
            >
              Pioneering environmental stewardship through innovative agricultural practices 
              and unwavering commitment to our planet&apos;s future.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <a href="/about-us" className="no-underline">
                <motion.button 
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white 
                           rounded-xl font-semibold hover:bg-green-500 transition-all duration-300 
                           shadow-lg hover:shadow-green-500/30 tracking-wide text-lg"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </motion.button>
              </a>
              <a href="/sustainability-report.pdf" download className="no-underline">
                <motion.button 
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm 
                           text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 
                           border border-white/30 tracking-wide text-lg"
                >
                  Download Impact Report
                  <Download className="w-5 h-5 transform transition-transform group-hover:translate-y-1" />
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaf-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,0 Q15,10 20,10 T30,10" stroke="currentColor" fill="none" className="text-green-900"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern)"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="text-center p-8 rounded-2xl bg-green-50/50 border border-green-100 
                             hover:bg-white hover:shadow-xl hover:border-green-200 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl 
                               bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <p className="text-4xl font-bold text-green-600 mb-2 group-hover:text-green-500 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="eco-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-green-900"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#eco-dots)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-6"
            >
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Our Impact</span>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Sustainable Initiatives That
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                Make a Difference
              </span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600"
            >
              Discover how we&apos;re implementing innovative solutions to create a more sustainable future
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {initiatives.map((initiative) => (
              <motion.div
                key={initiative.title}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl 
                         transition-all duration-300 border border-gray-100"
              >
                <div className={`absolute inset-x-0 -top-px h-1 rounded-t-2xl bg-gradient-to-r ${initiative.color}`}></div>
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl 
                                text-white bg-gradient-to-br ${initiative.color} group-hover:scale-110 
                                transition-transform duration-300`}>
                    {initiative.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600">
                    {initiative.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-6">
                <TreePine className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Our Process</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Sustainable Process
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                  From Start to Finish
                </span>
              </h2>

              <div className="space-y-8">
                {processes.map((process) => (
                  <motion.div
                    key={process.step}
                    variants={fadeInUp}
                    className="group flex gap-6 items-start"
                  >
                    <span className="text-5xl font-bold bg-gradient-to-br from-green-200 to-green-300 
                                 bg-clip-text text-transparent group-hover:from-green-400 
                                 group-hover:to-emerald-400 transition-all duration-300">
                      {process.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="/organic2.png"
                  alt="Our Sustainable Process"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/50 to-transparent"></div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full blur-2xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full blur-2xl opacity-50"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 relative overflow-hidden">
        {/* SVG Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="leaf-pattern-cta" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20L20 0Z M15 20L20 15L25 20L20 25Z" 
                    fill="currentColor" className="text-white" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf-pattern-cta)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 
                       backdrop-blur-sm border border-white/20 mb-6"
            >
              <Download className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium text-white">Download Report</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp} 
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-2xl"
            >
              Join Us in Creating a
              <span className="block text-green-400">Sustainable Tomorrow</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-200 mb-12 max-w-2xl"
            >
              Download our comprehensive sustainability report and discover how we&apos;re 
              making a positive impact on the environment.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link href="/sustainability-report.pdf" download className="no-underline">
                <motion.button
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 
                           rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 
                           shadow-xl hover:shadow-2xl tracking-wide text-lg border border-green-100"
                >
                  Download Sustainability Report
                  <Download className="w-5 h-5 transform transition-transform group-hover:translate-y-1" />
                </motion.button>
              </Link>
              <Link href="/blogs" className="no-underline">
                <motion.button
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl 
                           font-semibold border-2 border-white/30 text-white hover:bg-white/10 
                           transition-all duration-300 tracking-wide text-lg"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

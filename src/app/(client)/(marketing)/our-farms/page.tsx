"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Droplet, Sun, Leaf, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Stat {
  value: string;
  label: string;
}

interface Farm {
  id: number;
  name: string;
  location: string;
  image: string;
  acreage: string;
  tags: string[];
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
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

export default function OurFarms() {
  const stats: Stat[] = [
    { value: '12+', label: 'Farm Locations' },
    { value: '5000+', label: 'Acres Cultivated' },
    { value: '100%', label: 'Organic Certified' }
  ];

  const farms: Farm[] = [
    {
      id: 1,
      name: "Emerald Valley Estate",
      location: "California, USA",
      image: "/organic.png",
      acreage: "850 acres",
      tags: ["Organic Crops", "Sustainable", "Solar Powered"]
    },
    {
      id: 2,
      name: "Green Meadows Farm",
      location: "Oregon, USA",
      image: "/organic2.png",
      acreage: "720 acres",
      tags: ["Hydroponics", "Renewable Energy"]
    },
    {
      id: 3,
      name: "Sunrise Fields",
      location: "Washington, USA",
      image: "/organic3.jpeg",
      acreage: "950 acres",
      tags: ["Smart Irrigation", "Organic"]
    },
    {
      id: 4,
      name: "Highland Organics",
      location: "Colorado, USA",
      image: "/organic.png",
      acreage: "680 acres",
      tags: ["High Altitude", "Specialty Crops"]
    },
    {
      id: 5,
      name: "Coastal Gardens",
      location: "Florida, USA",
      image: "/organic2.png",
      acreage: "560 acres",
      tags: ["Tropical", "Sustainable"]
    },
    {
      id: 6,
      name: "Prairie Wind Farm",
      location: "Iowa, USA",
      image: "/organic3.jpeg",
      acreage: "1200 acres",
      tags: ["Wind Powered", "Grain Crops"]
    }
  ];

  const features: Feature[] = [
    {
      title: "Smart Irrigation",
      description: "AI-powered water management system optimizing resource usage",
      icon: <Droplet className="w-6 h-6" />,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Solar Integration",
      description: "100% renewable energy powering all farm operations",
      icon: <Sun className="w-6 h-6" />,
      color: "text-amber-600 bg-amber-100"
    },
    {
      title: "Crop Rotation",
      description: "Scientific soil management for optimal yields",
      icon: <Leaf className="w-6 h-6" />,
      color: "text-green-600 bg-green-100"
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/organic.png"
            alt="Our Organic Farms"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl text-white"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium">Pioneering Sustainable Agriculture</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Where Nature Meets
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
                Innovation
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-200 mb-8 leading-relaxed"
            >
              Discover our network of sustainable farms, where cutting-edge technology 
              meets traditional farming wisdom to create a greener future.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <p className="text-4xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Farms Grid Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-6">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Our Locations</span>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Sustainable Farms Across
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                The Country
              </span>
            </motion.h2>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600"
            >
              Each farm is strategically located and meticulously maintained to ensure 
              optimal growing conditions and the highest quality organic produce.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {farms.map((farm) => (
              <motion.div
                key={farm.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={farm.image}
                    alt={farm.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                                opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{farm.name}</h3>
                      <div className="flex items-center gap-2 text-gray-200">
                        <MapPin className="w-4 h-4" />
                        <p className="text-sm">{farm.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                      <Leaf className="w-4 h-4" />
                      <p className="text-sm">{farm.acreage}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {farm.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full 
                                   text-white text-sm border border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full px-4 py-2 mt-4 bg-white/10 backdrop-blur-sm rounded-lg
                                     text-white border border-white/20 hover:bg-white/20 transition-all
                                     flex items-center justify-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                State-of-the-Art Farming
              </h2>
              <div className="space-y-8">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/farming-tech.jpg"
                alt="Farming Technology"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 relative overflow-hidden">
        {/* Decorative SVG Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none">
            <pattern id="farm-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0L40 20L20 40L0 20L20 0Z M15 20L20 15L25 20L20 25Z" 
                    fill="currentColor" className="text-white" />
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#farm-pattern)" />
          </svg>
        </div>

        {/* Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="lg:flex items-center justify-between gap-12">
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2 mb-12 lg:mb-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <Calendar className="w-4 h-4 text-green-300" />
                <span className="text-sm font-medium text-white">Book Your Visit</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Experience Sustainable
                <span className="block">Farming First-hand</span>
              </h2>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                Join our guided tours and witness sustainable farming practices in action. 
                Learn about our methods and see how we're shaping the future of agriculture.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 
                           rounded-xl font-medium hover:bg-green-50 transition-all duration-300 
                           shadow-xl hover:shadow-2xl"
                >
                  Schedule a Tour
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button 
                  whileHover={{ y: -4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl 
                           font-medium border-2 border-white/30 text-white hover:bg-white/10 
                           transition-all duration-300"
                >
                  Virtual Tour
                  <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>
                
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-8">
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-white mb-2">1.2K+</div>
                      <div className="text-white/80">Monthly Visitors</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-white mb-2">98%</div>
                      <div className="text-white/80">Satisfaction Rate</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-white mb-2">45+</div>
                      <div className="text-white/80">Tour Guides</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ y: -4 }}
                      className="text-center"
                    >
                      <div className="text-4xl font-bold text-white mb-2">12+</div>
                      <div className="text-white/80">Farm Locations</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

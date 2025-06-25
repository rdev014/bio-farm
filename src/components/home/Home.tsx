"use client";

import {
  motion
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Leaf, CircuitBoard, Award, Globe, FlaskConical, HeadsetIcon, 
 Calculator, NewspaperIcon, ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  lightColor: string;
}



interface Product {
  title: string;
  description: string;
  image: string;
  price: string;
  badge: string;
  badgeColor: string;
}

interface ImpactStat {
  number: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface Author {
  name: string;
  image: string | null;
}

interface SEO {
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Author;
  featuredImage: string;
  categories: string[];
  tags: string[];
  readTime: number;
  publishedAt: string;
  updatedAt: string;
  status: string; // Consider making this 'draft' | 'publish' for strictness
  seo: SEO;
}

interface BlogProps {
  blogs: BlogPost[];
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const publishDate = new Date(dateString);
  const diffInDays = Math.floor(
    (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(dateString);
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home({ blogs }: BlogProps) {
  const [landSize, setLandSize] = useState<number>(0);
  const [cropType, setCropType] = useState<string>("");
  const [recommendations, setRecommendations] = useState<{
    name: string;
    amount: string;
    price: string;
  }[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  





  const features: Feature[] = [
    {
      title: "Eco-Friendly Farming",
      description:
        "Sustainable practices that protect our environment while delivering exceptional results.",
      icon: <Leaf className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-green-500/90 to-emerald-600/90",
      lightColor: "from-green-50 to-emerald-50",
    },
    {
      title: "Advanced Technology",
      description:
        "Cutting-edge solutions that optimize growth and maximize yield sustainably.",
      icon: <CircuitBoard className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-blue-500/90 to-cyan-600/90",
      lightColor: "from-blue-50 to-cyan-50",
    },
    {
      title: "Premium Quality",
      description:
        "Rigorous testing ensures top-tier results for your plants every time.",
      icon: <Award className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-purple-500/90 to-indigo-600/90",
      lightColor: "from-purple-50 to-indigo-50",
    },
    {
      title: "Global Impact",
      description:
        "Creating positive change for farmers and communities worldwide.",
      icon: <Globe className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-amber-500/90 to-orange-600/90",
      lightColor: "from-amber-50 to-orange-50",
    },
    {
      title: "Research Driven",
      description:
        "Continuous innovation through scientific research and development.",
      icon: <FlaskConical className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-pink-500/90 to-rose-600/90",
      lightColor: "from-pink-50 to-rose-50",
    },
    {
      title: "Expert Support",
      description: "24/7 guidance from our team of agricultural experts.",
      icon: <HeadsetIcon className="w-7 h-7 text-white stroke-[1.5]" />,
      color: "from-teal-500/90 to-emerald-600/90",
      lightColor: "from-teal-50 to-emerald-50",
    },
  ];





  // Farm calculator logic
  const calculateRequirements = () => {
    setIsCalculating(true);
    
    // Base ratios per acre
    const baseRatios = {
      Vegetables: {
        fertilizer: 2000, // 2000 kg per acre
        soilEnhancer: 800, // 800 kg per acre
        pestControl: 5 // 5 units per acre
      },
      Fruits: {
        fertilizer: 1500,
        soilEnhancer: 600,
        pestControl: 4
      },
      Grains: {
        fertilizer: 1200,
        soilEnhancer: 500,
        pestControl: 3
      }
    };

    if (!landSize || !cropType || landSize <= 0) {
      setRecommendations([]);
      setIsCalculating(false);
      return;
    }

    const ratio = baseRatios[cropType as keyof typeof baseRatios];
    if (!ratio) {
      setIsCalculating(false);
      return;
    }

    const fertilizerAmount = ratio.fertilizer * landSize;
    const soilEnhancerAmount = ratio.soilEnhancer * landSize;
    const pestControlAmount = ratio.pestControl * landSize;

    // Product prices (in dollars per unit)
    const prices = {
      fertilizer: 3, // $3 per kg
      soilEnhancer: 2.5, // $2.5 per kg
      pestControl: 30 // $30 per unit
    };

    const newRecommendations = [
      {
        name: "Organic Fertilizer",
        amount: `${fertilizerAmount.toFixed(0)} kg`,
        price: `$${(fertilizerAmount * prices.fertilizer).toLocaleString()}`
      },
      {
        name: "Soil Enhancer",
        amount: `${soilEnhancerAmount.toFixed(0)} kg`,
        price: `$${(soilEnhancerAmount * prices.soilEnhancer).toLocaleString()}`
      },
      {
        name: "Neem-Based Pest Control",
        amount: `${pestControlAmount.toFixed(0)} units`,
        price: `$${(pestControlAmount * prices.pestControl).toLocaleString()}`
      }
    ];

    setRecommendations(newRecommendations);
    setIsCalculating(false);
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
                  Nature&apos;s Best
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                    Organic Fertilizer
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600/90 max-w-xl">
                  Transform your garden with our premium organic fertilizers.
                  Made from 100% recycled food waste, supporting both your
                  plants and our planet&apos;s future.
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link
                href='/products'
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
                </Link>

                <Link
                href='/blogs'
                  className="px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-xl 
                                 font-medium hover:bg-gray-800 hover:text-white transition-all
                                 duration-300 hover:shadow-xl"
                >
                  Learn More
                </Link>
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
                <Image
                  src="/arkinimage.jpg"
                  alt="Organic Fertilizer Product"   width={1400}
                      height={300}
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
      <section className="py-16 lg:py-32 bg-gradient-to-b from-white to-emerald-50/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              Sustainable Growth, Naturally
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Experience the perfect blend of eco-conscious practices and innovative solutions for your thriving garden.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className={`absolute inset-0 ${feature.lightColor} rounded-2xl transform transition-transform group-hover:scale-105 duration-300`}></div>
                <div className="relative p-6 lg:p-8">
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform group-hover:-translate-y-1 duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-32 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-emerald-50/50 to-transparent"></div>
          <div className="absolute -left-48 top-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -right-48 bottom-1/4 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Our Process
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              From Seed to Success
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We&apos;ve refined our approach to ensure optimal results at every stage of your farming journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              {
                step: "01",
                title: "Planning",
                description: "Expert consultation to understand your goals and create a tailored strategy.",
                icon: "📋",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Preparation",
                description: "Setting up sustainable systems and optimal growing conditions.",
                icon: "🌱",
                gradient: "from-emerald-500 to-green-500"
              },
              {
                step: "03",
                title: "Growth",
                description: "Monitoring and nurturing your crops with precision technology.",
                icon: "📈",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                step: "04",
                title: "Success",
                description: "Harvesting results and ensuring sustainable long-term outcomes.",
                icon: "🎯",
                gradient: "from-rose-500 to-pink-500"
              }
            ].map((process, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative group"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative p-6 lg:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-r shadow-lg flex items-center justify-center text-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    {process.icon}
                  </div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${process.gradient} text-transparent bg-clip-text mb-4`}>
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600">
                    {process.description}
                  </p>
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${process.gradient} w-0 group-hover:w-full transition-all duration-300 rounded-b-2xl`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12 lg:mt-16"
          >
            <Link href='/press-media' className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Your Journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section className="py-16 lg:py-32 bg-gradient-to-b from-white to-emerald-50/50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Our Products
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              Sustainable Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover our range of eco-friendly products designed to enhance your farming experience.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {([
              {
                title: "Organic Fertilizers",
                description: "Nutrient-rich formulas for optimal plant growth",
                image: "/organic.png",
                // price: "$29.99",
                badge: "Best Seller",
                badgeColor: "bg-amber-500"
              },
              {
                title: "Soil Enrichment",
                description: "Premium soil blends for maximum yield",
                image: "/organic2.png",
                // price: "$24.99",
                badge: "Organic",
                badgeColor: "bg-emerald-500"
              },
              {
                title: "Growth Boosters",
                description: "Natural supplements for accelerated growth",
                image: "/organic3.jpeg",
                // price: "$34.99",
                badge: "New",
                badgeColor: "bg-blue-500"
              }
            ] as Product[]).map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className={`absolute top-4 left-4 ${product.badgeColor} text-white text-sm font-medium px-3 py-1 rounded-full z-10`}>
                    {product.badge}
                  </div>

                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 transform group-hover:scale-105 transition-transform duration-500"></div>
                    <Image
                      src={product.image}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={300}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600">
                        {product.price}
                      </span>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300">
                        Notify Me
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-1/2 bg-gradient-to-b from-emerald-50/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Our Impact
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              Growing a Sustainable Future
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Our commitment to sustainable farming practices has created lasting positive impact across communities and environments.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {([
              { number: "100K+", label: "Farmers Supported" },
              { number: "500K", label: "Trees Planted" },
              { number: "80%", label: "Carbon Reduction" },
              { number: "150+", label: "Communities Impacted" }
            ] as ImpactStat[]).map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl transform -rotate-6"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 text-transparent bg-clip-text mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-8 lg:gap-12"
          >
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src="/benifits.jpg"
                  alt="Sustainable Farming"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  width={600}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                Committed to Environmental Stewardship
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Our sustainable farming practices go beyond organic certification. We&apos;re committed to regenerative agriculture that enriches soil health, promotes biodiversity, and ensures long-term environmental sustainability.
                </p>
                <p className="text-gray-600">
                  Through innovative technologies and traditional wisdom, we&apos;re building a future where farming works in harmony with nature.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/sustainability"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Learn about our sustainability initiatives
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-32 bg-gradient-to-b from-emerald-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-72 h-72 bg-green-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-24"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Discover why farmers and gardeners trust our sustainable solutions for their growing needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {([
              {
                name: "John Smith",
                role: "Organic Farmer",
                content: "The sustainable solutions provided byArkin have transformed our farming practices. We've seen incredible improvements in soil health and crop yields.",
                image: "/plant.png"
              },
              {
                name: "Sarah Johnson",
                role: "Community Garden Director",
                content: "Their commitment to environmental stewardship and community support has made them an invaluable partner in our urban farming initiatives.",
                image: "/plant.png"
              },
              {
                name: "Michael Chen",
                role: "Agricultural Consultant",
                content: "I've recommendedArkin to countless clients. Their innovative approach to sustainable farming consistently delivers outstanding results.",
                image: "/plant.png"
              }
            ] as Testimonial[]).map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-t-2xl"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 leading-relaxed">
                    {testimonial.content}
                  </blockquote>
                  <div className="mt-4 flex justify-end">
                    <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Farm Calculator Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
                <Calculator className="w-4 h-4" />
                Interactive Tool
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
                Calculate Your Farm&apos;s Needs
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Use our intelligent calculator to estimate the perfect amount of organic fertilizer and other products for your farming needs.
              </p>
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Land Size (acres)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter land size"
                    value={landSize > 0 ? landSize : ""}
                    onChange={(e) => setLandSize(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                  >
                    <option value="">Select crop type</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                  </select>
                </div>
                <button
                  onClick={calculateRequirements}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isCalculating ? "Calculating..." : "Calculate Requirements"}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl transform rotate-6"></div>
                <div className="relative space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Recommended Products</h3>
                  <div className="space-y-4">
                    {recommendations.length > 0 ? (
                      recommendations.map((product, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-colors duration-300"
                        >
                          <div>
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.amount}</p>
                          </div>
                          <span className="font-bold text-emerald-600">{product.price}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Enter your land size and crop type to see recommendations.</p>
                    )}
                  </div>
                  {recommendations.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900">Total Estimate</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          ${recommendations.reduce((total, product) => {
                            const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
                            return total + price;
                          }, 0).toLocaleString()}
                        </span>
                      </div>
                      <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5">
                        Add All to Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     <div>
      {/* Latest News & Insights */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-1/2 bg-gradient-to-b from-emerald-50/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm">
              <NewspaperIcon className="w-4 h-4" />
              Latest Updates
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 text-transparent bg-clip-text">
              News & Insights
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Stay updated with the latest developments in sustainable farming
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((article, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                      width={400}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-600 text-sm font-medium rounded-full">
                        {article.categories.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {getTimeAgo(article.publishedAt)}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <Link
                      href="/blogs"
                      className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View All Articles
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-32 bg-gradient-to-br from-emerald-900 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700 text-emerald-100 font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                Stay Connected
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Join Our Growing Community
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto"
            >
              Subscribe to our newsletter for the latest sustainable farming tips, exclusive offers, and updates on our environmental initiatives.
            </motion.p>

            <motion.form
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-emerald-400/30 text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-400 text-white font-semibold rounded-full hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </motion.form>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-emerald-300"
            >
              We respect your privacy. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

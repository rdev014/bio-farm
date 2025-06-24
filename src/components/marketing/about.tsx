"use client";

import React from 'react';
import Image from 'next/image';
import { motion} from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Leaf, Lightbulb, Users, Globe, Shield, Sprout, 
         ChartBar, Target, Award } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

interface CoreValue {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  achievement?: string;
}

interface Timeline {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const fadeIn = {
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



export default function AboutUs() {
  const stats: Stat[] = [
    { 
      value: "15K+", 
      label: "Happy Farmers", 
      color: "from-green-500",
      icon: <Users className="w-5 h-5 text-green-600" />
    },
    { 
      value: "30K+", 
      label: "Acres Improved", 
      color: "from-emerald-500",
      icon: <Globe className="w-5 h-5 text-emerald-600" />
    },
    { 
      value: "95%", 
      label: "Satisfaction Rate", 
      color: "from-teal-500",
      icon: <ChartBar className="w-5 h-5 text-teal-600" />
    }
  ];

  const coreValues: CoreValue[] = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: 'Sustainability',
      description: 'Leading the way in eco-friendly farming practices with zero waste and carbon-neutral operations.',
      gradient: 'from-green-500 to-emerald-500',
      achievement: 'Reduced carbon emissions by 45% in 2024'
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
      title: 'Innovation',
      description: 'Pioneering breakthrough technologies in organic fertilizers and sustainable farming methods.',
      gradient: 'from-blue-500 to-cyan-500',
      achievement: '12 Patents in Organic Farming'
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: 'Impact',
      description: 'Creating measurable positive change in agricultural communities worldwide.',
      gradient: 'from-purple-500 to-indigo-500',
      achievement: 'Supported 150+ farming communities'
    }
  ];

  const timeline: Timeline[] = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Started with a vision for sustainable agriculture',
      icon: <Sprout className="w-5 h-5" />
    },
    {
      year: '2022',
      title: 'Innovation Hub',
      description: 'Launched our R&D center for organic solutions',
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Extended operations to 25+ countries',
      icon: <Globe className="w-5 h-5" />
    },
    {
      year: '2025',
      title: 'Carbon Neutral',
      description: 'Achieved carbon neutrality in operations',
      icon: <Leaf className="w-5 h-5" />
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Agricultural Officer",
      image: "/team-member-1.jpg",
      bio: "Ph.D. in Agricultural Sciences with 15+ years of experience in sustainable farming practices and organic agriculture research.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarah-johnson",
        twitter: "https://twitter.com/drsarahj"
      }
    },
    {
      name: "Michael Chen",
      role: "Head of Innovation",
      image: "/team-member-2.jpg",
      bio: "Former Tesla engineer leading our R&D initiatives in bio-organic fertilizer development and smart farming technologies.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michael-chen",
        twitter: "https://twitter.com/mchentech"
      }
    },
    {
      name: "Dr. Emily Parker",
      role: "Sustainability Director",
      image: "/team-member-3.jpg",
      bio: "Environmental scientist specializing in sustainable agriculture and ecosystem preservation.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/emily-parker",
        email: "emily@biofarms.com"
      }
    }
  ];
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-green-50 via-white to-green-50/20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-100/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80 backdrop-blur-sm border border-green-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-800">Pioneering Sustainable Agriculture</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight"
            >
              Nurturing the Earth, 
              <span className="block mt-2 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-transparent bg-clip-text">
                Growing the Future
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              AtArkin, we&apos;re revolutionizing agriculture through innovative sustainable 
              practices and cutting-edge organic solutions, ensuring a healthier planet for 
              generations to come.
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href="/contact-us"
                className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full 
                         font-medium shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 
                         transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 overflow-hidden relative"
              >
                <span className="relative z-10">Partner With Us</span>
                <ArrowRight className="w-4 h-4 relative z-10 transform transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link
                href="/products"
                className="group px-8 py-4 text-gray-700 rounded-full font-medium border-2 border-gray-200 
                         hover:border-green-600 hover:text-green-600 transition-all duration-300 
                         flex items-center gap-2"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-8 
                         shadow-lg shadow-green-500/5 hover:shadow-xl hover:shadow-green-500/10 
                         transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center 
                             group-hover:bg-green-50 transition-colors duration-300">
                  {stat.icon}
                </div>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} to-gray-900 
                              text-transparent bg-clip-text transition-all duration-300`}>
                  {stat.value}
                </p>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-white relative">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full bg-green-50/50 rounded-l-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <Image
                src="/organic2.png"
                alt="Sustainable Farming"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl"
              >
                <p className="text-lg font-medium text-gray-900">
                  Committed to revolutionizing agriculture through sustainable innovation.
                </p>
                <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Bio-Farms Mission</p>
                    <p className="text-sm text-gray-600">Est. 2020</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Our Purpose</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Transforming Agriculture,<br />
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                    Preserving Earth
                  </span>
                </h2>
              </div>

              <div className="space-y-8">
                <motion.div 
                  className="space-y-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-green-600" />
                    </span>
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To provide sustainable, organic fertilizer solutions that enhance soil health, 
                    maximize crop yields, and protect our environment for future generations through 
                    innovative agricultural practices.
                  </p>
                </motion.div>

                <motion.div 
                  className="space-y-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-emerald-600" />
                    </span>
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    To lead the global transition to sustainable agriculture by making organic 
                    fertilizers the standard choice for farmers worldwide, while fostering 
                    innovation and environmental stewardship.
                  </p>
                </motion.div>
              </div>

              {/* Timeline Section */}
              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Our Journey</h4>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center 
                                    border-2 border-green-100 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-green-600 font-semibold">{item.year}</span>
                          <h5 className="font-medium text-gray-900">{item.title}</h5>
                        </div>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gradient-to-b from-white to-green-50/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-200/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-emerald-200/30 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-6">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Our Foundation</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Core Values That
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                Define Our Impact
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide every decision we make and every product we develop,
              ensuring we stay true to our commitment to sustainable agriculture.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-lg shadow-green-500/20 flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{value.description}</p>
                  {value.achievement && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-green-600 font-medium">
                        Achievement: {value.achievement}
                      </p>
                    </div>
                  )}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.gradient} w-0 group-hover:w-full transition-all duration-300 rounded-b-2xl`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/organic.png')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 mb-6">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Our Team</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet the Innovators Behind
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
                Our Success Story
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              A dedicated team of experts working together to revolutionize 
              sustainable agriculture and create a better future.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/90 text-sm">{member.bio}</p>
                    <div className="flex gap-4 mt-4">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                           className="text-white/90 hover:text-white transition-colors">
                          LinkedIn
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                           className="text-white/90 hover:text-white transition-colors">
                          Twitter
                        </a>
                      )}
                      {member.socialLinks.email && (
                        <a href={`mailto:${member.socialLinks.email}`}
                           className="text-white/90 hover:text-white transition-colors">
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/organic.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/0"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-8 max-w-2xl mx-auto">
              Ready to Join Us in Growing a 
              <span className="block">Sustainable Future?</span>
            </h2>
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl 
                       font-medium hover:bg-green-50 transition-all duration-300 shadow-xl 
                       hover:shadow-2xl hover:-translate-y-0.5"
            >
              Contact Us Today
              <ArrowRight className="w-5 h-5 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

'use client';

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { FaQuestionCircle, FaEnvelope, FaBookOpen, FaLeaf, FaArrowRight, FaUsers } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function SupportPage() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    startTransition(async () => {
      try {
        console.log("Submitting support request:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Your support request has been sent! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        console.error('Error submitting support request:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to send support request. Please try again.');
      }
    });
  };

  const supportOptions = [
    {
      icon: FaQuestionCircle,
      title: "Frequently Asked Questions",
      description: "Find quick answers to common questions instantly.",
      link: "/faqs",
    },
    {
      icon: FaBookOpen,
      title: "Knowledge Base",
      description: "Explore our extensive library of articles and guides.",
      link: "/kb",
    },
    {
      icon: FaUsers,
      title: "Community Forum",
      description: "Connect with fellow farmers and industry experts.",
      link: "/community",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full bg-white py-20 md:py-28 text-center relative overflow-hidden shadow-sm">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#e0e0e0" />
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#dot-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Subtle Brand Integration */}
          <div className="inline-flex items-center space-x-2 mb-6 opacity-80">
            <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
              <FaLeaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 text-xl font-bold tracking-tight">Arkin</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5 drop-shadow-sm">
            Dedicated Support for Your Success
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            We&apos;re here to help you every step of the way. Find answers, connect with our experts,
            or explore resources designed to make your journey with Arkin seamless.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center px-10 py-4 rounded-full bg-green-600 text-white font-semibold text-lg
                       shadow-xl hover:bg-green-700 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Get Direct Support <FaArrowRight className="ml-3 text-white/90" />
          </a>
        </div>
      </section>

      {/* Support Options Section */}
      <section className="w-full py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-14">
            Explore Comprehensive Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {supportOptions.map((option, index) => (
              <Link
                key={index}
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="w-full bg-white py-16 md:py-24 px-6 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
            Send Us a Detailed Message
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10">
            For specific inquiries, technical issues, or account-related questions, please use the form below.
          </p>

          <form onSubmit={handleSubmit} className="relative">
            {isPending && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500
                             ${formErrors.name ? 'border-red-500' : 'border-gray-300'}
                             transition-colors duration-200`}
                  placeholder="John Doe"
                  disabled={isPending}
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500
                             ${formErrors.email ? 'border-red-500' : 'border-gray-300'}
                             transition-colors duration-200`}
                  placeholder="john@example.com"
                  autoComplete="email"
                  disabled={isPending}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500
                             ${formErrors.subject ? 'border-red-500' : 'border-gray-300'}
                             transition-colors duration-200`}
                  placeholder="Regarding my account / A technical issue"
                  disabled={isPending}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={`block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y
                             ${formErrors.message ? 'border-red-500' : 'border-gray-300'}
                             transition-colors duration-200`}
                  placeholder="Describe your issue or question in detail..."
                  disabled={isPending}
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full flex justify-center items-center py-3.5 px-4 rounded-lg text-white font-semibold text-lg
                           bg-green-600 shadow-md shadow-green-500/20 hover:bg-green-700
                           ${isPending ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-green-500/30'}
                           transition-all duration-300 ease-in-out`}
              >
                {isPending ? (
                  <>
                    <span className="mr-2">Sending Request...</span>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Direct Contact Option (Only Email) */}
      <section className="w-full bg-gray-50 py-16 md:py-24 px-6 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prefer to Email Us Directly?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            For general inquiries or if you prefer not to use the form, you can send us an email.
          </p>

          <a
            href="mailto:support@arkin.com"
            className="inline-flex items-center px-10 py-4 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold text-lg
                       shadow-md hover:shadow-lg hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FaEnvelope className="mr-3 text-green-600" /> support@arkin.com
          </a>
        </div>
      </section>
    </div>
  );
}
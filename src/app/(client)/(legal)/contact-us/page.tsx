'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertTriangle, Mail } from 'lucide-react';

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/organic.png')] opacity-[0.02] rotate-180" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 -left-32 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-1/4 -right-32 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/25"
          >
            <Mail className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-gray-600"
          >
            Have questions about our sustainable solutions? Send us a message and we'll get back to you soon.
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm"
                required
              >
                <option value="">Select a subject</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership Opportunity">Partnership Opportunity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm resize-none"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    {submitStatus === 'success' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                    <p>
                      {submitStatus === 'success'
                        ? 'Your message has been sent successfully!'
                        : 'There was an error sending your message. Please try again.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium
                       shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 
                       transform hover:-translate-y-0.5 transition-all duration-300 
                       disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 
                       flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Email Support Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-500"
        >
          Our support team typically responds within 24 hours during business days.
        </motion.p>
      </div>
    </main>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Send,
  User,
  MessageSquare,
} from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-green-800"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Need Help? We&apos;re Here for You
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our support team is dedicated to assisting farmers, distributors, and partners. Get in touch for product questions, orders, or technical assistance.
        </motion.p>
      </section>

      {/* Support Options */}
      <section className="grid md:grid-cols-3 gap-8 px-8 pb-16">
        {[
          {
            title: "Email Support",
            icon: Mail,
            info: "support@biofarm.com",
          },
          {
            title: "Call Us",
            icon: Phone,
            info: "+91 98765 43210",
          },
          {
            title: "Visit Office",
            icon: MapPin,
            info: "Bio-Farm HQ, Himachal Pradesh, India",
          },
        ].map(({ title, icon: Icon, info }, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition hover:scale-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Icon className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">{title}</h3>
            </div>
            <p className="text-gray-600">{info}</p>
          </motion.div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="px-8 pb-20 max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {[
            {
              q: "What makes Bio-Farm fertilizers organic?",
              a: "Bio-Farm fertilizers are made from 100% natural and decomposed organic matter, certified by environmental and agricultural agencies.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, we provide global delivery with eco-compliant packaging and documentation.",
            },
            {
              q: "How can I become a distributor?",
              a: "Please fill out the contact form below and our sales team will get in touch with you within 24 hours.",
            },
          ].map(({ q, a }, index) => (
            <motion.div
              key={index}
              className="bg-white border-l-4 border-green-500 p-4 rounded-md shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-start space-x-2 mb-1">
                <HelpCircle className="w-5 h-5 text-green-600 mt-1" />
                <h4 className="text-lg font-medium text-green-900">{q}</h4>
              </div>
              <p className="text-gray-600">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            className="text-3xl font-bold text-green-800 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contact Our Support Team
          </motion.h3>
          <form className="grid gap-6 text-left">
            <div>
              <label className=" text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className=" text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className=" text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </label>
              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";

export default function OurFarm() {
  return (
    <main className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center">
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#bbf7d0" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-800 mb-6 drop-shadow-lg">
          Our Farm
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-2xl text-green-900/80 mb-8">
          Welcome to our farm, where innovation meets tradition. We are dedicated to sustainable agriculture, organic produce, and nurturing the land for future generations.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 2C7 2 2 7 2 12c0 5 5 10 10 10s10-5 10-10c0-5-5-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" fill="#22c55e"/></svg>
            100% Organic
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 21c-4.97 0-9-4.03-9-9 0-4.97 4.03-9 9-9s9 4.03 9 9c0 4.97-4.03 9-9 9zm0-16c-3.87 0-7 3.13-7 7 0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7z" fill="#059669"/></svg>
            Eco-Friendly
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8a7.963 7.963 0 0 0-2.34 5.74c0 4.41 3.59 8 8 8s8-3.59 8-8c0-2.21-.9-4.21-2.34-5.74l1.79-1.8-1.41-1.41-1.8 1.79A7.963 7.963 0 0 0 12 4c-1.85 0-3.55.63-4.84 1.68z" fill="#eab308"/></svg>
            Solar Powered
          </span>
        </div>
      </section>

      {/* Farm Showcase Section */}
      <section className="py-20 px-4 bg-white/80">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl border border-green-100">
            <Image
              src="https://cdn.pixabay.com/photo/2016/11/29/09/32/agriculture-1867314_1280.jpg"
              alt="Farm landscape"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900/60 to-transparent h-1/2"></div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">A Glimpse of Our Fields</h2>
            <p className="text-lg text-green-900/80 mb-6">
              Our farm spans lush fields and modern greenhouses, utilizing advanced irrigation, crop rotation, and renewable energy. We believe in transparency and invite you to see how your food is grown.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#bbf7d0"/><path d="M8 13l2.5 2.5L16 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-green-800 font-medium">Regenerative soil practices</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fef9c3"/><path d="M8 13l2.5 2.5L16 10" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-green-800 font-medium">Solar-powered operations</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#dbeafe"/><path d="M8 13l2.5 2.5L16 10" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-green-800 font-medium">Water conservation technology</span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f1f5f9"/><path d="M8 13l2.5 2.5L16 10" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-green-800 font-medium">Open for educational tours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-green-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-10 text-center">Farm Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2017/06/02/18/24/wheat-2363756_1280.jpg" alt="Wheat field" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2015/09/18/18/03/africa-942317_1280.jpg" alt="Farmers" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2016/11/18/15/27/cow-1839929_1280.jpg" alt="Cows" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2017/01/20/00/30/field-1990297_1280.jpg" alt="Green field" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2016/07/23/00/36/field-1536748_1280.jpg" alt="Sunset farm" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-green-100">
              <Image src="https://cdn.pixabay.com/photo/2016/11/29/09/32/agriculture-1867314_1280.jpg" alt="Farm landscape" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Visit Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Visit Our Farm</h2>
          <p className="text-lg text-green-900/80 mb-8">
            We welcome visitors, students, and anyone interested in learning about sustainable agriculture. Book a tour or contact us for more information.
          </p>
          <a href="mailto:info@ourfarm.com" className="inline-block px-8 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

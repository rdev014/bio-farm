"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrganicFertilizerPage() {
  return (
    <main className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center">
        <div className="absolute inset-0 -z-10 opacity-50">
          <Image
            src="https://cdn.pixabay.com/photo/2017/05/31/13/02/leaves-2360155_1280.jpg"
            alt="Background leaf texture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-green-800 mb-6 drop-shadow-lg">
          Nourish the Future
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-green-900/80 mb-8">
          Harnessing the power of nature to create premium organic fertilizers that revitalize your soil and maximize yield.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-green-100 text-green-800 font-semibold shadow-md border border-green-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            Certified Organic
          </span>
          <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-100 text-emerald-800 font-semibold shadow-md border border-emerald-200/50">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Eco-Conscious Production
          </span>
          <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-yellow-100 text-yellow-800 font-semibold shadow-md border border-yellow-200/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 9.5L21 3m-2.5 0h-6m6 0v6M9.5 14.5L3 21m2.5 0h6m-6 0v-6"></path></svg>
            Enhanced Crop Yield
          </span>
        </div>
      </section>

      {/* The Science Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://cdn.pixabay.com/photo/2020/12/04/16/08/tree-5803607_1280.jpg"
              alt="Rich organic compost being held in hands"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">The Science of Healthy Soil</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our fertilizers are more than just nutrients; they are a complete ecosystem for your soil. We use a proprietary composting method to cultivate beneficial microbes that improve soil structure and nutrient availability.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-green-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 2.3A2.3 2.3 0 0 0 16 1H8a2 2 0 0 0-2 2v2.2a2 2 0 0 1-1.2 1.8L3.2 8a2 2 0 0 0-1.2 1.8V14a2 2 0 0 0 2 2h1.2a2 2 0 0 1 1.8 1.2L8 18.8a2 2 0 0 0 1.8 1.2h4.4a2 2 0 0 0 1.8-1.2l1.2-1.8a2 2 0 0 1 1.8-1.2H20a2 2 0 0 0 2-2v-4.2a2 2 0 0 0-1.2-1.8L19.2 6.2A2 2 0 0 1 18 4.4V2a2 2 0 0 0-.3-.3Z"></path><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"></path></svg></div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">Enriches Soil Biology</h3>
                  <p className="text-gray-600">Introduces a diverse range of microorganisms to create a thriving underground ecosystem.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                 <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"></path></svg></div>
                <div>
                    <h3 className="text-xl font-semibold text-green-800">Improves Water Retention</h3>
                    <p className="text-gray-600">Enhances soil structure to hold moisture more effectively, reducing the need for frequent watering.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                 <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6L2 14.5V22h7.5L22 9.5V2h-6l-6 6Z"></path><path d="m15 5 2-2"></path><path d="m18 8 2-2"></path></svg></div>
                <div>
                    <h3 className="text-xl font-semibold text-green-800">Boosts Nutrient Uptake</h3>
                    <p className="text-gray-600">Unlocks essential minerals and makes them readily available for plant absorption.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-emerald-50 to-green-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-12 text-center">See the Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image src="https://cdn.pixabay.com/photo/2016/03/27/22/22/fox-1284512_1280.jpg" alt="Vibrant lettuce field" fill className="object-cover" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image src="https://cdn.pixabay.com/photo/2017/08/04/21/28/vegetables-2581912_1280.jpg" alt="Healthy root vegetables in a basket" fill className="object-cover" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image src="https://cdn.pixabay.com/photo/2020/04/18/21/53/seedling-5060809_1280.jpg" alt="A healthy seedling sprouting from rich soil" fill className="object-cover" />
            </div>
             <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image src="https://cdn.pixabay.com/photo/2019/07/28/18/45/tomatoes-4369431_1280.jpg" alt="Abundant tomato harvest on the vine" fill className="object-cover" />
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Image src="https://cdn.pixabay.com/photo/2021/05/27/09/22/hands-6287515_1280.jpg" alt="Farmer holding rich, dark soil in hands" fill className="object-cover" />
            </div>
             <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Image src="https://cdn.pixabay.com/photo/2021/09/24/09/32/leaves-6651239_1280.jpg" alt="Close-up of healthy, dew-kissed plant leaves" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">Ready to Grow?</h2>
          <p className="text-lg text-gray-700 mb-10">
            Find out how our organic fertilizers can transform your farm, garden, or nursery. Contact our specialists today for a consultation or to place an order.
          </p>
          <Link href="/contact-us" className="inline-block px-10 py-4 bg-green-600 text-white rounded-lg font-bold text-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1">
            Contact Our Team
          </Link>
        </div>
      </section>
    </main>
  );
}
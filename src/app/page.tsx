'use client';
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast.success('Here is your toast.')

   return (
    <section className="bg-white text-black px-6 md:px-16 py-10 md:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Organic <br />
            <span className="relative inline-block">
              Fertilizers
              <span className="absolute top-0 left-0 text-transparent -z-10 md:text-[6rem] text-[4rem] font-bold opacity-10 select-none">
                Fertilizers
              </span>
            </span>
          </h1>

          <p className="text-gray-700 text-lg mb-6">
            Turning food waste into clean energy and organic fertilizers, we create a sustainable future while reducing landfill pollution and carbon emissions.
          </p>

          <div className="flex items-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition">
              View Product
            </button>
            <button className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-300 transition">
              →
            </button>
          </div>

          {/* Optional CTA below (smaller screen support) */}
          <p className="text-sm text-gray-700 mt-4">
            Turning food waste into clean energy and organic fertilizers.{" "}
            <a href="#" className="underline text-black font-medium">Learn More</a>
          </p>
        </div>

        {/* Right Content */}
        <div className="relative">
          <img
            src="/path-to-your-image/plant.png"
            alt="Organic Fertilizer Plant"
            className="w-full max-w-md mx-auto md:mx-0"
          />

          {/* Features */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 transform space-y-6 text-sm hidden md:block">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">🍃</span>
              <p>Decrease Carbon</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">🌱</span>
              <p>Promotes Soil Health</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">💧</span>
              <p>Saves Water & Resources</p>
            </div>
          </div>

          {/* Bottom Right Rating */}
          <div className="absolute bottom-0 right-0 text-right text-sm">
            <p className="text-xl font-bold">4.8/5 <span className="text-yellow-400">★</span></p>
            <p className="text-gray-600">Explore our trusts &<br />customer Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}

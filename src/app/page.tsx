'use client';
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast.success('Here is your toast.')
   return (
    <section className="bg-white relative overflow-hidden">
      {/* Decorative SVG Background */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        fill="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#DCFCE7"
          fillOpacity="1"
          d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,149.3C672,128,768,128,864,138.7C960,149,1056,171,1152,181.3C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4">
            Grow Sustainably with <span className="text-green-700">BioFarm</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Premium cow dung-based organic fertilizers designed for healthier soil, higher yields, and a greener planet. Trusted by farmers across the globe.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Explore Products
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-green-700 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Image or SVG Illustration */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://img.freepik.com/free-psd/fertilizer-isolated-transparent-background_191095-25524.jpg?ga=GA1.1.1482951452.1745917689&semt=ais_hybrid&w=740"
            alt="Organic Fertilizer Illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}

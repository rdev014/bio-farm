'use client';
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast.success('Here is your toast.')

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-4">
              Empower Your Soil with <span className="text-green-700">BioFarm</span>
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              100% organic. Cow dung-based fertilizers for eco-friendly farming, improved yield, and healthier crops.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={notify}
                className="px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Explore Products
              </button>
              <a
                href="#about"
                className="px-6 py-3 border border-green-700 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://img.freepik.com/free-photo/close-up-picture-gardener-s-hand-holding-sapling-plant_1150-28361.jpg?ga=GA1.1.1482951452.1745917689&semt=ais_hybrid&w=740"
              alt="Organic Fertilizer Illustration"
              className="w-full max-w-md rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About BioFarm</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            BioFarm is committed to sustainable agriculture. We produce high-quality organic fertilizers derived from cow dung, supporting regenerative farming and global food security.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="font-semibold text-green-700 mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-600">Zero chemicals. 100% biodegradable. Good for your farm and the planet.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="font-semibold text-green-700 mb-2">Globally Trusted</h3>
              <p className="text-sm text-gray-600">Exported worldwide with top-tier quality assurance and logistics support.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="font-semibold text-green-700 mb-2">Farmer Approved</h3>
              <p className="text-sm text-gray-600">Used and loved by thousands of organic farmers and agri-entrepreneurs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Go Green?</h2>
          <p className="text-green-100 mb-6">
            Join the organic farming revolution. Contact us to become a distributor or place your bulk order today.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}

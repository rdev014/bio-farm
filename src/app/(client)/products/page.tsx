import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';
import ProductsFilter from '@/components/products/ProductsFilter';
import { Pagination } from '@/components/ui/pagination';
import { ProductsSort } from '@/components/products/ProductsSort';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Our Products | Arkin Organics",
  description: "Browse a wide range of organic fertilizers and soil enrichment solutions by Arkin Organics. Designed for healthy crops and sustainable farming practices.",
};


// SVG for background texture (minimalist, organic feel)
const BackgroundTextureSVG = () => (
  <svg className="absolute inset-0 w-full h-full object-cover opacity-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="grainy">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend mode="multiply" in="SourceGraphic" />
      </filter>
    </defs>
    <rect width="100" height="100" fill="#f8fafc" filter="url(#grainy)" />
  </svg>
);

// SVG for a product placeholder (clean, abstract, professional)
const PlaceholderProductSVG = () => (
  <svg className="h-full w-full text-gray-200" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
  </svg>
);


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams?.page) || 1;
  const category = typeof resolvedSearchParams?.category === 'string' ? resolvedSearchParams.category : undefined;
  const sort = typeof resolvedSearchParams?.sort === 'string' ? resolvedSearchParams.sort : 'createdAt';
  const organic = resolvedSearchParams?.organic === 'true';
  const seasonal = resolvedSearchParams?.seasonal === 'true';

  const { products, pagination } = await getProducts({
    page,
    category,
    sort,
    organic,
    seasonal,
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-lime-50 py-24 md:py-32">
        <BackgroundTextureSVG />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
            Nurturing Nature&apos;s Growth
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-100">
            Discover our premium organic fertilizers, crafted for vibrant soil health and exceptional yields.
          </p>
        </div>
      </section>

      {/* Filter and Products Section */}
      <section className="py-12 md:py-16 bg-white shadow-inner-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Compact Filter & Sort Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-10 p-4 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">Filter & Sort Products:</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <ProductsFilter
                selectedCategory={category}
                organic={organic}
                seasonal={seasonal}
              />
              <ProductsSort selected={sort} />
            </div>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col space-y-4 bg-white rounded-xl shadow-md p-6">
                    <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
                      <PlaceholderProductSVG />
                    </div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <Pagination
                currentPage={pagination.current}
                totalPages={pagination.pages}
                baseUrl="/products"
              />
            </div>
          </Suspense>
        </div>
      </section>

      ---

      {/* Value Proposition / Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Why Choose Arkin Organic Fertilizers?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: (
                  <svg className="h-12 w-12 text-green-600 mb-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6m0-6a2 2 0 00-2 2m2-2a2 2 0 012 2m-2-2h-2v2m2-2h2v2m-2-2V8m0 0a2 2 0 012-2m-2 2a2 2 0 00-2-2" />
                  </svg>
                ),
                title: 'Superior Soil Health',
                description: 'Enriching your soil with beneficial microbes and essential nutrients for long-term vitality.'
              },
              {
                icon: (
                  <svg className="h-12 w-12 text-yellow-600 mb-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: '100% Natural & Safe',
                description: 'Completely chemical-free, ensuring safety for your plants, family, and the environment.'
              },
              {
                icon: (
                  <svg className="h-12 w-12 text-lime-600 mb-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Sustainably Sourced',
                description: 'Ethically produced using responsible practices that promote ecological balance and conservation.'
              },
              {
                icon: (
                  <svg className="h-12 w-12 text-amber-600 mb-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Enhanced Plant Growth',
                description: 'Witness robust root development, lush foliage, and abundant, healthy yields in your garden.'
              },
            ].map((item) => (
              <div key={item.title} className="group p-8 bg-white rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg hover:border-green-200 transform hover:-translate-y-2">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      ---

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Cultivate Your Green Thumb
            </h2>
            <p className="text-lg md:text-xl text-green-200 mb-8">
              Join our community for exclusive tips on organic gardening, soil health, and special offers on Arkin products.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:w-auto flex-grow px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
              />
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-green-800 rounded-xl font-semibold hover:bg-green-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
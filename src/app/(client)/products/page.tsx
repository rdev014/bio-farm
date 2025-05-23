import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { IProduct } from '@/models/ProductSchema';
import ProductCard from '@/components/products/ProductCard';
import ProductsFilter from '@/components/products/ProductsFilter';
import { ProductsSort } from '@/components/products/ProductsSort';
import { Pagination } from '@/components/ui/pagination';

export const metadata = {
  title: 'Products | Bio-Farms',
  description: 'Browse our selection of fresh, organic produce directly from local farms',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Handle search params properly for Next.js server component
  const page = Number(searchParams?.page) || 1;
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  const sort = typeof searchParams?.sort === 'string' ? searchParams.sort : 'createdAt';
  const organic = searchParams?.organic === 'true';
  const seasonal = searchParams?.seasonal === 'true';

  const { products, pagination } = await getProducts({
    page,
    category,
    sort,
    organic,
    seasonal,
  });
console.log(products)
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-200/50 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-yellow-100/50 rounded-full blur-[128px] animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Farm Fresh Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover our selection of fresh, organic produce directly from local farms
            </p>
          </div>

          <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <ProductsFilter
                selectedCategory={category}
                organic={organic}
                seasonal={seasonal}
              />
              <ProductsSort selected={sort} />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-4"
                >
                  <div className="aspect-square rounded-xl bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: IProduct) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={pagination.current}
                totalPages={pagination.pages}
                baseUrl="/products"
              />
            </div>
          </Suspense>
        </div>
      </section>      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🌱', title: 'Organic', text: 'Certified organic farms' },
              { icon: '🚜', title: 'Local', text: 'Sourced from nearby farms' },
              { icon: '📦', title: 'Free Delivery', text: 'Orders over $50' },
              { icon: '🌿', title: 'Fresh', text: 'Farm to table guarantee' },
            ].map((feature) => (
              <div 
                key={feature.title}
                className="group text-center p-6 bg-white rounded-xl border border-gray-100
                         hover:shadow-lg hover:border-green-100 transition duration-300"
              >
                <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Stay Fresh</h2>
              <p className="text-green-50">Get updates on seasonal products and special farm offers</p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-64 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white
                         placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30
                         border border-white/20"
              />
              <button className="px-6 py-3 bg-white text-green-600 rounded-xl font-medium
                               hover:bg-green-50 transition-colors duration-300
                               focus:outline-none focus:ring-2 focus:ring-white/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

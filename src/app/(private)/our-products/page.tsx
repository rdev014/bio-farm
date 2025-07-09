import { getCategories } from "@/actions/category";
import { getPublicProducts } from "@/actions/products";
import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { Suspense } from "react";
import ProductFilters from "@/components/dashboard/products/ProductFilters";
import { AddToCartButton } from "@/components/dashboard/products/AddToCartButton";



type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  order?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const categories = await getCategories();

  const page = parseInt(resolvedParams.page || "1");
  const limit = parseInt(resolvedParams.limit || "12");
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";
  const minPrice = parseFloat(resolvedParams.minPrice || "0");
  const maxPrice = parseFloat(resolvedParams.maxPrice || "1000000");
  const sort = resolvedParams.sort || "createdAt";
  const order = resolvedParams.order || "desc";

  const { products, pages } = await getPublicProducts({
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    order,
  });

  const buildPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    const allParams = { ...resolvedParams, page: newPage.toString() };

    Object.entries(allParams).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'undefined') {
        params.set(key, value);
      }
    });

    return `/our-products?${params.toString()}`;
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b mx-2 mt-2 rounded-2xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Arkin Organics
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Purely Natural, Organically Yours</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Premium Quality</p>
                <p className="text-green-600 font-semibold">100% Organic</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="sticky top-6 ">
          <Suspense fallback={<div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-pulse h-24"></div>}>
            <ProductFilters
              categories={categories.filter((c): c is NonNullable<typeof c> => c !== undefined)}
              currentParams={resolvedParams}
            />
          </Suspense>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{products.length}</span> products
            {pages > 1 && (
              <span className="text-sm text-gray-500 ml-2">
                (Page {page} of {pages})
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Grid View</span>
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 grid grid-cols-2 gap-0.5">
                <div className="w-1 h-1 bg-white rounded-sm"></div>
                <div className="w-1 h-1 bg-white rounded-sm"></div>
                <div className="w-1 h-1 bg-white rounded-sm"></div>
                <div className="w-1 h-1 bg-white rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
          {products.map((product) => (
            <div
              key={product.productId}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.images[0] || "/placeholder.jpg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round((product.discount / product.price) * 100)}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <AddToCartButton productId={product._id}  />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      ${(product.price - (product.discount || 0)).toFixed(2)}
                    </span>
                    {product.discount && (
                      <span className="text-lg text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${product.stock > 10
                    ? 'bg-green-100 text-green-800'
                    : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <Link
                  href={`/our-products/${product.productId}`}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center">
            <nav className="flex items-center gap-2">
              {page > 1 && (
                <Link
                  href={buildPaginationUrl(page - 1)}
                  className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-100 shadow transition-colors"
                >
                  Previous
                </Link>
              )}

              {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                const pageNum = i + Math.max(1, page - 2);
                return pageNum <= pages ? (
                  <Link
                    key={pageNum}
                    href={buildPaginationUrl(pageNum)}
                    className={`px-4 py-2 rounded-xl font-medium transition-colors ${pageNum === page
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                      }`}
                  >
                    {pageNum}
                  </Link>
                ) : null;
              })}

              {page < pages && (
                <Link
                  href={buildPaginationUrl(page + 1)}
                  className="px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-100 shadow transition-colors"
                >
                  Next
                </Link>
              )}
            </nav>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors"
            >
              Clear All Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
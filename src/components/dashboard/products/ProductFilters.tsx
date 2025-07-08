'use client';

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

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

interface Category {
  _id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  currentParams: SearchParams;
}

export default function ProductFilters({ categories, currentParams }: ProductFiltersProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(currentParams.search || '');
  const [priceRange, setPriceRange] = useState({
    min: currentParams.minPrice || '',
    max: currentParams.maxPrice || '',
  });

  const buildUrl = useCallback((newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    const merged = { ...currentParams, ...newParams };
    
    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'undefined') {
        params.set(key, value);
      }
    });
    
    return `/products?${params.toString()}`;
  }, [currentParams]);

  // Debounce function with proper typing
  const debounce = <T extends unknown[]>(
    func: (...args: T) => void, 
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    (value: string) => {
      const debouncedFn = debounce((searchValue: string) => {
        router.push(buildUrl({ search: searchValue, page: '1' }));
      }, 500);
      debouncedFn(value);
    },
    [buildUrl, router]
  );

  const debouncedPriceUpdate = useCallback(
    (minPrice: string, maxPrice: string) => {
      const debouncedFn = debounce((min: string, max: string) => {
        router.push(buildUrl({ minPrice: min, maxPrice: max, page: '1' }));
      }, 1000);
      debouncedFn(minPrice, maxPrice);
    },
    [buildUrl, router]
  );

  useEffect(() => {
    if (searchValue !== (currentParams.search || '')) {
      debouncedSearch(searchValue);
    }
  }, [searchValue, debouncedSearch, currentParams.search]);

  useEffect(() => {
    if (priceRange.min !== (currentParams.minPrice || '') || 
        priceRange.max !== (currentParams.maxPrice || '')) {
      debouncedPriceUpdate(priceRange.min, priceRange.max);
    }
  }, [priceRange, debouncedPriceUpdate, currentParams.minPrice, currentParams.maxPrice]);

  const handleCategoryChange = (value: string) => {
    router.push(buildUrl({ category: value, page: '1' }));
  };

  const handleSortChange = (value: string) => {
    const [sort, order] = value.split('-');
    router.push(buildUrl({ sort, order, page: '1' }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search organic products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={currentParams.category || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[160px]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={`${currentParams.sort || 'createdAt'}-${currentParams.order || 'desc'}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[160px]"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>

          <details className="relative">
            <summary className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer list-none">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Price Range</span>
            </summary>
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl p-4 shadow-lg z-10 min-w-[300px]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href="/products"
                  className="block w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Clear Filters
                </Link>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Active Filters */}
      {(currentParams.search || currentParams.category || currentParams.minPrice || currentParams.maxPrice) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {currentParams.search && (
              <Link
                href={buildUrl({ search: undefined })}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                Search: {currentParams.search}
                <X className="w-4 h-4" />
              </Link>
            )}
            {currentParams.category && (
              <Link
                href={buildUrl({ category: undefined })}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                Category: {categories.find(c => c._id === currentParams.category)?.name || 'Selected'}
                <X className="w-4 h-4" />
              </Link>
            )}
            {(currentParams.minPrice || currentParams.maxPrice) && (
              <Link
                href={buildUrl({ minPrice: undefined, maxPrice: undefined })}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors"
              >
                Price: ${currentParams.minPrice || '0'} - ${currentParams.maxPrice || '∞'}
                <X className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Clear all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
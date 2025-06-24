'use client'
import { SearchResult } from '@/types';
import { Loader2, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'


// Mock search data - replace with your actual search API
const mockSearchData: SearchResult[] = [
  { id: '1', title: 'Organic Tomatoes', description: 'Fresh organic tomatoes from our farm', url: '/products/organic-tomatoes', category: 'Products' },
  { id: '2', title: 'About Our Mission', description: 'Learn about our sustainable farming practices', url: '/about-us', category: 'About' },
  { id: '3', title: 'Seasonal Vegetables', description: 'Fresh seasonal produce available now', url: '/seasonal-products', category: 'Products' },
  { id: '4', title: 'Contact Support', description: 'Get help with your orders and questions', url: '/contact', category: 'Support' },
  { id: '5', title: 'Farm Visit FAQ', description: 'Frequently asked questions about farm visits', url: '/faq', category: 'Resources' },
];


// Custom hook for search functionality
const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const filteredResults = mockSearchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchResults(query);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query, searchResults]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
  };
};
export default function SearchBar() {
  const { query, setQuery, results, isLoading, isOpen, setIsOpen } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setIsOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, resources..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-green-500" />
              <span className="ml-2 text-sm text-gray-600">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full ml-3 flex-shrink-0">
                      {result.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : query && !isLoading ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-600">No results found for {query}</p>
              <button
                onClick={handleSubmit}
                className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Search all results →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}






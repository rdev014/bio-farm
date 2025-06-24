"use client";
import { handleSignOut } from "@/actions/user";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
  Menu,
  ChevronDown,
  User,
  Settings,
  ShoppingBag,
  Leaf,
  Loader2,
  LogOut,
  Home
} from "lucide-react";

import { NavItem, SearchResult, User as UserType } from "@/types";
import { nav } from "@/data/nav";

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

// Search Component
const SearchBar = () => {
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
};

// Main Header Component
export default function Header({ user }: { user: UserType | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Navigation items configuration
  const navItems: NavItem[] = useMemo(() => nav, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle outside clicks and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
        : 'bg-white/90 backdrop-blur-sm border-b border-gray-200/20'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group"
            onClick={closeAllMenus}
          >
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-teal-600 p-2.5 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Arkin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center px-6 ">
            {user?.role && ['user', 'admin', 'moderator'].includes(user.role) ? (
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/dashboard'
                  ? 'bg-green-50 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                  }`}
              >
                Dashboard
              </Link>
            ) : <Link
              href={'/'}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/'
                ? 'bg-green-50 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>}

            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.singlelink ? (
                  <Link
                    href={item.singlelink}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === item.singlelink
                      ? 'bg-green-50 text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.name}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && item.links && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 z-50"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAllMenus}
                            className={`block px-4 py-2.5 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname === link.href
                              ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                              }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xs ">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {user?.email ? (
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('user')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'user'}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user.email[0].toUpperCase()}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* User Dropdown */}
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Signed in as
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate mt-1">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/profile"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
                      >
                        <User className="w-4 h-4" />
                        Your Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Your Orders
                      </Link>
                      <Link
                        href="/settings"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-all duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={() => {
                          closeAllMenus();
                          handleSignOut();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className={`w-5 h-5 text-gray-600 transition-transform duration-200 `} /> : <Menu
                className={`w-5 h-5 text-gray-600 transition-transform duration-200 `}
              />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <div key={`mobile-${item.name}`} className="space-y-1">
                {item.singlelink ? (
                  <Link
                    href={item.singlelink}
                    onClick={closeAllMenus}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-all duration-200 ${pathname === item.singlelink
                      ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(`mobile-${item.name}`)}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === `mobile-${item.name}` ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {activeDropdown === `mobile-${item.name}` && item.links && (
                      <div className="pl-8 space-y-1">
                        {item.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeAllMenus}
                            className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 ${pathname === link.href
                              ? 'bg-green-50 text-green-700 font-medium shadow-sm'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                              }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Mobile Auth Buttons */}
            {!user?.email && (
              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                <Link
                  href="/sign-in"
                  onClick={closeAllMenus}
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeAllMenus}
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg transition-all duration-200 shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
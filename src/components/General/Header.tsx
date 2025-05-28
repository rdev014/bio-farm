"use client";

import { handleSignOut } from "@/actions/user";
import { useState, useEffect } from "react";
import Link from "next/link";

type User = { name?: string; email?: string } | null;

export default function Header({ user }: { user: User }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState("");

  const closeAllMenus = () => {
    setIsActionMenuOpen("");
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = (menuName: string) => {
    setIsActionMenuOpen(isActionMenuOpen === menuName ? "" : menuName);
    // Close mobile menu when opening a dropdown
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };  // Close menus when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[role="menu"]') && !target.closest('button')) {
        closeAllMenus();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    };

    // Close menus when route changes
    const handleRouteChange = () => {
      closeAllMenus();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeAllMenus}>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              BioFarms
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">            {user && (
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                Dashboard
              </Link>
            )}
            <div className="relative group">
              <button
                onClick={() => toggleMenu("products")}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                Products
              </button>
              {isActionMenuOpen === "products" && (
                <div role="menu" className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/products"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/seasonal-products"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Seasonal Products
                  </Link>
                </div>
              )}
            </div>

            {/* About Menu */}
            <div className="relative group">
              <button
                onClick={() => toggleMenu("about")}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                About
              </button>
              {isActionMenuOpen === "about" && (
                <div role="menu" className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/about-us"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/our-farms"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Our Farms
                  </Link>
                  <Link
                    href="/sustainability"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Sustainability
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Menu */}
            <div className="relative group">
              <button
                onClick={() => toggleMenu("resources")}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                Resources
              </button>
              {isActionMenuOpen === "resources" && (
                <div role="menu" className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/blogs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/guides"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Guides
                  </Link>
                  <Link
                    href="/press-media"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Press & Media
                  </Link>
                </div>
              )}
            </div>

            {/* Support Menu */}
            <div className="relative group">
              <button
                onClick={() => toggleMenu("support")}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                Support
              </button>
              {isActionMenuOpen === "support" && (
                <div role="menu" className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Help Center
                  </Link>
                  <Link
                    href="/contact-us"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Cart Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleMenu("cart")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group"
                aria-label="Shopping cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-green-600 text-white rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              {isActionMenuOpen === "cart" && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">
                      Shopping Cart
                    </h3>
                  </div>
                  <div className="px-4 py-4 text-sm text-gray-500 text-center">
                    Your cart is empty
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => toggleMenu("user")}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
                aria-label="User menu"
              >
                {user?.email ? (
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-600 to-green-400 flex items-center justify-center text-white text-sm font-medium">
                    {user.email[0].toUpperCase()}
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 group-hover:text-green-600 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </button>
              {isActionMenuOpen === "user" && (
                <div role="menu" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {user?.email ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        onClick={closeAllMenus}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        onClick={closeAllMenus}
                      >
                        Your Orders
                      </Link>
                      <form action={async () => {
                        closeAllMenus();
                        await handleSignOut();
                      }}>
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        >
                          Sign Out
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        onClick={closeAllMenus}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/sign-up"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600"
                        onClick={closeAllMenus}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-gray-600 transition-transform duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:hidden py-4 border-t border-gray-100 mt-3`}
        >
          <div className="flex flex-col space-y-4 px-4">
            {["About", "Products", "FAQ", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
                onClick={closeAllMenus}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Backdrop for closing menus */}
      {isActionMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllMenus}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

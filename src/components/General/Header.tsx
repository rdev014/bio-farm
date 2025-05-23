"use client";

import { handleSignOut } from "@/actions/user";
import { useState } from "react";

type User = { name?: string; email?: string } | null;

export default function Header({ user }: { user: User }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Bio-Farms
            </span>
          </a>

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
          <div className="hidden sm:flex items-center space-x-6">
            {["About", "Products", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm relative group"
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart Button */}
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <span className="text-sm hidden sm:inline">Cart (0)</span>
            </button>

            {/* User Session */}
            {user?.email? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative group">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600/10 to-green-400/10 flex items-center justify-center ring-2 ring-green-500/20 hover:ring-green-500/40 transition-all duration-300"
                  >
                    <span className="text-green-600 font-medium text-sm">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </button>
                  <form action={handleSignOut}>
                    <button
                      type="submit"
                      className={`${
                        isProfileOpen ? "block" : "hidden"
                      } absolute top-full right-0 mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-lg border border-gray-100 hover:text-green-600 transition-colors whitespace-nowrap`}
                    >
                      Sign Out
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <a
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/sign-up"
                  className="text-sm font-medium px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
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
          } sm:hidden py-4 border-t border-gray-100`}
        >
          <div className="flex flex-col space-y-4 px-4">
            {["About", "Products", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-300 text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

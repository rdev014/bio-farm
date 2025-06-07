"use client";

import { handleSignOut } from "@/actions/user";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa"; // Using react-icons for a consistent icon library

// A reusable Chevron Icon component for dropdowns
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ml-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header({ user }: { user: { name?: string; email?: string; image?: string; role?: string } | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(""); // Tracks which dropdown (nav or user) is open
  
  // State to manage the timer for user-friendly menu closing on hover
  const [menuCloseTimer, setMenuCloseTimer] = useState<NodeJS.Timeout | null>(null);

  // Closes all open menus (mobile and dropdowns)
  const closeAllMenus = () => {
    setIsActionMenuOpen("");
    setIsMobileMenuOpen(false);
  };

  // Clears any existing close timer and opens the specified menu on hover
  const handleMenuEnter = (menuName: string) => {
    if (menuCloseTimer) {
      clearTimeout(menuCloseTimer);
      setMenuCloseTimer(null);
    }
    setIsActionMenuOpen(menuName);
  };
  
  // Starts a timer to close the menu after a brief delay
  const handleMenuLeave = () => {
    const timer = setTimeout(() => {
      setIsActionMenuOpen("");
    }, 200); // 200ms delay for a user-friendly experience
    setMenuCloseTimer(timer);
  };

  // Toggles specific menus on click (used for mobile and potentially on desktop if hover isn't desired)
  const toggleMenuOnClick = (menuName: string) => {
    setIsActionMenuOpen(isActionMenuOpen === menuName ? "" : menuName);
  };

  // Effect for handling clicks outside menus and escape key presses
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close all menus if the click is outside any menu or button that opens a menu
      if (!target.closest('[role="menu"]') && !target.closest('button[aria-haspopup="true"]')) {
        closeAllMenus();
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    };
    // Close menus on route change (e.g., using Next.js router events if applicable, or browser history change)
    const handleRouteChange = () => {
      closeAllMenus();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('popstate', handleRouteChange); // For browser back/forward buttons

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handleRouteChange);
      if (menuCloseTimer) clearTimeout(menuCloseTimer); // Cleanup timer on unmount
    };
  }, [menuCloseTimer]); // Re-run effect if menuCloseTimer changes

  // Define navigation items with their dropdown links
  const navItems = [
    { name: "Products", links: [{href: "/products", label: "All Products"}, {href: "/seasonal-products", label: "Seasonal Products"}] },
    { name: "About", links: [{href: "/about-us", label: "About Us"}, {href: "/our-farms", label: "Our Farms"}, {href: "/sustainability", label: "Sustainability"}] },
    { name: "Resources", links: [{href: "/blogs", label: "Blog"}, {href: "/press-media", label: "Press & Media"}] },
    { name: "Support", links: [{href: "/help", label: "Help Center"}, {href: "/contact-us", label: "Contact Us"}, {href: "/faq", label: "FAQ"}] },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Section 1: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-2" onClick={closeAllMenus}>
            <div className="bg-gradient-to-r from-green-500 to-green-400 p-2.5 rounded-xl shadow-sm">
              <FaLeaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Arkin
            </span>
          </Link>
        </div>

        {/* Section 2: Centered Desktop Navigation (hidden on mobile) */}
        <div className="hidden sm:flex items-center justify-center flex-1 space-x-1 lg:space-x-4">
          {user?.role === 'user' && (
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 text-sm px-3 py-2 rounded-md hover:bg-gray-100">Dashboard</Link>
          )}
          
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative group" 
              onMouseEnter={() => handleMenuEnter(item.name.toLowerCase())} 
              onMouseLeave={handleMenuLeave}
            >
              <button 
                onClick={() => toggleMenuOnClick(item.name.toLowerCase())} 
                className="flex items-center text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 text-sm px-3 py-2 rounded-md hover:bg-gray-100"
                aria-haspopup="true" // ARIA attribute for dropdown button
                aria-expanded={isActionMenuOpen === item.name.toLowerCase()} // ARIA state
              >
                {item.name} <ChevronIcon isOpen={isActionMenuOpen === item.name.toLowerCase()} />
              </button>
              {/* Smoothly animated dropdown panel */}
              <div 
                role="menu" 
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 origin-top bg-white rounded-md shadow-lg py-1 z-50 
                  transition-all duration-300 ease-in-out border border-gray-100
                  ${isActionMenuOpen === item.name.toLowerCase() ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}` // Added 'visible' and 'invisible' for robust hiding
                }
              >
                {item.links.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors" 
                    onClick={closeAllMenus}
                    role="menuitem" // ARIA attribute for menu items
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Right Side Actions */}
        <div className="flex items-center justify-end space-x-2 sm:space-x-3">
          {/* Search Input */}
          <div className="relative hidden lg:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-40 px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-300 focus:w-56"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"> {/* pointer-events-none to allow input focus */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
          
          {/* Cart Icon */}
          <div className="relative">
            <button onClick={() => toggleMenuOnClick("cart")} className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group" aria-label="Shopping cart">
              <svg className="h-6 w-6 text-gray-500 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-green-500 text-white rounded-full flex items-center justify-center">0</span> {/* Placeholder for cart item count */}
            </button>
          </div>

          {/* User / Auth Buttons */}
          {user?.email ? (
            <div className="relative" onMouseEnter={() => handleMenuEnter('user')} onMouseLeave={handleMenuLeave}>
              <button 
                onClick={() => toggleMenuOnClick("user")} 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors group" 
                aria-label="User menu"
                aria-haspopup="true" // ARIA attribute
                aria-expanded={isActionMenuOpen === 'user'} // ARIA state
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center text-white text-base font-semibold ring-2 ring-white/50">
                  {user.email[0].toUpperCase()}
                </div>
              </button>
              <div className={`absolute right-0 mt-2 w-60 origin-top-right bg-white rounded-md shadow-lg z-50 
                transition-all duration-300 ease-in-out border border-gray-100
                ${isActionMenuOpen === 'user' ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}` // Added 'visible' and 'invisible'
              }
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                </div>
                <div className="h-px bg-gray-200/75"></div>
                <div className="py-1">
                  <Link href="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors" onClick={closeAllMenus} role="menuitem">Your Profile</Link>
                  <Link href="/orders" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors" onClick={closeAllMenus} role="menuitem">Your Orders</Link>
                </div>
                <div className="h-px bg-gray-200/75"></div>
                <div className="py-1">
                  <form action={async () => { closeAllMenus(); await handleSignOut(); }}>
                    <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors" role="menuitem">Sign Out</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-green-600 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">Sign In</Link>
              <Link href="/sign-up" className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md">Create Account</Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle (Hamburger/X Icon) */}
          <div className="sm:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Toggle menu">
              <div className="w-5 h-5 flex flex-col items-center justify-center gap-y-1">
                <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content (Full-width dropdown) */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 border-t border-gray-200 bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 animate-slide-down"> {/* Added animate-slide-down for transition */}
            <div className="flex flex-col gap-4">
              {user?.role === 'user' && (
                <Link href="/dashboard" className="flex justify-between items-center py-2 px-4 text-lg text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={closeAllMenus}>
                  <span>Dashboard</span>
                  <svg className="w-4 h-4 stroke-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </Link>
              )}
              {navItems.map((item) => (
                <div key={item.name} className="py-2 border-b border-gray-100 last:border-b-0">
                  <button onClick={() => toggleMenuOnClick(item.name.toLowerCase() + '-mobile')} className="flex justify-between items-center w-full text-lg text-gray-700 hover:bg-gray-100 rounded-md py-2 px-4 transition-colors">
                    <span>{item.name}</span>
                    <ChevronIcon isOpen={isActionMenuOpen === item.name.toLowerCase() + '-mobile'} />
                  </button>
                  <div className={`mt-2 flex flex-col pl-6 transition-all duration-300 ease-in-out ${isActionMenuOpen === item.name.toLowerCase() + '-mobile' ? 'max-h-60 opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}> {/* Dynamic height for smooth collapse */}
                    {item.links.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="flex justify-between items-center py-2 px-4 text-base text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={closeAllMenus}
                      >
                        <span className="text-gray-600">{subItem.label}</span>
                        <svg className="w-4 h-4 stroke-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              {/* Mobile Auth Buttons */}
              {!user?.email && (
                <div className="flex flex-col gap-3 mt-4">
                  <Link href="/sign-in" className="w-full text-center text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md transition-colors" onClick={closeAllMenus}>Sign In</Link>
                  <Link href="/sign-up" className="w-full text-center text-base font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-3 rounded-md transition-colors shadow-sm" onClick={closeAllMenus}>Create Account</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


"use client";

import { handleSignOut } from "@/actions/user";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

// --- REUSABLE SVG ICONS ---

// Main Navigation Icons
const CubeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0012 12v-1.5a3 3 0 00-3-3H6a3 3 0 00-3 3v1.5a3 3 0 003 3m7.5-2.964a3 3 0 00-3-3H6a3 3 0 00-3 3v1.5a3 3 0 003 3m7.5-2.964c.618 0 1.275-.268 1.741-.732a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964A3 3 0 0012 12v-1.5a3 3 0 00-3-3H6a3 3 0 00-3 3v1.5a3 3 0 003 3" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const LifebuoyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>;

// Dropdown Link Icon
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 ml-1.5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header({ user }: { user: { name?: string; email?: string; image?: string; role?: string } | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const menuCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeAllMenus = () => {
    setActiveMenu("");
    setIsMobileMenuOpen(false);
  };

  const handleMenuEnter = (menuName: string) => {
    if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    setActiveMenu(menuName);
  };
  
  const handleMenuLeave = () => {
    menuCloseTimer.current = setTimeout(() => setActiveMenu(""), 200);
  };

  const toggleMenuOnClick = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? "" : menuName);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closeAllMenus();
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAllMenus();
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('popstate', closeAllMenus);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', closeAllMenus);
      if (menuCloseTimer.current) clearTimeout(menuCloseTimer.current);
    };
  }, []);

  const navItems = [
    { name: "Products", icon: CubeIcon, links: [{href: "/products", label: "All Products", icon: ChevronRightIcon}, {href: "/seasonal-products", label: "Seasonal", icon: ChevronRightIcon}] },
    { name: "About Us", icon: UsersIcon, links: [{href: "/about-us", label: "Our Mission", icon: ChevronRightIcon}, {href: "/our-farms", label: "Our Farms", icon: ChevronRightIcon}] },
    { name: "Resources", icon: BookOpenIcon, links: [{href: "/blog", label: "Blog", icon: ChevronRightIcon}, {href: "/faq", label: "FAQ", icon: ChevronRightIcon}] },
    { name: "Support", icon: LifebuoyIcon, links: [{href: "/help", label: "Help Center", icon: ChevronRightIcon}, {href: "/contact", label: "Contact Us", icon: ChevronRightIcon}] },
  ];

  return (
    <header ref={headerRef} className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/80 shadow-sm">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={closeAllMenus}>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 rounded-xl shadow-md">
            <FaLeaf className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Arkin</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 space-x-2">
          {user?.role === 'user' && (
            <Link href="/dashboard" className="text-slate-600 hover:text-green-600 font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Dashboard</Link>
          )}
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="relative" 
              onMouseEnter={() => handleMenuEnter(item.name.toLowerCase())} 
              onMouseLeave={handleMenuLeave}
            >
              <button 
                onClick={() => toggleMenuOnClick(item.name.toLowerCase())} 
                className="flex items-center gap-2 text-slate-600 hover:text-green-600 font-medium transition-colors text-sm px-4 py-2 rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                aria-haspopup="true"
                aria-expanded={activeMenu === item.name.toLowerCase()}
                aria-controls={`menu-${item.name.toLowerCase()}`}
              >
                <item.icon /> {item.name} <ChevronIcon isOpen={activeMenu === item.name.toLowerCase()} />
              </button>
              <div 
                id={`menu-${item.name.toLowerCase()}`}
                role="menu"
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 origin-top bg-white rounded-xl shadow-lg py-2 z-50 transition-all duration-200 ease-in-out border border-slate-100
                  ${activeMenu === item.name.toLowerCase() ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`
                }
              >
                {item.links.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-green-600 transition-colors rounded-md m-1" 
                    onClick={closeAllMenus}
                    role="menuitem"
                  >
                    {link.label}
                    <link.icon />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center justify-end space-x-3">
          {user?.email ? (
            <div className="relative" onMouseEnter={() => handleMenuEnter('user')} onMouseLeave={handleMenuLeave}>
              <button 
                onClick={() => toggleMenuOnClick("user")}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white font-semibold ring-2 ring-offset-2 ring-transparent hover:ring-green-200 transition-all focus:outline-none focus-visible:ring-green-500" 
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={activeMenu === 'user'}
              >
                {user.email[0].toUpperCase()}
              </button>
              <div 
                className={`absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-lg z-50 transition-all duration-200 ease-in-out border border-slate-100
                  ${activeMenu === 'user' ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`
                }
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-slate-500">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                </div>
                <div className="h-px bg-slate-200/75"></div>
                <div className="p-1">
                  <Link href="/profile" className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-green-600 transition-colors rounded-md" onClick={closeAllMenus}>Your Profile</Link>
                  <Link href="/orders" className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-green-600 transition-colors rounded-md" onClick={closeAllMenus}>Your Orders</Link>
                </div>
                <div className="h-px bg-slate-200/75"></div>
                <div className="p-1">
                  <form action={async () => { closeAllMenus(); await handleSignOut(); }}>
                    <button type="submit" className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-green-600 transition-colors rounded-md">Sign Out</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/sign-in" className="text-sm font-medium text-slate-600 hover:text-green-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Sign In</Link>
              <Link href="/sign-up" className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">Create Account</Link>
            </div>
          )}
          
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500" 
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col items-stretch justify-center gap-y-1">
                <span className={`block w-full h-0.5 bg-slate-700 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`}></span>
                <span className={`block w-full h-0.5 bg-slate-700 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-t border-slate-200 bg-white shadow-lg p-4 animate-slide-down lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={`${item.name}-mobile`} className="py-2 border-b border-slate-100 last:border-b-0">
                <button onClick={() => toggleMenuOnClick(item.name.toLowerCase())} className="flex justify-between items-center w-full text-lg text-slate-700 hover:bg-slate-100 rounded-lg p-3 transition-colors">
                  <span>{item.name}</span>
                  <ChevronIcon isOpen={activeMenu === item.name.toLowerCase()} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMenu === item.name.toLowerCase() ? 'max-h-60' : 'max-h-0'}`}>
                  <div className="mt-2 flex flex-col pl-4 gap-1">
                    {item.links.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block py-2 px-4 text-base text-slate-600 hover:bg-slate-100 hover:text-green-600 rounded-lg transition-colors"
                        onClick={closeAllMenus}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {!user?.email && (
              <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-slate-200">
                <Link href="/sign-in" className="w-full text-center text-base font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg transition-colors" onClick={closeAllMenus}>Sign In</Link>
                <Link href="/sign-up" className="w-full text-center text-base font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors shadow-sm" onClick={closeAllMenus}>Create Account</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
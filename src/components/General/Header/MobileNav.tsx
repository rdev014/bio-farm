'use client'
import { nav } from '@/data/nav';
import { useHeaderStore } from '@/store/headerStore';
import { NavItem, User } from '@/types';
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'

export default function MobileNav({ user }: { user: User | null }) {
    const { activeDropdown, setActiveDropdown, isMobileMenuOpen, setMobileMenuOpen } = useHeaderStore();
    const navItems: NavItem[] = useMemo(() => nav, []);
    const pathname = usePathname();

    const closeAllMenus = () => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname, setActiveDropdown, setMobileMenuOpen]);

    const handleDropdownToggle = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    return (
        <>
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-xl">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
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
        </>
    )
}

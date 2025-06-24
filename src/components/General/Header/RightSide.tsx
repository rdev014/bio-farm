'use client'
import { handleSignOut } from '@/actions/user';
import { useHeaderStore } from '@/store/headerStore';
import { User as UserType } from '@/types';
import { ChevronDown, LogOut, Menu, Settings, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, } from 'react'

export default function RightSide({ user, }: { user: UserType | null }) {
    const { activeDropdown, setActiveDropdown, isMobileMenuOpen, setMobileMenuOpen } = useHeaderStore();
    const pathname = usePathname();
    const closeAllMenus = () => {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    };
    // Close menus on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname]);
    const handleDropdownToggle = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };
    return (
        <>
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
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? <X className={`w-5 h-5 text-gray-600 transition-transform duration-200 `} /> : <Menu
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 `}
                />}
            </button>
        </>
    )
}

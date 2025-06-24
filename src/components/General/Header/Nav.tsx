'use client'
import { nav } from "@/data/nav";
import { useHeaderStore } from "@/store/headerStore";
import { NavItem, User } from "@/types";
import { ChevronDown, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Nav({ user }: { user: User | null }) {
   const { activeDropdown, setActiveDropdown } = useHeaderStore();
    const pathname = usePathname();
    const navItems: NavItem[] = useMemo(() => nav, []);
    const handleDropdownToggle = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const closeAllMenus = () => {
        setActiveDropdown(null);
    };
    // Close menus on route change
    useEffect(() => {
        setActiveDropdown(null);
    }, [pathname]);
    return (
        <>
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
        </>
    )
}

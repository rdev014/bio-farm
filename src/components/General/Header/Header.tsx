

import Link from "next/link";

import {

  Leaf,

} from "lucide-react";


import SearchBar from "./Search";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import RightSide from "./RightSide";
import { User } from "@/types";


// Main Header Component
export default function Header({ user }: { user: User | null }) {
  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0 group"
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
            <Nav user={user} />
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-xs ">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <RightSide user={user} />

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileNav user={user} />
    </header>
  );
}
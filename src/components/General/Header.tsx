'use client';
import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-200 text-md py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between ">
        {/* Logo */}
        <a
          className="sm:order-1 text-gray-900 flex-none text-2xl font-semibold"
          href="#"
        >
          Bio-Farms
        </a>

        {/* Right Side Buttons */}
        <div className="sm:order-3 flex items-center gap-x-2">
          {/* Toggle Button for Mobile */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            )}
            <span className="sr-only">Toggle</span>
          </button>

          {/* Profile Button */}
          <button
            type="button"
            className="py-2 px-3 hidden sm:inline-flex items-center gap-x-2 text-sm font-extrabold rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50"
          >
            Cart
          </button>
        </div>

        {/* Nav Links (responsive) */}
        <div
          className={`w-full transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          } sm:block sm:w-auto sm:order-2`}
        >
          <div className="flex flex-col gap-5 font-medium mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <a
              className="font-medium text-gray-600"
              href="#"
              aria-current="page"
            >
              About us
            </a>
            <a className="font-medium text-gray-600 " href="#">
              Products
            </a>
            <a className="font-medium text-gray-600" href="#">
              FAQ
            </a>
            {/* <a className="font-medium text-gray-600 hover:text-gray-400" href="#">
              Blog
            </a> */}
            {/* Mobile-only Profile Button */}
            <button
              type="button"
              className="sm:hidden py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50"
            >
              Profile
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import React from "react";
import { FaLeaf } from "react-icons/fa";
import AppLogo from "./AppLogo";

export default function AuthLayout({
  children,
  leftheading,
  leftDesc,
  title,
  desc,
  leftSection,

}: {
  children: React.ReactNode;
  leftheading: string;
  leftDesc: string;
  title?: string;
  desc?: string;
  leftSection?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-h-screen flex">
      {/* Left Column - Premium Professional Design */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Multi-layered background for depth */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-400" />

          {/* Organic patterns */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
          <div className="absolute inset-0 opacity-40 bg-[url('/plant.png')] bg-cover bg-center mix-blend-overlay" />

          {/* Additional decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl" />
          </div>

          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col p-6 z-10">
          {/* Top Section */}
          <div>
            {/* Logo Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl 
                            flex items-center justify-center border border-white/20
                            shadow-lg shadow-black/5 relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="bg-gradient-to-r from-green-500 to-green-400 p-2.5 rounded-xl">
                  <FaLeaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white/90 text-2xl font-bold tracking-wide">
                  Arkin
                </span>
                <span className="text-white/60 text-sm">
                  Sustainable Agriculture
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-6 max-w-2xl mb-2">
              <h1 className="text-6xl font-bold text-white tracking-tight leading-tight">
                {leftheading}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {leftDesc}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          {
            leftSection ? <>{leftSection}</> : <div className="grid grid-cols-2 gap-4 mt-auto">
              {/* Feature Cards with hover effects */}
              <div
                className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
              >
                <div
                  className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
                >
                  <svg
                    className="size-7 md:size-9 text-sky-300 group-hover:text-sky-200 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12.75L11.25 15L15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296A3.745 3.745 0 0116.5 21a3.745 3.745 0 01-3.296-1.043A3.745 3.745 0 0112 18.75c-1.268 0-2.39-.63-3.068-1.593A3.746 3.746 0 016.5 21a3.745 3.745 0 01-3.296-1.043A3.745 3.745 0 011.5 18.75c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296A3.745 3.745 0 016.5 9a3.745 3.745 0 013.296 1.043A3.746 3.746 0 0112 11.25c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0118.5 9a3.745 3.745 0 013.296 1.043A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h3
                    className="text-sky-100 font-semibold text-lg md:text-xl
                       group-hover:text-white transition-colors duration-300"
                  >
                    Certified Organic
                  </h3>
                  <p
                    className="text-slate-400 text-sm md:text-base leading-relaxed
                       group-hover:text-slate-300 transition-colors duration-300 mt-1"
                  >
                    Quality assured products.
                  </p>
                </div>
              </div>

              <div
                className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
              >
                <div
                  className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                  >
                    Global Network
                  </h3>
                  <p
                    className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                  >
                    Connected with sustainable farmers worldwide
                  </p>
                </div>
              </div>

              <div
                className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
              >
                <div
                  className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                  >
                    Innovation
                  </h3>
                  <p
                    className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                  >
                    Pioneering sustainable farming technologies
                  </p>
                </div>
              </div>

              <div
                className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
              >
                <div
                  className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                  >
                    Sustainability
                  </h3>
                  <p
                    className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                  >
                    Eco-friendly practices for a better tomorrow
                  </p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <Link href={'/'} >   <AppLogo /></Link>
          {title && (
            <div className="text-center space-y-2 pt-2">
              <h2 className="text-3xl font-sans font-semibold text-zinc-900">{title}</h2>
              <p className="text-zinc-600 text-base leading-relaxed">{desc}</p>
            </div>
          )}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

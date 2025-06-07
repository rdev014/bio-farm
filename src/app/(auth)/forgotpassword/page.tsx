import React from 'react';
import Image from 'next/image';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { FaLeaf } from 'react-icons/fa';

export default async function ForgotPassword() {
  const session = await getSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Professional Design */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Multi-layered background for depth */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-400" />
          
          {/* Organic patterns */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
          <div className="absolute inset-0 opacity-40 bg-[url('/plant.png')] bg-cover bg-center mix-blend-overlay" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl" />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col p-16 z-10">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-16">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl 
                          flex items-center justify-center border border-white/20
                          shadow-lg shadow-black/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500" />
             <div className="bg-gradient-to-r from-green-500 to-green-400 p-2.5 rounded-xl">
                               <FaLeaf className="w-6 h-6 text-white" />
                             </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white/90 text-2xl font-bold tracking-wide">Arkin</span>
              <span className="text-white/60 text-sm">Account Recovery</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Reset Your Password
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Don&apos;t worry! It happens to the best of us. Enter your email address and we&apos;ll send you 
              instructions to reset your password.
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-auto space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Secure Reset Process
              </h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  We&apos;ll send a secure reset link to your email
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  Link expires in 1 hour for security
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  Verify your identity before resetting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Password Recovery</h2>
            <p className="text-gray-600">Enter your email to receive reset instructions</p>
          </div>

          <form className="space-y-6" action="/api/auth/forgot-password">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full px-4 py-3.5 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         transition-colors bg-white text-gray-900 text-base
                         placeholder:text-gray-400"
                placeholder="Enter your registered email"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 rounded-xl 
                       bg-gradient-to-r from-green-600 to-green-500 text-white 
                       font-medium shadow-lg shadow-green-500/25 
                       hover:shadow-xl hover:shadow-green-500/40 
                       transition-all duration-300"
            >
              Send Reset Instructions
            </button>

            <div className="flex items-center justify-center space-x-2 text-sm">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <a href="/sign-in" 
                 className="text-green-600 hover:text-green-500 font-medium transition-colors">
                Back to Sign in
              </a>
            </div>
          </form>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <h3 className="text-gray-900 font-medium mb-3">Need Help?</h3>
            <p className="text-gray-600 text-sm">
              If you&apos;re having trouble accessing your account, please contact our 
              <a href="/support" className="text-green-600 hover:text-green-500 ml-1">
                support team
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

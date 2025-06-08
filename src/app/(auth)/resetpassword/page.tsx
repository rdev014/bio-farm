import React from 'react';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { FaLeaf } from 'react-icons/fa';

export default async function ResetPassword() {
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
              <span className="text-white/60 text-sm">Password Reset</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Create New Password
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Choose a strong password that you haven&apos;t used before. A good password is the key to keeping your account secure.
            </p>
          </div>

          {/* Password Requirements */}
          <div className="mt-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password Requirements
              </h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  Include uppercase & lowercase letters
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  Include at least one number
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                  Include at least one special character
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
            <h2 className="text-3xl font-bold text-gray-900">Reset Your Password</h2>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          <form className="space-y-6" action="/api/auth/reset-password">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full px-4 py-3.5 rounded-xl border border-gray-300 
                             focus:ring-2 focus:ring-green-500 focus:border-transparent
                             transition-colors bg-white text-gray-900
                             placeholder:text-gray-400"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    className="block w-full px-4 py-3.5 rounded-xl border border-gray-300 
                             focus:ring-2 focus:ring-green-500 focus:border-transparent
                             transition-colors bg-white text-gray-900
                             placeholder:text-gray-400"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-300 w-0" />
              </div>
              <p className="text-sm text-gray-500">Password strength: <span className="text-gray-700 font-medium">Weak</span></p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 rounded-xl 
                       bg-gradient-to-r from-green-600 to-green-500 text-white 
                       font-medium shadow-lg shadow-green-500/25 
                       hover:shadow-xl hover:shadow-green-500/40 
                       transition-all duration-300"
            >
              Reset Password
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
            <h3 className="text-gray-900 font-medium mb-3">Having Trouble?</h3>
            <p className="text-gray-600 text-sm">
              If you need assistance, please contact our 
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

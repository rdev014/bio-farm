import { signIn } from '@/auth';
import React from 'react';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 via-white to-yellow-50 p-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-400 rounded-xl 
                          flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your Bio-Farms account</p>
        </div>

        {/* Social Login Options */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 
                           rounded-xl hover:bg-gray-50 transition-colors">
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-gray-600">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 
                           rounded-xl hover:bg-gray-50 transition-colors">
            <Image
              src="/github.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-gray-600">GitHub</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        {/* Login Form */}
        <form
          className="space-y-6"
          action={async () => {
            "use server"
            await signIn()
          }}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-green-500 focus:border-transparent
                       transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                       focus:ring-2 focus:ring-green-500 focus:border-transparent
                       transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 rounded border-gray-300 
                         focus:ring-green-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-xl 
                     bg-gradient-to-r from-green-600 to-green-500 text-white 
                     font-medium shadow-lg shadow-green-500/25 
                     hover:shadow-xl hover:shadow-green-500/40 
                     transition-all duration-300"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-green-600 hover:text-green-500">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}

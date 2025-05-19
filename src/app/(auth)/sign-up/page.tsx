import { signIn } from '@/auth';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image + Text */}
      <div className="relative md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-green-900 to-green-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-green-300 rounded-full blur-[128px] animate-pulse delay-700"></div>
        </div>
        <Image
          src="/farm-background.jpg"
          alt="Organic Farming Background"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay opacity-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8 text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Grow Better,<br />Naturally.
            </h2>
            <p className="text-lg md:text-xl text-green-50/90 max-w-md mx-auto">
              Join the sustainable farming revolution with Bio-Farms' organic solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-8">
            {['100% Organic', 'Eco-Friendly', 'Sustainable'].map((feature) => (
              <div key={feature} className="text-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">{feature === '100% Organic' ? '🌱' : feature === 'Eco-Friendly' ? '♻️' : '🌍'}</span>
                </div>
                <p className="text-sm font-medium text-green-50">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-500 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium 
                           shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300">
              Create Account
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <form action={async () => {
              'use server';
              await signIn();
            }}>
              <button type="submit" 
                      className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 
                               hover:bg-gray-50 transition-colors">
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
            </form>
          </div>

          <p className="text-sm text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error();
        }

        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

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
              <Image
                src="/plant.png"
                alt="Bio-Farms Logo"
                width={32}
                height={32}
                className="object-contain relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white/90 text-2xl font-bold tracking-wide">Bio-Farms</span>
              <span className="text-white/60 text-sm">Account Verification</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Verifying Your Account
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Please wait while we verify your email address. This helps ensure the security of your account 
              and gives you access to all Bio-Farms features.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-6">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Benefits of Verification
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Access to exclusive organic products</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Early access to seasonal products</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p>Special member discounts and offers</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Verification Status */}      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {status === 'loading' && (
            <>
              {/* Loading Animation */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-green-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
                  <div className="absolute inset-4 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Verifying Your Email</h2>
                <p className="text-gray-600 max-w-sm mx-auto">
                  Please wait while we verify your email address. This should only take a moment.
                </p>
              </div>

              {/* Status Messages */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-green-700">Verification token received</p>
                </div>
              </div>
            </>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Verified!</h2>
              <p className="text-gray-600 mb-8">Your email has been successfully verified. You can now access all Bio-Farms features.</p>
              <a href="/sign-in" 
                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Sign In
              </a>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Verification Failed</h2>
              <p className="text-gray-600 mb-8">We couldn't verify your email. The verification link may have expired or is invalid.</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a href="/sign-up" 
                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  Try Again
                </a>
                <a href="/support" 
                   className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Contact Support
                </a>
              </div>
            </div>
          )}          {/* Help Box - Only show during loading state */}
          {status === 'loading' && (
            <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
              <h3 className="text-gray-900 font-medium mb-3">Having Issues?</h3>
              <p className="text-gray-600 text-sm">
                If verification is taking too long, you can try 
                <a href="/sign-in" className="text-green-600 hover:text-green-500 mx-1">
                  signing in again
                </a>
                {" "}or contact our{" "}
                <a href="/support" className="text-green-600 hover:text-green-500 ml-1">
                  support team
                </a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

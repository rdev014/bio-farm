import React from 'react';
import Image from 'next/image';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function VerificationSent() {
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
              <span className="text-white/60 text-sm">Email Verification</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Check Your Email
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We've sent you a verification link to secure your account. Follow the instructions 
              in the email to complete your verification.
            </p>
          </div>

          {/* Email Instructions */}
          <div className="mt-auto space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-6">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Next Steps
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <p>Check your email inbox (and spam folder)</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <p>Click the verification link in the email</p>
                </li>
                <li className="flex items-center text-white/70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <p>Return to Bio-Farms to complete setup</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Verification Status */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Verification Email Sent!</h2>
            <p className="text-gray-600 max-w-sm mx-auto">
              We've sent a verification link to your email address. Please check your inbox and follow the instructions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex justify-center py-3.5 px-4 rounded-xl 
                       bg-gradient-to-r from-green-600 to-green-500 text-white 
                       font-medium shadow-lg shadow-green-500/25 
                       hover:shadow-xl hover:shadow-green-500/40 
                       transition-all duration-300"
             
            >
              Resend Verification Email
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
          </div>

          {/* Help Box */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
            <h3 className="text-gray-900 font-medium mb-3">Didn't receive the email?</h3>
            <p className="text-gray-600 text-sm">
              Check your spam folder or contact our 
              <a href="/support" className="text-green-600 hover:text-green-500 ml-1">
                support team
              </a> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

export default function VerifyEmailClient() {
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
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

            {/* Help Box */}
            <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
              <h3 className="text-gray-900 font-medium mb-3">Having Issues?</h3>
              <p className="text-gray-600 text-sm">
                If verification is taking too long, you can try 
                <a href="/login" className="text-green-600 hover:text-green-500 mx-1">
                  signing in again
                </a>
                {" "}or contact our{" "}
                <a href="/support" className="text-green-600 hover:text-green-500 ml-1">
                  support team
                </a>.
              </p>
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
            <p className="text-gray-600 mb-8">We couldn&apos;t verify your email. The verification link may have expired or is invalid.</p>
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
        )}
      </div>
    </div>
  );
}
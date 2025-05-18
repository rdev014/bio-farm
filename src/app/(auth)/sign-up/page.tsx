import { signIn } from '@/auth';
import Image from 'next/image';
import React from 'react'

export default function SignUp() {
   return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image + Text */}
      <div className="relative md:w-1/2 h-64 md:h-auto">
        <Image
          src="https://placehold.net/7-800x600.png" // replace with your local image or external link
          alt="Nature Background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Everything you need,<br /> to make anything you want.
          </h2>
          <p className="mt-4 text-sm md:text-base max-w-md">
            Dozens of creative tools to ideate, generate and edit content like never before.
          </p>
        </div>
      </div>

      {/* Right: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-gray-200">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create an account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
          </p>

          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full px-4 py-3 border rounded-lg mb-4 text-gray-800 focus:ring-2 focus:ring-green-600"
          />
          <button className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-black transition">
            Next
          </button>

          <div className="my-6 flex items-center justify-center text-gray-600">
            <span className="border-t w-full mr-2"></span>
            OR
            <span className="border-t w-full ml-2"></span>
          </div>

          <div className="flex flex-col gap-4">
            <form action={async()=>{
              'use server';
              await signIn();
            }}>
              <button type='submit' className="w-full py-3 border rounded-lg flex items-center justify-center gap-2  bg-black hover:bg-gray-900">
              {/* <Image src="/google.svg" alt="Google" width={20} height={20} /> */}
              Sign up with Google
            </button>
            </form>
            
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            By clicking “Sign up”, you agree to our Terms of Use and acknowledge you’ve read our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

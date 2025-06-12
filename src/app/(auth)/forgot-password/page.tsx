"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import {FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AuthLayout from "@/components/General/authLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const load = toast.loading("Processing");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      toast.dismiss(load);

      if (res.ok) {
        toast.success(
          data.success || "Password reset link sent successfully.",
          {
            icon: <FaCheckCircle className="text-green-500" />,
          }
        );
      } else {
        toast.error(data.error || "Something went wrong", {
          icon: <FaTimesCircle className="text-red-500" />,
        });
      }
    } catch (err: unknown) {
      console.error("Error in forgot password submission:", err);
      toast.dismiss(load);
      toast.error("Network error. Please try again later.", {
        icon: <FaTimesCircle className="text-red-500" />,
      });
    }
  };

  return (
    <AuthLayout
      title="Password Recovery"
      desc=" Enter your email to receive reset instructions"
      leftheading="Reset Your Password"
      leftDesc="Don't worry! It happens to the best of us. Enter your email address and we'll send you instructions to reset your password."
      leftSection={
        <div className="mt-20 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="flex items-center text-white text-lg font-semibold mb-4">
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
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
      }
    >
      <div className="w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
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
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 17l-5-5m0 0l5-5m-5 5h12"
              />
            </svg>
            <a
              href="/sign-in"
              className="text-green-600 hover:text-green-500 font-medium transition-colors"
            >
              Back to Sign in
            </a>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
          <h3 className="text-gray-900 font-medium mb-3">Need Help?</h3>
          <p className="text-gray-600 text-sm">
            If you&apos;re having trouble accessing your account, please contact
            our
            <a
              href="/support"
              className="text-green-600 hover:text-green-500 ml-1"
            >
              support team
            </a>
            .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

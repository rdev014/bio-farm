"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "sonner";
import AuthLayout from "@/components/General/authLayout";
import { Suspense } from "react";


function ResetPasswordForm(){
   const [password, setPassword] = useState("");
  const [confirmpassword, setconfirPassword] = useState("");

  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const load = toast.loading("Processing");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmpassword }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.success || "New Password set successfully.", {
          icon: <FaCheckCircle className="text-green-500" />,
        });
        router.replace("/sign-in");
      } else {
        const errorText = await res.text();
        try {
          const errorData = JSON.parse(errorText);
          toast.error(
            errorData.error || "An error occurred. Please try again.",
            {
              icon: <FaTimesCircle className="text-red-500" />,
            }
          );
        } catch {
          toast.error("Unknown error occurred.");
        }
      }
    } catch (err: unknown) {
      console.error("Error in password submission:", err);
      toast.error("Network error. Please try again later.", {
        icon: <FaTimesCircle className="text-red-500" />,
      });
    }
    toast.dismiss(load);
  };
  return(
    <AuthLayout
      title="   Reset Your Password"
      desc="Enter your new password below"
      leftheading="Create New Password"
      leftDesc="Choose a strong password that you haven't used before. A good password is the key to keeping your account secure."
      leftSection={
          <div className="mt-20">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
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
      }
    >
      <div className="w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmpassword"
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setconfirPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-300 
                             focus:ring-2 focus:ring-green-500 focus:border-transparent
                             transition-colors bg-white text-gray-900
                             placeholder:text-gray-400"
                  placeholder="Confirm your new password"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
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
            <p className="text-sm text-gray-500">
              Password strength:{" "}
              <span className="text-gray-700 font-medium">Weak</span>
            </p>
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
          <h3 className="text-gray-900 font-medium mb-3">Having Trouble?</h3>
          <p className="text-gray-600 text-sm">
            If you need assistance, please contact our
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
  )
}
export default function ResetPassword() {
 
  return (
    <Suspense>
      <ResetPasswordForm/>
    </Suspense>
  );
}
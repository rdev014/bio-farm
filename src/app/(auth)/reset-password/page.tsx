"use client";
import React, { useState, useEffect } from "react"; // Import useEffect for real-time validation
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons for show/hide password
import { toast } from "sonner";
import AuthLayout from "@/components/General/authLayout";
import { Suspense } from "react";
import Link from "next/link";

// --- Password Validation Helpers (New, but logic purely UI-driven) ---
const passwordRequirements = [
  { key: 'length', text: 'At least 8 characters long', regex: /.{8,}/ },
  { key: 'uppercase', text: 'Include uppercase letters', regex: /[A-Z]/ },
  { key: 'lowercase', text: 'Include lowercase letters', regex: /[a-z]/ },
  { key: 'number', text: 'Include at least one number', regex: /[0-9]/ },
  { key: 'specialChar', text: 'Include at least one special character', regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ },
];

const assessPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length > 0) score++; // Base score for any input

  const passedRequirements = passwordRequirements.filter(req => req.regex.test(password));
  score += passedRequirements.length;

  if (password.length >= 12 && passedRequirements.length === passwordRequirements.length) {
    score += 2; // Bonus for longer and all requirements met
  }

  if (score < 3) return { level: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score < 5) return { level: "Moderate", color: "bg-orange-500", width: "w-2/4" };
  if (score < 7) return { level: "Good", color: "bg-yellow-500", width: "w-3/4" };
  return { level: "Strong", color: "bg-green-500", width: "w-full" };
};

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Renamed for clarity
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ level: "None", color: "bg-gray-200", width: "w-0" });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // --- UI-Driven Validation Logic (No change to API submission logic) ---
  useEffect(() => {
    setPasswordStrength(assessPasswordStrength(password));
    setPasswordMatch(password === confirmPassword && password.length > 0);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation before API call (optional, but good UX)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        icon: <FaTimesCircle className="text-red-500" />,
      });
      return;
    }

    const load = toast.loading("Processing");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmpassword: confirmPassword }), // Use confirmPassword here
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

  return (
    <AuthLayout
      title="Reset Your Password"
      desc="Enter your new password below"
      leftheading="Create New Password"
      leftDesc="Choose a strong password that you haven't used before. A good password is the key to keeping your account secure."
      leftSection={
        <div className="mt-20">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-lg">
            <h3 className="flex items-center text-white text-lg font-semibold mb-5">
              <svg
                className="w-6 h-6 mr-3 text-green-300" // Added green tint to icon
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
              {passwordRequirements.map((req) => (
                <li key={req.key} className="flex items-center">
                  {req.regex.test(password) ? (
                    <FaCheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" /> // Changed to gray for unmet, smaller dot
                  )}
                  {req.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-md">
        <form className="space-y-7" onSubmit={handleSubmit}> {/* Increased overall spacing */}
          <div className="space-y-5"> {/* Increased spacing between input fields */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-2" // Bolder label
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle type
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3.5 rounded-xl border border-gray-300
                             focus:ring-2 focus:ring-green-500 focus:border-green-500
                             transition-all duration-200 bg-white text-gray-900
                             placeholder:text-gray-400 shadow-sm" // Added shadow
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-gray-800 mb-2" // Bolder label
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"} // Toggle type
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`block w-full px-4 py-3.5 rounded-xl border
                             ${password.length > 0 && confirmPassword.length > 0 && !passwordMatch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'}
                             transition-all duration-200 bg-white text-gray-900
                             placeholder:text-gray-400 shadow-sm`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {password.length > 0 && confirmPassword.length > 0 && (
                <p className={`mt-2 text-sm flex items-center ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordMatch ? (
                    <>
                      <FaCheckCircle className="mr-1.5" /> Passwords match
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="mr-1.5" /> Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`h-full ${passwordStrength.color} transition-all duration-300 ${passwordStrength.width}`} />
            </div>
            <p className="text-sm text-gray-500">
              Password strength:{" "}
              <span className={`font-medium ${passwordStrength.level === "Weak" ? 'text-red-600' : passwordStrength.level === "Moderate" ? 'text-orange-600' : passwordStrength.level === "Good" ? 'text-yellow-600' : 'text-green-600'}`}>
                {passwordStrength.level}
              </span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 rounded-xl
                       bg-gradient-to-r from-green-600 to-green-500 text-white
                       font-semibold text-lg shadow-lg shadow-green-500/30
                       hover:shadow-xl hover:shadow-green-500/50
                       transition-all duration-300 transform hover:-translate-y-0.5" // Subtle lift on hover
            disabled={!passwordMatch || passwordStrength.level === "Weak" || password.length === 0} // Disable if passwords don't match or are too weak
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
            <Link
              href="/sign-in"
              className="text-green-600 hover:text-green-500 font-medium transition-colors hover:underline" // Added underline on hover
            >
              Back to Sign in
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm">
            <h3 className="text-gray-900 font-semibold mb-3">Having Trouble?</h3> {/* Bolder heading */}
            <p className="text-gray-600 text-sm">
              If you need assistance, please contact our
              <Link
                href="/support"
                className="text-green-600 hover:text-green-500 ml-1 font-medium" // Added font-medium
              >
                support team
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

// Suspense wrapper for the form
export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
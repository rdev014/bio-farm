"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { handleGoogleSignIn, register } from "@/actions/user";
import {
  validatePassword,
  validateEmail,
} from "@/lib/validation";
import { toast } from "sonner";
import AuthLayout from "@/components/General/authLayout";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear previous error
    setFormErrors((prev) => ({ ...prev, [name]: "" }));

    // Validate password in real-time
    if (name === "password") {
      const { isValid, errors } = validatePassword(value);
      setPasswordStrength({
        score: isValid ? 100 : Math.min(60, (value.length / 8) * 100),
        requirements: errors,
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields

    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    // Collect all validation errors
    const newErrors = {
      email: emailValidation.error || "",
      password: passwordValidation.errors[0] || "",
    };

    setFormErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      toast.error("Please fix the form errors before submitting");
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

        await register(formDataObj);
        toast.success("Account created successfully!");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to create account"
        );
      }
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      desc="Enter your details below to create your account"
      leftheading="Welcome to the Future of Farming"
      leftDesc="Join our ecosystem of sustainable agriculture and be part of the revolution in organic farming practices."
    >
      <div className="w-full max-w-md ">
        <div className="grid grid-cols-1 gap-4">
          <form className="w-full" action={handleGoogleSignIn}>
            <button
              type="submit"
              className="flex  min-w-full items-center justify-center gap-3 p-3.5 bg-white border border-zinc-300
                         rounded-xl hover:bg-zinc-50 transition-colors shadow-sm text-base font-semibold text-zinc-700 cursor-pointer"
              disabled={isPending}
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
          </form>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-sm py-2">
            <span className="px-4 bg-white text-zinc-500 rounded-full">
              or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="space-y-2.5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-zinc-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full px-4 py-3 rounded-xl border transition-colors shadow-sm ${formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-zinc-300 focus:ring-green-500 focus:border-green-500"
                  } focus:border-transparent bg-white text-zinc-900 placeholder:text-zinc-400`}
                placeholder="john@example.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                autoComplete="username"
                disabled={isPending}
              />
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-900 mb-2" // Bolder label, added mb
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // Dynamically set type
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pr-12 px-4 py-3 rounded-xl border transition-colors shadow-sm ${ // Added pr-12 for eye button space
                    formErrors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-zinc-300 focus:ring-green-500 focus:border-green-500" // Consistent green focus
                    } focus:border-transparent bg-white text-zinc-900 placeholder:text-zinc-400`}
                  placeholder="********"
                  required
                  minLength={8}
                  autoComplete="password"
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordStrength.requirements.length > 0 && (
                <div className="mt-3 space-y-2"> {/* Increased mt */}
                  <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden"> {/* Slightly thicker bar */}
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.score >= 75 // Better visual progression for score
                        ? "bg-green-500"
                        : passwordStrength.score >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-1">
                    {passwordStrength.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        {/* You can add icons here based on whether the requirement is met or not for a more visual feedback */}
                        {/* For simplicity and to not change validation logic, I'm keeping your original icon for unmet */}
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-500"> {/* Increased mt */}
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Input type="checkbox" name="terms" id="terms" className="h-4 w-4 text-green-600 border-zinc-300 rounded focus:ring-green-500" required />
              {" "}
              <label htmlFor="terms" className="text-sm text-zinc-600"> {/* Changed p to label for accessibility */}
                You agree to our{" "}
                <Link href="/legal/terms" className="text-green-600 hover:text-green-500 font-medium hover:underline"> {/* Added font-medium and underline on hover */}
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/legal/privacy" className="text-green-600 hover:text-green-500 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button
              type="submit"
              disabled={
                isPending ||
                passwordStrength.requirements.length > 0 ||
                Object.values(formErrors).some((error) => error) ||
                Object.values(formData).some((value) => value === "")

              }
              className={`w-full py-3.5 px-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${ // Larger, bolder button with hover effect
                !isPending &&
                  passwordStrength.requirements.length === 0 && // Ensure all password requirements are met to enable
                  !Object.values(formErrors).some((error) => error) &&
                  !Object.values(formData).some((value) => value === "")
                  ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-xl hover:shadow-green-500/40"
                  : "bg-zinc-200 text-zinc-600 cursor-not-allowed opacity-70" // Disabled state style
                }`}
            >
              {isPending ? <>
                <div className="flex items-center justify-center text-green-400 space-x-2">
                  <Loader2 className="animate-spin " /><p>Submiting...</p>
                </div>
              </> : "Create Account"} {/* Dynamic button text */}
            </button>
          </div>
        </form>
        {/* Sign Up Link */}
        <p className="text-center text-sm text-zinc-600 pt-4"> {/* Increased margin top */}
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-green-600 hover:text-green-500 hover:underline" // Bolder link and underline on hover
          >
            Sign in now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
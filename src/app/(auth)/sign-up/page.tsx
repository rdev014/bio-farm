'use client';
import Image from "next/image";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { handleGoogleSignIn, register } from "@/actions/user";
import { validatePassword, validateEmail, validateName } from "@/lib/validation";
import { toast } from "react-hot-toast";
import { FaLeaf } from "react-icons/fa";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    requirements: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear previous error
    setFormErrors(prev => ({ ...prev, [name]: '' }));

    // Validate password in real-time
    if (name === 'password') {
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
    const firstNameValidation = validateName(formData.firstName);
    const lastNameValidation = validateName(formData.lastName);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    // Collect all validation errors
    const newErrors = {
      firstName: firstNameValidation.error || '',
      lastName: lastNameValidation.error || '',
      email: emailValidation.error || '',
      password: passwordValidation.errors[0] || '',
    };

    setFormErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObj.append(key, value);
        });

        await register(formDataObj);
        toast.success('Account created successfully!');
      } catch (error) {
        console.error('Registration error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to create account');
      }
    });
  };

  return (
    <div className="min-h-screen max-h-screen flex">
      {/* Left Column - Premium Professional Design */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* Multi-layered background for depth */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-400" />

          {/* Organic patterns */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_100%)]" />
          <div className="absolute inset-0 opacity-40 bg-[url('/plant.png')] bg-cover bg-center mix-blend-overlay" />

          {/* Additional decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-300/10 rounded-full blur-3xl" />
          </div>

          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col p-6 z-10">
          {/* Top Section */}
          <div>
            {/* Logo Section */}
            <div className="flex items-center space-x-4 mb-6">
              <div
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl 
                           flex items-center justify-center border border-white/20
                           shadow-lg shadow-black/5 relative overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="bg-gradient-to-r from-green-500 to-green-400 p-2.5 rounded-xl">
                  <FaLeaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white/90 text-2xl font-bold tracking-wide">
                  Arkin
                </span>
                <span className="text-white/60 text-sm">
                  Sustainable Agriculture
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-6 max-w-lg mb-2">
              <h1 className="text-6xl font-bold text-white tracking-tight leading-tight">
                Welcome to the Future of Farming
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Join our ecosystem of sustainable agriculture and be part of the
                revolution in organic farming practices.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            {/* Feature Cards with hover effects */}
            <div
              className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
            >
              <div
                className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
              >
                <svg
                  className="size-7 md:size-9 text-sky-300 group-hover:text-sky-200 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12.75L11.25 15L15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296A3.745 3.745 0 0116.5 21a3.745 3.745 0 01-3.296-1.043A3.745 3.745 0 0112 18.75c-1.268 0-2.39-.63-3.068-1.593A3.746 3.746 0 016.5 21a3.745 3.745 0 01-3.296-1.043A3.745 3.745 0 011.5 18.75c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296A3.745 3.745 0 016.5 9a3.745 3.745 0 013.296 1.043A3.746 3.746 0 0112 11.25c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 011.043 3.296A3.745 3.745 0 0118.5 9a3.745 3.745 0 013.296 1.043A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <h3
                  className="text-sky-100 font-semibold text-lg md:text-xl
                           group-hover:text-white transition-colors duration-300"
                >
                  Certified Organic
                </h3>
                <p
                  className="text-slate-400 text-sm md:text-base leading-relaxed
                           group-hover:text-slate-300 transition-colors duration-300 mt-1"
                >
                  Quality assured products.
                </p>
              </div>
            </div>

            <div
              className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
            >
              <div
                className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                >
                  Global Network
                </h3>
                <p
                  className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                >
                  Connected with sustainable farmers worldwide
                </p>
              </div>
            </div>

            <div
              className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
            >
              <div
                className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                >
                  Innovation
                </h3>
                <p
                  className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                >
                  Pioneering sustainable farming technologies
                </p>
              </div>
            </div>

            <div
              className="group flex space-x-4 md:space-x-6 bg-gradient-to-br from-white-800/70 to-slate-900/80 backdrop-blur-lg rounded-2xl p-5 md:p-6
               border border-slate-700/80 h-fit transition-all duration-300 ease-in-out
               hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-700/20 hover:scale-[1.02]"
            >
              <div
                className="flex-shrink-0 size-16 md:size-20 bg-sky-500/10 group-hover:bg-sky-500/20 rounded-xl md:rounded-2xl flex items-center justify-center
                 transition-all duration-300 ease-in-out group-hover:scale-105"
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-white font-semibold text-lg mb-3 
                           group-hover:text-white/90 transition-colors"
                >
                  Sustainability
                </h3>
                <p
                  className="text-white/60 text-base leading-relaxed 
                           group-hover:text-white/70 transition-colors"
                >
                  Eco-friendly practices for a better tomorrow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            {isPending && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
            )}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-xl border transition-colors ${
                      formErrors.firstName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    } focus:border-transparent bg-white`}
                    placeholder="John"
                    required
                    disabled={isPending}
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-xl border transition-colors ${
                      formErrors.lastName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    } focus:border-transparent bg-white`}
                    placeholder="Doe"
                    required
                    disabled={isPending}
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-3 rounded-xl border transition-colors ${
                    formErrors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-green-500'
                  } focus:border-transparent bg-white`}
                  placeholder="john@example.com"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  autoComplete="email"
                  disabled={isPending}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-3 rounded-xl border transition-colors ${
                      formErrors.password
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    } focus:border-transparent bg-white`}
                    placeholder="********"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    disabled={isPending}
                  />
                  {passwordStrength.requirements.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            passwordStrength.score >= 100
                              ? 'bg-green-500'
                              : passwordStrength.score >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {passwordStrength.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending || passwordStrength.requirements.length > 0 || Object.values(formErrors).some(error => error) || Object.values(formData).some(value => value === '')}
                className={`w-full py-3 px-4 rounded-xl
                           bg-gradient-to-r from-green-600 to-green-500 text-white
                           font-medium shadow-lg shadow-green-500/25
                           ${!isPending && !passwordStrength.requirements.length && !Object.values(formErrors).some(error => error) && !Object.values(formData).some(value => value === '') ? 'hover:shadow-xl hover:shadow-green-500/40' : ''}
                           transition-all duration-300
                           ${(isPending || passwordStrength.requirements.length > 0 || Object.values(formErrors).some(error => error) || Object.values(formData).some(value => value === '')) &&
                           'opacity-50 cursor-not-allowed'}`}
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Sign-up Options */}
          <div className="grid grid-cols-1 gap-4">
            <form className="space-y-6 w-full" action={handleGoogleSignIn}>
              <button
                type="submit"
                className="flex min-w-full items-center justify-center gap-2 p-3 bg-white border border-gray-300
                             rounded-xl hover:bg-gray-50 transition-colors"
                disabled={isPending}
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="text-sm font-medium text-gray-600">
                  Continue with Google
                </span>
              </button>
            </form>
          </div>

          <p className="text-sm text-gray-500 text-center">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-green-600 hover:text-green-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:text-green-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
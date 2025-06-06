'use client';
import Image from "next/image";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { handleGoogleSignIn, register } from "@/actions/user";
import { validatePassword, validateEmail, validateName } from "@/lib/validation";
import { toast } from "react-hot-toast";

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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Image + Text */}
      <div className="relative md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-green-900 to-green-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-green-300 rounded-full blur-[128px] animate-pulse delay-700"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8 text-center text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Grow Better,
              <br />
              Naturally.
            </h2>
            <p className="text-lg md:text-xl text-green-50/90 max-w-md mx-auto">
              Join the sustainable farming revolution withArkin organic
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-8">
            {["100% Organic", "Eco-Friendly", "Sustainable"].map((feature) => (
              <div key={feature} className="text-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">
                    {feature === "100% Organic"
                      ? "🌱"
                      : feature === "Eco-Friendly"
                      ? "♻️"
                      : "🌍"}
                  </span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-green-600 hover:text-green-500 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>         <form onSubmit={handleSubmit} className="relative">
           {isPending && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
             </div>
           )}
           <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl text-black border transition-colors ${
                    formErrors.firstName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-green-500'
                  } focus:border-transparent`}
                  placeholder="John"
                  required
                  disabled={isPending}
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                )}              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border text-black transition-colors ${
                    formErrors.lastName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-green-500'
                  } focus:border-transparent`}
                  placeholder="Doe"
                  disabled={isPending}
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                )}
              </div>
            </div>            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border text-black transition-colors ${
                  formErrors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-green-500'
                } focus:border-transparent`}
                placeholder="john@example.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                autoComplete="email"
                disabled={isPending}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-1"
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
                  className={`w-full px-4 py-3 rounded-xl text-black border transition-colors ${
                    formErrors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-green-500'
                  } focus:border-transparent`}
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
              disabled={isPending || passwordStrength.requirements.length > 0}              className={`w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-medium 
                           shadow-lg shadow-green-500/25 transition-all duration-300
                           ${!isPending && 'hover:shadow-xl hover:shadow-green-500/40'}
                           ${(isPending || passwordStrength.requirements.length > 0) && 
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
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <form
              action={handleGoogleSignIn}
            >
              <button
                type="submit"
                className="w-full py-3 px-4 border border-gray-300 rounded-xl flex items-center justify-center gap-3 
                               hover:bg-gray-50 transition-colors"
              >
                <Image src="/google.svg" alt="Google" width={20} height={20} />
                <span className="text-gray-700 font-medium">
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

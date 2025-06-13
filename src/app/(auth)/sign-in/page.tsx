
import React from "react";
import Image from "next/image";
import { handleGoogleSignIn, login } from "@/actions/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import AuthLayout from "@/components/General/authLayout";
import Link from "next/link";

export default async function Login() {
  const session = await getSession();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  return (
    <AuthLayout title="Welcome Back" desc="Sign in to your account" leftDesc="Join our ecosystem of sustainable agriculture and be part of the revolution in organic farming practices." leftheading="Welcome to the Future of Farming">
      {/* Social Login Options */}
      <div className="grid grid-cols-1 gap-4">
        <form className=" w-full  " action={handleGoogleSignIn}>
          <button
            type="submit"
            className="flex min-w-full items-center justify-center gap-2 p-3 bg-white border border-gray-300 
                               rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            <span className="text-sm font-medium text-gray-600">
              Continue with Google
            </span>
          </button>
        </form>
      </div>

      <div className="relative pt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gray-50 text-gray-500">
            or continue with
          </span>
        </div>
      </div>

      {/* Login Form */}
      <form
        className="space-y-4"
        action={async (formData: FormData) => {
          "use server";
          await login(formData);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         transition-colors bg-white"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:border-transparent
                         transition-colors bg-white"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-green-600 rounded border-gray-300 
                           focus:ring-green-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="hover:underline text-sm font-medium text-green-600 hover:text-green-500"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 rounded-xl 
                       bg-gradient-to-r from-green-600 to-green-500 text-white 
                       font-medium shadow-lg shadow-green-500/25 
                       hover:shadow-xl hover:shadow-green-500/40 
                       transition-all duration-300"
        >
          Sign in
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 pt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="hover:underline font-medium text-green-600 hover:text-green-500"
        >
          Sign up now
        </Link>
      </p>
    </AuthLayout>
  )
}

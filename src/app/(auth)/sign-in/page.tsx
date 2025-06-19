
import React from "react";
import Image from "next/image";
import { handleGoogleSignIn, login } from "@/actions/user";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import AuthLayout from "@/components/General/authLayout";
import LoginForm from "@/components/auth/LoginForm";

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
   <LoginForm/>
    </AuthLayout>
  )
}

"use server";

import { signIn } from "@/auth";
import connectDb from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { User } from "@/models/UserSchema";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const register = async (formData: FormData) => {
  const firstname = formData.get("firstName") as string;
  const lastname = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields Are Required");
  }
  await connectDb();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User Already Exist");
  }
  const hashpassword = await hash(password, 12);
  const verificationToken = await generateVerificationToken();
  const verificationTokenExpiry = new Date(Date.now() + 86400000); // 24 hours
  await User.create({
    firstname,
    lastname,
    email,
    password: hashpassword,
    verificationToken,
    verificationTokenExpiry,
  });
  await sendVerificationEmail(email,verificationToken)
  redirect("/verifysent");
};

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const authError = error as CredentialsSignin;
    return authError.cause;
  }
  redirect("/");
};
export { login, register };

export async function handleGoogleSignIn() {
  await signIn("google");
}

"use server";

import { signIn } from "@/auth";
import connectDb from "@/lib/db";
import { User } from "@/models/UserSchema";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const register = async (formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields Are Required");
  }
  await connectDb();
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("User Already Exist");
  }
  const hashpassword = await hash(password, 12);
  await User.create({ firstName, lastName, email, password: hashpassword });
  redirect("/login");
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

"use server";

import { signIn, signOut } from "@/auth";
import connectDb from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { getSession } from "@/lib/getSession";
import { generateVerificationToken } from "@/lib/token";
import { User } from "@/models/UserSchema";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import type { User as UserType } from "@/types";
import { revalidatePath } from "next/cache";

const register = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
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
    email,
    password: hashpassword,
    verificationToken,
    verificationTokenExpiry,
  });
  await sendVerificationEmail(email, verificationToken);
  redirect("/verifysent");
};

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return { error: "All fields required" }
  }
  try {
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (res?.error) {
      return { error: res.error }
    }
    redirect("/");
  } catch (error) {
    const authError = error as CredentialsSignin;
    return authError.cause;
  }
};
export { login, register };

export async function handleGoogleSignIn() {
  await signIn("google", { redirect: true, redirectTo: "/" });
}
export async function handleSignOut() {
  await signOut();
  redirect("/sign-in");
}
export async function getUserSession() {
  const session = await getSession();
  return session?.user ?? null;
}


export async function fetchAllUsers() {
  await connectDb();
  const users = await User.find({});
  return users;
};



// user edit




interface UserUpdate {
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  bio?: string;
  location?: string;
  contact_no?: string;
  image?: string;
  isSubscribedToNewsletter?: boolean;
}

interface EditProfileResponse {
  success: boolean;
  user?: UserType;
  error?: string;
}

export async function editProfile(userId: string, formData: FormData): Promise<EditProfileResponse> {
  try {
    const updates: UserUpdate = {
      name: formData.get("name") as string,
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
      location: formData.get("location") as string,
      contact_no: formData.get("contact_no") as string,
      image: formData.get("image") as string,
      isSubscribedToNewsletter: formData.get("isSubscribedToNewsletter") === "true",
    };

    Object.keys(updates).forEach((key) =>
      updates[key as keyof UserUpdate] === null || updates[key as keyof UserUpdate] === undefined
        ? delete updates[key as keyof UserUpdate]
        : {}
    );

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry");

    if (!user) {
      throw new Error("User not found");
    }

    revalidatePath("/profile");
    return { success: true, user };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

interface GetUserResponse {
  success: boolean;
  user?: UserType;
  error?: string;
}


export async function getUserDetails(userId: string): Promise<GetUserResponse> {
  try {
    const user = await User.findById(userId).select(
      "-password -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry"
    );

    if (!user) {
      throw new Error("User not found");
    }

    return { success: true, user };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
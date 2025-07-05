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


// export async function fetchAllUsers() {
//   await connectDb();
//   const users = await User.find({});
//   return users;
// };

// Interface for plain user output
interface UserOutput {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  authProviderId: string;
  isVerified: boolean;
  isSubscribedToNewsletter: boolean;
  createdAt: string;
}

export async function fetchAllUsers(): Promise<{ success: boolean; data?: UserOutput[]; error?: string }> {
  try {
    await connectDb();
    const users = await User.find().lean();
    const mappedUsers: UserOutput[] = users.map((user: Record<string, unknown>) => ({
      _id: (user._id as unknown as { toString: () => string }).toString(),
      name: user.name as string,
      email: user.email as string,
      image: user.image as string,
      role: user.role as string,
      authProviderId: user.authProviderId as string,
      isVerified: (user.isVerified as boolean) ?? false,
      isSubscribedToNewsletter: (user.isSubscribedToNewsletter as boolean) ?? false,
      createdAt: user.createdAt instanceof Date ? (user.createdAt as Date).toISOString() : (user.createdAt as string),
    }));
    return { success: true, data: mappedUsers };
  } catch (error) {
    console.error("User fetch error:", error);
    return { success: false, error: 'Failed to fetch users' };
  }


}
export async function deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await connectDb();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true };
  } catch (error) {
    console.error("User deletion error:", error);
    return { success: false, error: 'Failed to delete user' };
  }
}
// user edit




interface UserUpdate {
  name?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  bio?: string;
  location?: string;
  contact_no?: string;
  alternate_contact_no?: string;
  image?: string;
  isVerified?: boolean;
  isSubscribedToNewsletter?: boolean;
}

interface EditProfileResponse {
  success: boolean;
  user?: UserGet;
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
      alternate_contact_no: formData.get("alternate_contact_no") as string,
      image: formData.get("image") as string,
      isSubscribedToNewsletter: formData.get("isSubscribedToNewsletter") === "true",
      isVerified: formData.get("isVerified") === "true",
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
    return { success: true };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
interface UserGet {
  _id: string;
  name: string;
  firstname?: string;
  lastname?: string;
  email: string;
  image: string;
  role: string;
  authProviderId: string;
  isVerified: boolean;
  isSubscribedToNewsletter: boolean;
  createdAt: string;
  bio?: string;
  location?: string;
  contact_no?: string;
  alternate_contact_no?: string;
}
interface GetUserResponse {
  success: boolean;
  user?: UserGet;
  error?: string;
}


export async function getUserDetails(userId: string): Promise<GetUserResponse> {
  try {
    const user = await User.findById(userId).select(
      "-password -verificationToken -verificationTokenExpiry -resetPasswordToken -resetPasswordTokenExpiry"
    ).lean() as UserGet | null;

    if (!user) {
      throw new Error("User not found");
    }
    const serializedUser: UserGet = {
      _id: user._id?.toString() ?? "",
      name: user.name ?? "",
      firstname: user.firstname ?? "",
      lastname: user.lastname ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
      role: user.role ?? "",
      authProviderId: user.authProviderId ?? "",
      isVerified: user.isVerified ?? false,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter ?? false,
      createdAt: ((user.createdAt as unknown) instanceof Date) ? ((user.createdAt as unknown as Date).toISOString()) : (user.createdAt ?? ""),
      bio: user.bio ?? "",
      location: user.location ?? "",
      contact_no: user.contact_no ?? "",
      alternate_contact_no: user.alternate_contact_no ?? "",
    };
    return { success: true, user: serializedUser };
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}







import connectDb from "@/lib/db";
import { User } from "@/models/UserSchema";
import { hash } from "bcryptjs";

import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { token, password, confirmpassword } = await req.json();
    if (!token || !password || !confirmpassword) {
      return NextResponse.json(
        { error: "Token and password required" },
        { status: 400 }
      );
    }
    if (password !== confirmpassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }
    await connectDb();

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: new Date() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expire Token" },
        { status: 400 }
      );
    }
    // update password
    const hashedPassword = await hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ success: "Password reset successfully" }, {status:200});
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Error resetting password" },
      { status: 500 }
    );
  }
}

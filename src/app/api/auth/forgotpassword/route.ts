import connectDb from "@/lib/db";
import { generateResetToken } from "@/lib/token";
import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await connectDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists with this email, a password reset link will be sent",
      });
    }
      // Generate reset token
      const resetToken = generateResetToken();
      user.resetPasswordToken=resetToken;
      user.resetPasswordTokenExpiry= new Date(Date.now()+3600000)
      await user.save();
       return NextResponse.json({ 
      message: "If an account exists with this email, a password reset link will be sent" 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

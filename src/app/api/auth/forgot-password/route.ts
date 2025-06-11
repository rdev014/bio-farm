import connectDb from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { generateResetToken } from "@/lib/token";
import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ mullu: "Email is required" }, { status: 400 });
    }
    await connectDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success:
            "If an account exists with this email, a password reset link will be sent",
        },
        { status: 400 }
      );
    }
    // Generate reset token
    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    await sendPasswordResetEmail(email, resetToken);
    return NextResponse.json({
      message:
        "If an account exists with this email, a password reset link will be sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

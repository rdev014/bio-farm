import connectDb from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
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
      return NextResponse.json(
        {
          success:
            "A reset link will be sent if the account exists.",
        },
        { status: 200 }
      );
    }
    // Generate reset token
    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    await sendPasswordResetEmail(email, resetToken);
    return NextResponse.json({
      success:
        "A reset link will be sent if the account exists.",
    },  { status: 200 });
  } catch (error) {
console.error(error)
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

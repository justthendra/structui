import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.email_verified) {
      return NextResponse.json({ error: "Email is already verified." }, { status: 400 });
    }

    // Delete any old tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { user_id: user.id },
    });

    // Create new token
    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await prisma.verificationToken.create({
      data: {
        user_id: user.id,
        token,
        expires_at,
      },
    });

    await sendVerificationEmail(user.email, user.username || "Developer", token);

    return NextResponse.json({
      success: true,
      message: "Verification email resent successfully!",
    });
  } catch (error: any) {
    console.error("Resend Verification Error:", error);
    return NextResponse.json({ error: error.message || "Failed to resend verification email" }, { status: 500 });
  }
}

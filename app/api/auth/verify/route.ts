import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
    }

    const verificationRecord = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationRecord) {
      return NextResponse.redirect(new URL("/login?error=expired_token", req.url));
    }

    // Check expiration
    if (new Date(verificationRecord.expires_at) < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.redirect(new URL("/login?error=token_expired", req.url));
    }

    // Mark email as verified
    const updatedUser = await prisma.user.update({
      where: { id: verificationRecord.user_id },
      data: { email_verified: true },
    });

    // Delete used verification token
    await prisma.verificationToken.delete({ where: { token } });

    // Update user session cookie
    const jwtToken = signToken({
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
    });
    await setSessionCookie(jwtToken);

    return NextResponse.redirect(new URL("/auth/verified", req.url));
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.redirect(new URL("/login?error=verification_failed", req.url));
  }
}

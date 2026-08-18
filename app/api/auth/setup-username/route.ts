import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, signToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await req.json();
    if (!username) {
      return NextResponse.json({ error: "Username is required." }, { status: 400 });
    }

    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3 and 20 alphanumeric characters." },
        { status: 400 }
      );
    }

    // Check availability
    const existing = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (existing && existing.id !== user.id) {
      return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { username: cleanUsername },
    });

    // Refresh JWT session cookie
    const jwtToken = signToken({
      id: updatedUser.id,
      email: updatedUser.email,
      username: cleanUsername,
      role: updatedUser.role,
    });
    await setSessionCookie(jwtToken);

    return NextResponse.json({
      success: true,
      username: cleanUsername,
    });
  } catch (error: any) {
    console.error("Setup Username Error:", error);
    return NextResponse.json({ error: error.message || "Failed to set username" }, { status: 500 });
  }
}

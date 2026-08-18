import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { signToken, setSessionCookie } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { username, email, password, name } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
    const cleanEmail = email.trim().toLowerCase();

    if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      return NextResponse.json(
        { error: "Username must be between 3 and 20 alphanumeric characters." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanUsername },
          { email: cleanEmail },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === cleanUsername) {
        return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
      }
      if (existingUser.email === cleanEmail) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
      }
    }

    // Auto-promote first user to admin
    const totalUsers = await prisma.user.count();
    const role = totalUsers === 0 ? "admin" : "developer";

    const password_hash = await bcrypt.hash(password, 10);
    const avatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${cleanUsername}`;

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        password_hash,
        name: name?.trim() || cleanUsername,
        avatar,
        role,
        email_verified: false,
      },
    });

    // Create verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.verificationToken.create({
      data: {
        user_id: newUser.id,
        token,
        expires_at,
      },
    });

    // Send verification email
    await sendVerificationEmail(cleanEmail, cleanUsername, token);

    // Sign JWT & set session cookie
    const jwtToken = signToken({
      id: newUser.id,
      email: cleanEmail,
      username: cleanUsername,
      role: newUser.role,
    });
    await setSessionCookie(jwtToken);

    return NextResponse.json({
      success: true,
      message: "Registration successful! Verification email sent.",
      user: {
        id: newUser.id,
        username: cleanUsername,
        email: cleanEmail,
        name: newUser.name,
        avatar: newUser.avatar,
        role: newUser.role,
        email_verified: false,
      },
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

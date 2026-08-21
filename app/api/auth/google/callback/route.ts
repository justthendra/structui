import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam || !code) {
      return NextResponse.redirect(
        new URL("/login?error=google_denied", req.url)
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri =
      process.env.GOOGLE_REDIRECT_URI ||
      `${new URL(req.url).origin}/api/auth/google/callback`;

    if (!clientId || !clientSecret || clientId === "your_google_client_id_here") {
      return NextResponse.redirect(
        new URL("/login?error=google_not_configured", req.url)
      );
    }

    // Exchange authorization code for token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Google Token Exchange Failed:", tokenData);
      return NextResponse.redirect(
        new URL("/login?error=google_token_failed", req.url)
      );
    }

    // Fetch user info from Google API
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const googleUser = await userRes.json();
    if (!userRes.ok || !googleUser.sub) {
      console.error("Google User Fetch Failed:", googleUser);
      return NextResponse.redirect(
        new URL("/login?error=google_user_failed", req.url)
      );
    }

    const googleId = googleUser.sub;
    const email = googleUser.email || null;
    const name = googleUser.name || googleUser.given_name || (email ? email.split("@")[0] : "Google User");
    const avatar = googleUser.picture || null;
    const emailVerified = Boolean(googleUser.email_verified);

    // Check if user already exists in DB
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { google_id: googleId },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    const isFirstTime = !user;

    if (!user) {
      const totalUsers = await prisma.user.count();
      const role = totalUsers === 0 ? "admin" : "developer";

      user = await prisma.user.create({
        data: {
          google_id: googleId,
          name,
          email,
          avatar,
          email_verified: emailVerified,
          role,
        },
      });
    } else {
      // Update google metadata and email verification
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          google_id: googleId,
          email_verified: emailVerified || user.email_verified,
          ...(user.avatar ? {} : { avatar }),
          ...(user.name ? {} : { name }),
        },
      });
    }

    // Sign JWT & set session cookie
    const jwtToken = signToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    await setSessionCookie(jwtToken);

    // If user has no username set yet, redirect to onboarding username setup
    if (!user.username || isFirstTime) {
      return NextResponse.redirect(new URL("/auth/setup-username", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error: any) {
    console.error("Google Auth Callback Error:", error);
    return NextResponse.redirect(
      new URL("/login?error=google_error", req.url)
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, setSessionCookie } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login?error=discord_denied", req.url));
    }

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const redirectUri = process.env.DISCORD_REDIRECT_URI || "http://localhost:3000/api/auth/discord/callback";

    if (!clientId || !clientSecret) {
      return NextResponse.redirect(new URL("/login?error=discord_not_configured", req.url));
    }

    // Exchange authorization code for token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
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
      console.error("Discord Token Exchange Failed:", tokenData);
      return NextResponse.redirect(new URL("/login?error=discord_token_failed", req.url));
    }

    // Fetch user info from Discord API
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const discordUser = await userRes.json();
    if (!userRes.ok || !discordUser.id) {
      return NextResponse.redirect(new URL("/login?error=discord_user_failed", req.url));
    }

    const discordId = discordUser.id;
    const discordUsername = discordUser.username;
    const discordAvatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordId}/${discordUser.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(discordUser.discriminator || "0") % 5}.png`;
    const discordEmail = discordUser.email || null;

    // Check if user already exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { discord_id: discordId },
          ...(discordEmail ? [{ email: discordEmail }] : []),
        ],
      },
    });

    const isFirstTime = !user;

    if (!user) {
      const totalUsers = await prisma.user.count();
      const role = totalUsers === 0 ? "admin" : "developer";

      user = await prisma.user.create({
        data: {
          discord_id: discordId,
          discord_username: discordUsername,
          discord_avatar: discordAvatar,
          name: discordUser.global_name || discordUsername,
          email: discordEmail,
          avatar: discordAvatar,
          email_verified: Boolean(discordUser.verified),
          role,
        },
      });
    } else {
      // Update discord metadata
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          discord_id: discordId,
          discord_username: discordUsername,
          discord_avatar: discordAvatar,
          ...(user.avatar ? {} : { avatar: discordAvatar }),
        },
      });
    }

    // Sign JWT & set session
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
    console.error("Discord Auth Callback Error:", error);
    return NextResponse.redirect(new URL("/login?error=discord_error", req.url));
  }
}

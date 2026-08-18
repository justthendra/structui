import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI || `${new URL(req.url).origin}/api/auth/discord/callback`;

  // If Discord Client ID is configured, redirect to real Discord OAuth
  if (clientId && clientId !== "your_discord_client_id") {
    const scope = encodeURIComponent("identify email");
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}`;
    return NextResponse.redirect(discordAuthUrl);
  }

  // Fallback demo Discord flow (for testing without Discord credentials)
  return NextResponse.redirect(`${new URL(req.url).origin}/api/auth/discord/callback?demo=true`);
}

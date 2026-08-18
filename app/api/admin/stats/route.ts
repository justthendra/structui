import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [
      totalUsers,
      totalSnippets,
      totalVerified,
      totalDiscordUsers,
      totalEmailVerified,
      totalBanned,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.snippet.count(),
      prisma.user.count({ where: { is_verified: true } }),
      prisma.user.count({ where: { discord_id: { not: null } } }),
      prisma.user.count({ where: { email_verified: true } }),
      prisma.user.count({ where: { is_banned: true } }),
      prisma.user.findMany({
        orderBy: { created_at: "desc" },
        take: 8,
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          is_banned: true,
          is_verified: true,
          email_verified: true,
          discord_username: true,
          created_at: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalSnippets,
        totalVerified,
        totalDiscordUsers,
        totalEmailVerified,
        totalBanned,
      },
      recentUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

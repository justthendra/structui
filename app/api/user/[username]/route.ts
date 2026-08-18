import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const cleanUsername = username.toLowerCase();
    const currentUser = await getCurrentUser();

    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        banner: true,
        title: true,
        bio: true,
        location: true,
        website: true,
        github_url: true,
        twitter_url: true,
        linkedin_url: true,
        tech_stack: true,
        role: true,
        is_verified: true,
        email_verified: true,
        discord_username: true,
        created_at: true,
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const snippets = await prisma.snippet.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
    });

    const totalStars = snippets.reduce((acc, s) => acc + (s.stars_count || 0), 0);
    const totalViews = snippets.reduce((acc, s) => acc + (s.views_count || 0), 0);

    // Check if current logged-in user is following this profile
    let isFollowing = false;
    if (currentUser && currentUser.id !== user.id) {
      try {
        const followRecord = await prisma.userFollow.findUnique({
          where: {
            follower_id_following_id: {
              follower_id: currentUser.id,
              following_id: user.id,
            },
          },
        });
        isFollowing = Boolean(followRecord);
      } catch {}
    }

    return NextResponse.json({
      user: {
        ...user,
        followers_count: user._count?.followers ?? 0,
        following_count: user._count?.following ?? 0,
        total_stars: totalStars,
        total_views: totalViews,
        is_following: isFollowing,
      },
      snippets,
    });
  } catch (error: any) {
    console.error("GET User Profile API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

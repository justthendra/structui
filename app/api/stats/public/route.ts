import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalUsers, totalSnippets, totalVerified, snippetsAgg] = await Promise.all([
      prisma.user.count({ where: { is_banned: false } }),
      prisma.snippet.count(),
      prisma.user.count({ where: { is_verified: true, is_banned: false } }),
      prisma.snippet.aggregate({
        _sum: {
          stars_count: true,
          views_count: true,
        },
      }),
    ]);

    const totalStars = snippetsAgg._sum.stars_count || 0;
    const totalViews = snippetsAgg._sum.views_count || 0;

    // Real Top Developers for Leaderboard
    const usersWithSnippets = await prisma.user.findMany({
      where: {
        is_banned: false,
        username: { not: null },
      },
      select: {
        id: true,
        username: true,
        name: true,
        avatar: true,
        is_verified: true,
        created_at: true,
        snippets: {
          select: {
            id: true,
            stars_count: true,
          },
        },
      },
      take: 10,
    });

    const topDevelopers = usersWithSnippets
      .map((u) => {
        const snippets_count = u.snippets.length;
        const user_stars = u.snippets.reduce((acc, s) => acc + (s.stars_count || 0), 0);
        const points = snippets_count * 100 + user_stars * 15;
        return {
          id: u.id,
          username: u.username,
          name: u.name,
          avatar: u.avatar,
          is_verified: u.is_verified,
          snippets_count,
          total_stars: user_stars,
          points,
        };
      })
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);

    // Real Latest Snippets for Bento Feed
    const latestSnippetsRaw = await prisma.snippet.findMany({
      where: {
        user: { is_banned: false },
      },
      orderBy: { created_at: "desc" },
      take: 4,
      include: {
        user: {
          select: {
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const latestSnippets = latestSnippetsRaw.map((s) => ({
      id: s.id,
      title: s.title,
      code: s.code,
      language: s.language,
      category: s.category,
      price: s.price,
      stars_count: s.stars_count,
      username: s.user.username,
      author_name: s.user.name,
      author_avatar: s.user.avatar,
    }));

    // Featured Real Developer
    const featuredDeveloper = topDevelopers[0] || null;

    return NextResponse.json({
      stats: {
        totalUsers,
        totalSnippets,
        totalVerified,
        totalStars,
        totalViews,
      },
      topDevelopers,
      latestSnippets,
      featuredDeveloper,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

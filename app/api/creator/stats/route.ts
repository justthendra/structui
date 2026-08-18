import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mySnippets = await prisma.snippet.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
    });

    const totalViews = mySnippets.reduce((acc, s) => acc + (s.views_count || 0), 0);
    const totalStars = mySnippets.reduce((acc, s) => acc + (s.stars_count || 0), 0);
    const paidSnippets = mySnippets.filter((s) => (s.price || 0) > 0);
    const estimatedSalesVolume = paidSnippets.reduce(
      (acc, s) => acc + s.price * Math.max(1, Math.floor((s.views_count || 0) * 0.03)),
      0
    );

    return NextResponse.json({
      stats: {
        totalSnippets: mySnippets.length,
        totalViews,
        totalStars,
        paidSnippetsCount: paidSnippets.length,
        estimatedEarnings: estimatedSalesVolume.toFixed(2),
      },
      snippets: mySnippets,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

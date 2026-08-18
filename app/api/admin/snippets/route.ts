import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const snippets = await prisma.snippet.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            avatar: true,
            is_verified: true,
          },
        },
      },
    });

    const formattedSnippets = snippets.map((s) => ({
      ...s,
      username: s.user.username,
      author_name: s.user.name,
      author_avatar: s.user.avatar,
      author_verified: s.user.is_verified,
    }));

    return NextResponse.json({ snippets: formattedSnippets });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

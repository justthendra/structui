import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to star snippets." }, { status: 401 });
    }

    const { id } = await params;

    const existingStar = await prisma.snippetStar.findUnique({
      where: {
        user_id_snippet_id: {
          user_id: user.id,
          snippet_id: id,
        },
      },
    });

    let starred = false;
    if (existingStar) {
      // Unstar
      await prisma.$transaction([
        prisma.snippetStar.delete({
          where: {
            user_id_snippet_id: {
              user_id: user.id,
              snippet_id: id,
            },
          },
        }),
        prisma.snippet.update({
          where: { id },
          data: { stars_count: { decrement: 1 } },
        }),
      ]);
      starred = false;
    } else {
      // Star
      await prisma.$transaction([
        prisma.snippetStar.create({
          data: {
            user_id: user.id,
            snippet_id: id,
          },
        }),
        prisma.snippet.update({
          where: { id },
          data: { stars_count: { increment: 1 } },
        }),
      ]);
      starred = true;
    }

    const snippet = await prisma.snippet.findUnique({
      where: { id },
      select: { stars_count: true },
    });

    return NextResponse.json({
      success: true,
      starred,
      starsCount: Math.max(0, snippet?.stars_count || 0),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

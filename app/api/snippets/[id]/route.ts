import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Increment views count atomically
    const snippet = await prisma.snippet.update({
      where: { id },
      data: {
        views_count: { increment: 1 },
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            avatar: true,
            bio: true,
            is_verified: true,
          },
        },
      },
    });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    return NextResponse.json({
      snippet: {
        ...snippet,
        username: snippet.user.username,
        author_name: snippet.user.name,
        author_avatar: snippet.user.avatar,
        author_bio: snippet.user.bio,
        author_verified: snippet.user.is_verified,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.snippet.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (existing.user_id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, description, code, language, category, price, tags } = await req.json();

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title.trim();
    if (description !== undefined) dataToUpdate.description = description.trim();
    if (code !== undefined) dataToUpdate.code = code;
    if (language !== undefined) dataToUpdate.language = language;
    if (category !== undefined) dataToUpdate.category = category;
    if (price !== undefined) dataToUpdate.price = parseFloat(price) || 0;
    if (tags !== undefined) dataToUpdate.tags = tags?.trim() || null;

    const updated = await prisma.snippet.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, snippet: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.snippet.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (existing.user_id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.snippet.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Snippet deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

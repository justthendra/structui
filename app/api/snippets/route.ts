import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase().trim() || "";
    const category = searchParams.get("category") || "all";
    const language = searchParams.get("language") || "all";
    const priceFilter = searchParams.get("price") || "all";
    const sort = searchParams.get("sort") || "trending";

    const where: any = {
      user: {
        is_banned: false,
      },
    };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
        { user: { username: { contains: search } } },
      ];
    }

    if (category && category !== "all" && category !== "All") {
      where.category = category;
    }

    if (language && language !== "all") {
      where.language = language.toLowerCase();
    }

    if (priceFilter === "free") {
      where.price = { equals: 0 };
    } else if (priceFilter === "paid") {
      where.price = { gt: 0 };
    }

    let orderBy: any = { created_at: "desc" };
    if (sort === "stars") {
      orderBy = [{ stars_count: "desc" }, { created_at: "desc" }];
    } else if (sort === "trending") {
      orderBy = [{ is_featured: "desc" }, { stars_count: "desc" }, { views_count: "desc" }];
    }

    const snippets = await prisma.snippet.findMany({
      where,
      orderBy,
      take: 60,
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

    const formatted = snippets.map((s) => ({
      ...s,
      username: s.user.username,
      author_name: s.user.name,
      author_avatar: s.user.avatar,
      author_verified: s.user.is_verified,
    }));

    return NextResponse.json({ snippets: formatted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to publish code." }, { status: 401 });
    }

    const { title, description, code, language, category, price, tags } = await req.json();

    if (!title || !code) {
      return NextResponse.json({ error: "Title and code content are required." }, { status: 400 });
    }

    const parsedPrice = parseFloat(price) || 0;

    const created = await prisma.snippet.create({
      data: {
        user_id: user.id,
        title: title.trim(),
        description: description?.trim() || null,
        code,
        language: language || "typescript",
        category: category || "React Components",
        price: parsedPrice,
        tags: tags?.trim() || null,
      },
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

    return NextResponse.json({
      success: true,
      snippet: {
        ...created,
        username: created.user.username,
        author_name: created.user.name,
        author_avatar: created.user.avatar,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Please log in to follow developers." }, { status: 401 });
    }

    const { username } = await params;
    const targetUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: { id: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (targetUser.id === currentUser.id) {
      return NextResponse.json({ error: "You cannot follow yourself." }, { status: 400 });
    }

    const existingFollow = await prisma.userFollow.findUnique({
      where: {
        follower_id_following_id: {
          follower_id: currentUser.id,
          following_id: targetUser.id,
        },
      },
    });

    let following = false;
    if (existingFollow) {
      await prisma.userFollow.delete({
        where: {
          follower_id_following_id: {
            follower_id: currentUser.id,
            following_id: targetUser.id,
          },
        },
      });
      following = false;
    } else {
      await prisma.userFollow.create({
        data: {
          follower_id: currentUser.id,
          following_id: targetUser.id,
        },
      });
      following = true;
    }

    const followersCount = await prisma.userFollow.count({
      where: { following_id: targetUser.id },
    });

    return NextResponse.json({ success: true, following, followersCount });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

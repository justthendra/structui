import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      bio,
      avatar,
      banner,
      title,
      location,
      website,
      github_url,
      twitter_url,
      linkedin_url,
      tech_stack,
    } = await req.json();

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name?.trim() || null;
    if (bio !== undefined) dataToUpdate.bio = bio?.trim() || null;
    if (avatar !== undefined) dataToUpdate.avatar = avatar?.trim() || null;
    if (banner !== undefined) dataToUpdate.banner = banner?.trim() || null;
    if (title !== undefined) dataToUpdate.title = title?.trim() || null;
    if (location !== undefined) dataToUpdate.location = location?.trim() || null;
    if (website !== undefined) dataToUpdate.website = website?.trim() || null;
    if (github_url !== undefined) dataToUpdate.github_url = github_url?.trim() || null;
    if (twitter_url !== undefined) dataToUpdate.twitter_url = twitter_url?.trim() || null;
    if (linkedin_url !== undefined) dataToUpdate.linkedin_url = linkedin_url?.trim() || null;
    if (tech_stack !== undefined) dataToUpdate.tech_stack = tech_stack?.trim() || null;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

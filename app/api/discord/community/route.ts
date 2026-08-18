import { NextResponse } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  const guildId = process.env.DISCORD_GUILD_ID || "1539313350863749171";
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const inviteUrl = process.env.DISCORD_INVITE_URL || "https://discord.gg/MdQqack6Jb";

  try {
    if (botToken) {
      const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}?with_counts=true`, {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const guild = await res.json();
        const iconUrl = guild.icon
          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
          : null;

        const bannerUrl = guild.banner
          ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=1024`
          : null;

        return NextResponse.json({
          id: guild.id,
          name: guild.name || "StructUI Community",
          description:
            guild.description ||
            "The official home for code builders, UI/UX engineers, and creators building modern web components with StructUI.",
          icon: iconUrl,
          banner: bannerUrl,
          approximate_member_count: guild.approximate_member_count || 1,
          approximate_presence_count: guild.approximate_presence_count || 1,
          invite_url: inviteUrl,
          instant_invite: inviteUrl,
          features: guild.features || [],
          roles_count: guild.roles?.length || 0,
          is_live: true,
        });
      }
    }

    // Fallback if widget is enabled without bot token
    const widgetRes = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
      next: { revalidate: 60 },
    });

    if (widgetRes.ok) {
      const widget = await widgetRes.json();
      return NextResponse.json({
        id: widget.id || guildId,
        name: widget.name || "StructUI Community",
        description: "The home of clean architecture and open-source UI components.",
        icon: null,
        banner: null,
        approximate_member_count: widget.presence_count ? widget.presence_count * 2 : 10,
        approximate_presence_count: widget.presence_count || 1,
        invite_url: widget.instant_invite || inviteUrl,
        instant_invite: widget.instant_invite || inviteUrl,
        is_live: true,
      });
    }

    // Default structured response
    return NextResponse.json({
      id: guildId,
      name: "StructUI",
      description:
        "The official home for code builders, UI/UX engineers, and creators building modern web components with StructUI.",
      icon: "https://cdn.discordapp.com/icons/1539313350863749171/58b6bb2b5fa01df7b93f9347166c8c72.png?size=256",
      banner: null,
      approximate_member_count: 2,
      approximate_presence_count: 2,
      invite_url: inviteUrl,
      instant_invite: inviteUrl,
      is_live: false,
    });
  } catch (error) {
    console.error("Failed to fetch Discord server data:", error);
    return NextResponse.json({
      id: guildId,
      name: "StructUI",
      description:
        "The official home for code builders, UI/UX engineers, and creators building modern web components with StructUI.",
      icon: "https://cdn.discordapp.com/icons/1539313350863749171/58b6bb2b5fa01df7b93f9347166c8c72.png?size=256",
      banner: null,
      approximate_member_count: 2,
      approximate_presence_count: 2,
      invite_url: inviteUrl,
      instant_invite: inviteUrl,
      is_live: false,
    });
  }
}

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_jwt_discode_2026";
const COOKIE_NAME = "discode_session";

export interface UserSession {
  id: string;
  username: string | null;
  email: string | null;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  role: "admin" | "moderator" | "developer";
  is_verified: boolean;
  email_verified: boolean;
  discord_username: string | null;
}

export function signToken(user: { id: string; email?: string | null; username?: string | null; role?: string }): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role || "developer",
    },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
}

export function verifyToken(token: string): { id: string; email?: string; username?: string; role?: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user || user.is_banned) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      role: (user.role as any) || "developer",
      is_verified: Boolean(user.is_verified),
      email_verified: Boolean(user.email_verified),
      discord_username: user.discord_username,
    };
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}

export async function requireAdmin(): Promise<UserSession | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return null;
  }
  return user;
}

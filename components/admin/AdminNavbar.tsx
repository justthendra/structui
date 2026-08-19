"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeDropdown from "@/components/ThemeDropdown";
import {
  LayoutDashboard,
  Users,
  Code2,
  Settings2,
  ExternalLink,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Developers & Roles", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Code Moderation", href: "/admin/snippets", icon: <Code2 className="w-4 h-4" /> },
    { label: "System Health", href: "/admin/settings", icon: <Settings2 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-zinc-800 shadow-xs font-geist">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Admin Tag */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <img
              src="/icons/structui-icon.svg"
              alt="structui admin"
              className="w-8 h-8 group-hover:scale-105 transition-transform"
            />
            <span className="font-bricolage font-extrabold text-xl tracking-tight text-[#202020] dark:text-white">
              struct<span className="text-[#3D38E9] dark:text-[#818cf8]">ui</span><span className="text-[#3D38E9] dark:text-[#818cf8]">.</span>
            </span>
            <span className="bg-[#3D38E9]/10 dark:bg-[#3D38E9]/20 text-[#3D38E9] dark:text-[#a5b4fc] border border-[#3D38E9]/20 dark:border-[#3D38E9]/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Admin Console
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#3D38E9] text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-[#202020] dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-zinc-800/80"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Theme Toggle, Exit to Live Site & Admin Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Dropdown */}
          <ThemeDropdown align="right" />

          {/* Back to Live Site Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-[#202020] dark:hover:text-white bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200/80 dark:hover:bg-zinc-700 border border-neutral-200 dark:border-zinc-700 transition-colors cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </Link>

          {/* Admin User Chip */}
          <div className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-white dark:bg-zinc-900 rounded-full border border-neutral-200/90 dark:border-zinc-700 shadow-xs">
            <img
              src={user?.avatar || "/teaser/avatars/creator-1.png"}
              alt={user?.username || "Admin"}
              className="w-7 h-7 rounded-full object-cover border border-neutral-200 dark:border-zinc-700"
            />
            <div className="hidden sm:block leading-tight text-left">
              <p className="text-xs font-bold text-[#202020] dark:text-white max-w-[100px] truncate">
                @{user?.username}
              </p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5" />
                Admin
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            title="Log Out"
            className="p-2 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

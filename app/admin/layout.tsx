"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminFooter from "@/components/admin/AdminFooter";
import { LayoutDashboard, Users, Code2, Settings2, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        router.push("/");
      } else {
        setAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between font-geist">
        <AdminNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-zinc-500 font-medium">Verifying Admin Access…</p>
          </div>
        </div>
        <AdminFooter />
      </div>
    );
  }

  const navTabs = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Developers & Roles", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
    { label: "Code Moderation", href: "/admin/snippets", icon: <Code2 className="w-4 h-4" /> },
    { label: "System Health", href: "/admin/settings", icon: <Settings2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white text-[#202020] flex flex-col justify-between font-geist relative selection:bg-[#3D38E9]/20 selection:text-[#3D38E9]">
      {/* Dedicated Admin Navbar */}
      <AdminNavbar />

      {/* Admin Hero Header with Dot Pattern */}
      <div className="relative bg-[#F7F7F7] border-b border-neutral-200/80 pt-10 pb-8 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-2 bg-white px-3 py-1 rounded-full border border-neutral-200 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3D38E9]" />
                <span className="text-zinc-600 text-xs font-semibold font-geist">
                  structui Operations
                </span>
                <span className="bg-[#3D38E9] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                  Admin
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold font-bricolage text-[#202020] tracking-tighter leading-tight">
                Platform Management
              </h1>
              <p className="text-zinc-500 text-sm font-geist mt-1.5 max-w-lg">
                Manage developers, roles, permissions, code submissions, and system diagnostics.
              </p>
            </div>

            {/* Sub-Navigation Pill Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar bg-white p-1.5 rounded-2xl border border-neutral-200/80 shadow-xs">
              {navTabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      active
                        ? "bg-[#3D38E9] text-white shadow-xs"
                        : "text-zinc-600 hover:text-[#202020] hover:bg-neutral-100/80"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Main Body */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-10">
        {children}
      </main>

      {/* Dedicated Admin Footer */}
      <AdminFooter />
    </div>
  );
}

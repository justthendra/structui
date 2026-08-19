"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t border-neutral-200/80 dark:border-zinc-800/80 py-6 px-6 font-geist text-xs text-zinc-500 dark:text-zinc-400 mt-auto transition-colors duration-200">
      <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-[#202020] dark:text-white">
            <ShieldCheck className="w-4 h-4 text-[#3D38E9] dark:text-[#818cf8]" />
            <span>structui Control Center</span>
          </div>
          <span className="text-neutral-300 dark:text-zinc-700">|</span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">v1.0.0 Enterprise</span>
        </div>

        {/* Center Quick Diagnostic Links */}
        <div className="flex items-center gap-4 text-xs">
          <Link href="/admin/settings" className="hover:text-[#3D38E9] dark:hover:text-[#818cf8] transition-colors inline-flex items-center gap-1">
            <Cpu className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            <span>Prisma SQLite Engine</span>
          </Link>
          <span className="text-neutral-300 dark:text-zinc-700">·</span>
          <Link href="/admin/settings" className="hover:text-[#3D38E9] dark:hover:text-[#818cf8] transition-colors inline-flex items-center gap-1">
            <Terminal className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            <span>SMTP Service</span>
          </Link>
          <span className="text-neutral-300 dark:text-zinc-700">·</span>
          <Link href="/" className="hover:text-[#3D38E9] dark:hover:text-[#818cf8] transition-colors">
            Main Application
          </Link>
        </div>

        {/* Right Copyright */}
        <div className="text-[11px] text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} structui Admin Console. Internal operations only.
        </div>
      </div>
    </footer>
  );
}

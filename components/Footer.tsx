import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white pt-16 pb-12 px-6 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto flex flex-col justify-between items-start gap-12">
        {/* Top: Brand info and Link columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/icons/structui-icon.svg"
                alt="structui"
                className="w-8 h-8 object-contain"
              />
              <span className="font-bricolage font-extrabold text-2xl tracking-tight text-white">
                struct<span className="text-[#6366F1]">ui</span><span className="text-[#6366F1]">.</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-xs font-normal font-geist leading-relaxed">
              The premier marketplace and code ecosystem for developers. Discover, copy, and monetize clean production-ready code.
            </p>
          </div>

          {/* Col 2: Marketplace */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bricolage text-sm font-bold text-white tracking-wide">
              Marketplace
            </h4>
            <div className="flex flex-col gap-2 font-geist text-xs text-zinc-400">
              <Link href="/explore" className="hover:text-white transition-colors">
                React Components
              </Link>
              <Link href="/explore" className="hover:text-white transition-colors">
                Tailwind UI Kits
              </Link>
              <Link href="/explore" className="hover:text-white transition-colors">
                Next.js Starters
              </Link>
              <Link href="/explore" className="hover:text-white transition-colors">
                Three.js &amp; Shaders
              </Link>
            </div>
          </div>

          {/* Col 3: Creators */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bricolage text-sm font-bold text-white tracking-wide">
              Developers
            </h4>
            <div className="flex flex-col gap-2 font-geist text-xs text-zinc-400">
              <Link href="/explore" className="hover:text-white transition-colors">
                Explore Marketplace
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About &amp; kodikas.org
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Publish Code (0% Fee)
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Developer Login
              </Link>
              <Link href="/register" className="hover:text-white transition-colors">
                Join Community
              </Link>
            </div>
          </div>

          {/* Col 4: Community & Social */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bricolage text-sm font-bold text-white tracking-wide">
              Community
            </h4>
            <div className="flex flex-col gap-2 font-geist text-xs text-zinc-400">
              <a
                href="https://discord.gg/MdQqack6Jb"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>Discord Server</span>
                <span className="text-[10px] bg-[#5865F2] text-white px-1.5 py-0.2 rounded font-bold">Community</span>
              </a>
              <a
                href="https://github.com/structui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
              <a
                href="https://x.com/structui"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter / X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Watermark & Copyright */}
        <div className="w-full flex flex-col items-center justify-between gap-6 border-t border-zinc-800/80 pt-8">
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-zinc-500 font-geist text-xs gap-4">
            <p className="font-geist text-xs text-zinc-500">
              © {new Date().getFullYear()} structui. A project by{" "}
              <a href="https://kodikas.org" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white underline">
                Kodikas Organization (kodikas.org)
              </a>
              . All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-zinc-400 transition-colors">
                Code License
              </a>
            </div>
          </div>

          {/* Large Stylized structui Watermark */}
          <div className="select-none font-bricolage font-extrabold text-[4.5rem] sm:text-[7.5rem] md:text-[10.5rem] leading-none text-zinc-900 tracking-tighter opacity-70 pointer-events-none mt-2">
            structui.
          </div>
        </div>
      </div>
    </footer>
  );
}

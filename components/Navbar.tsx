"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaDiscord } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-neutral-100 font-geist">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform duration-200 active:scale-95 group"
          >
            <img
              src="/icons/structui-icon.svg"
              alt="structui logo"
              className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bricolage font-extrabold text-xl md:text-2xl tracking-tight text-[#202020]">
              struct<span className="text-[#3D38E9]">ui</span><span className="text-[#3D38E9]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link
              href="/explore"
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${pathname === "/explore"
                ? "bg-neutral-100 text-[#3D38E9]"
                : "text-zinc-600 hover:text-[#202020] hover:bg-neutral-50"
                }`}
            >
              Explore Marketplace
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${pathname === "/about"
                ? "bg-neutral-100 text-[#3D38E9]"
                : "text-zinc-600 hover:text-[#202020] hover:bg-neutral-50"
                }`}
            >
              About
            </Link>

            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${pathname === "/dashboard"
                ? "bg-neutral-100 text-[#3D38E9]"
                : "text-zinc-600 hover:text-[#202020] hover:bg-neutral-50"
                }`}
            >
              Creator Studio
            </Link>
          </div>
        </div>

        {/* Right Nav Action Buttons */}
        <div className="flex gap-2 md:gap-3 items-center">
          {/* Mobile links */}
          <Link
            href="/explore"
            className="md:hidden h-10 px-2.5 py-2 text-xs font-semibold text-zinc-700 hover:text-[#3D38E9] rounded-xl inline-flex items-center"
          >
            Explore
          </Link>

          <Link
            href="/about"
            className="md:hidden h-10 px-2.5 py-2 text-xs font-semibold text-zinc-700 hover:text-[#3D38E9] rounded-xl inline-flex items-center"
          >
            About
          </Link>

          <a
            href="https://discord.gg/MdQqack6Jb"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 md:h-11 px-2.5 md:px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200/80 transition-colors rounded-xl justify-center items-center gap-1.5 md:gap-2 cursor-pointer no-underline flex-shrink-0"
          >
            <FaDiscord className="w-5 h-5" />
            <span className="text-[#202020] text-sm font-medium whitespace-nowrap">
              Discord
            </span>
          </a>

          {user ? (
            /* Logged in User Menu */
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 transition-all cursor-pointer shadow-xs"
              >
                <img
                  src={user.avatar || "/teaser/avatars/creator-1.png"}
                  alt={user.username || "User"}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-100"
                />
                <span className="text-sm font-semibold text-[#202020] max-w-[120px] truncate">
                  @{user.username || "dev"}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-neutral-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-neutral-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="text-xs text-neutral-400 font-medium">Signed in as:</p>
                    <p className="text-sm font-bold text-[#202020] truncate">@{user.username}</p>
                    {user.email && <p className="text-xs text-neutral-500 truncate">{user.email}</p>}
                  </div>

                  <Link
                    href={user.username ? `/u/${user.username}` : "/auth/setup-username"}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-[#3D38E9] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    My Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-[#3D38E9] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    Creator Studio
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Admin Panel
                    </Link>
                  )}

                  <div className="border-t border-neutral-100 my-1" />

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Auth Buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="h-10 md:h-11 px-3.5 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors inline-flex items-center justify-center cursor-pointer"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="h-10 md:h-11 px-4 md:px-5 py-2 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-95 transition-all text-white text-xs md:text-sm font-semibold rounded-xl inline-flex items-center justify-center cursor-pointer shadow-sm shadow-[#3D38E9]/25"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

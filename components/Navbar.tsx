"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaDiscord } from "react-icons/fa6";
import {
  Menu,
  X,
  Compass,
  Sparkles,
  LayoutDashboard,
  User,
  Shield,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle outside clicks and ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    {
      name: "Explore Marketplace",
      shortName: "Explore",
      href: "/explore",
      icon: Compass,
      description: "Discover UI components, templates & kits",
    },
    {
      name: "Creator Studio",
      shortName: "Creator Studio",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Build, publish & manage your components",
    },
    {
      name: "About",
      shortName: "About",
      href: "/about",
      icon: Sparkles,
      description: "Learn about the mission & community",
    },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-3.5 md:py-4 transition-all duration-300 bg-white/85 backdrop-blur-md border-b border-neutral-200/70 font-geist"
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-transform duration-200 active:scale-95 group shrink-0"
          >
            <img
              src="/icons/structui-icon.svg"
              alt="structui logo"
              className="w-7 h-7 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bricolage font-extrabold text-xl md:text-2xl tracking-tight text-[#202020]">
              struct<span className="text-[#3D38E9]">ui</span><span className="text-[#3D38E9]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-neutral-100 text-[#3D38E9] shadow-2xs"
                      : "text-zinc-600 hover:text-[#202020] hover:bg-neutral-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Actions: Desktop & Mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Discord Community Button (Desktop / Tablet) */}
          <a
            href="https://discord.gg/MdQqack6Jb"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 md:h-11 px-3 md:px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200/80 transition-colors rounded-xl justify-center items-center gap-2 cursor-pointer no-underline shrink-0"
          >
            <FaDiscord className="w-4.5 h-4.5 text-[#5865F2]" />
            <span className="text-[#202020] text-xs md:text-sm font-medium whitespace-nowrap">
              Discord
            </span>
          </a>

          {/* Desktop User Menu (Logged In) */}
          {user ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 transition-all cursor-pointer shadow-2xs"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
              >
                <img
                  src={user.avatar || "/teaser/avatars/creator-1.png"}
                  alt={user.username || "User"}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-100"
                />
                <span className="text-sm font-semibold text-[#202020] max-w-[120px] truncate">
                  @{user.username || "dev"}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-neutral-200/80 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="text-xs text-neutral-400 font-medium">Signed in as:</p>
                    <p className="text-sm font-bold text-[#202020] truncate">@{user.username}</p>
                    {user.email && <p className="text-xs text-neutral-500 truncate mt-0.5">{user.email}</p>}
                  </div>

                  <div className="py-1">
                    <Link
                      href={user.username ? `/u/${user.username}` : "/auth/setup-username"}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-[#3D38E9] transition-colors"
                    >
                      <User className="w-4 h-4 text-neutral-500" />
                      My Profile
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-[#3D38E9] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-neutral-500" />
                      Creator Studio
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-[#5865F2]" />
                        Admin Panel
                      </Link>
                    )}
                  </div>

                  <div className="border-t border-neutral-100 my-1" />

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Desktop Auth Buttons */
            <div className="hidden md:flex items-center gap-2">
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

          {/* Mobile Right: Quick User Avatar (if logged in) */}
          {user && (
            <Link
              href={user.username ? `/u/${user.username}` : "/dashboard"}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 overflow-hidden active:scale-95 transition-transform"
              title={`@${user.username}`}
            >
              <img
                src={user.avatar || "/teaser/avatars/creator-1.png"}
                alt={user.username || "User"}
                className="w-full h-full object-cover"
              />
            </Link>
          )}

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 transition-all text-neutral-700"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-[65px] bg-black/30 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Dropdown Container */}
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-neutral-200/80 shadow-2xl z-50 md:hidden max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="p-4 space-y-4">
              {/* If Logged In: User Profile Header Card */}
              {user ? (
                <div className="p-3.5 bg-neutral-50/80 border border-neutral-200/70 rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.avatar || "/teaser/avatars/creator-1.png"}
                      alt={user.username || "User"}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-[#202020] truncate">@{user.username}</p>
                        {user.role === "admin" && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase bg-[#5865F2]/10 text-[#5865F2] rounded-md">
                            Admin
                          </span>
                        )}
                      </div>
                      {user.email && (
                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <Link
                    href={user.username ? `/u/${user.username}` : "/auth/setup-username"}
                    className="px-3 py-1.5 text-xs font-semibold text-[#3D38E9] bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 shrink-0"
                  >
                    Profile
                  </Link>
                </div>
              ) : null}

              {/* Navigation Links List */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-1.5">
                  Navigation
                </p>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all ${
                        isActive
                          ? "bg-[#3D38E9]/10 text-[#3D38E9]"
                          : "text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? "bg-[#3D38E9] text-white shadow-xs"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{link.name}</span>
                        <span className="text-xs text-neutral-500 line-clamp-1">
                          {link.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* User-Specific Quick Links (Logged In) */}
              {user && (
                <div className="space-y-1 pt-2 border-t border-neutral-100">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 mb-1.5">
                    Account & Tools
                  </p>

                  <Link
                    href={user.username ? `/u/${user.username}` : "/auth/setup-username"}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <User className="w-4 h-4 text-neutral-500" />
                    My Public Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <LayoutDashboard className="w-4 h-4 text-neutral-500" />
                    Creator Dashboard
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#5865F2] hover:bg-[#5865F2]/10"
                    >
                      <Shield className="w-4 h-4 text-[#5865F2]" />
                      Admin Control Panel
                    </Link>
                  )}
                </div>
              )}

              {/* Community Link */}
              <div className="pt-2 border-t border-neutral-100">
                <a
                  href="https://discord.gg/MdQqack6Jb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#5865F2]/5 border border-[#5865F2]/15 text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#5865F2] text-white flex items-center justify-center shadow-xs">
                      <FaDiscord className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold block leading-tight">Join our Discord</span>
                      <span className="text-xs text-neutral-500">Connect with creators & builders</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>

              {/* Bottom Actions: Log In / Register OR Log Out */}
              <div className="pt-2 border-t border-neutral-100">
                {user ? (
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-600 font-semibold text-sm hover:bg-rose-100/80 active:scale-98 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out of @{user.username}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 active:scale-95 transition-all text-center"
                    >
                      <LogIn className="w-4 h-4 text-neutral-500" />
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#3D38E9] hover:bg-[#322DC8] active:scale-95 transition-all text-white text-sm font-semibold shadow-sm shadow-[#3D38E9]/25 text-center"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}


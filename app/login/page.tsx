"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeDropdown from "@/components/ThemeDropdown";
import { FaDiscord } from "react-icons/fa6";
import { ArrowRight, Lock, User, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      await refreshUser();
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = "/api/auth/discord";
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-[#09090b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-geist transition-colors duration-200">
      {/* Top right theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeDropdown align="right" />
      </div>

      {/* Background Dot Grid Pattern */}
      <div className="hero-dot-pattern absolute inset-0 z-0 opacity-70 pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] bg-white dark:bg-zinc-900 rounded-3xl border border-neutral-200/90 dark:border-zinc-800 p-8 sm:p-10 shadow-xl shadow-black/5 dark:shadow-black/60 relative z-10">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <img
              src="/icons/structui-icon.svg"
              alt="structui"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bricolage font-extrabold text-2xl tracking-tight text-[#202020] dark:text-white">
              struct<span className="text-[#3D38E9] dark:text-[#818cf8]">ui</span><span className="text-[#3D38E9] dark:text-[#818cf8]">.</span>
            </span>
          </Link>
          <h1 className="font-bricolage text-2xl font-extrabold text-[#202020] dark:text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm font-geist mt-1">
            Log in to manage your components and toolkits
          </p>
        </div>

        {/* Discord 1-Click Login Button */}
        <button
          type="button"
          onClick={handleDiscordLogin}
          className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] active:scale-[0.99] transition-all rounded-2xl flex items-center justify-center gap-2.5 text-white font-semibold font-geist text-sm shadow-sm shadow-[#5865F2]/25 mb-5 cursor-pointer"
        >
          <FaDiscord className="w-5 h-5" />
          <span>Continue with Discord</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px bg-neutral-200 dark:bg-zinc-800 flex-1" />
          <span className="text-zinc-400 dark:text-zinc-500 text-xs font-geist uppercase font-medium tracking-wider">
            or with email
          </span>
          <div className="h-px bg-neutral-200 dark:bg-zinc-800 flex-1" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2.5 text-rose-600 dark:text-rose-400 text-xs font-geist">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#202020] dark:text-zinc-200 mb-1.5 font-geist">
              Username or Email
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="developer@structui.dev"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-zinc-700 text-xs sm:text-sm font-geist text-[#202020] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-[#3D38E9] dark:focus:border-[#818cf8] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50 dark:bg-zinc-800/50"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-[#202020] dark:text-zinc-200 font-geist">
                Password
              </label>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-zinc-700 text-xs sm:text-sm font-geist text-[#202020] dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-[#3D38E9] dark:focus:border-[#818cf8] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50 dark:bg-zinc-800/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.99] transition-all rounded-xl flex items-center justify-center gap-2 text-white font-semibold font-geist text-sm shadow-sm shadow-[#3D38E9]/25 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-geist mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#3D38E9] dark:text-[#818cf8] hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

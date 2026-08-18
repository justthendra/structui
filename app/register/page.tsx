"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaDiscord } from "react-icons/fa6";
import { ArrowRight, Lock, User, Mail, AlertCircle, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
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
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-geist">
      {/* Background Dot Grid Pattern */}
      <div className="hero-dot-pattern absolute inset-0 z-0 opacity-70 pointer-events-none" />

      {/* Main Register Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-10 shadow-xl shadow-black/5 relative z-10">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <img
              src="/icons/structui-icon.svg"
              alt="structui"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="font-bricolage font-extrabold text-2xl tracking-tight text-[#202020]">
              struct<span className="text-[#3D38E9]">ui</span><span className="text-[#3D38E9]">.</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-[#3D38E9]" />
            <span className="text-[11px] font-semibold text-[#3D38E9]">
              Join the Developer Marketplace
            </span>
          </div>

          <h1 className="font-bricolage text-2xl font-extrabold text-[#202020] tracking-tight">
            Create Developer Account
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm font-geist mt-1">
            Publish code, sell UI components, and build your portfolio
          </p>
        </div>

        {/* Discord 1-Click Register Button */}
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
          <div className="h-px bg-neutral-200 flex-1" />
          <span className="text-zinc-400 text-xs font-geist uppercase font-medium tracking-wider">
            or register with email
          </span>
          <div className="h-px bg-neutral-200 flex-1" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-600 text-xs font-geist">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#202020] mb-1.5 font-geist">
                Username *
              </label>
              <div className="relative flex items-center">
                <span className="text-zinc-400 text-xs font-bold absolute left-3.5">@</span>
                <input
                  type="text"
                  required
                  placeholder="alex_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 pl-8 pr-3 rounded-xl border border-neutral-200 text-xs sm:text-sm font-geist text-[#202020] placeholder:text-zinc-400 focus:border-[#3D38E9] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202020] mb-1.5 font-geist">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-xl border border-neutral-200 text-xs sm:text-sm font-geist text-[#202020] placeholder:text-zinc-400 focus:border-[#3D38E9] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202020] mb-1.5 font-geist">
              Email Address *
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="developer@structui.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 text-xs sm:text-sm font-geist text-[#202020] placeholder:text-zinc-400 focus:border-[#3D38E9] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#202020] mb-1.5 font-geist">
              Password * (min. 6 characters)
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 text-xs sm:text-sm font-geist text-[#202020] placeholder:text-zinc-400 focus:border-[#3D38E9] focus:ring-2 focus:ring-[#3D38E9]/10 outline-none transition-all bg-neutral-50/50"
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
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-500 font-geist mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#3D38E9] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

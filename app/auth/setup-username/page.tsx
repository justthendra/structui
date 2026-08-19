"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";

export default function SetupUsernamePage() {
  const router = useRouter();
  const { user, refreshUser, loading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/setup-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save username. Please try another one.");
      }

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch { }

      await refreshUser();
      router.push(`/u/${data.username}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB] dark:bg-[#09090b]">
        <div className="size-8 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-[#09090b] text-[#202020] dark:text-[#f4f4f5] flex flex-col justify-between transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[460px] bg-white dark:bg-zinc-900 rounded-3xl border border-neutral-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/60 text-center">
          {/* Avatar & Discord Tag */}
          <div className="relative inline-block mb-4">
            <img
              src={user?.avatar || "/teaser/avatars/creator-1.png"}
              alt="Discord Avatar"
              className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-md mx-auto"
            />
            <div className="absolute bottom-0 right-0 p-1 bg-[#5865F2] rounded-full border-2 border-white dark:border-zinc-800">
              <img src="/teaser/discord_logo.svg" alt="Discord" className="w-3.5 h-3.5 brightness-0 invert" />
            </div>
          </div>

          <h1 className="font-bricolage text-2xl sm:text-3xl font-extrabold text-[#202020] dark:text-white tracking-tight mb-2">
            Choose your Username
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-geist mb-6 max-w-[360px] mx-auto">
            Connected with Discord! Pick a unique username for your structui profile URL and snippets.
          </p>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl text-xs sm:text-sm font-geist text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 font-geist">
                Username (Handle)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-zinc-400 dark:text-zinc-500 font-geist text-sm font-medium">@</span>
                <input
                  type="text"
                  required
                  placeholder="alex_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  className="w-full h-12 pl-8 pr-4 rounded-xl border border-neutral-200 dark:border-zinc-700 focus:border-[#3D38E9] dark:focus:border-[#818cf8] focus:shadow-[0_0_0_2px_rgba(61,56,233,0.1)] outline-none text-base font-geist text-[#202020] dark:text-white bg-white dark:bg-zinc-800 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-geist mt-1.5">
                Your profile URL will be: structui.dev/u/<strong>{username || "your_username"}</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || username.length < 3}
              className="w-full h-12 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.99] transition-all rounded-xl flex items-center justify-center text-white font-semibold font-geist text-sm sm:text-base shadow-sm shadow-[#3D38E9]/25 cursor-pointer mt-4 disabled:opacity-50"
            >
              {loading ? (
                <span className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Profile 🚀"
              )}
            </button>
          </form>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-zinc-400 dark:text-zinc-500 font-geist">
        © {new Date().getFullYear()} structui.dev — All rights reserved.
      </footer>
    </div>
  );
}

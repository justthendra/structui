"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";

function VerifiedContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
    if (status === "success") {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#10B981", "#3D38E9", "#06B6D4", "#F59E0B"],
        });
      } catch { }
    }
  }, [status]);

  return (
    <div className="w-full max-w-[460px] bg-white rounded-3xl border border-neutral-200 p-8 shadow-xl shadow-black/5 text-center">
      {status === "success" ? (
        <>
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-5 shadow-xs">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="font-bricolage text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight mb-2">
            Email Verified!
          </h1>
          <p className="text-zinc-500 text-sm font-geist mb-8 max-w-[340px] mx-auto leading-relaxed">
            Your account is fully activated. You can now publish snippets, build toolkits, and explore all structui developer features.
          </p>

          <div className="flex flex-col gap-3">
            {user?.username ? (
              <Link
                href={`/u/${user.username}`}
                className="w-full h-12 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.99] transition-all rounded-xl flex items-center justify-center text-white font-semibold font-geist text-sm sm:text-base shadow-sm shadow-[#3D38E9]/25"
              >
                Go to My Profile
              </Link>
            ) : (
              <Link
                href="/"
                className="w-full h-12 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.99] transition-all rounded-xl flex items-center justify-center text-white font-semibold font-geist text-sm sm:text-base shadow-sm shadow-[#3D38E9]/25"
              >
                Go to Home
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 bg-rose-100 border border-rose-200 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-5 shadow-xs">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          <h1 className="font-bricolage text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight mb-2">
            Verification Failed
          </h1>
          <p className="text-zinc-500 text-sm font-geist mb-8 max-w-[340px] mx-auto leading-relaxed">
            This verification link is invalid or has expired. Please log in to request a fresh verification link.
          </p>

          <Link
            href="/"
            className="w-full h-12 bg-[#202020] hover:bg-black active:scale-[0.99] transition-all rounded-xl flex items-center justify-center text-white font-semibold font-geist text-sm sm:text-base"
          >
            Back to Home
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifiedPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={<div className="size-8 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />}>
          <VerifiedContent />
        </Suspense>
      </main>

      <footer className="py-6 text-center text-xs text-zinc-400 font-geist">
        © {new Date().getFullYear()} structui.dev — All rights reserved.
      </footer>
    </div>
  );
}

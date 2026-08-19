"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, CheckCircle2 } from "lucide-react";

export default function EarlyAccessCTA() {
  return (
    <section className="bg-[#F7F7F7] dark:bg-zinc-950/70 border-t border-neutral-200/80 dark:border-zinc-800/80 py-24 md:py-32 px-6 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-[680px] mx-auto text-center flex flex-col items-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-zinc-800 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#818cf8]" />
          <span className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold font-geist">
            Open for All Developers &amp; Creators
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bricolage font-extrabold tracking-[-0.05em] text-4xl sm:text-5xl md:text-6xl text-[#202020] dark:text-white leading-[1.05] mb-4">
          Start building with <br />
          <span className="text-[#3D38E9] dark:text-[#818cf8]">structui</span> today.
        </h2>

        <p className="w-full max-w-[480px] text-center text-zinc-500 dark:text-zinc-400 text-base font-normal font-geist leading-relaxed mb-8">
          Join thousands of developers sharing clean UI components, discovering production-ready code, and keeping 100% of their earnings.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-[462px] mb-8">
          <Link
            href="/explore"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 text-white font-semibold font-geist text-sm md:text-base shadow-sm shadow-[#3D38E9]/25 hover:shadow-md cursor-pointer"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 active:scale-[0.98] border border-neutral-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center gap-2 text-[#202020] dark:text-zinc-200 font-semibold font-geist text-sm md:text-base transition-all shadow-xs cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span>Create Free Account</span>
          </Link>
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-2.5 font-geist text-[13px] text-zinc-500 dark:text-zinc-400">
          <div className="flex -space-x-1.5 flex-shrink-0">
            <img
              src="/teaser/avatars/creator-1.png"
              alt="Creator 1"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 object-cover"
            />
            <img
              src="/teaser/avatars/creator-2.png"
              alt="Creator 2"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 object-cover"
            />
            <img
              src="/teaser/avatars/creator-3.png"
              alt="Creator 3"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white dark:border-zinc-800 object-cover"
            />
          </div>
          <div>
            <span className="text-zinc-700 dark:text-zinc-200 font-semibold">Join the community</span>
            <span className="text-zinc-500 dark:text-zinc-400"> — 100% free to explore and copy</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

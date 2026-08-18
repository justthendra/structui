"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, CheckCircle2 } from "lucide-react";

export default function EarlyAccessCTA() {
  return (
    <section className="bg-[#F7F7F7] py-24 md:py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-[680px] mx-auto text-center flex flex-col items-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#3D38E9]" />
          <span className="text-zinc-600 text-xs font-semibold font-geist">
            Open for All Developers &amp; Creators
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bricolage font-extrabold tracking-[-0.05em] text-4xl sm:text-5xl md:text-6xl text-[#202020] leading-[1.05] mb-4">
          Start building with <br />
          <span className="text-[#3D38E9]">structui</span> today.
        </h2>

        <p className="w-full max-w-[480px] text-center text-zinc-500 text-base font-normal font-geist leading-relaxed mb-8">
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
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-50 active:scale-[0.98] border border-neutral-300 rounded-2xl flex items-center justify-center gap-2 text-[#202020] font-semibold font-geist text-sm md:text-base transition-all shadow-xs cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-zinc-500" />
            <span>Create Free Account</span>
          </Link>
        </div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-2.5 font-geist text-[13px] text-zinc-500">
          <div className="flex -space-x-1.5 flex-shrink-0">
            <img
              src="/teaser/avatars/creator-1.png"
              alt="Creator 1"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white object-cover"
            />
            <img
              src="/teaser/avatars/creator-2.png"
              alt="Creator 2"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white object-cover"
            />
            <img
              src="/teaser/avatars/creator-3.png"
              alt="Creator 3"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full border border-white object-cover"
            />
          </div>
          <div>
            <span className="text-zinc-700 font-semibold">Join the community</span>
            <span className="text-zinc-500"> — 100% free to explore and copy</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

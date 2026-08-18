"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Code2 } from "lucide-react";

// Rotating Categories Configuration
const ROTATING_CATEGORIES = [
  {
    text: "UI Component",
    bg: "#E8E7FD",
    color: "#3D38E9",
    dot: "#3D38E9",
  },
  {
    text: "Tailwind Template",
    bg: "#E0F2FE",
    color: "#0284C7",
    dot: "#0284C7",
  },
  {
    text: "Next.js Starter",
    bg: "#F4F4F5",
    color: "#18181B",
    dot: "#18181B",
  },
  {
    text: "Three.js Shader",
    bg: "#FDF2F8",
    color: "#DB2777",
    dot: "#DB2777",
  },
  {
    text: "React Hook",
    bg: "#ECFDF5",
    color: "#059669",
    dot: "#059669",
  },
];

export default function Hero() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % ROTATING_CATEGORIES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const currentCategory = ROTATING_CATEGORIES[categoryIndex];

  return (
    <div className="relative overflow-hidden bg-white group pt-36 md:pt-32 pb-16">
      {/* Background Dot Pattern */}
      <div className="hero-dot-pattern absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-[2] flex flex-col justify-center items-center px-4 md:px-6">
        <div className="flex flex-col items-center text-center w-full max-w-[860px] mx-auto">
          {/* Live Ecosystem Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 mb-6 bg-white border border-[#e0e0e0] rounded-full shadow-xs hover:border-neutral-400 transition-colors cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3D38E9]" />
            <span className="text-[#202020] text-[13px] font-medium font-geist whitespace-nowrap">
              <span className="font-extrabold text-[#3D38E9]">structui</span>. — 100% Free &amp; Open-Source UI Ecosystem
            </span>
          </motion.div>

          {/* Dynamic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center justify-center gap-1 md:gap-2 mb-6 w-full"
          >
            <span className="text-[#202020] font-extrabold font-bricolage tracking-tighter leading-[1.15] text-[clamp(1.75rem,5.5vw,4rem)]">
              Discover your next
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {/* Animated Rotating Pill */}
              <div
                className="inline-flex items-center justify-center overflow-hidden rounded-full px-3.5 py-1.5 md:px-6 md:py-2.5 transition-colors duration-500"
                style={{ backgroundColor: currentCategory.bg }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className="size-2 md:size-3 rounded-full shrink-0 transition-colors duration-500"
                    style={{ backgroundColor: currentCategory.dot }}
                  />
                  <div className="relative inline-flex overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentCategory.text}
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="font-bold font-bricolage leading-[1.15] text-[clamp(1.75rem,5.5vw,4rem)] tracking-[-0.05em] whitespace-nowrap"
                        style={{ color: currentCategory.color }}
                      >
                        {currentCategory.text}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <span className="text-[#202020] font-extrabold font-bricolage tracking-tighter leading-[1.15] text-[clamp(1.75rem,5.5vw,4rem)]">
                in seconds.
              </span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-zinc-500 text-sm md:text-base font-normal font-geist leading-relaxed mb-8 mx-auto px-2 max-w-[460px] md:max-w-[620px]"
          >
            An open-source code ecosystem and component library where all React components,
            Tailwind templates, and fullstack boilerplates are 100% free to explore, copy, and publish.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[462px] mb-8"
          >
            <Link
              href="/explore"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 text-white font-semibold font-geist text-sm md:text-base shadow-sm shadow-[#3D38E9]/25 hover:shadow-md cursor-pointer"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-neutral-50 active:scale-[0.98] border border-neutral-300 rounded-2xl flex items-center justify-center gap-2 text-[#202020] font-semibold font-geist text-sm md:text-base transition-all shadow-xs cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-zinc-500" />
              <span>Publish Component</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                100% Free
              </span>
            </Link>
          </motion.div>

          {/* Social Proof Developers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2.5 font-geist text-[13px] text-zinc-500"
          >
            <div className="flex -space-x-1.5 flex-shrink-0">
              <img
                src="/teaser/avatars/creator-1.png"
                alt="Dev 1"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full border border-white object-cover"
              />
              <img
                src="/teaser/avatars/creator-2.png"
                alt="Dev 2"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full border border-white object-cover"
              />
              <img
                src="/teaser/avatars/creator-3.png"
                alt="Dev 3"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full border border-white object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-zinc-700 font-semibold">Thousands</span>
              <span className="text-zinc-500"> of developers building &amp; sharing code</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

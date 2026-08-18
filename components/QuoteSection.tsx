"use client";

import React from "react";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="bg-white">
      <div className="border-y border-[#E0E0E0] py-16 md:py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-[926px] mx-auto"
        >
          {/* Top Left Quote Mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute select-none font-bricolage text-[64px] md:text-[80px] font-extrabold leading-none text-[#e0e0e0] -top-8 left-0 md:-top-10 md:-left-10"
          >
            “
          </span>

          {/* Bottom Right Quote Mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute select-none font-bricolage text-[64px] md:text-[80px] font-extrabold leading-none text-[#e0e0e0] -bottom-8 right-0 rotate-180 md:-bottom-10 md:-right-10"
          >
            “
          </span>

          {/* Quote Text */}
          <p className="text-center text-xl md:text-[32px] leading-8 md:leading-10 font-semibold font-bricolage tracking-tight px-6 md:px-0">
            <span className="text-zinc-500">
              Great developer tools and UI snippets are scattered across Gists, dead
              repos and fragmented forums.{" "}
            </span>
            <span className="text-[#202020]">structui brings it home</span>
            <span className="text-zinc-500">
              {" "}
              — one place to discover it, fork it, and{" "}
            </span>
            <span className="text-[#3D38E9]">
              support the developers who build it.
            </span>
          </p>
        </motion.div>
      </div>
      <div aria-hidden="true" className="h-16 md:h-28" />
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa6";

export default function CommunitySection() {
  return (
    <section className="bg-white py-16 md:py-28 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-[1100px] mx-auto">
        {/* Left Column Text & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-start items-start gap-6 w-full max-w-[480px]"
        >
          <div className="inline-flex items-center gap-2">
            <span className="p-1 bg-purple-50 rounded-md border border-purple-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span className="text-zinc-500 text-xs font-semibold font-geist">
              Developer Community
            </span>
          </div>

          <h2 className="w-full tracking-tighter leading-[1.07]">
            <span className="text-[#202020] text-3xl sm:text-4xl md:text-[56px] font-extrabold font-bricolage tracking-tighter">
              A growing community of{" "}
            </span>
            <span className="text-[#3D38E9] text-3xl sm:text-4xl md:text-[56px] font-extrabold font-bricolage tracking-tighter">
              code builders.
            </span>
          </h2>

          <p className="text-zinc-500 text-base font-normal font-geist leading-relaxed">
            Hundreds of thousands of developers and creators already share code,
            review pull requests, and trade UI components on our Discord. Join our
            server before we launch!
          </p>

          <div className="flex flex-col sm:flex-row justify-start items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
            <a
              href="https://discord.gg/structui"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.98] transition-all rounded-full inline-flex justify-center items-center gap-2.5 shadow-sm shadow-[#3D38E9]/20 text-white font-medium font-geist"
            >
              <FaDiscord className="w-5 h-5" />
              <span className="whitespace-nowrap">
                Join our Discord
              </span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all rounded-full border border-neutral-300 inline-flex justify-center items-center gap-2 text-[#202020] font-medium font-geist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="whitespace-nowrap">
                Star on GitHub
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right Column Discord Server Widget Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center w-full"
        >
          <div className="w-full max-w-[500px] flex flex-col justify-start items-center bg-white rounded-3xl border border-neutral-200/80 p-3 shadow-md shadow-black/5 hover:border-neutral-300 transition-colors">
            {/* Banner */}
            <div className="w-full aspect-[2.35/1] min-h-[160px] rounded-2xl overflow-hidden relative shadow-sm border border-neutral-200/60 bg-[#0E1338]">
              <Image
                src="/banner.png"
                alt="structui community"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Server Details */}
            <div className="w-full px-4 flex flex-col justify-center items-center gap-4 mt-3 pb-3 text-center">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[#202020] text-xl md:text-2xl font-extrabold font-bricolage tracking-tight">
                  structui Community
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm font-normal font-geist max-w-[380px]">
                  The home of clean architecture. Find React components, Tailwind templates,
                  snippets, backend APIs, and fullstack kits shared by real engineers.
                </p>
              </div>

              {/* Online / Member Counters */}
              <div className="inline-flex justify-center items-center gap-6 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#1A9E5C] rounded-full animate-glow" />
                  <span className="text-zinc-600 text-xs font-medium font-geist">
                    97,003 Online
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-neutral-300 rounded-full" />
                  <span className="text-zinc-600 text-xs font-medium font-geist">
                    275,901 Members
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

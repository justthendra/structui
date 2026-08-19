"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Code2,
  Heart,
  Globe,
  ExternalLink,
  Users,
  Layers,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { WiStars } from "react-icons/wi";

export default function AboutPage() {
  const values = [
    {
      title: "0% Platform Commission",
      desc: "We believe creators should keep 100% of their hard-earned revenue. structui takes zero platform fees on component sales.",
      icon: <Sparkles className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />,
      badge: "Creator First",
    },
    {
      title: "Production-Grade Code",
      desc: "Every component, boilerplate, and shader in our ecosystem is audited for performance, TypeScript types, and modern styling.",
      icon: <Code2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      badge: "Quality Audited",
    },
    {
      title: "Open Developer Community",
      desc: "Backed by kodikas.org, our mission is to make advanced web UI engineering accessible to every builder.",
      icon: <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      badge: "kodikas.org",
    },
    {
      title: "Verified Credibility",
      desc: "Verified badges and leaderboards give talented developers the visibility and recognition their work deserves.",
      icon: <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      badge: "Reputation",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-[#202020] dark:text-[#f4f4f5] flex flex-col justify-between font-geist selection:bg-[#3D38E9]/20 selection:text-[#3D38E9] transition-colors duration-200">
      <Navbar />

      {/* Hero Header */}
      <section className="relative bg-[#F7F7F7] dark:bg-zinc-950/70 border-b border-neutral-200/80 dark:border-zinc-800/80 pt-20 mt-16 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

        <div className="max-w-[900px] mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-zinc-800 shadow-xs">
            <span className="text-[#3D38E9] dark:text-[#818cf8] font-bold text-xs"><WiStars size={26} /></span>
            <span className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold font-geist">
              About structui &amp; kodikas.org
            </span>
          </div>

          <h1 className="font-bricolage text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#202020] dark:text-white tracking-tighter leading-[1.08] max-w-2xl mb-4">
            Building the future of <br />
            <span className="text-[#3D38E9] dark:text-[#818cf8]">modular web design.</span>
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-geist max-w-xl leading-relaxed">
            structui is a next-generation component marketplace and code portfolio crafted to connect ambitious developers with production-ready UI toolkits.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1100px] w-full mx-auto px-6 py-16 space-y-16 flex-1">
        {/* Who We Are: Kodikas Org Bento Card */}
        <div className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/70 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 rounded-full shadow-2xs">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Powered by Kodikas Organization</span>
              </div>

              <h2 className="font-bricolage text-3xl sm:text-4xl font-extrabold text-[#202020] dark:text-white tracking-tight">
                Crafted by developers, <br />
                for developers.
              </h2>

              <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                structui. was founded and engineered under the umbrella of <strong><a href="https://kodikas.org" target="_blank" rel="noreferrer" className="text-[#3D38E9] underline font-semibold">kodikas.org</a></strong>.
                Our vision is to eliminate fragmented Gists, bloated libraries, and middleman platform cuts by providing a unified, community-driven marketplace where code authors thrive.
              </p>

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <a
                  href="https://kodikas.org"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit kodikas.org</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://discord.gg/MdQqack6Jb"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <FaDiscord className="w-4 h-4" />
                  <span>Join Discord</span>
                </a>
              </div>
            </div>

            {/* Emblem Visual */}
            <div className="w-full md:w-auto flex justify-center">
              <div className="relative p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-neutral-200 dark:border-zinc-800 shadow-md text-center flex flex-col items-center gap-3">
                <img
                  src="/icons/structui-icon.svg"
                  alt="structui"
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
                <div>
                  <h3 className="font-bricolage font-extrabold text-xl text-[#202020] dark:text-white">
                    struct<span className="text-[#3D38E9] dark:text-[#818cf8]">ui</span><span className="text-[#3D38E9] dark:text-[#818cf8]">.</span>
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium font-geist">v1.0.0 by kodikas.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Value Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-bricolage text-3xl font-extrabold text-[#202020] dark:text-white tracking-tight">
              Our Core Principles
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Why engineers choose structui over traditional code repositories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/70 p-6 flex flex-col justify-between h-full gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/70 dark:border-zinc-800 shadow-2xs">
                      {v.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg border border-neutral-200 dark:border-zinc-800">
                      {v.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bricolage text-xl font-bold text-[#202020] dark:text-white mb-1.5">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-geist leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-[#111111] dark:bg-zinc-950 p-8 sm:p-12 text-white text-center flex flex-col items-center gap-5 shadow-lg">
          <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <Terminal className="w-6 h-6 text-[#6366F1]" />
          </div>

          <h3 className="font-bricolage text-3xl sm:text-4xl font-extrabold tracking-tight max-w-lg">
            Ready to explore our curated components?
          </h3>

          <p className="text-zinc-400 text-sm sm:text-base max-w-md">
            Browse through hundreds of React, Tailwind, and fullstack toolkits created by engineers worldwide.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap justify-center">
            <Link
              href="/explore"
              className="px-6 py-3 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              Join as Creator
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

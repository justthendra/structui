"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, ShieldCheck, Trophy, Sparkles, FolderPlus, Copy, Check, ChevronUp } from "lucide-react";
import confetti from "canvas-confetti";

export default function PlatformBento() {
  const [activeFeed, setActiveFeed] = useState("all");
  const [isFollowing, setIsFollowing] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle");
  const [showcaseData, setShowcaseData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/stats/public")
      .then((res) => res.json())
      .then((data) => setShowcaseData(data))
      .catch(console.error);
  }, []);

  const handleDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    setTimeout(() => {
      setDownloadState("downloaded");
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch { }
      setTimeout(() => setDownloadState("idle"), 3500);
    }, 1200);
  };

  const topDevs = showcaseData?.topDevelopers || [];
  const latestSnippets = showcaseData?.latestSnippets || [];
  const featuredDev = showcaseData?.featuredDeveloper || {
    name: "Alex Rivera",
    username: "alex_dev",
    avatar: "/teaser/features/verification/avatar.jpg",
    is_verified: 1,
    total_stars: 48,
  };

  return (
    <section className="pt-16 pb-24 md:pt-28 md:pb-28 px-6 bg-white dark:bg-[#09090b] transition-colors duration-200">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 flex flex-col items-center gap-3"
        >
          <div className="inline-flex items-center gap-2">
            <span className="p-1 bg-cyan-50 dark:bg-cyan-950/50 rounded-md border border-cyan-200 dark:border-cyan-800">
              <Wrench className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold font-geist">
              Platform Features
            </span>
          </div>

          <h2 className="text-[#202020] dark:text-white text-3xl sm:text-4xl md:text-6xl font-extrabold font-bricolage tracking-tighter leading-[1.05]">
            Built for developers <br /> and creators.
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-geist max-w-[500px]">
            Curated feeds, 0% commission monetisation, verification and live rankings.
          </p>
        </motion.div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Curated Feeds */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-[#0E0E10] p-3 flex flex-col justify-between">
                {/* Tabs */}
                <div className="relative z-10 flex items-center gap-1 bg-[#161b22] p-1 rounded-xl w-max border border-neutral-800 shadow-xs">
                  <button
                    onClick={() => setActiveFeed("all")}
                    className={`relative z-10 px-2.5 py-1 font-geist text-[10px] font-semibold transition-all rounded-lg cursor-pointer ${
                      activeFeed === "all" ? "bg-[#3D38E9] text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Latest Code
                  </button>
                  <button
                    onClick={() => setActiveFeed("react")}
                    className={`relative z-10 px-2 py-1 font-geist text-[10px] font-semibold transition-all rounded-lg cursor-pointer ${
                      activeFeed === "react" ? "bg-[#3D38E9] text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    React UI
                  </button>
                </div>

                {/* Real Snippet Stack */}
                <div className="flex flex-col gap-1.5 font-mono text-[10px] my-auto">
                  {latestSnippets.slice(0, 2).map((snip: any, idx: number) => (
                    <div
                      key={snip.id || idx}
                      className="bg-[#161b22] border border-neutral-800 rounded-xl p-2.5 text-zinc-300 truncate"
                    >
                      <div className="flex justify-between items-center text-[9px] text-zinc-500 mb-1">
                        <span className="font-bold text-white truncate max-w-[120px]">{snip.title}</span>
                        <span className="text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800">
                          {snip.language}
                        </span>
                      </div>
                      <span className="text-indigo-300 truncate block opacity-80">
                        {snip.code.slice(0, 48)}...
                      </span>
                    </div>
                  ))}
                  {latestSnippets.length === 0 && (
                    <div className="bg-[#161b22] border border-neutral-800 rounded-xl p-3 text-zinc-400 text-center text-[10px]">
                      export default function structui() &#123; return &lt;CleanCode /&gt; &#125;
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                Live Code Feeds
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Personalised discovery by framework, language, and followed developers.
                Real code from real engineers.
              </p>
            </div>
          </motion.div>

          {/* Card 2: 100% Free & Open-Source */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/80 p-4 flex items-center justify-center">
                <div className="flex h-full w-full flex-col justify-center gap-2.5 rounded-xl bg-white dark:bg-zinc-900 p-3.5 border border-neutral-200/60 dark:border-zinc-800 shadow-xs">
                  <div className="flex w-full items-center justify-between">
                    <p className="font-geist text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Component Access
                    </p>
                    <span className="font-bricolage text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      100% Free
                    </span>
                  </div>

                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1.5 font-geist text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>License Type</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      MIT Open Source
                    </span>
                  </div>

                  <div className="h-px w-full bg-neutral-100 dark:bg-zinc-800" />

                  <div className="flex w-full items-center justify-between">
                    <p className="font-geist text-xs font-bold text-[#202020] dark:text-white">
                      Commercial Usage
                    </p>
                    <span className="font-bricolage text-xs font-extrabold text-[#3D38E9] dark:text-[#818cf8]">
                      Allowed &amp; Unlimited
                    </span>
                  </div>

                  <p className="font-geist text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                    No subscriptions, no hidden paywalls.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                100% Free &amp; Open-Source
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Copy, fork, and use every component in personal and commercial projects without paying a dime.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Creator Verification */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/80 flex flex-col items-center justify-center p-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-white dark:border-zinc-800 shadow-md">
                  <img
                    src={featuredDev.avatar || "/teaser/features/verification/avatar.jpg"}
                    alt={featuredDev.username}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bricolage text-base font-bold text-[#202020] dark:text-white">
                      {featuredDev.name || featuredDev.username}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-[#3D38E9] dark:text-[#818cf8]" />
                  </div>

                  <p className="font-geist text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    @{featuredDev.username} · <span className="font-bold text-zinc-800 dark:text-zinc-200">{featuredDev.total_stars || 0}</span> stars
                  </p>

                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`mt-1 flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1 text-[11px] font-semibold font-geist transition-all cursor-pointer ${
                      isFollowing
                        ? "bg-[#202020] dark:bg-white text-white dark:text-zinc-900"
                        : "bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 text-neutral-800 dark:text-zinc-200 hover:border-neutral-400 dark:hover:border-zinc-600"
                    }`}
                  >
                    {isFollowing ? "Following" : "+ Follow"}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                Verified Developers
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Verified badge for active engineers with public GitHub audit and
                developer credibility.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Real Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/80 p-2 flex flex-col justify-center gap-1.5">
                {topDevs.length > 0 ? (
                  topDevs.slice(0, 3).map((dev: any, rank: number) => (
                    <div
                      key={dev.id}
                      className={`relative flex w-full items-center gap-2 rounded-xl px-2.5 py-1.5 ${
                        rank === 0
                          ? "border border-yellow-300/80 dark:border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-950/30"
                          : "border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                      }`}
                    >
                      <span className={`font-geist text-[10px] font-bold w-3 ${rank === 0 ? "text-yellow-600 dark:text-yellow-400" : "text-zinc-400"}`}>
                        {rank + 1}
                      </span>
                      <img
                        src={dev.avatar || "/teaser/avatars/creator-1.png"}
                        alt={dev.username}
                        className="w-6 h-6 rounded-full object-cover border border-neutral-200 dark:border-zinc-700"
                      />
                      <div className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                        <span className="font-geist text-xs font-semibold text-[#202020] dark:text-white truncate">
                          @{dev.username}
                        </span>
                        <span className="font-geist text-[9px] text-zinc-400 dark:text-zinc-500">
                          {dev.snippets_count} snippets · {dev.total_stars} stars
                        </span>
                      </div>
                      <span className="font-bricolage text-[11px] font-bold text-[#202020] dark:text-white">
                        {dev.points || (dev.total_stars * 10 + 50)} pts
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 py-6">
                    Rankings update as developers publish code.
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                Live Developer Leaderboards
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Climb rankings by contributing clean snippets, getting stars, and building useful tools.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Component Packs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-[#0E0E10] p-4 flex flex-col items-center justify-center gap-2">
                <div className="w-full bg-[#161b22] border border-neutral-800 rounded-xl p-3 text-center">
                  <span className="text-xs font-semibold font-geist text-white">
                    ✨ structui Component Toolkit Pack
                  </span>
                  <p className="text-[10px] font-geist text-zinc-400 mt-0.5">
                    Production ready React &amp; Tailwind code
                  </p>
                </div>

                <div className="relative mt-2">
                  <button
                    onClick={handleDownload}
                    className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-geist text-[11px] font-semibold transition-all cursor-pointer ${
                      downloadState === "downloaded"
                        ? "bg-emerald-600 text-white"
                        : downloadState === "downloading"
                        ? "bg-[#3D38E9] text-white"
                        : "bg-[#3D38E9] hover:bg-[#322DC8] text-white"
                    }`}
                  >
                    {downloadState === "idle" && (
                      <span className="flex items-center gap-1.5">
                        <Copy className="w-3 h-3" />
                        Copy Component Code
                      </span>
                    )}
                    {downloadState === "downloading" && (
                      <span className="flex items-center gap-1.5">
                        <span className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Copying to clipboard…
                      </span>
                    )}
                    {downloadState === "downloaded" && (
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3 h-3" />
                        Code Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                Component Packs
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Bundle code snippets into full UI libraries with 1-click direct code copy.
              </p>
            </div>
          </motion.div>

          {/* Card 6: Collections & Explore */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <div className="h-[210px] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/80 p-4 flex items-center justify-center">
                <div className="relative z-10 flex w-52 flex-col gap-1.5 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-lg shadow-black/5">
                  <Link
                    href="/dashboard"
                    className="flex h-[38px] items-center gap-2 rounded-lg p-2 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#3D38E9] dark:text-[#818cf8]" />
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-geist text-[11px] font-semibold text-[#202020] dark:text-white">
                        Publish Snippet
                      </span>
                      <span className="font-geist text-[9px] text-zinc-400 dark:text-zinc-500">
                        Share your React / Tailwind code
                      </span>
                    </div>
                  </Link>

                  <Link
                    href="/explore"
                    className="flex h-[38px] items-center gap-2 rounded-lg p-2 bg-neutral-100/80 dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <FolderPlus className="w-4 h-4 text-[#202020] dark:text-white" />
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-geist text-[11px] font-semibold text-[#202020] dark:text-white">
                        Explore Marketplace
                      </span>
                      <span className="font-geist text-[9px] text-zinc-400 dark:text-zinc-500">
                        Browse all public toolkits
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 flex flex-col gap-1.5">
              <h3 className="text-[#202020] dark:text-white text-base font-semibold font-geist">
                Code Collections
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-normal font-geist leading-relaxed">
                Organise snippets into toolkits. Share your favorite stacks with teammates.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

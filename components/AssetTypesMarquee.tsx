"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AssetTypesMarquee() {
  const cards = [
    // 1. React Components
    <div
      key="react"
      className="w-[340px] sm:w-[400px] md:w-[450px] shrink-0 bg-[#161b22] border border-neutral-800 rounded-[28px] p-2.5 flex flex-col hover:border-cyan-500/50 transition-all group shadow-md"
    >
      <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] rounded-[20px] overflow-hidden bg-[#0d1117]">
        <img
          alt="React Components"
          src="/images/react-components.jpg"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 backdrop-blur-[4px] bg-[rgba(13,17,23,0.8)] rounded-full px-4 py-2 z-10 flex items-center justify-center border border-white/10">
          <span className="font-geist font-medium text-[13px] text-cyan-400 whitespace-nowrap leading-none flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
            React Components
          </span>
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-geist font-semibold text-[16px] text-[#f7f7f7]">
            React &amp; Next.js
          </span>
          <span className="font-geist text-[10px] text-[#12b981] font-semibold whitespace-nowrap bg-[#12b981]/10 px-2.5 py-0.5 rounded-full border border-[#12b981]/20">
            Where structui began
          </span>
        </div>
        <p className="font-geist text-[13px] text-[#aaaaaa] leading-relaxed">
          Interactive UI widgets, modals, animated hero sections, and custom hooks
          ready to copy-paste into your project.
        </p>
      </div>
    </div>,

    // 2. Tailwind CSS
    <div
      key="tailwind"
      className="w-[260px] sm:w-[300px] md:w-[330px] shrink-0 bg-[#161b22] border border-neutral-800 rounded-[28px] p-2.5 flex flex-col hover:border-indigo-500/50 transition-all group shadow-md"
    >
      <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] rounded-[20px] overflow-hidden bg-[#0f172a] p-4 flex flex-col justify-between">
        {/* Code Visual Mockup */}
        <div className="space-y-2 font-mono text-[11px] text-indigo-300">
          <div className="flex gap-1.5 items-center">
            <div className="size-2 rounded-full bg-red-400/80" />
            <div className="size-2 rounded-full bg-yellow-400/80" />
            <div className="size-2 rounded-full bg-green-400/80" />
            <span className="text-neutral-500 ml-1 text-[10px]">Button.tsx</span>
          </div>
          <p className="text-zinc-400">&lt;<span className="text-cyan-400">button</span> <span className="text-indigo-400">className</span>=<span className="text-emerald-400">&quot;bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg&quot;</span>&gt;</p>
        </div>

        <div className="absolute top-4 right-4 backdrop-blur-[4px] bg-[rgba(15,23,42,0.8)] rounded-full px-3.5 py-1.5 z-10 flex items-center justify-center border border-white/10">
          <span className="font-geist font-medium text-[12px] text-indigo-400 whitespace-nowrap leading-none">
            Tailwind CSS
          </span>
        </div>

        <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-2.5 text-center text-xs text-indigo-200 font-medium">
          🎨 Modern Design Systems
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-geist font-semibold text-[16px] text-[#f7f7f7]">
            Tailwind Templates
          </span>
        </div>
        <p className="font-geist text-[13px] text-[#aaaaaa] leading-relaxed">
          Utility-first design systems, responsive dashboards, glassmorphism cards,
          and dark mode ready layouts.
        </p>
      </div>
    </div>,

    // 3. Backend & APIs
    <div
      key="backend"
      className="w-[260px] sm:w-[300px] md:w-[330px] shrink-0 bg-[#161b22] border border-neutral-800 rounded-[28px] p-2.5 flex flex-col hover:border-amber-500/50 transition-all group shadow-md"
    >
      <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] rounded-[20px] overflow-hidden bg-[#181205] p-4 flex flex-col justify-between">
        <div className="space-y-1.5 font-mono text-[11px] text-amber-200/90">
          <div className="text-neutral-500 text-[10px]">server.ts</div>
          <p className="text-amber-400">export const <span className="text-emerald-400">POST</span> = async () =&gt; &#123;</p>
          <p className="pl-3 text-zinc-400">const auth = await verifyJWT();</p>
          <p className="pl-3 text-cyan-400">return Response.json(&#123; ok: true &#125;);</p>
          <p className="text-amber-400">&#125;;</p>
        </div>

        <div className="absolute top-4 right-4 backdrop-blur-[4px] bg-[rgba(24,18,5,0.8)] rounded-full px-3.5 py-1.5 z-10 flex items-center justify-center border border-white/10">
          <span className="font-geist font-medium text-[12px] text-amber-400 whitespace-nowrap leading-none">
            Backend &amp; Edge
          </span>
        </div>

        <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-2.5 text-center text-xs text-amber-200 font-medium">
          ⚡ Edge Functions &amp; APIs
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-geist font-semibold text-[16px] text-[#f7f7f7]">
            Backend Scripts
          </span>
        </div>
        <p className="font-geist text-[13px] text-[#aaaaaa] leading-relaxed">
          Node.js, Python, and Go microservices, database schemas, auth workflows,
          and serverless functions.
        </p>
      </div>
    </div>,

    // 4. Shaders & 3D WebGL
    <div
      key="shaders"
      className="w-[260px] sm:w-[300px] md:w-[330px] shrink-0 bg-[#161b22] border border-neutral-800 rounded-[28px] p-2.5 flex flex-col hover:border-pink-500/50 transition-all group shadow-md"
    >
      <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] rounded-[20px] overflow-hidden bg-[#1f0f24] p-4 flex flex-col justify-between">
        <div className="space-y-1.5 font-mono text-[11px] text-pink-300">
          <div className="text-neutral-500 text-[10px]">fragment.glsl</div>
          <p className="text-pink-400">precision highp float;</p>
          <p className="text-zinc-400">uniform float u_time;</p>
          <p className="text-cyan-400">gl_FragColor = vec4(col, 1.0);</p>
        </div>

        <div className="absolute top-4 right-4 backdrop-blur-[4px] bg-[rgba(31,15,36,0.8)] rounded-full px-3.5 py-1.5 z-10 flex items-center justify-center border border-white/10">
          <span className="font-geist font-medium text-[12px] text-pink-400 whitespace-nowrap leading-none">
            3D &amp; Shaders
          </span>
        </div>

        <div className="bg-pink-600/20 border border-pink-500/30 rounded-xl p-2.5 text-center text-xs text-pink-200 font-medium">
          ✨ Three.js &amp; GLSL Shaders
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-geist font-semibold text-[16px] text-[#f7f7f7]">
            WebGL &amp; 3D Art
          </span>
        </div>
        <p className="font-geist text-[13px] text-[#aaaaaa] leading-relaxed">
          Three.js, WebGL shaders, Canvas particles, and creative interactive
          animations.
        </p>
      </div>
    </div>,

    // 5. Fullstack Boilerplates
    <div
      key="boilerplates"
      className="w-[260px] sm:w-[300px] md:w-[330px] shrink-0 bg-[#161b22] border border-neutral-800 rounded-[28px] p-2.5 flex flex-col hover:border-emerald-500/50 transition-all group shadow-md"
    >
      <div className="relative w-full h-[170px] sm:h-[190px] md:h-[200px] rounded-[20px] overflow-hidden bg-[#042f2e] p-4 flex flex-col justify-between">
        <div className="space-y-1.5 font-mono text-[11px] text-emerald-300">
          <div className="text-neutral-500 text-[10px]">package.json</div>
          <p className="text-emerald-400">&quot;dependencies&quot;: &#123;</p>
          <p className="pl-3 text-zinc-300">&quot;next&quot;: &quot;latest&quot;,</p>
          <p className="pl-3 text-zinc-300">&quot;@supabase/supabase-js&quot;,</p>
          <p className="pl-3 text-zinc-300">&quot;stripe&quot;: &quot;^16.0&quot;</p>
          <p className="text-emerald-400">&#125;</p>
        </div>

        <div className="absolute top-4 right-4 backdrop-blur-[4px] bg-[rgba(4,47,46,0.8)] rounded-full px-3.5 py-1.5 z-10 flex items-center justify-center border border-white/10">
          <span className="font-geist font-medium text-[12px] text-emerald-400 whitespace-nowrap leading-none">
            Boilerplates
          </span>
        </div>

        <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-2.5 text-center text-xs text-emerald-200 font-medium">
          🚀 Next.js + Supabase + Stripe
        </div>
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-geist font-semibold text-[16px] text-[#f7f7f7]">
            Fullstack Starter Kits
          </span>
        </div>
        <p className="font-geist text-[13px] text-[#aaaaaa] leading-relaxed">
          Complete Next.js, Supabase, and Stripe starter kits ready to deploy in
          seconds.
        </p>
      </div>
    </div>,
  ];

  return (
    <section className="bg-[#F7F7F7] py-16 md:py-24 overflow-hidden border-y border-neutral-200/60">
      <div className="max-w-[1100px] mx-auto px-6 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-col justify-center items-center gap-3"
        >
          <div className="inline-flex items-center gap-2">
            <span className="text-indigo-600 font-bold text-sm">📦</span>
            <span className="text-zinc-500 text-xs font-semibold font-geist">
              Code Categories
            </span>
          </div>

          <h2 className="text-[#202020] text-3xl md:text-5xl lg:text-6xl font-extrabold font-bricolage tracking-tighter leading-[1.05]">
            Every type of code asset, <br /> in one place.
          </h2>
        </motion.div>
      </div>

      {/* Infinite Categories Marquee */}
      <div className="overflow-hidden relative categories-mask">
        <div className="animate-categories-marquee flex gap-4 w-max px-6">
          {/* Double set for seamless loop */}
          {cards}
          {cards}
          {cards}
        </div>
      </div>
    </section>
  );
}

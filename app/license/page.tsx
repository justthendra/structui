"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Scale,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Code2,
  Sparkles,
  Layers,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

export default function CodeLicensePage() {
  const [copied, setCopied] = useState(false);
  const lastUpdated = "August 19, 2026";

  const licenseText = `Copyright (c) 2026 Kodikas Organization & structui Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(licenseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const permissions = [
    {
      title: "Commercial Projects",
      desc: "Use snippets in client work, commercial SaaS products, and paid web applications without paying any royalties or fees.",
    },
    {
      title: "Modification & Remixing",
      desc: "Customize colors, layout, animations, backend handlers, and logic freely to match your brand requirements.",
    },
    {
      title: "Private & Internal Use",
      desc: "Deploy in closed-source proprietary enterprise software, intranets, and developer dashboards.",
    },
    {
      title: "Personal Portfolios & MVPs",
      desc: "Build hackathon prototypes, personal showcases, blogs, and indie hacker projects with zero restrictions.",
    },
  ];

  const prohibitions = [
    {
      title: "Direct Re-Selling of Raw Assets",
      desc: "You cannot repackage and resell untouched, raw structui snippet collections on competing component marketplaces.",
    },
    {
      title: "False Authorship Claims",
      desc: "You cannot claim to be the sole original author of an unmodified public component created by another community creator.",
    },
    {
      title: "Malicious Injection",
      desc: "Using licensed components to build malware, phishing gateways, or malicious bot networks is strictly forbidden.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-[#202020] dark:text-[#f4f4f5] flex flex-col justify-between font-geist selection:bg-[#3D38E9]/20 selection:text-[#3D38E9] transition-colors duration-200">
      <Navbar />

      {/* Header Section */}
      <section className="relative bg-[#F7F7F7] dark:bg-zinc-950/70 border-b border-neutral-200/80 dark:border-zinc-800/80 pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

        <div className="max-w-[850px] mx-auto text-center relative z-10 flex flex-col items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#3D38E9] dark:hover:text-[#818cf8] mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 mb-3 bg-white dark:bg-zinc-900 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-zinc-800 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#818cf8]" />
            <span className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold">
              Open Source &amp; Marketplace License
            </span>
          </div>

          <h1 className="font-bricolage text-4xl sm:text-5xl font-extrabold text-[#202020] dark:text-white tracking-tight mb-3">
            Code License
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Permissive, developer-friendly licensing terms designed to empower creators and simplify production code adoption.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>MIT Compatible</span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-[850px] w-full mx-auto px-6 py-12 space-y-10 flex-1">
        {/* Quick Summary Bento Grid: What you CAN and CANNOT do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Permissions */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-emerald-500/20 dark:border-emerald-500/30 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h2 className="font-bricolage text-lg sm:text-xl font-bold text-[#202020] dark:text-white">
                What You Can Do
              </h2>
            </div>
            <div className="space-y-3.5">
              {permissions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="size-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-[#202020] dark:text-zinc-200">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibitions */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900/90 border border-rose-500/20 dark:border-rose-500/30 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="p-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
                <XCircle className="w-5 h-5" />
              </span>
              <h2 className="font-bricolage text-lg sm:text-xl font-bold text-[#202020] dark:text-white">
                What You Cannot Do
              </h2>
            </div>
            <div className="space-y-3.5">
              {prohibitions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="size-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-[#202020] dark:text-zinc-200">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Standard License Text Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-neutral-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />
              <h2 className="font-bricolage text-xl font-bold text-[#202020] dark:text-white">
                Standard structui MIT License Text
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-xl border border-neutral-200/80 dark:border-zinc-700 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy License Text</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-zinc-950/80 rounded-2xl border border-neutral-200/80 dark:border-zinc-800/80 overflow-x-auto">
            <pre className="font-mono text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">
              {licenseText}
            </pre>
          </div>
        </div>

        {/* Third-Party Dependencies Note */}
        <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-zinc-950/60 border border-neutral-200/80 dark:border-zinc-800/80 space-y-2">
          <h3 className="font-bricolage text-base font-bold text-[#202020] dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#3D38E9] dark:text-[#818cf8]" />
            Third-Party Libraries &amp; Upstream Packages
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Components published on structui may utilize open-source frameworks (such as React, Tailwind CSS, Lucide Icons, Framer Motion, Three.js, and Supabase). These dependencies remain subject to their respective upstream licenses.
          </p>
        </div>

        {/* Quick Cross-Links */}
        <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-zinc-950/60 border border-neutral-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />
            <div>
              <p className="text-sm font-bold text-[#202020] dark:text-white">Additional Legal Documents</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Explore our privacy policy and community terms of service.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/privacy"
              className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-xl border border-neutral-200 dark:border-zinc-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-xl border border-neutral-200 dark:border-zinc-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

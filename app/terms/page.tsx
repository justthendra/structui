"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Ban,
  HelpCircle,
  ArrowLeft,
  FileCheck,
} from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "August 19, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <CheckCircle2 className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            By accessing or using <strong>structui</strong> (hosted at structui.dev and powered by <strong>kodikas.org</strong>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform or services.
          </p>
          <p>
            These terms apply to all visitors, registered developers, contributors, and creators who access or utilize the marketplace, APIs, or community services.
          </p>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "2. Developer Accounts & Verification",
      icon: <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>When creating an account on structui:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>You must provide accurate, current, and truthful information during registration and username setup.</li>
            <li>You are responsible for maintaining the confidentiality of your session credentials and all activities occurring under your account.</li>
            <li>Verified Creator badges are awarded based on code quality audits, community contributions, and profile authenticity at the discretion of the moderation team.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "creator-freedom",
      title: "3. Creator Freedom & 0% Platform Fee",
      icon: <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            structui is architected with a developer-first ethos:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Ownership:</strong> You retain 100% intellectual property ownership of any code snippets, design systems, and components you author and share.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">0% Commission:</strong> structui takes zero platform cuts or middleman commissions on your published components.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">License Grant:</strong> By publishing snippets publicly, you grant other developers a non-exclusive license to inspect, copy, and integrate your components pursuant to the <Link href="/license" className="text-[#3D38E9] underline font-semibold">structui Code License</Link>.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use & Prohibited Conduct",
      icon: <Ban className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>To preserve code safety and integrity across our community, you agree NOT to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>Publish malicious code, spyware, backdoors, phishing payloads, or cryptominers.</li>
            <li>Upload unauthorized copyrighted assets, stolen closed-source software, or leaked API credentials.</li>
            <li>Engage in automated scraping, denial of service attacks, or attempts to disrupt structui servers.</li>
            <li>Artificially manipulate star counts, leaderboard rankings, or engagement metrics via bot farms.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "moderation",
      title: "5. Moderation & Account Suspension",
      icon: <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            We reserve the right to review, unpublish, or permanently delete snippets that violate our security guidelines or acceptable use policies.
          </p>
          <p>
            Accounts engaging in severe security violations, malicious code distribution, or harassment may be suspended or permanently banned without prior notice.
          </p>
        </div>
      ),
    },
    {
      id: "liability",
      title: "6. Disclaimer of Warranties & Limitation of Liability",
      icon: <Scale className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            structui and all code assets are provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis without warranties of any kind, whether express or implied.
          </p>
          <p>
            Neither structui nor the Kodikas Organization shall be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use code snippets or platform services.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "7. Inquiries & Governance",
      icon: <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            These terms are governed and construed in accordance with standard international open-source best practices. For legal inquiries or terms questions, please reach out to:
          </p>
          <div className="p-4 bg-neutral-100 dark:bg-zinc-800/80 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#202020] dark:text-white">Kodikas Organization Legal Operations</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Email: info@kodikas.org</p>
            </div>
            <a
              href="mailto:info@kodikas.org"
              className="px-4 py-2 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              Contact Legal
            </a>
          </div>
        </div>
      ),
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
            <FileText className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#818cf8]" />
            <span className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold">
              Terms &amp; Agreements
            </span>
          </div>

          <h1 className="font-bricolage text-4xl sm:text-5xl font-extrabold text-[#202020] dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            The guidelines and terms governing code publishing, marketplace transactions, and community collaboration.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Version 1.1</span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-[850px] w-full mx-auto px-6 py-12 space-y-8 flex-1">
        {sections.map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-neutral-200/80 dark:border-zinc-800 shadow-xs hover:border-neutral-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-neutral-100 dark:bg-zinc-800 rounded-xl border border-neutral-200/60 dark:border-zinc-700/60">
                {section.icon}
              </div>
              <h2 className="font-bricolage text-xl sm:text-2xl font-bold text-[#202020] dark:text-white tracking-tight">
                {section.title}
              </h2>
            </div>
            {section.content}
          </motion.div>
        ))}

        {/* Quick Cross-Links */}
        <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-zinc-950/60 border border-neutral-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />
            <div>
              <p className="text-sm font-bold text-[#202020] dark:text-white">Review Licensing &amp; Privacy</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Learn how code licenses and user privacy are handled.</p>
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
              href="/license"
              className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-xl border border-neutral-200 dark:border-zinc-700 transition-colors"
            >
              Code License
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

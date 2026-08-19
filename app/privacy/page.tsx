"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Mail,
  ArrowLeft,
  Share2,
  FileCheck,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026";

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      icon: <Database className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            structui collects minimal information required to provide an authentic, safe, and collaborative code marketplace. When you register or interact with our services, we may collect:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Account Information:</strong> Username, email address, display name, bio, avatar, and social links (GitHub, Twitter/X, Website).
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Discord OAuth Data:</strong> When linking Discord, we receive your Discord ID, Discord username, avatar hash, and verified email address via standard OAuth2 protocols.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">User Content:</strong> Code snippets, descriptions, tags, frameworks, previews, star ratings, and developer profile configurations you publish.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Technical Logs:</strong> IP address, browser type, and timestamps used solely for DDoS prevention, rate limiting, and spam filtering.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "usage",
      title: "2. How We Use Your Data",
      icon: <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>We use the data collected strictly for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>To manage your developer profile and showcase your published UI components.</li>
            <li>To verify developer credibility and assign verified creator badges.</li>
            <li>To authenticate your identity securely and deliver verification emails via SMTP.</li>
            <li>To power public explore feeds, star counters, and developer ranking leaderboards.</li>
            <li>To protect our community against automated bot attacks, phishing, and malicious code injection.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "protection",
      title: "3. Data Storage & Security",
      icon: <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            Your security is our paramount priority. structui adheres to modern industry encryption standards:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Encryption in Transit:</strong> All data transferred between your browser and our servers is encrypted using TLS 1.3 / HTTPS.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Password Hashing:</strong> Passwords are cryptographically salted and hashed using bcrypt; we never store plain-text passwords.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Database Security:</strong> Data is persisted in PostgreSQL instances managed by Neon with SSL encryption and role-based access controls.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Zero Data Selling:</strong> We do NOT sell, rent, or monetize your personal data or email addresses to third-party advertisers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "third-party",
      title: "4. Third-Party Integrations",
      icon: <Share2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            structui integrates with select trusted third-party providers to deliver essential infrastructure:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Discord API:</strong> For optional developer single sign-on (SSO) and community guild synchronization.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Neon Database:</strong> Serverless PostgreSQL hosting located in secured European data centers.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">SMTP Relay:</strong> For transactional email verification and account notices.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "rights",
      title: "5. Developer Rights & Data Control",
      icon: <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            Under global privacy frameworks (including GDPR and CCPA), you hold full ownership of your data on structui:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-500 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Right to Edit:</strong> You can modify your public profile, tech stack, avatar, and snippets at any moment from Creator Studio.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Right to Deletion:</strong> You can delete any individual snippet or request full account deletion. Upon account deletion, all associated personal records are wiped.
            </li>
            <li>
              <strong className="text-zinc-700 dark:text-zinc-200">Right to Export:</strong> You can copy and export all your published components and code assets freely.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "contact",
      title: "6. Contact & Privacy Inquiries",
      icon: <Mail className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      content: (
        <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
          <p>
            If you have questions, feedback, or privacy requests regarding your data, please contact the Kodikas Organization team:
          </p>
          <div className="p-4 bg-neutral-100 dark:bg-zinc-800/80 rounded-2xl border border-neutral-200/70 dark:border-zinc-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#202020] dark:text-white">Kodikas Organization Privacy Team</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Email: info@kodikas.org</p>
            </div>
            <a
              href="mailto:info@kodikas.org"
              className="px-4 py-2 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              Contact Support
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#818cf8]" />
            <span className="text-zinc-600 dark:text-zinc-300 text-xs font-semibold">
              Legal &amp; Transparency
            </span>
          </div>

          <h1 className="font-bricolage text-4xl sm:text-5xl font-extrabold text-[#202020] dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
            How structui and kodikas.org respect developer privacy, secure source code, and protect your identity.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Version 1.2</span>
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
              <p className="text-sm font-bold text-[#202020] dark:text-white">Related Documentation</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Review our terms and component licensing details.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/terms"
              className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-xl border border-neutral-200 dark:border-zinc-700 transition-colors"
            >
              Terms of Service
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

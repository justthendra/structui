"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Code2, ShieldCheck, MailCheck, Ban, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/stats");
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { stats, recentUsers } = data || { stats: {}, recentUsers: [] };

  const cards = [
    { label: "Total Developers", value: stats.totalUsers || 0, subtitle: "Registered accounts", icon: <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />, badge: "+100% all-time" },
    { label: "Published Snippets", value: stats.totalSnippets || 0, subtitle: "Code & templates", icon: <Code2 className="w-5 h-5 text-[#3D38E9] dark:text-[#818cf8]" />, badge: "0% Commission" },
    { label: "Verified Developers", value: stats.totalVerified || 0, subtitle: "Audited GitHub profiles", icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, badge: "Verified Badges" },
    { label: "Discord Connections", value: stats.totalDiscordUsers || 0, subtitle: "Linked community users", icon: <FaDiscord className="w-5 h-5 text-[#5865F2]" />, badge: "OAuth Active" },
    { label: "Email Verified", value: stats.totalEmailVerified || 0, subtitle: "SMTP activated", icon: <MailCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />, badge: "Security" },
    { label: "Banned / Restricted", value: stats.totalBanned || 0, subtitle: "Blocked violations", icon: <Ban className="w-5 h-5 text-rose-600 dark:text-rose-400" />, badge: "Moderation" },
  ];

  return (
    <div className="space-y-10">
      {/* 6 Bento-Style Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 hover:border-neutral-300 dark:hover:border-zinc-700 transition-all shadow-xs"
          >
            <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/70 p-5 flex flex-col justify-between h-[150px]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-geist">
                    {card.label}
                  </span>
                  <p className="text-3xl font-extrabold font-bricolage text-[#202020] dark:text-white mt-1 tracking-tight">
                    {card.value}
                  </p>
                </div>
                <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl border border-neutral-200/60 dark:border-zinc-700 shadow-2xs">
                  {card.icon}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/60 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">{card.subtitle}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md border border-neutral-200 dark:border-zinc-700">
                  {card.badge}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Developers Bento Box */}
      <div className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs">
        <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          {/* Box Header */}
          <div className="p-6 border-b border-neutral-100 dark:border-zinc-800 flex items-center justify-between bg-neutral-50/50 dark:bg-zinc-950/50">
            <div>
              <div className="inline-flex items-center gap-1.5 mb-1">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold uppercase tracking-wider font-geist">
                  Live Activity
                </span>
              </div>
              <h2 className="font-bricolage text-2xl font-extrabold text-[#202020] dark:text-white tracking-tight">
                Recent Developer Registrations
              </h2>
            </div>

            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1 px-4 py-2 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              <span>Manage All Developers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-geist">
              <thead className="bg-neutral-50 dark:bg-zinc-950/80 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider border-b border-neutral-100 dark:border-zinc-800 text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Developer</th>
                  <th className="px-6 py-4">Email / Discord</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-zinc-400 dark:text-zinc-500">
                      No developers registered yet.
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-neutral-50/60 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={u.avatar || "/teaser/avatars/creator-1.png"}
                          alt={u.username}
                          className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-zinc-700 shadow-xs"
                        />
                        <div>
                          <a
                            href={`/u/${u.username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-[#202020] dark:text-white hover:text-[#3D38E9] dark:hover:text-[#818cf8] transition-colors"
                          >
                            @{u.username || "unset"}
                          </a>
                          {u.name && <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{u.name}</p>}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                        {u.email || (
                          <span className="inline-flex items-center gap-1 text-[#5865F2] font-medium">
                            <FaDiscord className="w-3 h-3" />
                            {u.discord_username}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.role === "admin"
                            ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                            : u.role === "moderator"
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : "bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700"
                        }`}>
                          {u.role || "developer"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {u.is_banned ? (
                          <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                            <Ban className="w-3 h-3" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-zinc-400 dark:text-zinc-500">
                        {new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

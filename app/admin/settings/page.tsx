"use client";

import React from "react";
import { Settings2, Database, Mail, Layers } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <div className="inline-flex items-center gap-1.5 mb-1">
          <Settings2 className="w-3.5 h-3.5 text-[#3D38E9]" />
          <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider font-geist">
            Infrastructure
          </span>
        </div>
        <h1 className="font-bricolage text-3xl font-extrabold text-[#202020] tracking-tight">
          System &amp; Environment Diagnostics
        </h1>
        <p className="text-sm text-zinc-500 font-geist mt-1">
          Review database ORM configuration, SMTP mailer status, and authentication providers.
        </p>
      </div>

      <div className="space-y-4">
        {/* Prisma ORM & SQLite Database Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                  <Layers className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bricolage font-extrabold text-[#202020] text-base">Prisma ORM &amp; Database</h3>
                  <p className="text-xs text-zinc-500 font-geist">Type-safe schema models (User, Snippet, Star, Follow, Token)</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                ✓ Prisma v6.19 Active
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-neutral-200/80 font-mono text-xs text-zinc-700">
              Provider: <code>sqlite</code> · Schema: <code>prisma/schema.prisma</code> · Path: <code>data/structui.db</code>
            </div>
          </div>
        </div>

        {/* SMTP Status Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bricolage font-extrabold text-[#202020] text-base">SMTP Mailer Service</h3>
                  <p className="text-xs text-zinc-500 font-geist">Dispatches user verification links via Nodemailer</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
                Ready &amp; Auto-fallback
              </span>
            </div>

            <p className="text-xs text-zinc-500 font-geist leading-relaxed">
              Configured in <code>.env</code> (<code>SMTP_HOST</code>, <code>SMTP_PORT</code>, <code>SMTP_USER</code>, <code>SMTP_PASS</code>). In local dev, links are also mirrored to console.
            </p>
          </div>
        </div>

        {/* Discord OAuth Card */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                  <FaDiscord className="w-6 h-6 text-[#5865F2]" />
                </div>
                <div>
                  <h3 className="font-bricolage font-extrabold text-[#202020] text-base">Discord OAuth2 Provider</h3>
                  <p className="text-xs text-zinc-500 font-geist">1-click authentication &amp; username setup</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-semibold">
                Live OAuth Enabled
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-neutral-200/80 font-mono text-xs text-zinc-700">
              Callback URI: <code>/api/auth/discord/callback</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

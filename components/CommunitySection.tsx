"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

interface DiscordGuildData {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  banner: string | null;
  approximate_member_count: number;
  approximate_presence_count: number;
  invite_url: string;
  is_live?: boolean;
}

const DEFAULT_SERVER_DATA: DiscordGuildData = {
  id: "1539313350863749171",
  name: "StructUI",
  description:
    "The official home for code builders, UI/UX engineers, and creators building modern web components with StructUI.",
  icon: "https://cdn.discordapp.com/icons/1539313350863749171/58b6bb2b5fa01df7b93f9347166c8c72.png?size=256",
  banner: null,
  approximate_member_count: 2,
  approximate_presence_count: 2,
  invite_url: "https://discord.gg/MdQqack6Jb",
  is_live: true,
};

export default function CommunitySection() {
  const [serverData, setServerData] = useState<DiscordGuildData>(DEFAULT_SERVER_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDiscordData() {
      try {
        const res = await fetch("/api/discord/community");
        if (res.ok) {
          const data: DiscordGuildData = await res.json();
          if (isMounted && data) {
            setServerData(data);
          }
        }
      } catch (err) {
        console.error("Error loading Discord server data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDiscordData();
    return () => {
      isMounted = false;
    };
  }, []);

  const inviteLink = serverData.invite_url || "https://discord.gg/MdQqack6Jb";

  return (
    <section className="bg-white py-16 md:py-28 px-6 overflow-hidden">
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-purple-600"
              >
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
            Engineers, creators, and designers share code, review pull requests, and trade
            UI components on our official Discord server. Join now and build with us!
          </p>

          <div className="flex flex-col sm:flex-row justify-start items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
            <a
              href={inviteLink}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.98] transition-all rounded-full inline-flex justify-center items-center gap-2.5 shadow-sm shadow-[#3D38E9]/20 text-white font-medium font-geist group"
            >
              <FaDiscord className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap">Join our Discord</span>
            </a>

            <a
              href="https://github.com/justthendra/structui"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all rounded-full border border-neutral-300 inline-flex justify-center items-center gap-2 text-[#202020] font-medium font-geist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="whitespace-nowrap">Star on GitHub</span>
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
          <div className="w-full max-w-[500px] flex flex-col justify-start items-center bg-white rounded-3xl border border-neutral-200/80 p-3.5 shadow-xl shadow-black/5 hover:border-neutral-300 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
            {/* Banner & Floating Icon */}
            <div className="w-full aspect-[2.35/1] min-h-[160px] rounded-2xl overflow-hidden relative shadow-inner border border-neutral-200/60 bg-gradient-to-tr from-[#0B0F2A] via-[#151B4E] to-[#25206D]">
              <Image
                src="/banner.png"
                alt={serverData.name}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Verified / Community Badge Top Right */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                <HiSparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span className="text-[11px] font-semibold text-white/90 tracking-tight font-geist">
                  Official Guild
                </span>
              </div>
            </div>

            {/* Server Details */}
            <div className="w-full px-4 flex flex-col justify-center items-center gap-3.5 mt-[-28px] pb-3 text-center relative z-10">
              {/* Server Icon with border */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg border border-neutral-200/90 overflow-hidden flex items-center justify-center">
                  {serverData.icon ? (
                    <Image
                      src={serverData.icon}
                      alt={serverData.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#3D38E9] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      S
                    </div>
                  )}
                </div>
                {/* Live Online Badge on Icon */}
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1A9E5C] border-2 border-white rounded-full flex items-center justify-center shadow-sm"
                  title="Server is active"
                />
              </div>

              <div className="flex flex-col gap-1.5 items-center">
                <h3 className="text-[#202020] text-xl md:text-2xl font-extrabold font-bricolage tracking-tight flex items-center gap-2">
                  <span>{serverData.name}</span>
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm font-normal font-geist max-w-[380px] line-clamp-3 leading-relaxed">
                  {serverData.description}
                </p>
              </div>

              {/* Online / Member Counters */}
              <div className="inline-flex justify-center items-center gap-6 pt-1">
                <div className="flex items-center gap-2 bg-emerald-50/70 border border-emerald-200/60 px-3 py-1 rounded-full">
                  <div className="w-2.5 h-2.5 bg-[#1A9E5C] rounded-full animate-pulse" />
                  <span className="text-emerald-800 text-xs font-semibold font-geist">
                    {serverData.approximate_presence_count.toLocaleString()}{" "}
                    {serverData.approximate_presence_count === 1 ? "Online" : "Online"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-neutral-100/80 border border-neutral-200/80 px-3 py-1 rounded-full">
                  <div className="w-2.5 h-2.5 bg-neutral-400 rounded-full" />
                  <span className="text-neutral-700 text-xs font-semibold font-geist">
                    {serverData.approximate_member_count.toLocaleString()}{" "}
                    {serverData.approximate_member_count === 1 ? "Member" : "Members"}
                  </span>
                </div>
              </div>

              {/* Direct Server Connect Button */}
              <a
                href={inviteLink}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-1 py-2.5 px-4 bg-neutral-900 hover:bg-[#3D38E9] text-white text-xs md:text-sm font-medium font-geist rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FaDiscord className="w-4 h-4" />
                <span>Connect & Enter Server</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


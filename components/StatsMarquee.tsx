"use client";

import React, { useEffect, useState } from "react";

export default function StatsMarquee() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSnippets: 0,
    totalVerified: 0,
    totalStars: 0,
    totalViews: 0,
  });

  useEffect(() => {
    fetch("/api/stats/public")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats(data.stats);
        }
      })
      .catch(console.error);
  }, []);

  const statsItems = [
    {
      label: "Developers",
      value: stats.totalUsers > 0 ? `${stats.totalUsers.toLocaleString()}+` : "1+",
    },
    {
      label: "Code Snippets",
      value: stats.totalSnippets > 0 ? `${stats.totalSnippets.toLocaleString()}+` : "0+",
    },
    {
      label: "Verified Devs",
      value: stats.totalVerified > 0 ? `${stats.totalVerified.toLocaleString()}+` : "1+",
    },
    {
      label: "Community Stars",
      value: stats.totalStars > 0 ? `${stats.totalStars.toLocaleString()}+` : "0+",
    },
    {
      label: "Snippet Views",
      value: stats.totalViews > 0 ? `${stats.totalViews.toLocaleString()}+` : "0+",
    },
    {
      label: "Code Categories",
      value: "8+",
    },
    {
      label: "Platform Fee",
      value: "0%",
    },
  ];

  return (
    <div className="w-full bg-[#3D38E9] overflow-hidden py-3 relative marquee-mask select-none border-y border-[#322DC8]">
      <div className="flex w-max animate-stats-marquee items-center gap-12 text-white font-geist text-xs md:text-sm font-semibold tracking-wide">
        {/* Render twice for infinite seamless scroll loop */}
        {[...statsItems, ...statsItems, ...statsItems].map((item, index) => (
          <div key={index} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-white/80 uppercase text-[10px] md:text-xs font-medium tracking-wider">
              {item.label}:
            </span>
            <span className="font-bricolage font-extrabold text-sm md:text-base text-white">
              {item.value}
            </span>
            <span className="text-white/40 ml-4">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

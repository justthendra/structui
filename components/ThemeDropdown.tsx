"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme, Theme } from "@/context/ThemeContext";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";

interface ThemeDropdownProps {
  align?: "left" | "right";
  className?: string;
  showLabel?: boolean;
}

export default function ThemeDropdown({
  align = "right",
  className = "",
  showLabel = false,
}: ThemeDropdownProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle outside click & ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const options: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  if (!mounted) {
    return (
      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 animate-pulse ${className}`} />
    );
  }

  const CurrentIcon =
    theme === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun;

  return (
    <div ref={menuRef} className={`relative inline-block text-left ${className}`}>
      {/* Dropdown Toggle Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-10 md:h-11 px-2.5 sm:px-3 py-2 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/90 text-neutral-700 dark:text-zinc-200 rounded-xl border border-neutral-200/60 dark:border-zinc-700/60 transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-2xs"
        aria-expanded={open}
        aria-label="Theme Selector"
        title="Theme Selector"
      >
        <CurrentIcon className="w-4 h-4 text-[#3D38E9] dark:text-[#818cf8] transition-transform duration-200" />
        {showLabel && (
          <span className="text-xs font-semibold capitalize hidden sm:inline">
            {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 dark:text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {open && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-48 bg-white dark:bg-zinc-900 rounded-2xl border border-neutral-200/80 dark:border-zinc-800 shadow-xl dark:shadow-2xl dark:shadow-black/60 p-1.5 z-[110] animate-in fade-in zoom-in-95 duration-150 font-geist`}
        >
          <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-400 dark:text-zinc-500 uppercase tracking-wider">
            Theme
          </div>
          <div className="space-y-0.5">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setTheme(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#3D38E9]/10 text-[#3D38E9] dark:bg-[#3D38E9]/20 dark:text-[#a5b4fc]"
                      : "text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800/80 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-[#3D38E9] dark:text-[#a5b4fc]" : "text-neutral-500 dark:text-zinc-400"
                      }`}
                    />
                    <span>{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#a5b4fc]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Segmented Pill Toggle for Profile Dropdowns, Mobile Drawers & Settings
 */
export function ThemeSegmentedToggle({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`${size === "sm" ? "h-8" : "h-9"} bg-neutral-100 dark:bg-zinc-800 rounded-xl animate-pulse ${className}`} />
    );
  }

  const options: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "Auto", icon: Monitor },
  ];

  return (
    <div
      className={`grid grid-cols-3 gap-1 bg-neutral-100 dark:bg-zinc-800/90 p-1 rounded-xl border border-neutral-200/70 dark:border-zinc-700/60 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTheme(opt.value);
            }}
            className={`flex items-center justify-center gap-1.5 ${
              size === "sm" ? "py-1 px-1.5 text-[11px]" : "py-1.5 px-2 text-xs"
            } font-semibold rounded-lg transition-all cursor-pointer ${
              isSelected
                ? "bg-white dark:bg-zinc-700 text-[#3D38E9] dark:text-[#a5b4fc] shadow-xs"
                : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
            title={`${opt.label} theme`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#3D38E9] dark:text-[#a5b4fc]" : ""}`} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}


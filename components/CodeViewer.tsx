"use client";

import React, { useMemo } from "react";
import Prism from "prismjs";

// Import Prism core languages in dependency order
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-c";
import "prismjs/components/prism-glsl";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-yaml";

import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiPython,
  SiCss,
  SiTailwindcss,
  SiHtml5,
  SiJson,
  SiGnubash,
  SiMarkdown,
} from "react-icons/si";
import { Terminal, Code2 } from "lucide-react";

export interface LanguageMeta {
  name: string;
  prismLang: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  badgeText: string;
}

export const LANGUAGE_MAP: Record<string, LanguageMeta> = {
  typescript: {
    name: "TypeScript",
    prismLang: "typescript",
    icon: SiTypescript,
    color: "#3178C6",
    bgLight: "bg-blue-50 text-blue-700",
    bgDark: "dark:bg-blue-950/50 dark:text-blue-400",
    borderLight: "border-blue-200",
    borderDark: "dark:border-blue-800/60",
    badgeText: "TS",
  },
  ts: {
    name: "TypeScript",
    prismLang: "typescript",
    icon: SiTypescript,
    color: "#3178C6",
    bgLight: "bg-blue-50 text-blue-700",
    bgDark: "dark:bg-blue-950/50 dark:text-blue-400",
    borderLight: "border-blue-200",
    borderDark: "dark:border-blue-800/60",
    badgeText: "TS",
  },
  javascript: {
    name: "JavaScript",
    prismLang: "javascript",
    icon: SiJavascript,
    color: "#F7DF1E",
    bgLight: "bg-yellow-50 text-yellow-800",
    bgDark: "dark:bg-yellow-950/50 dark:text-yellow-300",
    borderLight: "border-yellow-200",
    borderDark: "dark:border-yellow-800/60",
    badgeText: "JS",
  },
  js: {
    name: "JavaScript",
    prismLang: "javascript",
    icon: SiJavascript,
    color: "#F7DF1E",
    bgLight: "bg-yellow-50 text-yellow-800",
    bgDark: "dark:bg-yellow-950/50 dark:text-yellow-300",
    borderLight: "border-yellow-200",
    borderDark: "dark:border-yellow-800/60",
    badgeText: "JS",
  },
  tsx: {
    name: "React / TSX",
    prismLang: "tsx",
    icon: SiReact,
    color: "#00D8FF",
    bgLight: "bg-cyan-50 text-cyan-800",
    bgDark: "dark:bg-cyan-950/50 dark:text-cyan-300",
    borderLight: "border-cyan-200",
    borderDark: "dark:border-cyan-800/60",
    badgeText: "TSX",
  },
  jsx: {
    name: "React / JSX",
    prismLang: "jsx",
    icon: SiReact,
    color: "#00D8FF",
    bgLight: "bg-cyan-50 text-cyan-800",
    bgDark: "dark:bg-cyan-950/50 dark:text-cyan-300",
    borderLight: "border-cyan-200",
    borderDark: "dark:border-cyan-800/60",
    badgeText: "JSX",
  },
  react: {
    name: "React",
    prismLang: "tsx",
    icon: SiReact,
    color: "#00D8FF",
    bgLight: "bg-cyan-50 text-cyan-800",
    bgDark: "dark:bg-cyan-950/50 dark:text-cyan-300",
    borderLight: "border-cyan-200",
    borderDark: "dark:border-cyan-800/60",
    badgeText: "REACT",
  },
  css: {
    name: "CSS / Tailwind",
    prismLang: "css",
    icon: SiCss,
    color: "#38BDF8",
    bgLight: "bg-sky-50 text-sky-700",
    bgDark: "dark:bg-sky-950/50 dark:text-sky-300",
    borderLight: "border-sky-200",
    borderDark: "dark:border-sky-800/60",
    badgeText: "CSS",
  },
  html: {
    name: "HTML",
    prismLang: "markup",
    icon: SiHtml5,
    color: "#E34F26",
    bgLight: "bg-orange-50 text-orange-700",
    bgDark: "dark:bg-orange-950/50 dark:text-orange-300",
    borderLight: "border-orange-200",
    borderDark: "dark:border-orange-800/60",
    badgeText: "HTML",
  },
  python: {
    name: "Python",
    prismLang: "python",
    icon: SiPython,
    color: "#3776AB",
    bgLight: "bg-emerald-50 text-emerald-700",
    bgDark: "dark:bg-emerald-950/50 dark:text-emerald-300",
    borderLight: "border-emerald-200",
    borderDark: "dark:border-emerald-800/60",
    badgeText: "PY",
  },
  py: {
    name: "Python",
    prismLang: "python",
    icon: SiPython,
    color: "#3776AB",
    bgLight: "bg-emerald-50 text-emerald-700",
    bgDark: "dark:bg-emerald-950/50 dark:text-emerald-300",
    borderLight: "border-emerald-200",
    borderDark: "dark:border-emerald-800/60",
    badgeText: "PY",
  },
  glsl: {
    name: "GLSL Shader",
    prismLang: "glsl",
    icon: Terminal,
    color: "#A855F7",
    bgLight: "bg-purple-50 text-purple-700",
    bgDark: "dark:bg-purple-950/50 dark:text-purple-300",
    borderLight: "border-purple-200",
    borderDark: "dark:border-purple-800/60",
    badgeText: "GLSL",
  },
  json: {
    name: "JSON",
    prismLang: "json",
    icon: SiJson,
    color: "#F59E0B",
    bgLight: "bg-amber-50 text-amber-700",
    bgDark: "dark:bg-amber-950/50 dark:text-amber-300",
    borderLight: "border-amber-200",
    borderDark: "dark:border-amber-800/60",
    badgeText: "JSON",
  },
  bash: {
    name: "Bash / Shell",
    prismLang: "bash",
    icon: SiGnubash,
    color: "#10B981",
    bgLight: "bg-emerald-50 text-emerald-700",
    bgDark: "dark:bg-emerald-950/50 dark:text-emerald-300",
    borderLight: "border-emerald-200",
    borderDark: "dark:border-emerald-800/60",
    badgeText: "SH",
  },
  markdown: {
    name: "Markdown",
    prismLang: "markdown",
    icon: SiMarkdown,
    color: "#0284C7",
    bgLight: "bg-blue-50 text-blue-700",
    bgDark: "dark:bg-blue-950/50 dark:text-blue-300",
    borderLight: "border-blue-200",
    borderDark: "dark:border-blue-800/60",
    badgeText: "MD",
  },
};

export function getLanguageMeta(lang?: string): LanguageMeta {
  if (!lang) {
    return {
      name: "Code",
      prismLang: "javascript",
      icon: Code2,
      color: "#6366F1",
      bgLight: "bg-indigo-50 text-indigo-700",
      bgDark: "dark:bg-indigo-950/50 dark:text-indigo-300",
      borderLight: "border-indigo-200",
      borderDark: "dark:border-indigo-800/60",
      badgeText: "CODE",
    };
  }

  const key = lang.trim().toLowerCase();
  return (
    LANGUAGE_MAP[key] || {
      name: lang.toUpperCase(),
      prismLang: Prism.languages[key] ? key : "javascript",
      icon: Code2,
      color: "#6366F1",
      bgLight: "bg-indigo-50 text-indigo-700",
      bgDark: "dark:bg-indigo-950/50 dark:text-indigo-300",
      borderLight: "border-indigo-200",
      borderDark: "dark:border-indigo-800/60",
      badgeText: lang.toUpperCase().slice(0, 4),
    }
  );
}

export function LanguageBadge({
  language,
  className = "",
  showIcon = true,
}: {
  language: string;
  className?: string;
  showIcon?: boolean;
}) {
  const meta = getLanguageMeta(language);
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${meta.bgLight} ${meta.bgDark} ${meta.borderLight} ${meta.borderDark} ${className}`}
      style={{
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{meta.name}</span>
    </span>
  );
}

interface CodeHighlightProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  maxLines?: number;
  className?: string;
}

export function CodeHighlight({
  code,
  language,
  showLineNumbers = false,
  maxLines,
  className = "",
}: CodeHighlightProps) {
  const meta = getLanguageMeta(language);

  const highlightedHtml = useMemo(() => {
    try {
      const grammar =
        Prism.languages[meta.prismLang] || Prism.languages.javascript || Prism.languages.markup;
      const rawCode = code || "";
      const lines = rawCode.split("\n");
      const targetLines = maxLines ? lines.slice(0, maxLines) : lines;
      const processedCode = targetLines.join("\n");

      return Prism.highlight(processedCode, grammar, meta.prismLang);
    } catch (err) {
      console.warn("Prism highlight error:", err);
      return (code || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }, [code, meta.prismLang, maxLines]);

  const lines = useMemo(() => {
    return (code || "").split("\n");
  }, [code]);

  if (showLineNumbers) {
    const rawLines = (code || "").split("\n");
    const grammar =
      Prism.languages[meta.prismLang] || Prism.languages.javascript || Prism.languages.markup;

    return (
      <div className={`font-mono text-[12px] leading-6 select-text ${className}`}>
        <table className="w-full border-collapse">
          <tbody>
            {rawLines.map((lineText, idx) => {
              const lineHtml = Prism.highlight(
                lineText || " ",
                grammar,
                meta.prismLang
              );
              return (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.04] transition-colors group/row"
                >
                  <td className="w-10 pr-4 pl-2 text-right select-none text-zinc-600 dark:text-zinc-500 font-mono text-[11px] align-top border-r border-neutral-800/60 group-hover/row:text-zinc-400">
                    {idx + 1}
                  </td>
                  <td className="pl-4 pr-2 whitespace-pre overflow-x-auto align-top text-zinc-200">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: lineHtml || "&nbsp;",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <pre className={`font-mono text-[12px] leading-5 text-zinc-200 ${className}`}>
      <code
        className={`language-${meta.prismLang}`}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
}

"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Code2,
  Copy,
  Check,
  Star,
  Eye,
  Sparkles,
  Download,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ExplorePage() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("trending");

  // Modal View Snippet State
  const [activeSnippet, setActiveSnippet] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All",
    "React Components",
    "Tailwind Templates",
    "Next.js Boilerplates",
    "Backend & Edge",
    "Shaders & 3D",
    "Fullstack Starter Kits",
  ];

  const languages = [
    { label: "All Languages", value: "all" },
    { label: "TypeScript", value: "typescript" },
    { label: "JavaScript", value: "javascript" },
    { label: "React / TSX", value: "tsx" },
    { label: "CSS / Tailwind", value: "css" },
    { label: "Python", value: "python" },
    { label: "GLSL / Shaders", value: "glsl" },
  ];

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedCategory !== "All" && selectedCategory !== "all") params.set("category", selectedCategory);
      if (selectedLanguage !== "all") params.set("language", selectedLanguage);
      if (priceFilter !== "all") params.set("price", priceFilter);
      if (sortFilter !== "trending") params.set("sort", sortFilter);

      const res = await fetch(`/api/snippets?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setSnippets(data.snippets || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [selectedCategory, selectedLanguage, priceFilter, sortFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSnippets();
  };

  const handleCopyCode = (id: string, code: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3D38E9", "#06B6D4", "#10B981"],
      });
    } catch {}
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleStar = async (snippetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/snippets/${snippetId}/star`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSnippets((prev) =>
          prev.map((s) => (s.id === snippetId ? { ...s, stars_count: data.starsCount } : s))
        );
        if (activeSnippet && activeSnippet.id === snippetId) {
          setActiveSnippet({ ...activeSnippet, stars_count: data.starsCount });
        }
      } else {
        alert(data.error || "Please log in to star snippets.");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleDownloadFile = (snippet: any) => {
    const ext = snippet.language === "python" ? "py" : snippet.language === "css" ? "css" : "tsx";
    const filename = `${snippet.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.${ext}`;
    const blob = new Blob([snippet.code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-[#202020] flex flex-col justify-between font-geist">
      <Navbar />

      {/* Hero Header */}
      <section className="relative bg-[#F7F7F7] border-b border-neutral-200/80 pt-16 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

        <div className="max-w-[1100px] mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#3D38E9]" />
            <span className="text-zinc-600 text-xs font-semibold font-geist">
              Explore 10,000+ Production-Ready Snippets
            </span>
          </div>

          <h1 className="font-bricolage text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#202020] tracking-tighter max-w-2xl leading-[1.06]">
            Discover, copy and fork <br />
            <span className="text-[#3D38E9]">verified code.</span>
          </h1>

          <p className="text-zinc-500 text-sm md:text-base font-geist max-w-lg mt-3">
            Search curated React components, Tailwind boilerplates, backend hooks, and shaders built by real engineers.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mt-8">
            <div className="relative flex items-center bg-white rounded-2xl border border-neutral-200/90 shadow-sm focus-within:border-[#3D38E9] focus-within:shadow-[0_0_0_3px_rgba(61,56,233,0.12)] transition-all p-1.5">
              <Search className="w-5 h-5 text-zinc-400 ml-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search hooks, navigation bars, Three.js shaders, Tailwind kits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 px-3 text-sm md:text-base font-geist bg-transparent border-none outline-none text-[#202020] placeholder:text-zinc-400 min-w-0"
              />
              <button
                type="submit"
                className="h-10 px-5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer flex-shrink-0 shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Category Pill Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat) => {
              const active =
                selectedCategory.toLowerCase() === cat.toLowerCase() ||
                (selectedCategory === "all" && cat === "All");
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat === "All" ? "all" : cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs ${
                    active
                      ? "bg-[#202020] text-white shadow-xs"
                      : "bg-white text-zinc-600 hover:text-[#202020] border border-neutral-200/80 hover:bg-neutral-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Browse Section */}
      <main className="max-w-[1100px] w-full mx-auto px-6 py-10 flex-1">
        {/* Filters & Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="font-bricolage font-extrabold text-xl text-[#202020]">
              {snippets.length}
            </span>
            <span className="text-zinc-500 text-sm font-medium">snippets available</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Language Select */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="h-9 px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-zinc-700 outline-none cursor-pointer shadow-xs"
            >
              {languages.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortFilter}
              onChange={(e) => setSortFilter(e.target.value)}
              className="h-9 px-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-zinc-700 outline-none cursor-pointer shadow-xs"
            >
              <option value="trending">🔥 Trending</option>
              <option value="stars">⭐ Most Starred</option>
              <option value="latest">✨ Latest Added</option>
            </select>
          </div>
        </div>

        {/* Snippets Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : snippets.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-16 text-center text-zinc-500">
              <Code2 className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
              <h3 className="font-bricolage text-2xl font-bold text-[#202020] mb-1">
                No code snippets found
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                Try adjusting your search query or selecting a different category.
              </p>
              <Link
                href="/dashboard"
                className="px-5 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
              >
                + Publish the first one
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {snippets.map((snippet) => {
              const isFree = !snippet.price || snippet.price === 0;
              const isCopied = copiedId === snippet.id;

              return (
                <div
                  key={snippet.id}
                  onClick={() => setActiveSnippet(snippet)}
                  className="rounded-3xl border border-neutral-200 bg-white p-2 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 flex flex-col justify-between h-full gap-4">
                    {/* Card Top: Author + Category + Price */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        {/* Author */}
                        <Link
                          href={`/u/${snippet.username}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={snippet.author_avatar || "/teaser/avatars/creator-1.png"}
                            alt={snippet.username}
                            className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                          />
                          <div className="flex items-center gap-1 leading-none">
                            <span className="text-xs font-bold text-[#202020]">
                              @{snippet.username}
                            </span>
                            {snippet.author_verified ? (
                              <ShieldCheck className="w-3.5 h-3.5 text-[#3D38E9]" />
                            ) : null}
                          </div>
                        </Link>

                        {/* Free Open Source Pill */}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          100% Free
                        </span>
                      </div>

                      {/* Title & Category */}
                      <h3 className="font-bricolage text-lg font-bold text-[#202020] group-hover:text-[#3D38E9] transition-colors leading-snug line-clamp-1">
                        {snippet.title}
                      </h3>

                      <p className="text-xs text-zinc-500 font-geist mt-1 mb-3 line-clamp-2 leading-relaxed">
                        {snippet.description || "No description provided."}
                      </p>

                      {/* Code Preview Box */}
                      <div className="relative rounded-2xl bg-[#161b22] p-3.5 font-mono text-[11px] text-zinc-300 overflow-hidden border border-neutral-800 h-28 group/code">
                        <pre className="overflow-hidden line-clamp-4">
                          <code>{snippet.code}</code>
                        </pre>

                        {/* Quick Copy Floating Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/40 to-transparent flex items-end justify-between p-3 opacity-90 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-bold uppercase text-zinc-400 bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-700">
                            {snippet.language}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleCopyCode(snippet.id, snippet.code, e)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isCopied
                                ? "bg-emerald-600 text-white"
                                : "bg-[#3D38E9] hover:bg-[#322DC8] text-white shadow-xs"
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Category + Stars & Views */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-zinc-500">
                      <span className="text-[11px] font-semibold text-zinc-600 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                        {snippet.category}
                      </span>

                      <div className="flex items-center gap-3 font-geist">
                        <button
                          type="button"
                          onClick={(e) => handleStar(snippet.id, e)}
                          className="inline-flex items-center gap-1 hover:text-amber-500 transition-colors"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>{snippet.stars_count || 0}</span>
                        </button>

                        <div className="inline-flex items-center gap-1 text-zinc-400">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{snippet.views_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Snippet Full Detail Modal */}
      {activeSnippet && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveSnippet(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase text-[#3D38E9] bg-[#3D38E9]/10 px-2.5 py-0.5 rounded-md border border-[#3D38E9]/20">
                    {activeSnippet.category}
                  </span>
                  <span className="text-[11px] font-bold text-zinc-600 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                    {activeSnippet.language}
                  </span>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {activeSnippet.price > 0 ? `€${Number(activeSnippet.price).toFixed(2)}` : "Free / Open Source"}
                  </span>
                </div>

                <h2 className="font-bricolage text-2xl font-extrabold text-[#202020]">
                  {activeSnippet.title}
                </h2>

                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 font-geist">
                  <Link
                    href={`/u/${activeSnippet.username}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#3D38E9] font-semibold text-[#202020]"
                  >
                    <img
                      src={activeSnippet.author_avatar || "/teaser/avatars/creator-1.png"}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>@{activeSnippet.username}</span>
                  </Link>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={(e) => handleStar(activeSnippet.id, e)}
                    className="inline-flex items-center gap-1 hover:text-amber-500"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{activeSnippet.stars_count || 0} stars</span>
                  </button>
                  <span>·</span>
                  <span>{activeSnippet.views_count || 0} views</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveSnippet(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-neutral-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Description & Full Code Box */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {activeSnippet.description && (
                <p className="text-sm text-zinc-600 font-geist leading-relaxed">
                  {activeSnippet.description}
                </p>
              )}

              {/* Full Code Container */}
              <div className="rounded-2xl bg-[#161b22] border border-neutral-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs text-zinc-400">
                  <span className="font-mono text-[11px]">{activeSnippet.title}.{activeSnippet.language === "python" ? "py" : "tsx"}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(activeSnippet)}
                      className="inline-flex items-center gap-1 text-xs hover:text-white transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 font-mono text-xs text-zinc-200 overflow-x-auto max-h-96">
                  <pre>
                    <code>{activeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between gap-4">
              <Link
                href={`/u/${activeSnippet.username}`}
                className="text-xs font-semibold font-geist text-zinc-600 hover:text-[#3D38E9] inline-flex items-center gap-1"
              >
                <span>View Author Profile</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadFile(activeSnippet)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold font-geist text-zinc-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .tsx</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCode(activeSnippet.id, activeSnippet.code)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-geist transition-all inline-flex items-center gap-2 cursor-pointer ${
                    copiedId === activeSnippet.id
                      ? "bg-emerald-600 text-white"
                      : "bg-[#3D38E9] hover:bg-[#322DC8] text-white shadow-xs"
                  }`}
                >
                  {copiedId === activeSnippet.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Full Snippet</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConfirmModal from "@/components/ConfirmModal";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  Plus,
  Eye,
  Star,
  Package,
  Code2,
  Trash2,
  Edit3,
  Copy,
  Check,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Publish / Edit Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [editingSnippetId, setEditingSnippetId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [category, setCategory] = useState("React Components");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState<any>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/creator/stats");
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

  const handleOpenPublish = (snippet?: any) => {
    if (snippet) {
      setEditingSnippetId(snippet.id);
      setTitle(snippet.title);
      setDescription(snippet.description || "");
      setCode(snippet.code);
      setLanguage(snippet.language);
      setCategory(snippet.category);
      setTags(snippet.tags || "");
    } else {
      setEditingSnippetId(null);
      setTitle("");
      setDescription("");
      setCode(`// Your component code here
export default function Component() {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm border border-neutral-200">
      <h3 className="font-bold text-lg">Hello from structui</h3>
    </div>
  );
}`);
      setLanguage("typescript");
      setCategory("React Components");
      setTags("react, tailwind, ui");
    }
    setIsPublishModalOpen(true);
  };

  const handleSaveSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingSnippetId
        ? `/api/snippets/${editingSnippetId}`
        : "/api/snippets";
      const method = editingSnippetId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          code,
          language,
          category,
          price: 0,
          tags,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save snippet");
      }

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#3D38E9", "#10B981", "#06B6D4"],
        });
      } catch {}

      setIsPublishModalOpen(false);
      fetchStats();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const promptDeleteSnippet = (snippet: any) => {
    setSnippetToDelete(snippet);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!snippetToDelete) return;
    try {
      const res = await fetch(`/api/snippets/${snippetToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteModalOpen(false);
        setSnippetToDelete(null);
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyCode = (id: string, codeStr: string) => {
    navigator.clipboard.writeText(codeStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col justify-between font-geist">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  const { stats, snippets } = data || {
    stats: { totalSnippets: 0, totalViews: 0, totalStars: 0 },
    snippets: [],
  };

  const metricCards = [
    {
      label: "Published Components",
      value: stats.totalSnippets,
      subtitle: "100% Free & Open-Source",
      icon: <Package className="w-5 h-5 text-[#3D38E9]" />,
      bg: "bg-indigo-50/60 border-indigo-200/80 text-[#3D38E9]",
    },
    {
      label: "Total Snippet Views",
      value: stats.totalViews.toLocaleString(),
      subtitle: "Developer impressions",
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/60 border-blue-200/80 text-blue-700",
    },
    {
      label: "Stars Received",
      value: stats.totalStars.toLocaleString(),
      subtitle: "Community recognition",
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
      bg: "bg-amber-50/60 border-amber-200/80 text-amber-700",
    },
    {
      label: "Open License",
      value: "MIT",
      subtitle: "Free for all developers",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50/60 border-emerald-200/80 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#202020] flex flex-col justify-between font-geist">
      <Navbar />

      {/* Hero Header */}
      <section className="relative bg-[#F7F7F7] border-b border-neutral-200/80 mt-16 pt-12 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-2 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#3D38E9]" />
                <span className="text-zinc-600 text-xs font-semibold font-geist">
                  Creator Studio &amp; Code Manager
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold font-bricolage text-[#202020] tracking-tighter leading-tight">
                Developer Dashboard
              </h1>
              <p className="text-zinc-500 text-sm font-geist mt-1.5 max-w-lg">
                Publish React components, Tailwind templates, or scripts 100% free for the community.
              </p>
            </div>

            {/* Action Button */}
            <div>
              <button
                type="button"
                onClick={() => handleOpenPublish()}
                className="px-6 py-3 bg-[#3D38E9] hover:bg-[#322DC8] active:scale-[0.98] transition-all rounded-2xl flex items-center gap-2 text-white font-semibold font-geist text-sm shadow-sm shadow-[#3D38E9]/25 hover:shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Component</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1100px] w-full mx-auto px-6 py-10 space-y-10 flex-1">
        {/* Metric Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m) => (
            <div
              key={m.label}
              className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs"
            >
              <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-5 flex flex-col justify-between h-36">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500 font-geist">
                    {m.label}
                  </span>
                  <div className={`p-2 rounded-xl border ${m.bg}`}>
                    {m.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-bricolage text-2xl font-extrabold text-[#202020] tracking-tight">
                    {m.value}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-medium font-geist mt-0.5">
                    {m.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Developer Published Snippets Section */}
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <div>
                <h2 className="font-bricolage text-2xl font-extrabold text-[#202020] tracking-tight">
                  Your Published Components ({snippets.length})
                </h2>
                <p className="text-xs text-zinc-500 font-geist mt-0.5">
                  Manage, update or delete your published code snippets.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPublish()}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-[#202020] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Code</span>
              </button>
            </div>

            {snippets.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 text-[#3D38E9]">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="font-bricolage text-xl font-bold text-[#202020] mb-1">
                  No components published yet
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-geist max-w-sm mx-auto mb-6">
                  Publish your first React component, Tailwind card, or script to share with the community.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenPublish()}
                  className="px-6 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Publish First Component
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {snippets.map((snip: any) => {
                  const isCopied = copiedId === snip.id;

                  return (
                    <div
                      key={snip.id}
                      className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase bg-neutral-100 text-zinc-600 px-2 py-0.5 rounded-md border border-neutral-200">
                            {snip.language}
                          </span>
                          <span className="text-[11px] font-medium text-zinc-500">
                            {snip.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Free
                          </span>
                        </div>

                        <h3 className="font-bricolage text-lg font-bold text-[#202020] group-hover:text-[#3D38E9] transition-colors">
                          {snip.title}
                        </h3>

                        <p className="text-xs text-zinc-500 font-geist line-clamp-1">
                          {snip.description || "No description provided."}
                        </p>
                      </div>

                      {/* Right Meta & Actions */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                        {/* Stats */}
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-geist pr-2">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{snip.views_count || 0}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span>{snip.stars_count || 0}</span>
                          </span>
                        </div>

                        {/* Quick Copy */}
                        <button
                          type="button"
                          onClick={() => handleCopyCode(snip.id, snip.code)}
                          className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-zinc-600 transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenPublish(snip)}
                          className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-zinc-600 transition-colors cursor-pointer"
                          title="Edit Component"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => promptDeleteSnippet(snip)}
                          className="p-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                          title="Delete Component"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Publish & Edit Modal */}
      {isPublishModalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsPublishModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="font-bricolage text-2xl font-extrabold text-[#202020]">
                  {editingSnippetId ? "Edit Component Snippet" : "Publish New Component"}
                </h2>
                <p className="text-xs text-zinc-500 font-geist mt-0.5">
                  Share your code 100% free with the open-source developer ecosystem.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublishModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSnippet} className="p-6 overflow-y-auto space-y-4 flex-1 font-geist">
              <div>
                <label className="block text-xs font-bold text-[#202020] mb-1.5">
                  Component Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Glassmorphism Floating Navbar with Blur"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:border-[#3D38E9] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-[#202020] mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-xs text-zinc-700 font-semibold outline-none cursor-pointer bg-white"
                  >
                    <option value="React Components">React Components</option>
                    <option value="Tailwind Templates">Tailwind Templates</option>
                    <option value="Next.js Boilerplates">Next.js Boilerplates</option>
                    <option value="Backend & Edge">Backend &amp; Edge</option>
                    <option value="Shaders & 3D">Shaders &amp; 3D</option>
                    <option value="Fullstack Starter Kits">Fullstack Starter Kits</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-bold text-[#202020] mb-1.5">
                    Language / Stack
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-xs text-zinc-700 font-semibold outline-none cursor-pointer bg-white"
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="tsx">React (TSX)</option>
                    <option value="css">Tailwind CSS</option>
                    <option value="python">Python</option>
                    <option value="glsl">Three.js / GLSL</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202020] mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of how to use this component..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-neutral-200 text-xs focus:border-[#3D38E9] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202020] mb-1.5">
                  Source Code (TSX, JSX, CSS, Python) *
                </label>
                <div className="rounded-xl border border-neutral-800 bg-[#161b22] overflow-hidden">
                  <textarea
                    rows={8}
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-4 font-mono text-xs text-zinc-200 bg-transparent border-none outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#202020] mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="react, tailwind, animation, hero"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-xs focus:border-[#3D38E9] outline-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-zinc-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Publishing..." : editingSnippetId ? "Save Changes" : "Publish Free Component"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Component Snippet"
        message={`Are you sure you want to permanently delete "${snippetToDelete?.title}"? This action cannot be undone.`}
        confirmText="Yes, Delete Snippet"
        variant="danger"
      />

      <Footer />
    </div>
  );
}

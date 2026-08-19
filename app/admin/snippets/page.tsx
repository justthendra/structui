"use client";

import React, { useEffect, useState } from "react";
import { Code2, Pin, Trash2, FileCode } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminSnippetsPage() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Custom Delete Modal State
  const [deletingSnippet, setDeletingSnippet] = useState<{ id: string; title: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/snippets");
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
  }, []);

  const handleToggleFeature = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/snippets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: !current }),
      });
      if (res.ok) {
        setSnippets((prev) =>
          prev.map((s) => (s.id === id ? { ...s, is_featured: !current ? 1 : 0 } : s))
        );
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleConfirmDeleteSnippet = async () => {
    if (!deletingSnippet) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/snippets/${deletingSnippet.id}`, { method: "DELETE" });
      if (res.ok) {
        setSnippets((prev) => prev.filter((s) => s.id !== deletingSnippet.id));
        setDeletingSnippet(null);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 mb-1">
          <Code2 className="w-3.5 h-3.5 text-[#3D38E9] dark:text-[#818cf8]" />
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold uppercase tracking-wider font-geist">
            Code Moderation
          </span>
        </div>
        <h1 className="font-bricolage text-3xl font-extrabold text-[#202020] dark:text-white tracking-tight">
          Code Snippets &amp; Templates
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-geist mt-1">
          Review, pin/feature, or moderate code snippets across the marketplace.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : snippets.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950/70 p-12 text-center text-zinc-500 dark:text-zinc-400 flex flex-col items-center">
            <FileCode className="w-10 h-10 text-zinc-400 dark:text-zinc-500 mb-2" />
            <p className="font-bricolage text-xl font-bold text-[#202020] dark:text-white mb-1">No Snippets Found</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">No code components have been published yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xs flex flex-col justify-between"
            >
              <div className="rounded-2xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 flex flex-col justify-between h-full gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-zinc-700">
                        {s.language}
                      </span>
                      <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        {s.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleFeature(s.id, Boolean(s.is_featured))}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer shadow-xs ${
                        s.is_featured
                          ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                          : "bg-neutral-50 dark:bg-zinc-800 text-neutral-400 dark:text-zinc-500 border-neutral-200 dark:border-zinc-700 hover:text-neutral-600 dark:hover:text-zinc-300"
                      }`}
                    >
                      <Pin className="w-3 h-3" />
                      <span>{s.is_featured ? "Featured" : "Feature"}</span>
                    </button>
                  </div>

                  <h3 className="font-bricolage text-lg font-bold text-[#202020] dark:text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-geist mt-1 line-clamp-2 leading-relaxed">
                    {s.description || "No description provided."}
                  </p>

                  {/* Code box */}
                  <div className="mt-3 bg-[#161b22] rounded-xl p-3 font-mono text-[11px] text-zinc-300 max-h-24 overflow-hidden border border-neutral-800">
                    <code>{s.code}</code>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <img
                      src={s.author_avatar || "/teaser/avatars/creator-1.png"}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover border border-neutral-200 dark:border-zinc-700"
                    />
                    <a
                      href={`/u/${s.username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#202020] dark:text-white hover:text-[#3D38E9] dark:hover:text-[#818cf8]"
                    >
                      @{s.username}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-amber-500 font-semibold">★ {s.stars_count || 0}</span>
                    <button
                      type="button"
                      onClick={() => setDeletingSnippet({ id: s.id, title: s.title })}
                      className="text-neutral-400 hover:text-rose-600 transition-colors p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                      title="Delete Snippet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingSnippet)}
        onClose={() => setDeletingSnippet(null)}
        onConfirm={handleConfirmDeleteSnippet}
        title="Delete Snippet?"
        message={`Are you sure you want to permanently delete "${deletingSnippet?.title}" from the marketplace?`}
        confirmText="Yes, Delete Snippet"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}

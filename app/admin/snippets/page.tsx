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
          <Code2 className="w-3.5 h-3.5 text-[#3D38E9]" />
          <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider font-geist">
            Code Moderation
          </span>
        </div>
        <h1 className="font-bricolage text-3xl font-extrabold text-[#202020] tracking-tight">
          Code Snippets &amp; Templates
        </h1>
        <p className="text-sm text-zinc-500 font-geist mt-1">
          Review, pin/feature, or moderate code snippets across the marketplace.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="size-9 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : snippets.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-12 text-center text-zinc-500 flex flex-col items-center">
            <FileCode className="w-10 h-10 text-zinc-400 mb-2" />
            <p className="font-bricolage text-xl font-bold text-[#202020] mb-1">No Snippets Found</p>
            <p className="text-xs text-zinc-400">No code components have been published yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl border border-neutral-200 bg-white p-2 hover:border-neutral-300 transition-colors shadow-xs flex flex-col"
            >
              <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bricolage font-extrabold text-[#202020] text-base truncate">
                      {s.title}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 border border-cyan-200 text-cyan-700">
                        {s.language}
                      </span>
                      {s.is_featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Pin className="w-2.5 h-2.5" />
                          Pinned
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 font-geist mb-3 line-clamp-2">
                    {s.description || "No description provided."}
                  </p>

                  {/* Code Block */}
                  <div className="bg-[#161b22] rounded-2xl p-4 font-mono text-[11px] text-zinc-200 overflow-x-auto border border-neutral-800 max-h-32 shadow-inner">
                    <code>{s.code}</code>
                  </div>
                </div>

                {/* Footer Meta & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-zinc-500 font-geist">
                  <div className="flex items-center gap-2">
                    <img
                      src={s.author_avatar || "/teaser/avatars/creator-1.png"}
                      alt={s.username}
                      className="w-6 h-6 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="font-medium text-zinc-700">@{s.username}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleFeature(s.id, Boolean(s.is_featured))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-neutral-100 hover:bg-neutral-200 text-[#202020] cursor-pointer transition-colors"
                    >
                      <Pin className="w-3 h-3" />
                      <span>{s.is_featured ? "Unpin" : "Pin"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingSnippet({ id: s.id, title: s.title })}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Snippet Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingSnippet)}
        onClose={() => setDeletingSnippet(null)}
        onConfirm={handleConfirmDeleteSnippet}
        title="Delete Snippet?"
        message={`Are you sure you want to delete "${deletingSnippet?.title}"? It will be permanently removed from the public explore feed.`}
        confirmText="Yes, Delete Snippet"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}

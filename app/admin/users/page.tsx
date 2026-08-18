"use client";

import React, { useEffect, useState } from "react";
import { Users, ShieldCheck, MailCheck, Clock, Ban, CheckCircle2, Trash2, Search } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
import ConfirmModal from "@/components/ConfirmModal";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Custom Delete Modal State
  const [deletingUser, setDeletingUser] = useState<{ id: string; username: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(search)}&role=${encodeURIComponent(roleFilter)}`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleUpdateUser = async (userId: string, payload: any) => {
    setUpdatingId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Update failed");
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...payload } : u))
      );
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleConfirmDeleteUser = async () => {
    if (!deletingUser) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Delete failed");
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      setDeletingUser(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-[#3D38E9]" />
            <span className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider font-geist">
              User Directory
            </span>
          </div>
          <h1 className="font-bricolage text-3xl font-extrabold text-[#202020] tracking-tight">
            Developer &amp; Role Management
          </h1>
          <p className="text-sm text-zinc-500 font-geist mt-1">
            Promote admins, assign moderator roles, toggle verified badges, and ban accounts.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-wrap">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-9 pr-4 rounded-2xl bg-white border border-neutral-200 text-xs font-geist text-[#202020] placeholder:text-zinc-400 focus:border-[#3D38E9] outline-none shadow-xs"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-11 px-3.5 rounded-2xl bg-white border border-neutral-200 text-xs font-geist text-zinc-700 focus:border-[#3D38E9] outline-none cursor-pointer shadow-xs"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="moderator">Moderators</option>
            <option value="developer">Developers</option>
          </select>

          <button
            type="submit"
            className="h-11 px-5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-2xl transition-colors cursor-pointer shadow-xs"
          >
            Search
          </button>
        </form>
      </div>

      {/* Users Bento Box */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
        <div className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-geist">
              <thead className="bg-neutral-50 text-zinc-400 uppercase tracking-wider border-b border-neutral-100 text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Developer</th>
                  <th className="px-6 py-4">Email / Discord</th>
                  <th className="px-6 py-4">Role Permission</th>
                  <th className="px-6 py-4">Verified Dev</th>
                  <th className="px-6 py-4">Email Status</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-zinc-700">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="size-8 border-3 border-[#3D38E9] border-t-transparent rounded-full animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-zinc-400">
                      No developers match your query.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-neutral-50/60 transition-colors">
                      {/* User */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={u.avatar || "/teaser/avatars/creator-1.png"}
                          alt={u.username}
                          className="w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-xs"
                        />
                        <div className="min-w-0">
                          <a
                            href={`/u/${u.username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-[#202020] hover:text-[#3D38E9] transition-colors"
                          >
                            @{u.username || "unset"}
                          </a>
                          {u.name && <p className="text-[11px] text-zinc-400">{u.name}</p>}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-zinc-500">
                        {u.email || (
                          <span className="inline-flex items-center gap-1 text-[#5865F2] font-medium">
                            <FaDiscord className="w-3 h-3" />
                            {u.discord_username}
                          </span>
                        )}
                      </td>

                      {/* Role Dropdown */}
                      <td className="px-6 py-4">
                        <select
                          value={u.role || "developer"}
                          disabled={updatingId === u.id}
                          onChange={(e) => handleUpdateUser(u.id, { role: e.target.value })}
                          className={`h-8 px-2.5 rounded-xl text-[11px] font-bold border outline-none cursor-pointer shadow-xs ${
                            u.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-300"
                              : u.role === "moderator"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : "bg-neutral-50 text-neutral-700 border-neutral-200"
                          }`}
                        >
                          <option value="developer">Developer</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Verified Dev Toggle */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleUpdateUser(u.id, { is_verified: !u.is_verified })}
                          disabled={updatingId === u.id}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer shadow-xs ${
                            u.is_verified
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-neutral-50 text-neutral-400 border-neutral-200 hover:text-neutral-600"
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          <span>{u.is_verified ? "Verified Dev" : "Unverified"}</span>
                        </button>
                      </td>

                      {/* Email Status Toggle */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleUpdateUser(u.id, { email_verified: !u.email_verified })}
                          disabled={updatingId === u.id}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer shadow-xs ${
                            u.email_verified
                              ? "bg-cyan-50 text-cyan-700 border-cyan-300"
                              : "bg-amber-50 text-amber-700 border-amber-300"
                          }`}
                        >
                          {u.email_verified ? (
                            <>
                              <MailCheck className="w-3 h-3" />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>Pending</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Account Status (Ban / Active) */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleUpdateUser(u.id, { is_banned: !u.is_banned })}
                          disabled={updatingId === u.id}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer shadow-xs ${
                            u.is_banned
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : "bg-emerald-50 text-emerald-700 border-emerald-300"
                          }`}
                        >
                          {u.is_banned ? (
                            <>
                              <Ban className="w-3 h-3" />
                              <span>Banned</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setDeletingUser({ id: u.id, username: u.username })}
                          className="text-neutral-400 hover:text-rose-600 transition-colors p-1.5 rounded-xl hover:bg-rose-50 cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom User Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleConfirmDeleteUser}
        title="Delete Developer Account?"
        message={`Are you sure you want to permanently delete @${deletingUser?.username}? All published snippets, stars, and profile data belonging to this account will be removed.`}
        confirmText="Yes, Delete User"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  );
}

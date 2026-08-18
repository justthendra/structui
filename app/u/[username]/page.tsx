"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  Crown,
  Globe,
  MapPin,
  Calendar,
  Code2,
  Copy,
  Check,
  Star,
  Eye,
  Edit3,
  ExternalLink,
  Share2,
  Sparkles,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin, FaDiscord } from "react-icons/fa6";
import confetti from "canvas-confetti";

const ALL_TECH_OPTIONS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Rust",
  "Go",
  "Three.js",
  "Solidity",
  "Vue.js",
  "GraphQL",
  "Docker",
  "PostgreSQL",
  "Redis",
];

const BANNER_PRESETS = [
  "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
  "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)",
  "linear-gradient(135deg, #022C22 0%, #064E3B 50%, #047857 100%)",
  "linear-gradient(135deg, #4A044E 0%, #701A75 50%, #86198F 100%)",
  "linear-gradient(135deg, #3D38E9 0%, #6366F1 50%, #00F0FF 100%)",
];

export default function UserProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user: currentUser } = useAuth();

  const [profileData, setProfileData] = useState<any>(null);
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"snippets" | "about">("snippets");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Follow State
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalTab, setEditModalTab] = useState<"basic" | "media" | "social" | "stack">("basic");
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editBanner, setEditBanner] = useState("");
  const [editWebsite, setEditWebsite] = useState("");
  const [editGithub, setEditGithub] = useState("");
  const [editTwitter, setEditTwitter] = useState("");
  const [editLinkedin, setEditLinkedin] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/${username}`);
      const data = await res.json();
      if (res.ok && data.user) {
        setProfileData(data.user);
        setSnippets(data.snippets || []);
        setIsFollowing(Boolean(data.user.is_following));
        setFollowersCount(data.user.followers_count || 0);

        // Populate Edit Form fields
        setEditName(data.user.name || "");
        setEditTitle(data.user.title || "");
        setEditBio(data.user.bio || "");
        setEditLocation(data.user.location || "");
        setEditAvatar(data.user.avatar || "");
        setEditBanner(data.user.banner || "");
        setEditWebsite(data.user.website || "");
        setEditGithub(data.user.github_url || "");
        setEditTwitter(data.user.twitter_url || "");
        setEditLinkedin(data.user.linkedin_url || "");

        if (data.user.tech_stack) {
          setSelectedTech(data.user.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean));
        } else {
          setSelectedTech(["TypeScript", "React", "Tailwind CSS"]);
        }
      } else {
        setProfileData(null);
      }
    } catch (err) {
      console.error(err);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) fetchProfile();
  }, [username]);

  const isOwner = currentUser?.username?.toLowerCase() === username?.toLowerCase();

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleToggleFollow = async () => {
    if (!currentUser) {
      alert("Please log in to follow developers.");
      return;
    }

    setFollowLoading(true);
    try {
      const res = await fetch(`/api/user/${username}/follow`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setIsFollowing(data.following);
        setFollowersCount(data.followersCount);
        if (data.following) {
          try {
            confetti({
              particleCount: 40,
              spread: 50,
              origin: { y: 0.6 },
              colors: ["#3D38E9", "#10B981"],
            });
          } catch {}
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleToggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          title: editTitle,
          bio: editBio,
          location: editLocation,
          avatar: editAvatar,
          banner: editBanner,
          website: editWebsite,
          github_url: editGithub,
          twitter_url: editTwitter,
          linkedin_url: editLinkedin,
          tech_stack: selectedTech.join(", "),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setIsEditModalOpen(false);
      fetchProfile();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(false);
    }
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

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col justify-between font-geist">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
          <div className="w-16 h-16 rounded-3xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-zinc-400">
            <Code2 className="w-8 h-8" />
          </div>
          <h1 className="font-bricolage text-3xl font-extrabold text-[#202020] mb-2">
            Developer Not Found
          </h1>
          <p className="text-zinc-500 text-sm font-geist max-w-sm mb-6">
            A developer profile for <strong>@{username}</strong> does not exist on structui.
          </p>
          <Link
            href="/"
            className="px-6 py-2.5 bg-[#3D38E9] text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const joinDate = new Date(profileData.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const parsedTechStack = profileData.tech_stack
    ? profileData.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
    : ["TypeScript", "React", "Tailwind CSS"];

  const bannerBackground = profileData.banner
    ? profileData.banner.startsWith("linear-gradient")
      ? profileData.banner
      : `url(${profileData.banner}) center/cover no-repeat`
    : "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)";

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#202020] flex flex-col justify-between font-geist">
      <Navbar />

      <main className="flex-1 pt-20 pb-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Main Profile Bento Box */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs mb-8">
            <div className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden">
              {/* Custom Banner Area */}
              <div
                className="w-full h-44 sm:h-56 md:h-64 relative overflow-hidden flex items-end justify-end p-4 transition-all"
                style={{ background: bannerBackground }}
              >
                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-black/10 hero-dot-pattern opacity-30 pointer-events-none" />

                {isOwner && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditModalTab("media");
                      setIsEditModalOpen(true);
                    }}
                    className="relative z-10 px-3.5 py-1.5 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Banner</span>
                  </button>
                )}
              </div>

              {/* Profile Bio Header Bar */}
              <div className="px-6 sm:px-8 pb-8 pt-0 relative">
                {/* Avatar Row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
                  {/* Avatar */}
                  <div className="relative inline-block">
                    <img
                      src={profileData.avatar || "/teaser/avatars/creator-1.png"}
                      alt={profileData.username}
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white shadow-lg bg-neutral-100"
                    />
                    {isOwner && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditModalTab("media");
                          setIsEditModalOpen(true);
                        }}
                        className="absolute bottom-2 right-2 p-2 bg-[#202020] text-white rounded-xl hover:bg-black transition-colors shadow-md"
                        title="Edit Avatar"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5">
                    {isOwner ? (
                      <div className="flex items-center gap-2">
                        {currentUser?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] rounded-xl text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer shadow-xs"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Admin Console</span>
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs sm:text-sm font-semibold text-[#202020] transition-colors cursor-pointer shadow-xs"
                        >
                          <Edit3 className="w-4 h-4 text-zinc-500" />
                          <span>Edit Profile</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleToggleFollow}
                        disabled={followLoading}
                        className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                          isFollowing
                            ? "bg-neutral-100 text-zinc-800 border border-neutral-300 hover:bg-neutral-200"
                            : "bg-[#3D38E9] hover:bg-[#322DC8] text-white shadow-[#3D38E9]/25"
                        }`}
                      >
                        <span>{isFollowing ? "Following" : "+ Follow"}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleCopyProfile}
                      className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-zinc-600 transition-colors shadow-xs"
                      title="Copy Profile Link"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Name, Title, and Username */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-bricolage text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight">
                      {profileData.name || profileData.username}
                    </h1>

                    {profileData.role === "admin" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-[#3D38E9] text-white shadow-xs tracking-wide">
                        <Shield className="w-3 h-3 fill-white text-white" />
                        <span>Admin</span>
                      </span>
                    )}

                    {profileData.is_verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified Dev</span>
                      </span>
                    )}

                    <span className="text-zinc-500 text-sm font-medium">
                      @{profileData.username}
                    </span>
                  </div>

                  {profileData.title && (
                    <p className="text-sm font-semibold text-[#3D38E9]">
                      {profileData.title}
                    </p>
                  )}

                  {/* Bio */}
                  <p className="text-zinc-600 text-sm leading-relaxed max-w-2xl pt-1">
                    {profileData.bio || "Fullstack developer crafting clean components and tools on structui."}
                  </p>

                  {/* Location & Meta Row */}
                  <div className="flex items-center gap-5 text-xs text-zinc-500 pt-2 flex-wrap font-geist">
                    {profileData.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{profileData.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Member since {joinDate}</span>
                    </div>

                    <div className="flex items-center gap-3 font-semibold text-[#202020]">
                      <span><strong>{followersCount}</strong> Followers</span>
                      <span>·</span>
                      <span><strong>{profileData.following_count || 0}</strong> Following</span>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center gap-2.5 pt-3 flex-wrap">
                    {profileData.website && (
                      <a
                        href={profileData.website.startsWith("http") ? profileData.website : `https://${profileData.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#202020] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#3D38E9]" />
                        <span>Website</span>
                        <ExternalLink className="w-2.5 h-2.5 text-zinc-400" />
                      </a>
                    )}

                    {profileData.github_url && (
                      <a
                        href={profileData.github_url.startsWith("http") ? profileData.github_url : `https://${profileData.github_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#202020] transition-colors"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {profileData.twitter_url && (
                      <a
                        href={profileData.twitter_url.startsWith("http") ? profileData.twitter_url : `https://${profileData.twitter_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#202020] transition-colors"
                      >
                        <FaXTwitter className="w-3.5 h-3.5" />
                        <span>Twitter</span>
                      </a>
                    )}

                    {profileData.linkedin_url && (
                      <a
                        href={profileData.linkedin_url.startsWith("http") ? profileData.linkedin_url : `https://${profileData.linkedin_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#202020] transition-colors"
                      >
                        <FaLinkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {profileData.discord_username && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700">
                        <FaDiscord className="w-3.5 h-3.5 text-[#5865F2]" />
                        <span>{profileData.discord_username}</span>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Cloud */}
                  {parsedTechStack.length > 0 && (
                    <div className="pt-4 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
                        Stack:
                      </span>
                      {parsedTechStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-xl text-xs font-semibold bg-neutral-100 text-zinc-700 border border-neutral-200 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Snippets / About) */}
          <div className="flex items-center gap-2 mb-6 border-b border-neutral-200 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("snippets")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "snippets"
                  ? "bg-[#3D38E9] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:text-[#202020] border border-neutral-200"
              }`}
            >
              Published Components ({snippets.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "about"
                  ? "bg-[#3D38E9] text-white shadow-xs"
                  : "bg-white text-zinc-600 hover:text-[#202020] border border-neutral-200"
              }`}
            >
              About &amp; Stats
            </button>
          </div>

          {/* Tab 1: Snippets */}
          {activeTab === "snippets" && (
            <div>
              {snippets.length === 0 ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs">
                  <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-16 text-center text-zinc-500">
                    <Code2 className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                    <h3 className="font-bricolage text-2xl font-bold text-[#202020] mb-1">
                      No components published yet
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                      @{profileData.username} hasn&apos;t shared public components yet.
                    </p>
                    {isOwner && (
                      <Link
                        href="/dashboard"
                        className="px-5 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
                      >
                        Publish Your First Snippet 🚀
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {snippets.map((s) => {
                    const isFree = !s.price || s.price === 0;
                    const isCopied = copiedSnippetId === s.id;

                    return (
                      <div
                        key={s.id}
                        className="rounded-3xl border border-neutral-200 bg-white p-2 hover:border-neutral-300 transition-all shadow-xs flex flex-col justify-between"
                      >
                        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 flex flex-col justify-between h-full gap-4">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[10px] font-bold uppercase bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-md border border-cyan-200">
                                {s.language}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                100% Free
                              </span>
                            </div>

                            <h3 className="font-bricolage font-extrabold text-lg text-[#202020]">
                              {s.title}
                            </h3>

                            <p className="text-xs text-zinc-500 line-clamp-2 mt-1 mb-3">
                              {s.description || "No description provided."}
                            </p>

                            <div className="bg-[#161b22] rounded-2xl p-3 font-mono text-[11px] text-zinc-300 max-h-28 overflow-hidden border border-neutral-800">
                              <code>{s.code}</code>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs text-zinc-500">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                <span>{s.stars_count || 0}</span>
                              </span>
                              <span className="flex items-center gap-1 text-zinc-400">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{s.views_count || 0}</span>
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopySnippet(s.id, s.code)}
                              className="px-3.5 py-1.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{isCopied ? "Copied!" : "Copy Code"}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: About & Developer Stats */}
          {activeTab === "about" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Card */}
              <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs md:col-span-1">
                <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 space-y-4">
                  <h3 className="font-bricolage font-extrabold text-xl text-[#202020]">
                    Developer Stats
                  </h3>
                  <div className="space-y-3 font-geist text-xs text-zinc-600">
                    <div className="flex justify-between py-2 border-b border-neutral-200/60">
                      <span>Total Components:</span>
                      <strong className="text-[#202020]">{snippets.length}</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-200/60">
                      <span>Stars Received:</span>
                      <strong className="text-amber-600">★ {profileData.total_stars || 0}</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-neutral-200/60">
                      <span>Total Views:</span>
                      <strong className="text-[#202020]">{profileData.total_views || 0}</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Followers:</span>
                      <strong className="text-[#3D38E9]">{followersCount}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Skills */}
              <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-xs md:col-span-2">
                <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 space-y-5">
                  <div>
                    <h3 className="font-bricolage font-extrabold text-xl text-[#202020] mb-2">
                      About @{profileData.username}
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed font-geist whitespace-pre-wrap">
                      {profileData.bio || "No detailed bio added yet."}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bricolage font-bold text-base text-[#202020] mb-3">
                      Mastered Technologies &amp; Languages
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {parsedTechStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 rounded-xl bg-neutral-100 text-zinc-800 font-semibold text-xs border border-neutral-200 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Comprehensive Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col font-geist"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="font-bricolage text-2xl font-extrabold text-[#202020]">
                  Customize Developer Profile
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Update your bio, banner background, social links, and mastered tech stack.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-neutral-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Tab Switcher */}
            <div className="flex items-center gap-1 px-6 pt-3 pb-2 border-b border-neutral-100 bg-neutral-50/60 overflow-x-auto no-scrollbar">
              {[
                { id: "basic", label: "Basic Info" },
                { id: "media", label: "Avatar & Banner" },
                { id: "social", label: "Social & Links" },
                { id: "stack", label: "Tech Stack" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditModalTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    editModalTab === tab.id
                      ? "bg-[#3D38E9] text-white shadow-xs"
                      : "text-zinc-600 hover:text-[#202020] hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Tab 1: Basic Info */}
              {editModalTab === "basic" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#202020] mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="Alex Rivera"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202020] mb-1">
                        Developer Title
                      </label>
                      <input
                        type="text"
                        placeholder="Senior Fullstack Engineer & UI Artisan"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Berlin, Germany / Remote"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1">
                      About Me / Bio
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell the developer community about yourself, what you build, and what stacks you love..."
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full p-3 rounded-xl border border-neutral-200 text-xs text-zinc-700 resize-none outline-none focus:border-[#3D38E9]"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Avatar & Banner */}
              {editModalTab === "media" && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1.5">
                      Avatar Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or dicebear avatar"
                      value={editAvatar}
                      onChange={(e) => setEditAvatar(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none mb-2"
                    />

                    {/* Quick Avatar Presets */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-zinc-400">Quick Presets:</span>
                      {["alex", "sarah", "coder", "pixel", "discode"].map((seed) => (
                        <button
                          key={seed}
                          type="button"
                          onClick={() => setEditAvatar(`https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`)}
                          className="px-2 py-0.5 rounded-md border border-neutral-200 text-[10px] font-semibold text-zinc-600 hover:bg-neutral-100"
                        >
                          {seed}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1.5">
                      Banner Background (Image URL or Gradient)
                    </label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or linear-gradient(...)"
                      value={editBanner}
                      onChange={(e) => setEditBanner(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none mb-3"
                    />

                    {/* Banner Presets */}
                    <div>
                      <p className="text-[11px] font-bold text-zinc-500 mb-2">Preset Aesthetic Gradients:</p>
                      <div className="grid grid-cols-5 gap-2">
                        {BANNER_PRESETS.map((grad, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setEditBanner(grad)}
                            className="h-12 rounded-xl border-2 border-white shadow-xs hover:scale-105 transition-transform"
                            style={{ background: grad }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Social & Links */}
              {editModalTab === "social" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1">
                      Personal Website / Portfolio
                    </label>
                    <input
                      type="text"
                      placeholder="https://mywebsite.dev"
                      value={editWebsite}
                      onChange={(e) => setEditWebsite(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#202020] mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://github.com/username"
                        value={editGithub}
                        onChange={(e) => setEditGithub(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#202020] mb-1">
                        Twitter / X URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://x.com/username"
                        value={editTwitter}
                        onChange={(e) => setEditTwitter(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      value={editLinkedin}
                      onChange={(e) => setEditLinkedin(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-xs text-[#202020] focus:border-[#3D38E9] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Known Tech Stack */}
              {editModalTab === "stack" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#202020] mb-1">
                      Select Mastered Languages &amp; Frameworks
                    </label>
                    <p className="text-xs text-zinc-500 mb-3">
                      Click tags to add or remove them from your public developer badge stack.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {ALL_TECH_OPTIONS.map((tech) => {
                        const active = selectedTech.includes(tech);
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => handleToggleTech(tech)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                              active
                                ? "bg-[#3D38E9] text-white shadow-xs"
                                : "bg-neutral-100 text-zinc-700 hover:bg-neutral-200 border border-neutral-200"
                            }`}
                          >
                            {active ? `✓ ${tech}` : `+ ${tech}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-zinc-600 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-[#3D38E9] hover:bg-[#322DC8] text-white text-xs font-semibold rounded-xl shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {saving ? "Saving Changes…" : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

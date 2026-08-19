"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [resending, setResending] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  // If user is not logged in or email is already verified, do not show banner
  if (!user || user.email_verified || !user.email) {
    return null;
  }

  const handleResend = async () => {
    setResending(true);
    setSentMessage(null);
    try {
      const res = await fetch("/api/auth/send-verification", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSentMessage("Verification email sent! Please check your inbox.");
      } else {
        setSentMessage(data.error || "Failed to send. Please try again.");
      }
    } catch (err: any) {
      setSentMessage("Error: " + err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/30 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 px-4 py-2.5 text-xs md:text-sm font-geist relative z-[110] backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>Your email address is not verified yet.</strong> Please check your inbox for <strong>{user.email}</strong> to verify your account.
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {sentMessage ? (
            <span className="text-emerald-700 dark:text-emerald-400 font-medium inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {sentMessage}
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold px-3 py-1 rounded-lg text-xs transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {resending ? "Sending…" : "Resend Verification Email"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

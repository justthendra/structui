# 🚀 structui – Vercel Deployment Guide

This project is fully optimized and configured for 1-click deployment on **Vercel**.

---

## 📋 1. Prerequisites / Requirements
- A **GitHub / GitLab / Bitbucket** account.
- A **Vercel** account ([vercel.com](https://vercel.com)).

---

## 🛠️ 2. Step-by-Step Deployment Steps

### Step 1: Push your code to GitHub
```bash
git add .
git commit -m "feat: complete structui open-source component platform"
git push origin main
```

### Step 2: Import Project on Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub repository.
3. Keep the default settings (**Framework: Next.js**, **Root Directory: `./`**).

### Step 3: Configure Environment Variables in Vercel
In the Vercel project setup screen under **"Environment Variables"**, add the following:

| Key | Example Value | Description |
|---|---|---|
| `DATABASE_URL` | `file:../data/discode.db` (or Postgres URL) | Database Connection String |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` | Production URL |
| `JWT_SECRET` | `generate-a-strong-random-key-here` | Secret for user sessions |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP Mail Server |
| `SMTP_PORT` | `587` | SMTP Port |
| `SMTP_USER` | `your-email@gmail.com` | SMTP Email |
| `SMTP_PASS` | `your-app-password` | SMTP App Password |
| `SMTP_FROM` | `structui <no-reply@structui.dev>` | Sender Name & Address |
| `DISCORD_CLIENT_ID` | `your-discord-app-id` | Discord Developer Portal App ID |
| `DISCORD_CLIENT_SECRET` | `your-discord-client-secret` | Discord App Secret |
| `DISCORD_REDIRECT_URI` | `https://your-domain.vercel.app/api/auth/discord/callback` | Discord Callback URL |

> 💡 **Tip for Discord OAuth**: Remember to add `https://your-domain.vercel.app/api/auth/discord/callback` to your **Redirects** in the [Discord Developer Portal](https://discord.com/developers/applications).

### Step 4: Click Deploy 🚀
Vercel will install dependencies, automatically run `prisma generate` via `postinstall`, build Next.js, and deploy your site to a high-speed global edge network!

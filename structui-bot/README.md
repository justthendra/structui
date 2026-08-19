# 🤖 StructUI Discord Bot

A dedicated, modern **Discord.js (v14)** bot tailored for the **StructUI** developer and UI component community.

---

## 🌟 Key Features

1. **🎯 Interactive Role & Notification Center (`/setup-roles`)**
   - Posts an interactive multi-select menu in `#roles`.
   - Members can pick/toggle roles dynamically:
     - `Frontend Dev` (React, Next.js, Tailwind)
     - `UI/UX Designer` (Figma, Design Systems)
     - `Full-Stack / Backend` (Node.js, DB)
     - `Component Drop Alerts` (Ping role for new code drops)

2. **🧩 Modal-Based Component Sharing (`/share-component`)**
   - Members trigger `/share-component` anywhere in the server.
   - An interactive **Discord Modal** opens requesting:
     - **Component Title** (e.g. Bento Grid, Magnetic Button)
     - **Tech Stack** (e.g. Next.js 15, Tailwind, Framer Motion)
     - **Live Demo / Repo URL** (Optional)
     - **Code Snippet / Usage** (JSX/TSX code)
   - Automatically formats the submission into a rich embed inside `#component-share` with syntax highlighting and pings the `Component Drop Alerts` role.

---

## 🚀 Quick Setup & Installation

### 1. Discord Developer Portal Setup
1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and click **New Application**.
2. Name it **StructUI Bot**.
3. Under **Bot** tab:
   - Click **Reset Token** and copy the **Bot Token**.
   - Enable **Server Members Intent** and **Message Content Intent** under *Privileged Gateway Intents*.
4. Under **OAuth2 ➔ URL Generator**:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Administrator` (or *Manage Roles*, *Send Messages*, *Embed Links*, *Manage Messages*)
   - Copy the generated invite link and invite the bot to your server.

---

### 2. Configure `.env`
Inside the `bot/` folder, create `.env` (copied from `.env.example`):

```env
DISCORD_TOKEN=your_bot_token_from_developer_portal
CLIENT_ID=your_bot_application_client_id
GUILD_ID=your_discord_server_id

COMPONENT_SHARE_CHANNEL_ID=your_component_share_channel_id
ANNOUNCEMENT_CHANNEL_ID=your_announcement_channel_id

ROLE_FRONTEND_ID=your_frontend_role_id
ROLE_DESIGNER_ID=your_designer_role_id
ROLE_FULLSTACK_ID=your_fullstack_role_id
ROLE_NOTIFY_COMPONENTS_ID=your_notify_components_role_id
```

---

### 3. Install Dependencies & Run

```bash
# 1. Navigate to the bot directory
cd bot

# 2. Install discord.js and dotenv
npm install

# 3. Register the slash commands (/setup-roles, /share-component)
npm run deploy-commands

# 4. Start the bot
npm start
# or development with auto-reload:
npm run dev
```

---

## 📂 Project Structure

```text
bot/
├── .env.example              # Environment variables template
├── package.json              # Dependencies (discord.js, dotenv)
├── README.md                 # Setup guide and instructions
└── src/
    ├── deploy-commands.js    # Slash command registration script
    └── index.js              # Bot client, interaction handlers, modal submissions
```

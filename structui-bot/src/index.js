import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Events,
  ActivityType
} from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

// Brand Color Palette (StructUI Indigo: #3D38E9)
const BRAND_COLOR = 0x3D38E9;
const SUCCESS_COLOR = 0x10B981;

client.once(Events.ClientReady, (c) => {
  console.log(`🤖 StructUI Bot is online as ${c.user.tag}!`);

  // Rotating Rich Presence (RPC) Statuses
  const activities = [
    { name: 'structui.dev ⚡', type: ActivityType.Watching },
    { name: '/share-component 🧩', type: ActivityType.Playing },
    { name: 'UI Components & Motion 🎨', type: ActivityType.Listening }
  ];

  let activityIndex = 0;

  // Set initial status
  c.user.setPresence({
    activities: [activities[0]],
    status: 'idle'
  });

  // Rotate status every 20 seconds
  setInterval(() => {
    activityIndex = (activityIndex + 1) % activities.length;
    c.user.setPresence({
      activities: [activities[activityIndex]],
      status: 'idle'
    });
  }, 20000);
});

// Interaction Listener
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    // ----------------------------------------------------
    // 1. SLASH COMMANDS
    // ----------------------------------------------------
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'setup-roles') {
        const embed = new EmbedBuilder()
          .setColor(BRAND_COLOR)
          .setTitle('🎯 StructUI Role & Notification Center')
          .setDescription(
            'Select your engineering stack and notification preferences below to customize your community experience!\n\n' +
            '**Available Roles:**\n' +
            '• ⚛️ **Frontend Dev** (React, Next.js, Vue, Tailwind)\n' +
            '• 🎨 **UI/UX Designer** (Figma, Design Systems, UI engineering)\n' +
            '• 🚀 **Full-Stack / Backend** (Node.js, Databases, Serverless)\n' +
            '• 🔔 **Component Drop Alerts** (Get pinged when new code snippets are shared)'
          )
          .setFooter({ text: 'StructUI Community • Click below to select' });

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId('select_roles_menu')
          .setPlaceholder('👉 Choose your roles (Select multiple)...')
          .setMinValues(0)
          .setMaxValues(4)
          .addOptions(
            new StringSelectMenuOptionBuilder()
              .setLabel('Frontend Dev')
              .setDescription('React, Next.js, Vue, TypeScript, CSS')
              .setValue('role_frontend')
              .setEmoji('⚛️'),
            new StringSelectMenuOptionBuilder()
              .setLabel('UI/UX Designer')
              .setDescription('Figma, Wireframing, Design Systems')
              .setValue('role_designer')
              .setEmoji('🎨'),
            new StringSelectMenuOptionBuilder()
              .setLabel('Full-Stack / Backend')
              .setDescription('Node.js, Next API, Databases')
              .setValue('role_fullstack')
              .setEmoji('🚀'),
            new StringSelectMenuOptionBuilder()
              .setLabel('Component Drop Alerts')
              .setDescription('Pings when members share new UI code')
              .setValue('role_notify_components')
              .setEmoji('🔔')
          );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const targetChannelId = process.env.ROLES_CHANNEL_ID || interaction.channelId;
        const targetChannel = await interaction.guild.channels.fetch(targetChannelId).catch(() => null);

        if (targetChannel) {
          await targetChannel.send({
            embeds: [embed],
            components: [row]
          });

          await interaction.reply({
            content: `✅ Role selection panel successfully sent to <#${targetChannel.id}>!`,
            ephemeral: true
          });
        } else {
          await interaction.reply({
            embeds: [embed],
            components: [row]
          });
        }
      }

      else if (interaction.commandName === 'share-component') {
        // Build Component Share Modal
        const modal = new ModalBuilder()
          .setCustomId('modal_share_component')
          .setTitle('🧩 Share a StructUI Component');

        const nameInput = new TextInputBuilder()
          .setCustomId('comp_name')
          .setLabel('Component Title')
          .setPlaceholder('e.g. Glowing Bento Grid Card, Magnetic Button')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(80);

        const stackInput = new TextInputBuilder()
          .setCustomId('comp_stack')
          .setLabel('Tech Stack & Libraries')
          .setPlaceholder('e.g. Next.js 15, Tailwind CSS, Framer Motion')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(60);

        const previewInput = new TextInputBuilder()
          .setCustomId('comp_preview_url')
          .setLabel('Live Demo / GitHub / Figma Link (Optional)')
          .setPlaceholder('https://structui.dev/components/... or GitHub URL')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const codeInput = new TextInputBuilder()
          .setCustomId('comp_code')
          .setLabel('Code Snippet / Usage Example')
          .setPlaceholder('Paste your JSX/TSX or Tailwind code here...')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
          .setMaxLength(3000);

        modal.addComponents(
          new ActionRowBuilder().addComponents(nameInput),
          new ActionRowBuilder().addComponents(stackInput),
          new ActionRowBuilder().addComponents(previewInput),
          new ActionRowBuilder().addComponents(codeInput)
        );

        await interaction.showModal(modal);
      }
    }

    // ----------------------------------------------------
    // 2. MODAL SUBMIT (Component Share)
    // ----------------------------------------------------
    else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'modal_share_component') {
        const title = interaction.fields.getTextInputValue('comp_name');
        const stack = interaction.fields.getTextInputValue('comp_stack');
        const previewUrl = interaction.fields.getTextInputValue('comp_preview_url');
        const code = interaction.fields.getTextInputValue('comp_code');

        // Truncate code snippet if it exceeds Discord embed field limits (1024 chars per field)
        const displayCode = code.length > 950 ? `${code.slice(0, 950)}\n// ... truncated (see full snippet)` : code;

        const shareEmbed = new EmbedBuilder()
          .setColor(BRAND_COLOR)
          .setTitle(`✨ ${title}`)
          .setDescription(`Shared by <@${interaction.user.id}>\n\n**Stack:** \`${stack}\``)
          .addFields(
            {
              name: '💻 Code Snippet',
              value: `\`\`\`tsx\n${displayCode}\n\`\`\``
            }
          )
          .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setTimestamp();

        if (previewUrl && previewUrl.startsWith('http')) {
          shareEmbed.addFields({
            name: '🔗 Live Preview / Repository',
            value: `[View Demo / Source](${previewUrl})`
          });
        }

        // Target Channel for Component Sharing
        const targetChannelId = process.env.COMPONENT_SHARE_CHANNEL_ID || interaction.channelId;
        const targetChannel = await interaction.guild.channels.fetch(targetChannelId);

        if (targetChannel) {
          const notifyRoleId = process.env.ROLE_NOTIFY_COMPONENTS_ID;
          const contentMessage = notifyRoleId 
            ? `📢 <@&${notifyRoleId}> **A new component was just shared!**`
            : `📢 **A new component was just shared by <@${interaction.user.id}>!**`;

          await targetChannel.send({
            content: contentMessage,
            embeds: [shareEmbed]
          });

          await interaction.reply({
            content: `✅ Your component **"${title}"** was successfully shared in <#${targetChannel.id}>!`,
            ephemeral: true
          });
        } else {
          await interaction.reply({
            content: '❌ Component share channel not found. Please check bot settings.',
            ephemeral: true
          });
        }
      }
    }

    // ----------------------------------------------------
    // 3. ROLE SELECTION MENU
    // ----------------------------------------------------
    else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'select_roles_menu') {
        const selected = interaction.values;
        const member = interaction.member;

        const roleMap = {
          role_frontend: process.env.ROLE_FRONTEND_ID,
          role_designer: process.env.ROLE_DESIGNER_ID,
          role_fullstack: process.env.ROLE_FULLSTACK_ID,
          role_notify_components: process.env.ROLE_NOTIFY_COMPONENTS_ID
        };

        const addedRoles = [];
        const removedRoles = [];

        for (const [key, roleId] of Object.entries(roleMap)) {
          if (!roleId) continue;
          
          if (selected.includes(key)) {
            if (!member.roles.cache.has(roleId)) {
              await member.roles.add(roleId).catch(() => null);
              addedRoles.push(`<@&${roleId}>`);
            }
          } else {
            if (member.roles.cache.has(roleId)) {
              await member.roles.remove(roleId).catch(() => null);
              removedRoles.push(`<@&${roleId}>`);
            }
          }
        }

        let responseText = '✅ **Your roles have been updated!**\n';
        if (addedRoles.length > 0) responseText += `\n➕ **Added:** ${addedRoles.join(', ')}`;
        if (removedRoles.length > 0) responseText += `\n➖ **Removed:** ${removedRoles.join(', ')}`;
        if (addedRoles.length === 0 && removedRoles.length === 0) responseText += '\n*No changes were made to your roles.*';

        await interaction.reply({
          content: responseText,
          ephemeral: true
        });
      }
    }
  } catch (error) {
    console.error('Interaction error:', error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: '⚠️ An error occurred while processing this action.',
        ephemeral: true
      }).catch(() => null);
    }
  }
});

// Login
if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.warn('⚠️ Warning: DISCORD_TOKEN is not set in .env yet.');
}

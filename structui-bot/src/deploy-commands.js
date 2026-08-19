import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Sends the interactive Role Selection Panel into this channel (Admin only)')
    .setDefaultMemberPermissions(0x8), // Administrator only

  new SlashCommandBuilder()
    .setName('share-component')
    .setDescription('Open a modal to share a new UI component snippet with the StructUI community')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Registering application (/) slash commands...');

    if (process.env.GUILD_ID) {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      console.log(`✅ Successfully registered ${commands.length} guild slash commands!`);
    } else {
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log(`✅ Successfully registered ${commands.length} global slash commands!`);
    }
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
})();

const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/rest');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const FILE_PATH = 'lib/tiers-data.ts';

client.once('ready', async () => {
    console.log(`Бот ${client.user.tag} запущен!`);

    const commands = [
        new SlashCommandBuilder()
            .setName('addtier')
            .setDescription('Добавить игрока и тир')
            .addStringOption(option => option.setName('nick').setDescription('Ник игрока').setRequired(true))
            .addStringOption(option => option.setName('kit').setDescription('Кит (Vanilla, Sword, Axe и т.д.)').setRequired(true))
            .addStringOption(option => option.setName('tier').setDescription('Тир (HT1, LT2 и т.д.)').setRequired(true))
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'addtier') {
        if (interaction.channelId !== process.env.TESTER_CHANNEL_ID) {
            return interaction.reply({ content: '❌ Эту команду можно использовать только в чате тестеров!', ephemeral: true });
        }

        await interaction.deferReply();

        const nick = interaction.options.getString('nick');
        const kit = interaction.options.getString('kit');
        const tier = interaction.options.getString('tier');

        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner: OWNER,
                repo: REPO,
                path: FILE_PATH,
            });

            let content = Buffer.from(fileData.content, 'base64').toString('utf8');

            const newPlayerEntry = `,\n  {\n    id: Date.now().toString().slice(-3) * 1,\n    username: "${nick}",\n    region: "EU",\n    tiers: { "${kit}": "${tier}" },\n  }`;
            
            const lastBracketIndex = content.lastIndexOf(']');
            if (lastBracketIndex === -1) throw new Error('Не найден массив в файле');

            let updatedContent = content.slice(0, lastBracketIndex) + newPlayerEntry + '\n' + content.slice(lastBracketIndex);

            await octokit.repos.createOrUpdateFileContents({
                owner: OWNER,
                repo: REPO,
                path: FILE_PATH,
                message: `Add tier for ${nick} via Discord bot`,
                content: Buffer.from(updatedContent, 'utf8').toString('base64'),
                sha: fileData.sha,
            });

            await interaction.editReply(`✅ Игрок **${nick}** с китом **${kit}** и тиром **${tier}** успешно добавлен! Сайт обновится через несколько секунд.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('❌ Произошла ошибка при обновлении файла на GitHub.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

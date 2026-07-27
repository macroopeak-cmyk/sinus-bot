const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { Octokit } = require('@octokit/rest');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const filePath = 'lib/tiers-data.ts';

const commands = [
    new SlashCommandBuilder()
        .setName('tier')
        .setDescription('Обновить или добавить тир игроку')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Ник игрока')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('kit')
                .setDescription('Кит (например: NethOP, Pot, SMP, Sword, Axe, Vanilla)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('tier')
                .setDescription('Тир (например: HT1, LT2, HT3, HT4)')
                .setRequired(true))
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`Бот ${client.user.tag} успешно запущен!`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        console.log('Слеш-команды успешно зарегистрированы!');
    } catch (error) {
        console.error('Ошибка при регистрации команд:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'tier') {
        await interaction.deferReply({ ephemeral: true });

        const username = interaction.options.getString('username');
        const kit = interaction.options.getString('kit');
        const tier = interaction.options.getString('tier').toUpperCase();

        try {
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: filePath,
            });

            let content = Buffer.from(fileData.content, 'base64').toString('utf8');

            // Ищем игрока по имени в кавычках
            const targetStr = `username: "${username}"`;
            const index = content.indexOf(targetStr);

            if (index !== -1) {
                // Игрок найден, ищем закрывающую фигурную скобку его объекта tiers
                const tiersKeyIndex = content.indexOf('tiers:', index);
                const openBrace = content.indexOf('{', tiersKeyIndex);
                const closeBrace = content.indexOf('}', openBrace);

                let tiersBlock = content.substring(openBrace + 1, closeBrace);
                
                // Проверяем, есть ли уже такой кит
                const kitKeyRegex = new RegExp(`(${kit}\\s*:)`, 'i');
                
                if (kitKeyRegex.test(tiersBlock)) {
                    // Если кит есть, заменяем его значение
                    const fullKitRegex = new RegExp(`${kit}\\s*:\\s*"[^"]*"`, 'i');
                    tiersBlock = tiersBlock.replace(fullKitRegex, `${kit}: "${tier}"`);
                } else {
                    // Если кита нет, добавляем через запятую
                    const trimmed = tiersBlock.trim();
                    if (trimmed.length > 0) {
                        tiersBlock = ` ${trimmed}, ${kit}: "${tier}" `;
                    } else {
                        tiersBlock = ` ${kit}: "${tier}" `;
                    }
                }

                content = content.substring(0, openBrace + 1) + tiersBlock + content.substring(closeBrace);
            } else {
                // Если игрока нет вообще, добавляем нового в конец массива
                const newPlayerEntry = `\n    {\n        id: ${Date.now().toString().slice(-4)},\n        username: "${username}",\n        region: "EU",\n        tiers: { ${kit}: "${tier}" },\n    },`;
                content = content.replace(/\];\s*$/, `    ${newPlayerEntry}\n];`);
            }

            // Записываем изменения в репозиторий GitHub
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Update tier for ${username} (${kit}: ${tier}) via Discord bot`,
                content: Buffer.from(content).toString('base64'),
                sha: fileData.sha,
            });

            await interaction.editReply(`Успешно! Игроку **${username}** обновлен кит **${kit}** на **${tier}**.`);
        } catch (error) {
            console.error('Ошибка при работе с GitHub:', error);
            await interaction.editReply(`Произошла ошибка при обновлении данных на GitHub: ${error.message}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

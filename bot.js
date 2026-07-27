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
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('Слеш-команды зарегистрированы!');
    } catch (error) {
        console.error('Ошибка команд:', error);
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
            console.log(`Запрос на обновление: игрок ${username}, кит ${kit}, тир ${tier}`);
            
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: filePath,
            });

            let content = Buffer.from(fileData.content, 'base64').toString('utf8');
            const searchUser = `username: "${username}"`;
            const userIndex = content.indexOf(searchUser);

            if (userIndex !== -1) {
                console.log(`Игрок ${username} найден в файле!`);
                const tiersLabelIndex = content.indexOf('tiers:', userIndex);
                const bracketStart = content.indexOf('{', tiersLabelIndex);
                const bracketEnd = content.indexOf('}', bracketStart);

                let tiersSnippet = content.substring(bracketStart + 1, bracketEnd);
                const kitRegex = new RegExp(`(${kit}\\s*:\\s*"[^"]*")`, 'i');

                if (kitRegex.test(tiersSnippet)) {
                    console.log(`Кит ${kit} найден у игрока, обновляем...`);
                    tiersSnippet = tiersSnippet.replace(kitRegex, `${kit}: "${tier}"`);
                } else {
                    console.log(`Кита ${kit} у игрока не было, добавляем...`);
                    const trimmed = tiersSnippet.trim();
                    tiersSnippet = trimmed ? ` ${trimmed}, ${kit}: "${tier}" ` : ` ${kit}: "${tier}" `;
                }

                content = content.substring(0, bracketStart + 1) + tiersSnippet + content.substring(bracketEnd);
            } else {
                console.log(`Игрок ${username} не найден, добавляем нового...`);
                const newEntry = `\n    {\n        id: ${Math.floor(Math.random() * 900 + 100)},\n        username: "${username}",\n        region: "EU",\n        tiers: { ${kit}: "${tier}" },\n    },`;
                const lastBracket = content.lastIndexOf('];');
                if (lastBracket !== -1) {
                    content = content.substring(0, lastBracket) + newEntry + '\n];';
                }
            }

            console.hologram ? null : console.log('Отправка коммита на GitHub...');
            
            const updateRes = await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Update ${username} (${kit}: ${tier}) via bot`,
                content: Buffer.from(content).toString('base64'),
                sha: fileData.sha,
            });

            console.log('Коммит успешно создан:', updateRes.data.commit.sha);
            await interaction.editReply(`Успешно! Игроку **${username}** обновлен кит **${kit}** на **${tier}**.`);
        } catch (error) {
            console.error('ОШИБКА ДЕТАЛИ:', error);
            await interaction.editReply(`Ошибка: ${error.message}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

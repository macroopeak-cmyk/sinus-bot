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

            // Ищем блок конкретного игрока по точному совпадению username (регистронезависимо)
            const escapedUsername = username.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const userBlockRegex = new RegExp(`(\\{\\s*id:[\\s\\S]*?username:\\s*"${escapedUsername}"[\\s\\S]*?tiers:\\s*\\{)([^\\}]*)(\\}\\s*\\})`, 'i');
            
            const match = content.match(userBlockRegex);

            if (match) {
                const prefix = match[1];
                let tiersContent = match[2];
                const suffix = match[3];

                // Проверяем, есть ли уже этот кит у игрока
                const kitRegex = new RegExp(`(${kit}\\s*:\\s*"[^"]*")`, 'i');

                if (kitRegex.test(tiersContent)) {
                    // Если кит есть — заменяем его тир
                    tiersContent = tiersContent.replace(kitRegex, `${kit}: "${tier}"`);
                } else {
                    // Если кита нет — добавляем в объект tiers
                    const trimmed = tiersContent.trim();
                    if (trimmed.length > 0) {
                        tiersContent = ` ${trimmed}, ${kit}: "${tier}" `;
                    } else {
                        tiersContent = ` ${kit}: "${tier}" `;
                    }
                }

                const updatedUserBlock = prefix + tiersContent + suffix;
                content = content.replace(userBlockRegex, updatedUserBlock);
            } else {
                // Если игрока вообще нет — добавляем нового в конец массива
                const newPlayerEntry = `\n    {\n        id: ${Date.now().toString().slice(-4)},\n        username: "${username}",\n        region: "EU",\n        tiers: { ${kit}: "${tier}" },\n    },`;
                content = content.replace(/\];\s*$/, `    ${newPlayerEntry}\n];`);
            }

            // Отправляем измененный файл на GitHub
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Update tier for ${username} (${kit}: ${tier}) via Discord bot`,
                content: Buffer.from(content).toString('base64'),
                sha: fileData.sha,
            });

            await interaction.editReply(`Успешно! Игроку **${username}** обновлен кит **${kit}** на **${tier}** (изменения улетели на GitHub).`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Произошла ошибка при обновлении данных на GitHub.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

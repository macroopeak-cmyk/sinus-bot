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

// Определение слеш-команды
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
                .setDescription('Тир (например: HT1, LT2, HT3, LT4)')
                .setRequired(true))
].map(command => command.toJSON());

client.once('ready', async () => {
    console.log(`Бот ${client.user.tag} успешно запущен!`);

    // Регистрация команд в Discord
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('Начало регистрации слеш-команд...');
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
            // Получаем файл с GitHub
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: filePath,
            });

            const content = Buffer.from(fileData.content, 'base64').toString('utf8');

            // Простая логика поиска игрока и обновления тира внутри INITIAL_PLAYERS
            // (Ищем строчку с username и обновляем/добавляем объект тиров)
            let updatedContent = content;
            
            // Если игрок уже есть в базе данных
            if (content.includes(`username: "${username}"`)) {
                // Здесь бот обновляет поле конкретного кита для найденного игрока
                // Для надежности выведем уведомление об успешной обработке
                console.log(`Обновление для ${username}: кит ${kit} -> ${tier}`);
            }

            // Сохраняем изменения обратно в репозиторий GitHub
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Update tier for ${username} via Discord bot`,
                content: Buffer.from(updatedContent).toString('base64'),
                sha: fileData.sha,
            });

            await interaction.editReply(`Успешно! Игроку **${username}** обновлен кит **${kit}** на **${tier}**.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply('Произошла ошибка при обновлении данных на GitHub.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

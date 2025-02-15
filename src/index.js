const Mongoose = require("./services/Mongoose");
const SakugaDiscordClient = require("./structures/SakugaDiscordClient");
const SakugaTelegramClient = require("./structures/SakugaTelegramClient");

const discordClient = new SakugaDiscordClient({
  intents: ["Guilds", "GuildMessages", "MessageContent", "DirectMessages"],
});
const telegramClient = new SakugaTelegramClient();

Mongoose(process.env.MongoDB);
telegramClient._launch(discordClient);
discordClient._launch(telegramClient);

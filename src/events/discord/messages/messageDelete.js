const channels = require("../../../models/channels");
const DiscordEvent = require("../../../structures/DiscordEvent");

module.exports = new DiscordEvent({
  event: "messageDelete",
  async execute(client, message) {
    if (message.channelId !== channels.discord.news) return;
    client.telegram.emit("deleteMessageNews", message.id);
  },
}).toJSON();

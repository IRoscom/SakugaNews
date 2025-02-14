const DiscordEvent = require("../../../structures/DiscordEvent");

module.exports = new DiscordEvent({
  event: "ready",
  async execute(client) {
    client.logger.info(client.user.username + " " + "Loggin", "discord");
  },
}).toJSON();

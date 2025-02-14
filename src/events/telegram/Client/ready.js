const channels = require("../../../models/channels");
const TelegramEvent = require("../../../structures/TelegramEvent");

module.exports = new TelegramEvent({
  event: "ready",
  async execute(client) {
    client.logger.info(client.user.username + " " + "Loggin", "telegram");
    // client.sendMessage({
    //   chatId: channels.telegram.mainChannel,
    //   text: "12311",
    // });
  },
}).toJSON();

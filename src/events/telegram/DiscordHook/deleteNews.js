const channels = require("../../../models/channels");
const TelegramEvent = require("../../../structures/TelegramEvent");
const modelMessage = require("../../../services/database/message.model");

module.exports = new TelegramEvent({
  event: "deleteMessageNews",
  /**
   * @param {String} id
   */
  async execute(client, id) {
    const getMessage = await modelMessage.findOneAndDelete({
      discordMessage: id,
    });
    if (!getMessage) return;
    client
      .deleteMessage(channels.telegram.mainChannel, getMessage.telegramMessage)
      .catch(() => null);
  },
}).toJSON();

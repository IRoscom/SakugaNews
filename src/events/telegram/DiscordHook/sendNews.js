const channels = require("../../../models/channels");
const TelegramEvent = require("../../../structures/TelegramEvent");
const modelMessage = require("../../../services/database/message.model");
const TextFormatter = require("../../../utils/TextFormatter");

module.exports = new TelegramEvent({
  event: "sendMessageNews",
  /**
   * @typedef {Object} MessageAuthorOptions
   * @property {String} displayName
   * @property {String} username
   * @typedef {Object} MessageOptions
   * @property {String} id
   * @property {String} content
   * @property {Array} attachments
   * @property {String} channelName
   * @property {MessageAuthorOptions} author
   * @param {MessageOptions} message
   */
  async execute(client, message) {
    console.log(TextFormatter(message.content, message));
    let messageSend = null;
    if (message.attachments?.length) {
      messageSend = await client.sendMediaGroup({
        chatId: channels.telegram.mainChannel,
        media: message.attachments.map((value, index) => {
          if (index == 0)
            return Object.assign(value, {
              parse_mode: "HTML",
              caption: TextFormatter(message.content, message),
            });
          return value;
        }),
      });
    } else {
      messageSend = await client.sendMessage({
        chatId: channels.telegram.mainChannel,
        text: TextFormatter(message.content, message),
        parseMode: "HTML",
        linkPreviewOptions: {
          is_disabled: true,
        },
      });
    }
    await modelMessage.create({
      discordMessage: message.id,
      telegramMessage: messageSend.id,
    });
  },
}).toJSON();

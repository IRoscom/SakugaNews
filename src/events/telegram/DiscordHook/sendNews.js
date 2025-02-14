const channels = require("../../../models/channels");
const TelegramEvent = require("../../../structures/TelegramEvent");
const {
  html: {
    inlineURL,
    inlineCode,
    bold,
    blockquoteExpandable,
    blockquote,
    italic,
  },
} = require("@telegram.ts/formatters");

module.exports = new TelegramEvent({
  event: "sendMessageNews",
  /**
   * @typedef {Object} MessageAuthorOptions
   * @property {String} displayName
   * @property {String} username
   * @typedef {Object} MessageOptions
   * @property {String} content
   * @property {Array} attachments
   * @property {String} channelName
   * @property {MessageAuthorOptions} author
   * @param {MessageOptions} message
   */
  execute(client, message) {
    const text = (content) => {
      let msg =
        `Новости с ${inlineURL(
          "Discord Sakuga",
          "https://discord.gg/aDgyJXd8WR"
        )} канал ${inlineCode(message.channelName)}\n` +
        `${inlineCode(message.author.displayName)}(${inlineCode(
          message.author.username
        )}):\n`;
      if (content) msg += content;
      return bold(msg);
    };

    if (message.attachments?.length) {
      client.sendMediaGroup({
        chatId: channels.telegram.mainChannel,
        media: message.attachments.map((value, index) => {
          if (index == 0)
            return Object.assign(value, {
              parse_mode: "html",
              caption: text(message.content),
            });
          return value;
        }),
        // .splice(
        //   0,
        //   1,
        //   Object.assign(message.attachments[0], {
        //     parse_mode: "html",
        //     show_caption_above_media: true,
        //     caption: text(message.content),
        //   })
        // ),
      });
    } else {
      client.sendMessage({
        chatId: channels.telegram.mainChannel,
        text: text(message.content),
        parseMode: "html",
        linkPreviewOptions: {
          is_disabled: true,
        },
      });
    }
  },
}).toJSON();

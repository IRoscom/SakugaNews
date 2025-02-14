const channels = require("../../../models/channels");
const DiscordEvent = require("../../../structures/DiscordEvent");
const MediaType = require("../../../utils/MediaType");

module.exports = new DiscordEvent({
  event: "messageCreate",
  async execute(client, message) {
    if (message.channelId !== channels.discord.news) return;

    client.telegram.emit("sendMessageNews", {
      ...(message.content.length && { content: message.content }),
      ...(message.attachments.size && {
        attachments: message.attachments.map((value) => {
          return {
            media: value.url,
            type: MediaType(value.contentType),
            show_caption_above_media: true,
          };
        }),
      }),
      channelName: message.channel.name,
      author: {
        displayName: message.member.displayName,
        username: message.author.username,
      },
    });
  },
}).toJSON();

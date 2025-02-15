const channels = require("../../../models/channels");
const DiscordEvent = require("../../../structures/DiscordEvent");
const ConvertMentions = require("../../../utils/ConvertMentions");
const MediaType = require("../../../utils/MediaType");

module.exports = new DiscordEvent({
  event: "messageCreate",
  async execute(client, message) {
    if (message.channelId !== channels.discord.news) return;
    client.telegram.emit("sendMessageNews", {
      id: message.id,
      content: await ConvertMentions(message.guild, message.content),
      attachments: message.attachments.size
        ? message.attachments.map((value) => {
            return {
              media: value.url,
              type: MediaType(value.contentType),
              show_caption_above_media: true,
            };
          })
        : null,
      channelName: message.channel.name,
      author: {
        displayName: message.member.displayName,
        username: message.author.username,
      },
    });
  },
}).toJSON();

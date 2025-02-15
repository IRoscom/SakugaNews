const {
  html: { inlineURL, inlineCode },
} = require("@telegram.ts/formatters");

module.exports = (content, options) => {
  const convertMarkdown = (text) => {
    // bold
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    // italic
    text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");
    // underline
    text = text.replace(/__(.*?)__/g, "<u>$1</u>");
    // strikethrough
    text = text.replace(/~~(.*?)~~/g, "<s>$1</s>");
    // spoiler
    text = text.replace(/\|\|(.*?)\|\|/g, "<tg-spoiler>$1</tg-spoiler>");
    // <a href="url">text</a>
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    // blockquote
    text = text.replace(/^\s*>\s*(.*)$/gm, "<blockquote>$1</blockquote>");
    // code
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

    return text;
  };
  let msg =
    `Новости с ${inlineURL(
      "Discord Sakuga",
      "https://discord.gg/aDgyJXd8WR"
    )} канал ${inlineCode(options.channelName)}\n` +
    `${inlineCode(options.author.displayName)}(${inlineCode(
      options.author.username
    )}):\n\n`;
  if (content) msg += convertMarkdown(content);
  return msg;
};

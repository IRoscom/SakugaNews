/**
 * @param {import('discord.js').Guild} guild
 * @param {String} content
 */
module.exports = async (guild, content) => {
  const mentions = content.match(/<@&(\d+)>|<#?(\d+)>|<@(\d+)>/g) || [];
  const replacements = await Promise.all(
    mentions.map(async (mention) => {
      const match = mention.match(/<@&(\d+)>|<#?(\d+)>|<@(\d+)>/);
      if (match) {
        const p1 = match[1]; // role
        const p2 = match[2]; // channel
        const p3 = match[3]; // user

        if (p1) {
          const role = await guild.roles.fetch(p1);
          return "@" + role?.name ?? "Неизвестная роль";
        }
        if (p2) {
          const channel = await guild.channels.fetch(p2);
          return "#" + channel?.name ?? "Неизвестный канал";
        }
        if (p3) {
          const user = await guild.client.users.fetch(p3);
          return "@" + user?.username ?? "Неизвестный пользователь";
        }
      }
      return mention;
    })
  );
  let result = content;
  mentions.forEach((mention, index) => {
    result = result.replace(mention, replacements[index]);
  });

  return result;
};

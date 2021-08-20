module.exports = (bot, message, erDictionary) => {
  const redRole = message.guild.roles.cache.find(role => role.name === "Red Team");
  const yellowRole = message.guild.roles.cache.find(role => role.name === "Yellow Team");
  const yellowEmoji = `878183671780233246`;
  const redEmoji = `❤️`;

  bot.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == message.channel.id) {
      if (reaction.emoji.name === yellowEmoji || reaction.emoji.id === yellowEmoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowRole);
      }
      if (reaction.emoji.name === redEmoji || reaction.emoji.id === redEmoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(redRole);
      }
    }
    else {
      return;
    }
  });
}
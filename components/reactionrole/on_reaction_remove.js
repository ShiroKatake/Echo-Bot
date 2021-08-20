module.exports = (bot, message, erDictionary) => {
  bot.on('messageReactionRemove', async (reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == message.channel.id) {
      const guildMember = reaction.message.guild.members.cache.get(user.id);
      let role = erDictionary[reaction.emoji.name] ? erDictionary[reaction.emoji.name] : erDictionary[reaction.emoji.id];
      if(!role) return;
      //TODO: If the user voted 2 but remove 1, they shouldn't be removed from their role.
      //TODO: Handle errors properly.
      await guildMember.roles.remove(`${role}`);
    }
    return;
  });
}
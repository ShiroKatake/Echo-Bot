module.exports = (bot, message, botMessage, erDictionary) => {
  bot.on('messageReactionAdd', async (reaction, user) => {

    if (reaction.message.id != botMessage.author.lastMessageID) return; //If the user reacted to a bot message in the past, disregard it.
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    console.log(bot._events);
    //console.log("Doing it");
    //console.log(erDictionary);
    if (reaction.message.channel.id == message.channel.id) {
      const guildMember = reaction.message.guild.members.cache.get(user.id);
      let role = erDictionary[reaction.emoji.name] ? erDictionary[reaction.emoji.name] : erDictionary[reaction.emoji.id];
      if(!role) return;
      
      //TODO: Handle errors properly.
      await guildMember.roles.add(`${role}`);
    }
    return;
  });
}
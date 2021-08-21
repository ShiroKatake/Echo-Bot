module.exports = async (reaction, user, message, botMessage, erDictionary) => {
  //If the user reacted to a bot message in the past, disregard it.
  if (reaction.message.id != botMessage.author.lastMessageID) return;
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;

  if (reaction.message.channel.id == message.channel.id) {
    const guildMember = reaction.message.guild.members.cache.get(user.id);
    let role = erDictionary[reaction.emoji.name] ? erDictionary[reaction.emoji.name] : erDictionary[reaction.emoji.id];
    if(!role) return;
    
    //TODO: Handle errors properly.
    await guildMember.roles.add(`${role}`);
  }
  return;
}
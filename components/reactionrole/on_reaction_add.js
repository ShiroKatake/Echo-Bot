module.exports = async (reaction, user, message, botMessage, erDictionary) => {
  try {
    //If the user reacted to a bot message in the past, disregard it.
    if (reaction.message.id != botMessage.author.lastMessageID) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == message.channel.id) {
      const guildMember = reaction.message.guild.members.cache.get(user.id);
      let role = GetRoleFromReaction(reaction, erDictionary);
      if(!role) throw "I can't find the role for to this reaction to assign you for some reason . . . Please let Ichi know so he can fix this.";
      
      await guildMember.roles.add(`${role}`);
    }
    return;
  }
  catch (error) {
    throw error;
  }
}

function GetRoleFromReaction(reaction, dictionary) {
  return dictionary[reaction.emoji.name] ? dictionary[reaction.emoji.name] : dictionary[reaction.emoji.id];
}
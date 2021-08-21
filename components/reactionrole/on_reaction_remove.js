module.exports = async (reaction, user, message, botMessage, erDictionary) => {
  //If the user reacted to a bot message in the past, disregard it.
    if (reaction.message.id != botMessage.author.lastMessageID) return;
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    
    if (reaction.message.channel.id == message.channel.id) {
      const guildMember = reaction.message.guild.members.cache.get(user.id);
      const messageReactions = reaction.message.reactions.cache;

      let reactionRoleToBeRemoved = GetRoleFromReaction(reaction, erDictionary);
      if(!reactionRoleToBeRemoved) return;

      //For each reaction the bot put on the message,
      //check to see if the user reacted to anything else.
      const memberReactions = messageReactions.filter(reaction => reaction.users.cache.has(user.id)).values();
      let reactedRoles = [];
      for (const reaction of memberReactions) {
        reactedRoles.push(GetRoleFromReaction(reaction, erDictionary));
      };

      //If the user reacted to many emojis that assign the same role,
      //don't remove that role until there's only one left.
      let roleHasManyOccurences = false;
      reactedRoles.forEach(reactedRole => {
        if (reactedRole == reactionRoleToBeRemoved) roleHasManyOccurences = true;
      });
      if (roleHasManyOccurences) return;

      //TODO: Handle errors properly.
      await guildMember.roles.remove(`${reactionRoleToBeRemoved}`);
    }
    return;
}

function GetRoleFromReaction(reaction, dictionary) {
  roleMatches = dictionary[reaction.emoji.name] ? dictionary[reaction.emoji.name] : dictionary[reaction.emoji.id];
  return roleMatches[0];
}
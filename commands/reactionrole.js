const HandleArguments = require('../components/reactionrole/extract_emoji.js');
const HandleOnReactionAdd = require('../components/reactionrole/on_reaction_add.js');
const HandleOnReactionRemove = require('../components/reactionrole/on_reaction_remove.js');

module.exports.config = {
  name: 't',
  argLength: [6],
  argCheckOverride: true,
  description: "Sets up a reaction role message."
}

module.exports.run = async (message, args, Discord, bot) => {
  let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Choose a team to join!')
    .setDescription('Choose a team!');

  let messageEmbed = await message.channel.send(embed);

  let erDictionary = {}; //er = emoji_role
  erDictionary = HandleArguments(args, erDictionary);
  for(var reaction in erDictionary) {
    await messageEmbed.react(`${reaction}`);
  }

  bot.on('messageReactionAdd', async (reaction, user) => HandleOnReactionAdd(reaction, user, message, messageEmbed, erDictionary));
  bot.on('messageReactionRemove', async (reaction, user) => HandleOnReactionRemove(reaction, user, message, messageEmbed, erDictionary));

  //If there are more than one instances of the same listener, remove the older one (first one in the array)
  //The type shifts from 'function' to 'object' when there are more than 1 instance of itself, so we'll be using this to check for it.
  if (typeof bot._events.messageReactionAdd === 'object')
    bot.off('messageReactionAdd', bot._events.messageReactionAdd[0]);
  if (typeof bot._events.messageReactionRemove === 'object')
    bot.off('messageReactionRemove', bot._events.messageReactionRemove[0]);
}
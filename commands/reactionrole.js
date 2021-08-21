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
  let erDictionary = {}; //er = emoji_role
  let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Choose a team to join!')
    .setDescription('Choose a team!');

  let messageEmbed = await message.channel.send(embed);

  erDictionary = HandleArguments(args, erDictionary);
  for(var reaction in erDictionary) {
    await messageEmbed.react(`${reaction}`);
  }

  console.log("before");
  console.log(bot._events);

  //If the first arg is a role

  //If the first arg is a reaction
  HandleOnReactionAdd(bot, message, messageEmbed, erDictionary);

  bot.on('messageReactionRemove', async (reaction, user) => HandleOnReactionRemove(bot, user, reaction, message, messageEmbed, erDictionary));
  console.log(`what are you? ${typeof bot._events.messageReactionRemove}`);
  if (typeof bot._events.messageReactionRemove === 'object') bot.off('messageReactionRemove', bot._events.messageReactionRemove[0]);
  
  console.log("after");
  console.log(bot._events);
  console.log(bot._events.messageReactionRemove[0]);
  console.log(bot._events.messageReactionRemove[1]);
}
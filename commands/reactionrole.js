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

  erDictionary = HandleArguments(args);
  for(var reaction in erDictionary) {
    messageEmbed.react(`${reaction}`);
  }

  //If the first arg is a role

  //If the first arg is a reaction

  HandleOnReactionAdd(bot, message, erDictionary);
  HandleOnReactionRemove(bot, message, erDictionary);
}
const ExtractEmoji = require('../components/reactionrole/extract_emoji.js');
const HandOnReactionAdd = require('../components/reactionrole/on_reaction_add.js');
const HandOnReactionRemove = require('../components/reactionrole/on_reaction_remove.js');

module.exports.config = {
  name: 't',
  argLength: [7],
  argCheckOverride: true,
  description: "Sets up a reaction role message."
}

module.exports.run = async (message, args, Discord, bot) => {
  let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Choose a team to join!')
    .setDescription('Choose a team!');

  let messageEmbed = await message.channel.send(embed);

  console.log(args);

  args.forEach(arg => {
    const emoji = ExtractEmoji(arg);
    messageEmbed.react(`${emoji}`);
  })

  HandOnReactionAdd(bot, message);
  HandOnReactionRemove(bot, message);
}
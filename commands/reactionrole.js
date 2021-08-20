const ExtractEmoji = require('../utils/extract_emoji.js');

module.exports = {
  name: 't',
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, bot) {
    const channel = '668982788933812246';
    const redRole = message.guild.roles.cache.find(role => role.name === "Red Team");
    const yellowRole = message.guild.roles.cache.find(role => role.name === "Yellow Team");

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

    const yellowEmoji = `878183671780233246`;
    const redEmoji = `❤️`;

    bot.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(yellowRole);
        }
        if (reaction.emoji.name === redEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(redRole);
        }
      }
        else {
          return;
        }
    });

    bot.on('messageReactionRemove', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowRole);
        }
        if (reaction.emoji.name === redEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(redRole);
        }
      }
        else {
          return;
        }
    });
  }
}
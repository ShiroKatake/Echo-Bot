module.exports = {
  name: 't',
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, bot) {
    const channel = '668982788933812246';
    const redRole = message.guild.roles.cache.find(role => role.name === "Red Team");
    const yellowRole = message.guild.roles.cache.find(role => role.name === "Yellow Team");
      
    console.log(args);

    let emojiOne = args[0].match(/<:.+?:\d+>/g);
    let emoji1Id = emojiOne[0].match(/\d+/g);

    let emojiTwo = args[1].match(/<:.+?:\d+>/g);
    let emoji2Id = emojiTwo ? emojiTwo[0].match(/\d+/g) : args[1];

    const yellowEmoji = `${emoji1Id}`;
    const redEmoji = `${emoji2Id}`;

    let embed = new Discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('Choose a team to join!')
      .setDescription('Choose a team!');

    let messageEmbed = await message.channel.send(embed);

    messageEmbed.react(yellowEmoji);
    messageEmbed.react(redEmoji);


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
const Discord = require('discord.js');
const config = require('./config');

const bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION",],
  presence: {
    status: 'online',
    activity: {
      name: `${config.prefix}help`,
      type: 'LISTENING'
    }
  }
});

const fs = require('fs');
bot.commands = new Map();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}


bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  const [cmd, ...arg] = message.content.trim().slice(config.prefix.length).split(/\s+/g);
  const command = bot.commands.get(cmd.toLowerCase());

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  command.execute(message, arg, Discord, bot);
});

require('./server')();
bot.login(config.token);
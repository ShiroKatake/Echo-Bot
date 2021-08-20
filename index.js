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
  bot.commands.set(command.config.name, command);
}


bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));

bot.on('message', async message => {
  //If wrong prefix or author of msg is bot, quit.
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  //Break message down into command, followed by arguments.
  const [cmd, ...arg] = message.content.trim().slice(config.prefix.length).split(/\s+/g);
  const command = bot.commands.get(cmd.toLowerCase());
  
  //If command is not found, drop an error.
  if (!command) {
    return message.reply(`command not found.`);        
  }

  //If found, but argument length doesn't match the required length (and the command doesn't override this check), drop an error.
  else if (!command.config.argCheckOverride && command.config.argLength.some(length => arg.length != length)) {
    if (command.config.argLength == 0) {
        return message.reply(`this command doesn't take any arguments.`);            
    } 
    //Trying to be fancy with english and plurals.
    else {
      let str = 'argument';
      return message.reply(`this command only takes ${command.config.argLength.map((c, i) => {
        if (c > 1) str + 's';
        return c;
      }).join(' or ')} ` + str + '.');
    }
  }
  else {
    command.run(message, arg, Discord, bot);
  }
});

require('./server')();
bot.login(config.token);
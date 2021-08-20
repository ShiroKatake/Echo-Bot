module.exports.config = {
  name: 'ping',
  argLength: [0],
  argCheckOverride: false,
  description: "Checks connectivity with discord\'s servers."
}

module.exports.run = async (message, args) => {
  let msg = await message.reply('Pinging...');
  await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
}
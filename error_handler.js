module.exports = (user, error, channel) => {
  channel.send(`${user}, ${error}`)
  .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  });
}
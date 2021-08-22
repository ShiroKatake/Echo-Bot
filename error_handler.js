module.exports = (user, error, channel) => {
  let errMsg = "";
  
  if (error.name != "Error") {
    errMsg = `${user}, **Uncaught Error** (please let Ichi know). ${error}`;
    console.log(error);
  }
  else {
    errMsg = `${user}, **${error.name}**: ${error.message}`;
  }

  channel.send(errMsg)
  .then(msg => {
    setTimeout(() => msg.delete(), 30000)
  });
}
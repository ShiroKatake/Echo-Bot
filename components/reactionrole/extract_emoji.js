module.exports = function HandleArguments(args) {
  let erDictionary = {};

  let emojis = [];
  let roles = [];

  for (var i = 0; i < args.length; i++) {
    let role = ExtractRole(args[i]);
    if (!role) {
      emojis.push(ExtractEmoji(args[i]));
    }
    else {
      roles.push(role);
    }
  }

  if (roles.length == 0 || emojis.length == 0) {
    //Error: Can't be 0
  }
  else if (roles.length > 1 && roles.length == emojis.length) {
    //Error: there must be an emoji for every role
  }

  for (var i = 0; i < emojis.length; i++) {
    erDictionary[`${emojis[i]}`] = roles[i] ? roles[i] : roles[0];
  }
  return erDictionary;
}

///Returns the role
function ExtractRole(arg) {
  let role = arg.match(/<@&\d+>/g);
  return role ? role[0].match(/\d+/g) : null;
}

//TODO: Figure out how to check between a unicode character and null. Cuz right now
//if the arg doesn't fit the regex we just assume that it is a unicode emoji.

function ExtractEmoji(arg) {
  //If the emoji is unicode, push it as is.
  let emoji = arg.match(/<:.+?:\d+>/g);
  if (!emoji) {
    return arg;
  }

  //If the emoji is custom, push its id instead.
  let emojiId = emoji[0].match(/\d+/g);
  return emojiId;
}
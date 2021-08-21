const unicodeEmojiRegex = require('emoji-regex/RGI_Emoji.js');
//TODO: Write error messages and change return statements into reply statements.
module.exports = function HandleArguments(args, erDictionary) {
  erDictionary = {};

  //Get role from first arg.
  let role = ExtractRole(args[0]);
  let roleArgPosition = 0;

  //If the first arg is not a role, return error.
  if (!role) return;


  for (var i = 1; i < args.length; i++) {
    //If there's anything before or after the role or reaction, return error.
    if (!SanityCheck(args[i])) return;
    //Get role from second arg onwards.
    let argRole = ExtractRole(args[i]);

    if (argRole) {
      //If there are 2 consecutive args that are roles, return error.
      if (i - roleArgPosition == 1) return;
      role = argRole;
      roleArgPosition = i;
      continue;
    }
    else if (!argRole) {
      let reaction = ExtractReaction(args[i]);
      //If arg is neither role or reaction, return error.
      if (!reaction) return;
      //If a reaction is already used for a role, return error.
      if (erDictionary[reaction]) return;
      erDictionary[`${reaction}`] = role;
      console.log(erDictionary);
    }
  }

  return erDictionary;
}

function SanityCheck(str) {
  return !str.match(/>.|.</g);
}

function ExtractRole(str) {
  let role = str.match(/<@&\d+>/g);
  return role ? role[0].match(/\d+/g) : null;
}

function ExtractReaction(str) {
  let customEmoji = str.match(/<:.+?:\d+>/g);

  //If the emoji is not custom
  if (!customEmoji) {
    //Check if it's a unicode symbol and return it.
    let unicodeEmoji = IsUnicode(str);
    if (unicodeEmoji)
      return unicodeEmoji;
    //Else return error.
    else
      return null;
  }
  
  //If the emoji is custom, return its id instead.
  let emojiId = customEmoji[0].match(/\d+/g);
  return emojiId;
}

function IsUnicode(str) {
  result = str.match(unicodeEmojiRegex());
  //If there's more than 1 occurences (ie. there are at least 2 unicode emojis being next to together without space)
  //or if it's a unicode but not an emoji,
  //return error.
  if (!result || !result.length == 1)
    return false; //TODO: Change this to reply error message.

  return result;
}

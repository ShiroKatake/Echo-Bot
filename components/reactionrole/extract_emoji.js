const unicodeEmojiRegex = require('emoji-regex/RGI_Emoji.js');
//TODO: Write error messages and change return statements into reply statements.
module.exports = (args, erDictionary) => {
  try {
    erDictionary = {};

    //Get role from first arg.
    let role = ExtractRole(args[0]);
    let roleArgPosition = 0;

    //If the first arg is not a role, return error.
    if (!role) 
      throw "the first argument must be a role.";

    for (var i = 1; i < args.length; i++) {
      //If there's anything before or after the role or reaction, return error.
      if (!SanityCheck(args[i]))
        throw `argument ${i + 1} needs a space either before or after it.`;

      //Get role from second arg onwards.
      let argRole = ExtractRole(args[i]);

      if (argRole) {
        //If there are 2 consecutive args that are roles, return error.
        if (i - roleArgPosition == 1)
          throw "a role must be followed by at least 1 reaction.";

        role = argRole;
        roleArgPosition = i;
        continue;
      }
      else if (!argRole) {
        let reaction = ExtractReaction(args[i]);

        //If arg is neither role or reaction, return error.
        if (!reaction)
          throw `"${args[i]}" is not a valid role or reaction.`;

        //If a reaction is already used for a role, return error.
        if (erDictionary[reaction])
          throw "a reaction currently can't be used for 2 roles. If you've found a use case for that, tell Ichi so he can make it work.";

        erDictionary[`${reaction}`] = role;
      }
    }

    return erDictionary;
  }
  catch (error) {
    throw error;
  }
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

module.exports = function ExtractEmoji(arg) {
  let emoji = arg.match(/<:.+?:\d+>/g);
  if (!emoji) {
    return arg;
  }

  let emojiId = emoji[0].match(/\d+/g);
  return emojiId;
}
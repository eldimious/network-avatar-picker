const crypto = require('crypto');

const FACEBOOK = 'facebook';
const GITHUB = 'github';
const INSTAGRAM = 'instagram';
const TUMBLR = 'tumblr';
const TWITTER = 'twitter';
const VIMEO = 'vimeo';
const YOUTUBE = 'youtube';
const GMAIL = 'gmail';
const GRAVATAR = 'gravatar';

const md5 = input =>
  crypto
    .createHash('md5')
    .update(input)
    .digest('hex');

module.exports = {
  FACEBOOK,
  GITHUB,
  INSTAGRAM,
  TUMBLR,
  TWITTER,
  VIMEO,
  YOUTUBE,
  GMAIL,
  GRAVATAR,
  md5,
};

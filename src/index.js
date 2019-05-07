const cache = require('./cache');
const facebook = require('./providers/facebook');
const github = require('./providers/github');
const gmail = require('./providers/gmail');
const instagram = require('./providers/instagram');
const tumblr = require('./providers/tumblr');
const twitter = require('./providers/twitter');
const vimeo = require('./providers/vimeo');
const youtube = require('./providers/youtube');

class NetworkAvatarPicker {
  constructor(config = {}) {
    const cacheService = cache.init(config);
    this.facebook = facebook.init(cacheService);
    this.github = github.init(cacheService);
    this.gmail = gmail.init(cacheService);
    this.instagram = instagram.init(cacheService);
    this.tumblr = tumblr.init(cacheService);
    this.twitter = twitter.init(cacheService);
    this.vimeo = vimeo.init(cacheService);
    this.youtube = youtube.init(cacheService);
    if (new.target === NetworkAvatarPicker) {
      Object.freeze(this);
    }
  }
}

module.exports = NetworkAvatarPicker;

const facebook = require('./providers/facebook');
const github = require('./providers/github');
const instagram = require('./providers/instagram');
const tumblr = require('./providers/tumblr');
const twitter = require('./providers/twitter');
const vimeo = require('./providers/vimeo');
const youtube = require('./providers/youtube');

class NetworkAvatarPicker {
  constructor() {
    this.facebook = facebook.init();
    this.github = github.init();
    this.instagram = instagram.init();
    this.tumblr = tumblr.init();
    this.twitter = twitter.init();
    this.vimeo = vimeo.init();
    this.youtube = youtube.init();
    if (new.target === NetworkAvatarPicker) {
      Object.freeze(this);
    }
  }
}

module.exports = NetworkAvatarPicker;

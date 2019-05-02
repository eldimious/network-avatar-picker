const facebook = require('./providers/facebook');
const github = require('./providers/github');
const instagram = require('./providers/instagram');
const tumblr = require('./providers/tumblr');
const twitter = require('./providers/twitter');
const vimeo = require('./providers/vimeo');

class NetworkAvatarPicker {
  constructor() {
    this.facebook = facebook.init();
    this.github = github.init();
    this.instagram = instagram.init();
    this.tumblr = tumblr.init();
    this.twitter = twitter.init('twitter');
    this.vimeo = vimeo.init('vimeo');
    if (new.target === NetworkAvatarPicker) {
      Object.freeze(this);
    }
  }
}

module.exports = NetworkAvatarPicker;

const networks = require('./networks');

class NetworkAvatarPicker {
  constructor() {
    this.twitter = networks.init('twitter');
    this.instagram = networks.init('instagram');
    this.tumblr = networks.init('tumblr');
    this.vimeo = networks.init('vimeo');
    this.facebook = networks.init('facebook');
  }
}

module.exports = Object.freeze(NetworkAvatarPicker);

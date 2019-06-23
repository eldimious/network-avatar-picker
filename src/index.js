const cache = require('./cache');
const providersService = require('./providers');

class NetworkAvatarPicker {
  constructor(config = {}) {
    const cacheService = cache.init(config);
    const providers = providersService.init(cacheService);
    this.facebook = providers.facebook;
    this.github = providers.github;
    this.gmail = providers.gmail;
    this.instagram = providers.instagram;
    this.tumblr = providers.tumblr;
    this.twitter = providers.twitter;
    this.vimeo = providers.vimeo;
    this.youtube = providers.youtube;
    if (new.target === NetworkAvatarPicker) {
      Object.freeze(this);
    }
  }
}

module.exports = NetworkAvatarPicker;

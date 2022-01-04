const cache = require('./cache');
const providersService = require('./providers');

class NetworkAvatarPicker {
  constructor(config = {}) {
    let cacheService;
    if (config && config.redis) {
      cacheService = cache.init(config.redis).cacheService;
    }
    const providers = providersService.init(cacheService);
    this.facebook = providers.facebookService;
    this.github = providers.githubService;
    this.gmail = providers.gmailService;
    this.instagram = providers.instagramService;
    this.tumblr = providers.tumblrService;
    this.twitter = providers.twitterService;
    this.vimeo = providers.vimeoService;
    this.youtube = providers.youtubeService;
    if (new.target === NetworkAvatarPicker) {
      Object.freeze(this);
    }
  }
}

module.exports = NetworkAvatarPicker;

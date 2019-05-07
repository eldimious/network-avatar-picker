const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TUMBLR,
} = require('../utils/common');

const tumblrProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${TUMBLR}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, TUMBLR);
    if (cache) cache.setCachedValue(`${TUMBLR}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(tumblrProvider), {
  getCache() {
    return cacheService;
  },
});

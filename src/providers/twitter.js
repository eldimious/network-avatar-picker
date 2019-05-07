const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TWITTER,
} = require('../utils/common');

const twitterProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://twitter.com/${username}/profile_image?size=original`;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${TWITTER}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, TWITTER);
    if (cache) cache.setCachedValue(`${TWITTER}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(twitterProvider), {
  getCache() {
    return cacheService;
  },
});

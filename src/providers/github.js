const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  GITHUB,
} = require('../utils/common');

const githubProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://github.com/${username}.png`;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${GITHUB}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, GITHUB);
    if (cache) cache.setCachedValue(`${GITHUB}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(githubProvider), {
  getCache() {
    return cacheService;
  },
});

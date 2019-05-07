const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  INSTAGRAM,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.instagram.com/${username}`;
}

const instagramProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    const cache = this.getCache();
    if (cache) {
      const url = await cache.getCachedValue(`${INSTAGRAM}/profileUrl/${username}`);
      if (url) return url;
    }
    const url = await extractProfileImageUrl(getUserProfileUrl(username), INSTAGRAM);
    if (cache) cache.setCachedValue(`${INSTAGRAM}/profileUrl/${username}`, url);
    return url;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${INSTAGRAM}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, INSTAGRAM);
    if (cache) cache.setCachedValue(`${INSTAGRAM}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(instagramProvider), {
  getCache() {
    return cacheService;
  },
});

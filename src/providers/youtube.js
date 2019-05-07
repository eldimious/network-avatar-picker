const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  YOUTUBE,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.youtube.com/user/${username}`;
}

const youtubeProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    const cache = this.getCache();
    if (cache) {
      const url = await cache.getCachedValue(`${YOUTUBE}/profileUrl/${username}`);
      if (url) return url;
    }
    const url = await extractProfileImageUrl(getUserProfileUrl(username), YOUTUBE);
    if (cache) cache.setCachedValue(`${YOUTUBE}/profileUrl/${username}`, url);
    return url;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${YOUTUBE}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, YOUTUBE);
    if (cache) cache.setCachedValue(`${YOUTUBE}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(youtubeProvider), {
  getCache() {
    return cacheService;
  },
});

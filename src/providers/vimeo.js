const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  VIMEO,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.vimeo.com/${username}`;
}

const vimeoProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    const cache = this.getCache();
    if (cache) {
      const url = await cache.getCachedValue(`${VIMEO}/profileUrl/${username}`);
      if (url) return url;
    }
    const url = await extractProfileImageUrl(getUserProfileUrl(username), VIMEO);
    if (cache) cache.setCachedValue(`${VIMEO}/profileUrl/${username}`, url);
    return url;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${VIMEO}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, VIMEO);
    if (cache) cache.setCachedValue(`${VIMEO}/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(vimeoProvider), {
  getCache() {
    return cacheService;
  },
});

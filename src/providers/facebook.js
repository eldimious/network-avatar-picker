const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  FACEBOOK,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://mobile.facebook.com/${username}`;
}

const facebookProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    const cache = this.getCache();
    if (cache) {
      const url = await cache.getCachedValue(`facebook/profileUrl/${username}`);
      if (url) return url;
    }
    const url = await extractProfileImageUrl(getUserProfileUrl(username), FACEBOOK);
    if (cache) cache.setCachedValue(`facebook/profileUrl/${username}`, url);
    return url;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`facebook/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, FACEBOOK);
    cache.setCachedValue(`facebook/avatar/${username}`, avatar);
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(facebookProvider), {
  getCache() {
    return cacheService;
  },
});

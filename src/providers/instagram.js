const {
  extractProfileImageUrl,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  INSTAGRAM,
} = require('../common/constants');
const baseProvider = require('./base');

function getUserProfileUrl(username) {
  return `https://www.instagram.com/${username}`;
}

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: INSTAGRAM,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      const cache = this.getCache();
      if (cache) {
        const url = await cache.getCachedValue(`${this.provider}/profileUrl/${username}`);
        if (url) return url;
      }
      const url = await extractProfileImageUrl(getUserProfileUrl(username), this.provider);
      if (cache) cache.setCachedValue(`${this.provider}/profileUrl/${username}`, url);
      return url;
    },
  });
};

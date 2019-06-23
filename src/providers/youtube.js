const {
  extractProfileImageUrl,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  YOUTUBE,
} = require('../common/constants');
const baseProvider = require('./base');

function getUserProfileUrl(username) {
  return `https://www.youtube.com/user/${username}`;
}

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: YOUTUBE,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      const cache = this.getCache();
      if (cache) {
        const url = await cache.getCachedValue(`${this.provider}/profileUrl/${username}`);
        if (url) return url;
      }
      const url = await extractProfileImageUrl(getUserProfileUrl(username), this.provider);
      if (cache) {
        await cache.setCachedValue(`${this.provider}/profileUrl/${username}`, url);
      }
      return url;
    },
  });
};

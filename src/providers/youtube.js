const {
  extractProfileImageUrl,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  YOUTUBE,
} = require('../utils/common');
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
        const url = await cache.getCachedValue(`${YOUTUBE}/profileUrl/${username}`);
        if (url) return url;
      }
      const url = await extractProfileImageUrl(getUserProfileUrl(username), YOUTUBE);
      if (cache) cache.setCachedValue(`${YOUTUBE}/profileUrl/${username}`, url);
      return url;
    },
  });
};

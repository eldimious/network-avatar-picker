const {
  extractProfileImageUrl,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  VIMEO,
} = require('../utils/common');
const baseProvider = require('./base');

function getUserProfileUrl(username) {
  return `https://www.vimeo.com/${username}`;
}

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: VIMEO,
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
  });
};

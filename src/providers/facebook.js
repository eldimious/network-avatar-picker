const {
  extractProfileImageUrl,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  FACEBOOK,
} = require('../utils/common');
const baseProvider = require('./base');

function getUserProfileUrl(username) {
  return `https://mobile.facebook.com/${username}`;
}


module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: FACEBOOK,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      if (cacheService) {
        const url = await cacheService.getCachedValue(`${FACEBOOK}/profileUrl/${username}`);
        if (url) return url;
      }
      const url = await extractProfileImageUrl(getUserProfileUrl(username), FACEBOOK);
      if (cacheService) cacheService.setCachedValue(`${FACEBOOK}/profileUrl/${username}`, url);
      return url;
    },
  });
};

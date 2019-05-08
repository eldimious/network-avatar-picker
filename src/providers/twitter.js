const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TWITTER,
} = require('../common/constants');
const baseProvider = require('./base');

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: TWITTER,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      return `https://twitter.com/${username}/profile_image?size=original`;
    },
  });
};

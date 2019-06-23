const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  GITHUB,
} = require('../common/constants');
const baseProvider = require('./base');

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: GITHUB,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      return `https://github.com/${username}.png`;
    },
  });
};

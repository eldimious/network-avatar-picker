const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TUMBLR,
} = require('../utils/common');
const baseProvider = require('./base');

module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: TUMBLR,
    async getAvatarUrl(username) {
      validateUsernameInput(username);
      return `https://api.tumblr.com/v2/blog/${username}/avatar`;
    },
  });
};

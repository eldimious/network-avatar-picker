const {
  validateGmail,
} = require('../utils/validationService');
const {
  md5,
  GMAIL,
} = require('../utils/common');
const baseProvider = require('./base');


module.exports.init = (cacheService) => {
  const base = baseProvider.init(cacheService);
  return Object.assign(Object.create(base), {
    provider: GMAIL,
    async getAvatarUrl(email) {
      validateGmail(email);
      return `https://gravatar.com/avatar/${md5(email)}?size=500`;
    },
  });
};

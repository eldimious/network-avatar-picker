const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateGmail,
} = require('../utils/validationService');
const {
  md5,
  GMAIL,
} = require('../utils/common');

const gmailProvider = {
  async getAvatarUrl(username) {
    validateGmail(username);
    return `https://gravatar.com/avatar/${md5(username)}?size=500`;
  },
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${GMAIL}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, GMAIL);
    if (cache) cache.setCachedValue(`${GMAIL}/avatar/${username}`, avatar);
    return avatar;
  },
};

module.exports.init = cacheService => Object.assign(Object.create(gmailProvider), {
  getCache() {
    return cacheService;
  },
});

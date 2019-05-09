const {
  downloadImage,
} = require('../utils/avatarService');

const baseProvider = {
  async getAvatar(username) {
    const cache = this.getCache();
    if (cache) {
      const avatar = await cache.getCachedValue(`${this.provider}/avatar/${username}`);
      if (avatar) return avatar;
    }
    const profileImageUrl = await this.getAvatarUrl(username);
    const avatar = await downloadImage(profileImageUrl, this.provider);
    if (cache) {
      await cache.setCachedValue(`${this.provider}/avatar/${username}`, avatar);
    }
    return avatar;
  },
};


module.exports.init = cacheService => Object.assign(Object.create(baseProvider), {
  getCache() {
    return cacheService;
  },
});

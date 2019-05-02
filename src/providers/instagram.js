const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');

const instagramProvider = {
  getUrl(username) {
    return `https://www.instagram.com/${username}`;
  },
  async getAvatar(username) {
    const profileImageUrl = await extractProfileImageUrl('instagram', this.getUrl(username));
    return downloadImage(profileImageUrl, 'instagram');
  },
};

module.exports.init = () => Object.assign(Object.create(instagramProvider));

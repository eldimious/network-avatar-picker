const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');

const vimeoProvider = {
  getUrl(username) {
    return `https://www.vimeo.com/${username}`;
  },
  async getAvatar(username) {
    const profileImageUrl = await extractProfileImageUrl('vimeo', this.getUrl(username));
    return downloadImage(profileImageUrl, 'vimeo');
  },
};

module.exports.init = () => Object.assign(Object.create(vimeoProvider));

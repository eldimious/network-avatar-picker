const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');

const youtubeProvider = {
  getUrl(username) {
    return `https://www.youtube.com/user/${username}`;
  },
  async getAvatar(username) {
    const profileImageUrl = await extractProfileImageUrl('youtube', this.getUrl(username));
    return downloadImage(profileImageUrl, 'youtube');
  },
};

module.exports.init = () => Object.assign(Object.create(youtubeProvider));

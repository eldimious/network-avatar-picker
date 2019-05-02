const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const youtubeProvider = {
  getUrl(username) {
    return `https://www.youtube.com/user/${username}`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    const profileImageUrl = await extractProfileImageUrl('youtube', this.getUrl(username));
    return downloadImage(profileImageUrl, 'youtube');
  },
};

module.exports.init = () => Object.assign(Object.create(youtubeProvider));

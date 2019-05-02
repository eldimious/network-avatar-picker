const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const instagramProvider = {
  getUrl(username) {
    return `https://www.instagram.com/${username}`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    const profileImageUrl = await extractProfileImageUrl(this.getUrl(username), 'instagram');
    return downloadImage(profileImageUrl, 'instagram');
  },
};

module.exports.init = () => Object.assign(Object.create(instagramProvider));

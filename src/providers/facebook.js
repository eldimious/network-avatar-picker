const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const facebookProvider = {
  getUrl(username) {
    return `https://mobile.facebook.com/${username}`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    const profileImageUrl = await extractProfileImageUrl('facebook', this.getUrl(username));
    return downloadImage(profileImageUrl, 'facebook');
  },
};

module.exports.init = () => Object.assign(Object.create(facebookProvider));

const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const vimeoProvider = {
  getUrl(username) {
    return `https://www.vimeo.com/${username}`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    const profileImageUrl = await extractProfileImageUrl(this.getUrl(username), 'vimeo');
    return downloadImage(profileImageUrl, 'vimeo');
  },
};

module.exports.init = () => Object.assign(Object.create(vimeoProvider));

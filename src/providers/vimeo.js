const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  VIMEO,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.vimeo.com/${username}`;
}

const vimeoProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return extractProfileImageUrl(getUserProfileUrl(username), VIMEO);
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, VIMEO);
  },
};


module.exports.init = () => Object.assign(Object.create(vimeoProvider));

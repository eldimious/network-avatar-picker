const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  INSTAGRAM,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.instagram.com/${username}`;
}

const instagramProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return extractProfileImageUrl(getUserProfileUrl(username), INSTAGRAM);
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, INSTAGRAM);
  },
};


module.exports.init = () => Object.assign(Object.create(instagramProvider));

const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  FACEBOOK,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://mobile.facebook.com/${username}`;
}

const facebookProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return extractProfileImageUrl(getUserProfileUrl(username), FACEBOOK);
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, FACEBOOK);
  },
};


module.exports.init = () => Object.assign(Object.create(facebookProvider));

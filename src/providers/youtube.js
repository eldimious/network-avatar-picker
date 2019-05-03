const {
  extractProfileImageUrl,
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  YOUTUBE,
} = require('../utils/common');

function getUserProfileUrl(username) {
  return `https://www.youtube.com/user/${username}`;
}

const youtubeProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return extractProfileImageUrl(getUserProfileUrl(username), YOUTUBE);
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, YOUTUBE);
  },
};


module.exports.init = () => Object.assign(Object.create(youtubeProvider));

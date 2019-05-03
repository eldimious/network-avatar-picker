const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TWITTER,
} = require('../utils/common');

const twitterProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://twitter.com/${username}/profile_image?size=original`;
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, TWITTER);
  },
};

module.exports.init = () => Object.assign(Object.create(twitterProvider));

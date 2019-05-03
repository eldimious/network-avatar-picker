const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  GITHUB,
} = require('../utils/common');

const githubProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://github.com/${username}.png`;
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, GITHUB);
  },
};

module.exports.init = () => Object.assign(Object.create(githubProvider));

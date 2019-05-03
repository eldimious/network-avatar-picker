const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');
const {
  TUMBLR,
} = require('../utils/common');

const tumblrProvider = {
  async getAvatarUrl(username) {
    validateUsernameInput(username);
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, TUMBLR);
  },
};

module.exports.init = () => Object.assign(Object.create(tumblrProvider));

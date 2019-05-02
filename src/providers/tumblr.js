const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const tumblrProvider = {
  getUrl(username) {
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    return downloadImage(this.getUrl(username), 'tumblr');
  },
};

module.exports.init = () => Object.assign(Object.create(tumblrProvider));

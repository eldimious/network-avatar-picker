const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const githubProvider = {
  getUrl(username) {
    return `https://github.com/${username}.png`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    return downloadImage(this.getUrl(username), 'github');
  },
};

module.exports.init = () => Object.assign(Object.create(githubProvider));

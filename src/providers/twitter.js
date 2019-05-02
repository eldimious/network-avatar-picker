const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateUsernameInput,
} = require('../utils/validationService');

const twitterProvider = {
  getUrl(username) {
    return `https://twitter.com/${username}/profile_image?size=original`;
  },
  async getAvatar(username) {
    validateUsernameInput(username);
    return downloadImage(this.getUrl(username), 'twitter');
  },
};

module.exports.init = () => Object.assign(Object.create(twitterProvider));

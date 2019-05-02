const {
  downloadImage,
} = require('../utils/avatarService');

const githubProvider = {
  getUrl(username) {
    return `https://github.com/${username}.png`;
  },
  async getAvatar(username) {
    return downloadImage(this.getUrl(username), 'github');
  },
};

module.exports.init = () => Object.assign(Object.create(githubProvider));

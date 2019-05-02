const {
  downloadImage,
} = require('../utils/avatarService');

const tumblrProvider = {
  getUrl(username) {
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  },
  async getAvatar(username) {
    return downloadImage(this.getUrl(username), 'tumblr');
  },
};

module.exports.init = () => Object.assign(Object.create(tumblrProvider));

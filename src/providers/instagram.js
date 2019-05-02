const {
  getPromisified,
} = require('../utils/requestService');
const {
  handleRequestErrors,
} = require('../utils/errorsService');
const {
  extractProfileImageUrl,
} = require('../utils/avatarService');

const instagramProvider = {
  getUrl(username) {
    return `https://www.instagram.com/${username}`;
  },
  async getAvatar(username) {
    try {
      const profileImageUrl = await extractProfileImageUrl('instagram', this.getUrl(username));
      const response = await getPromisified({
        url: profileImageUrl,
        encoding: null,
      });
      handleRequestErrors(response, 'instagram');
      return response.body;
    } catch (error) {
      throw error;
    }
  },
};

module.exports.init = () => Object.assign(Object.create(instagramProvider));

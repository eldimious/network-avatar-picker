const {
  getPromisified,
} = require('../utils/requestService');
const {
  handleRequestErrors,
} = require('../utils/errorsService');

const twitterProvider = {
  getUrl(username) {
    return `https://twitter.com/${username}/profile_image?size=original`;
  },
  async getAvatar(username) {
    try {
      const response = await getPromisified({
        url: this.getUrl(username),
        encoding: null,
      });
      handleRequestErrors(response, 'twitter');
      return response.body;
    } catch (error) {
      throw error;
    }
  },
};

module.exports.init = () => Object.assign(Object.create(twitterProvider));

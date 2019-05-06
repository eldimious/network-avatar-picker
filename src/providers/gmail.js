const {
  downloadImage,
} = require('../utils/avatarService');
const {
  validateGmail,
} = require('../utils/validationService');
const {
  md5,
  GMAIL,
} = require('../utils/common');

const gmailProvider = {
  async getAvatarUrl(username) {
    validateGmail(username);
    return `https://gravatar.com/avatar/${md5(username)}?size=500`;
  },
  async getAvatar(username) {
    const profileImageUrl = await this.getAvatarUrl(username);
    return downloadImage(profileImageUrl, GMAIL);
  },
};


module.exports.init = () => Object.assign(Object.create(gmailProvider));
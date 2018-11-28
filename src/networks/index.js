const avatarServiceFactory = require('../utils/avatarService');

const getImageUrl = (type, username) => {
  if (type === 'twitter') {
    return `https://twitter.com/${username}/profile_image?size=original`;
  }
  if (type === 'tumblr') {
    return `https://api.tumblr.com/v2/blog/${username}/avatar`;
  }
  if (type === 'facebook') {
    return `https://graph.facebook.com/${username}/picture?type=large`;
  }
};


const getUserProfileUrl = (type, username) => `https://www.${type}.com/${username}`;


const picker = {
  async getAvatar(username) {
    try {
      const type = this.getNetworkType();
      const imageUrl = type === 'vimeo' || type === 'instagram' ?
        await this.avatarService.findImageUrl(getUserProfileUrl(type,username), type)
        : getImageUrl(type, username);
      return this.avatarService.getImage(imageUrl, type);
    } catch (error) {
      throw error;
    }
  },
};


module.exports.init = (type) => {
  const avatarService = avatarServiceFactory.init();
  return Object.assign(Object.create(picker), {
    getNetworkType() {
      return type;
    },
    avatarService,
  });
};
